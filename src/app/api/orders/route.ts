import { NextRequest } from "next/server";
import { connectDB } from "@/server/db";
import { Order } from "@/server/models/Order";
import { Product } from "@/server/models/Product";
import { HttpError, handleError, list, ok, readJson } from "@/server/http";
import { getAuth, requireAuth } from "@/server/auth";
import { orderSchema } from "@/server/validators";

// GET /api/orders?user=&orderStatus=&paymentStatus=  (admin: all, customer: own only)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = await requireAuth(req);
    const q = req.nextUrl.searchParams;
    const filter: Record<string, unknown> = {};
    if (user.role === "admin") {
      if (q.get("user")) filter.user = q.get("user");
    } else {
      filter.user = user.id;
    }
    if (q.get("orderStatus")) filter.orderStatus = q.get("orderStatus");
    if (q.get("paymentStatus")) filter.paymentStatus = q.get("paymentStatus");
    return list(await Order.find(filter).sort({ createdAt: -1 }));
  } catch (err) {
    return handleError(err);
  }
}

// POST /api/orders – guest or logged in. Prices, names and stock come from the DB, never the client.
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = orderSchema.parse(await readJson(req));
    const user = await getAuth(req);
    if (body.channel !== "online" && user?.role !== "admin")
      throw new HttpError(403, "Only admins can create non-online orders");

    const ids = [...new Set(body.items.map((i) => i.product))];
    const products = await Product.find({ _id: { $in: ids }, status: "published" });
    const byId = new Map(products.map((p: any) => [p.id, p]));

    let subtotal = 0;
    const items = body.items.map((i) => {
      const p: any = byId.get(i.product);
      if (!p) throw new HttpError(400, `Product ${i.product} is unavailable`);
      const price = p.salePrice != null && p.salePrice > 0 && p.salePrice < p.price ? p.salePrice : p.price;
      const lineTotal = price * i.quantity;
      subtotal += lineTotal;
      return {
        product: p._id,
        name: p.name,
        image: p.images?.[0] ?? "",
        unit: p.unit,
        sku: p.sku,
        price,
        listPrice: p.price,
        quantity: i.quantity,
        lineTotal,
      };
    });

    const discount = Math.min(body.discount, subtotal);
    const total = subtotal - discount + body.deliveryFee;

    // Reserve stock atomically, roll back if any line fails.
    const reserved: { id: any; qty: number }[] = [];
    try {
      for (const it of items) {
        const r = await Product.updateOne(
          { _id: it.product, stock: { $gte: it.quantity } },
          { $inc: { stock: -it.quantity, soldCount: it.quantity } },
        );
        if (r.modifiedCount !== 1) throw new HttpError(409, `Not enough stock for "${it.name}"`);
        reserved.push({ id: it.product, qty: it.quantity });
      }
      const order = await Order.create({
        orderNumber: `ORD-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
        user: user?.id ?? null,
        channel: body.channel,
        items,
        subtotal,
        discount,
        deliveryFee: body.deliveryFee,
        total,
        paymentMethod: body.paymentMethod,
        paymentStatus: "pending",
        orderStatus: "pending",
        shippingAddress: body.shippingAddress && {
          ...body.shippingAddress,
          postalcode: body.shippingAddress.postalcode ?? body.shippingAddress.postalCode,
        },
      });
      return ok(order, 201);
    } catch (err) {
      await Promise.all(
        reserved.map((r) => Product.updateOne({ _id: r.id }, { $inc: { stock: r.qty, soldCount: -r.qty } })),
      );
      throw err;
    }
  } catch (err) {
    return handleError(err);
  }
}
