import { NextRequest } from "next/server";
import { connectDB } from "@/server/db";
import { handleError, ok } from "@/server/http";
import { requireAuth } from "@/server/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    return ok(await requireAuth(req));
  } catch (err) {
    return handleError(err);
  }
}
