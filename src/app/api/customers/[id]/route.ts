import { NextRequest } from "next/server";
import { connectDB } from "@/server/db";
import { Customer } from "@/server/models/Customer";
import { HttpError, handleError, ok, readJson } from "@/server/http";
import { requireAuth } from "@/server/auth";
import { profileUpdateSchema } from "@/server/validators";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const user = await requireAuth(req);
    const { id } = await params;
    if (user.id !== id && user.role !== "admin") throw new HttpError(403, "Forbidden");
    const data = profileUpdateSchema.parse(await readJson(req)); // whitelist: no email/password/role
    const updated = await Customer.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) throw new HttpError(404, "Customer not found");
    return ok(updated);
  } catch (err) {
    return handleError(err);
  }
}
