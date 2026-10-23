import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Converts any thrown error into a JSON response. Use in the catch block of every route. */
export function handleError(err: unknown) {
  if (err instanceof HttpError)
    return NextResponse.json({ message: err.message }, { status: err.status });
  if (err instanceof ZodError)
    return NextResponse.json(
      { message: err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ") },
      { status: 400 },
    );
  const e = err as { code?: number; keyValue?: Record<string, unknown>; name?: string };
  if (e?.code === 11000)
    return NextResponse.json(
      { message: `Duplicate value for ${Object.keys(e.keyValue ?? {}).join(", ")}` },
      { status: 409 },
    );
  if (e?.name === "CastError") return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  console.error(err);
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}

export async function readJson(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    throw new HttpError(400, "Invalid JSON body");
  }
}

export const list = <T>(data: T[]) => NextResponse.json({ data, total: data.length });
export const ok = <T>(data: T, status = 200) => NextResponse.json(data, { status });

export const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
