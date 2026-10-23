import { NextRequest } from "next/server";
import { connectDB } from "@/server/db";
import { Customer } from "@/server/models/Customer";
import { HttpError, handleError, ok, readJson } from "@/server/http";
import { registerSchema } from "@/server/validators";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = registerSchema.parse(await readJson(req));
    if (await Customer.exists({ email: data.email.toLowerCase() }))
      throw new HttpError(409, "An account with this email already exists");
    // role is never taken from the request body
    const customer = await Customer.create({ ...data, role: "customer" });
    return ok(customer, 201);
  } catch (err) {
    return handleError(err);
  }
}
