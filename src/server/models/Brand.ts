import mongoose, { Schema } from "mongoose";
import { cleanJson } from "./_util";

const schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    logo: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);
cleanJson(schema);

export const Brand = mongoose.models.Brand || mongoose.model("Brand", schema);
