import { NextRequest } from "next/server";
import { connectDB } from "@/server/db";
import { Category } from "@/server/models/Category";
import { categorySchema } from "@/server/validators";
import { HttpError, handleError, ok, readJson } from "@/server/http";
import { requireAdmin } from "@/server/auth";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    await connectDB();
    const doc = await Category.findOne({ slug: (await params).slug.toLowerCase() });
    if (!doc) throw new HttpError(404, "Category not found");
    return ok(doc);
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  try {
    await connectDB();
    await requireAdmin(req);
    const data = categorySchema.partial().parse(await readJson(req));
    const doc = await Category.findOneAndUpdate({ slug: (await params).slug.toLowerCase() }, data, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw new HttpError(404, "Category not found");
    return ok(doc);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  try {
    await connectDB();
    await requireAdmin(req);
    const doc = await Category.findOneAndDelete({ slug: (await params).slug.toLowerCase() });
    if (!doc) throw new HttpError(404, "Category not found");
    return ok({ message: "Category deleted" });
  } catch (err) {
    return handleError(err);
  }
}
