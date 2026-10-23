import mongoose, { Schema, InferSchemaType } from "mongoose";
import { cleanJson } from "./_util";

const schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);
cleanJson(schema);

export type CategoryDoc = InferSchemaType<typeof schema>;
export const Category = mongoose.models.Category || mongoose.model("Category", schema);
