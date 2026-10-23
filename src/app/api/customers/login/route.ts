import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/db";
import { Customer } from "@/server/models/Customer";
import { HttpError, handleError, readJson } from "@/server/http";
import { loginSchema } from "@/server/validators";
import { COOKIE_NAME, cookieOptions, signToken } from "@/server/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = loginSchema.parse(await readJson(req));
    const customer = await Customer.findOne({ email: email.toLowerCase() }).select("+password");
    if (!customer || !(await (customer as any).comparePassword(password)))
      throw new HttpError(401, "Invalid email or password");

    const token = signToken(customer.id, customer.role);
    const res = NextResponse.json({ customer: customer.toJSON(), token });
    res.cookies.set(COOKIE_NAME, token, cookieOptions);
    return res;
  } catch (err) {
    return handleError(err);
  }
}
