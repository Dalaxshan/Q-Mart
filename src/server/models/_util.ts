import { Schema } from "mongoose";

/** Adds toJSON output matching the frontend types (string `id` fields untouched, no __v). */
export function cleanJson(schema: Schema, extra?: (ret: Record<string, unknown>) => void) {
  schema.set("toJSON", {
    transform(_doc, ret: Record<string, unknown>) {
      delete ret.__v;
      delete ret.password;
      extra?.(ret);
      return ret;
    },
  });
}
