import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { HttpError } from "./http";
import { Customer } from "./models/Customer";

export const COOKIE_NAME = "token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET is not set");
  return s;
}

export const signToken = (id: string, role: string) =>
  jwt.sign({ sub: id, role }, secret(), { expiresIn: MAX_AGE });

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};

function readToken(req: NextRequest) {
  const bearer = req.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) return bearer.slice(7);
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

/** Returns the logged-in customer or null (never throws on bad/missing token). */
export async function getAuth(req: NextRequest) {
  const token = readToken(req);
  if (!token) return null;
  try {
    const payload = jwt.verify(token, secret()) as { sub: string };
    return await Customer.findById(payload.sub);
  } catch {
    return null;
  }
}

export async function requireAuth(req: NextRequest) {
  const user = await getAuth(req);
  if (!user) throw new HttpError(401, "Authentication required");
  return user;
}

export async function requireAdmin(req: NextRequest) {
  const user = await requireAuth(req);
  if (user.role !== "admin") throw new HttpError(403, "Admin access required");
  return user;
}
