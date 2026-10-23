import { NextRequest } from "next/server";
import { connectDB } from "@/server/db";
import { Product } from "@/server/models/Product";
import { HttpError, handleError, ok, readJson } from "@/server/http";
import { getAuth, requireAdmin } from "@/server/auth";
import { productSchema } from "@/server/validators";

type Ctx = { params: Promise<{ slug: string }> };
const populate = [
  { path: "category", select: "name slug" },
  { path: "brand", select: "name slug logo" },
];

export async function GET(req: NextRequest, { params }: Ctx) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug: (await params).slug.toLowerCase() }).populate(populate);
    const admin = (await getAuth(req))?.role === "admin";
    if (!product || (product.status !== "published" && !admin)) throw new HttpError(404, "Product not found");
    return ok(product);
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  try {
    await connectDB();
    await requireAdmin(req);
    const data = productSchema.partial().parse(await readJson(req));
    const product = await Product.findOneAndUpdate({ slug: (await params).slug.toLowerCase() }, data, {
      new: true,
      runValidators: true,
    }).populate(populate);
    if (!product) throw new HttpError(404, "Product not found");
    return ok(product);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    await connectDB();
    await requireAdmin(req);
    const product = await Product.findOneAndDelete({ slug: (await params).slug.toLowerCase() });
    if (!product) throw new HttpError(404, "Product not found");
    return ok({ message: "Product deleted" });
  } catch (err) {
    return handleError(err);
  }
}
