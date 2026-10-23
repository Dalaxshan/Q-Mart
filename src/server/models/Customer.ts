import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { cleanJson } from "./_util";

const schema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNo: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    province: String,
    city: String,
    streetAddress: String,
    postalcode: String,
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
  },
  { timestamps: true },
);

schema.pre("save", async function () {
  if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 12);
});
schema.methods.comparePassword = function (plain: string) {
  return bcrypt.compare(plain, this.password);
};
cleanJson(schema);

export const Customer = mongoose.models.Customer || mongoose.model("Customer", schema);
