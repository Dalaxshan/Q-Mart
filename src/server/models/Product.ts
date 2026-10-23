import mongoose, { Schema } from "mongoose";
import { cleanJson } from "./_util";

const schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", index: true },
    images: { type: [String], default: [] },
    price: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    sku: { type: String, required: true, unique: true, trim: true },
    stock: { type: Number, default: 0, min: 0 },
    unit: { type: String, default: "1" },
    specifications: { type: [{ key: String, value: String }], default: [] },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    status: { type: String, enum: ["published", "draft"], default: "published", index: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);
schema.index({ name: "text", tags: "text", description: "text" });
// Frontend types declare price / salePrice as strings.
cleanJson(schema, (ret) => {
  if (ret.price != null) ret.price = String(ret.price);
  if (ret.salePrice != null) ret.salePrice = String(ret.salePrice);
});

export const Product = mongoose.models.Product || mongoose.model("Product", schema);
