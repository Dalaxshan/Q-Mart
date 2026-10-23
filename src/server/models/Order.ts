import mongoose, { Schema } from "mongoose";
import { cleanJson } from "./_util";

const itemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    image: String,
    unit: String,
    sku: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    listPrice: Number,
    costPrice: Number,
    lineDiscount: Number,
    taxRate: Number,
    tax: Number,
    lineTotal: Number,
  },
  { _id: false },
);

const schema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "Customer", default: null, index: true },
    items: { type: [itemSchema], required: true },
    channel: { type: String, default: "online" },
    pos: Schema.Types.Mixed,
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    shippingAddress: {
      fullName: String,
      email: String,
      phoneNo: String,
      street: String,
      country: String,
      city: String,
      state: String,
      postalcode: String,
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);
cleanJson(schema);

export const Order = mongoose.models.Order || mongoose.model("Order", schema);
