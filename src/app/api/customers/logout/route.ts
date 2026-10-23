import { NextResponse } from "next/server";
import { COOKIE_NAME, cookieOptions } from "@/server/auth";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set(COOKIE_NAME, "", { ...cookieOptions, maxAge: 0 });
  return res;
}
