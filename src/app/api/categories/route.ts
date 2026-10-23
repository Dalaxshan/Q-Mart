import { NextRequest } from "next/server";
import { connectDB } from "@/server/db";
import { Category } from "@/server/models/Category";
import { categorySchema } from "@/server/validators";
import { handleError, list, ok, readJson } from "@/server/http";
import { getAuth, requireAdmin } from "@/server/auth";

// GET /api/categories – public sees active only, admin sees all
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const admin = (await getAuth(req))?.role === "admin";
    const docs = await Category.find(admin ? {} : { status: "active" }).sort({ name: 1 });
    return list(docs);
  } catch (err) {
    return handleError(err);
  }
}

// POST /api/categories – admin only
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    await requireAdmin(req);
    const data = categorySchema.parse(await readJson(req));
    return ok(await Category.create(data), 201);
  } catch (err) {
    return handleError(err);
  }
}
