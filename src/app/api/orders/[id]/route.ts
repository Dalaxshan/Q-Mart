import { NextRequest } from "next/server";
import { z } from "zod";
import { connectDB } from "@/server/db";
import { Order } from "@/server/models/Order";
import { HttpError, handleError, ok, readJson } from "@/server/http";
import { getAuth, requireAdmin } from "@/server/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  try {
    await connectDB();
    const order = await Order.findById((await params).id);
    if (!order) throw new HttpError(404, "Order not found");
    // Owned orders are private; guest orders are reachable only by their unguessable id.
    if (order.user) {
      const user = await getAuth(req);
      if (!user || (user.role !== "admin" && order.user.toString() !== user.id))
        throw new HttpError(403, "Forbidden");
    }
    return ok(order);
  } catch (err) {
    return handleError(err);
  }
}

const statusSchema = z
  .object({
    orderStatus: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
    paymentStatus: z.enum(["pending", "paid", "failed"]),
  })
  .partial();

// PATCH /api/orders/:id – admin updates status
export async function PATCH(req: NextRequest, { params }: Ctx) {
  try {
    await connectDB();
    await requireAdmin(req);
    const data = statusSchema.parse(await readJson(req));
    const order = await Order.findByIdAndUpdate((await params).id, data, { new: true });
    if (!order) throw new HttpError(404, "Order not found");
    return ok(order);
  } catch (err) {
    return handleError(err);
  }
}
