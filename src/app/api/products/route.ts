import { NextRequest } from "next/server";
import { connectDB } from "@/server/db";
import { Product } from "@/server/models/Product";
import { Category } from "@/server/models/Category";
import { Brand } from "@/server/models/Brand";
import { handleError, list, ok, readJson, escapeRegex } from "@/server/http";
import { getAuth, requireAdmin } from "@/server/auth";
import { productSchema } from "@/server/validators";

const populate = [
  { path: "category", select: "name slug" },
  { path: "brand", select: "name slug logo" },
];

// GET /api/products?category=&brand=&featured=&newArrival=&bestseller=&minPrice=&maxPrice=&search=&limit=
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const q = req.nextUrl.searchParams;
    const admin = (await getAuth(req))?.role === "admin";
    const filter: Record<string, any> = admin
      ? q.get("status") ? { status: q.get("status") } : {}
      : { status: "published" };

    const category = q.get("category");
    if (category) {
      const re = new RegExp(`^${escapeRegex(category)}$`, "i");
      const cats = await Category.find({ $or: [{ slug: re }, { name: re }] }).select("_id");
      filter.category = { $in: cats.map((c: any) => c._id) };
    }
    const brand = q.get("brand");
    if (brand) {
      const re = new RegExp(`^${escapeRegex(brand)}$`, "i");
      const brands = await Brand.find({ $or: [{ slug: re }, { name: re }] }).select("_id");
      filter.brand = { $in: brands.map((b: any) => b._id) };
    }
    for (const flag of ["featured", "newArrival", "bestseller"]) {
      if (q.get(flag) === "true") filter[flag] = true;
    }
    const min = Number(q.get("minPrice"));
    const max = Number(q.get("maxPrice"));
    if (q.get("minPrice") || q.get("maxPrice")) {
      filter.price = {
        ...(q.get("minPrice") && Number.isFinite(min) ? { $gte: min } : {}),
        ...(q.get("maxPrice") && Number.isFinite(max) ? { $lte: max } : {}),
      };
    }
    const search = q.get("search")?.trim();
    if (search) {
      const re = new RegExp(escapeRegex(search), "i");
      filter.$or = [{ name: re }, { tags: re }, { sku: re }];
    }

    const limit = Math.min(Math.max(parseInt(q.get("limit") ?? "") || 100, 1), 200);
    const products = await Product.find(filter).populate(populate).sort({ createdAt: -1 }).limit(limit);
    return list(products);
  } catch (err) {
    return handleError(err);
  }
}

// POST /api/products – admin only
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    await requireAdmin(req);
    const data = productSchema.parse(await readJson(req));
    const product = await Product.create(data);
    return ok(await product.populate(populate), 201);
  } catch (err) {
    return handleError(err);
  }
}
