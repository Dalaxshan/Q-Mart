import { z } from "zod";

const status = z.enum(["active", "inactive"]);
const slug = z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, "invalid slug");

export const categorySchema = z.object({
  name: z.string().min(1),
  slug,
  description: z.string().default(""),
  image: z.string().default(""),
  parent: z.string().nullable().default(null),
  status: status.default("active"),
});

export const brandSchema = z.object({
  name: z.string().min(1),
  slug,
  description: z.string().default(""),
  logo: z.string().default(""),
  status: status.default("active"),
});

export const productSchema = z.object({
  name: z.string().min(1),
  slug,
  description: z.string().default(""),
  shortDescription: z.string().default(""),
  category: z.string().min(1),
  brand: z.string().min(1).optional(),
  images: z.array(z.string()).default([]),
  price: z.coerce.number().min(0),
  salePrice: z.coerce.number().min(0).optional(),
  sku: z.string().min(1),
  stock: z.coerce.number().int().min(0).default(0),
  unit: z.string().default("1"),
  specifications: z.array(z.object({ key: z.string(), value: z.string() })).default([]),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  bestseller: z.boolean().default(false),
  newArrival: z.boolean().default(false),
  status: z.enum(["published", "draft"]).default("published"),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  soldCount: z.number().int().min(0).default(0),
});

export const registerSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phoneNo: z.string().min(1),
  country: z.string().min(1),
  province: z.string().optional(),
  city: z.string().optional(),
  streetAddress: z.string().optional(),
  postalcode: z.string().optional(),
  password: z.string().min(6, "must be at least 6 characters"),
});

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

export const profileUpdateSchema = registerSchema
  .omit({ email: true, password: true })
  .partial();

export const orderSchema = z.object({
  user: z.string().nullable().optional(),
  channel: z.string().default("online"),
  items: z
    .array(
      z.object({
        product: z.string(),
        quantity: z.coerce.number().int().min(1),
      }).passthrough(),
    )
    .min(1, "order must contain at least one item"),
  discount: z.coerce.number().min(0).default(0),
  deliveryFee: z.coerce.number().min(0).default(0),
  paymentMethod: z.string().min(1),
  shippingAddress: z
    .object({
      fullName: z.string(),
      email: z.string(),
      phoneNo: z.string(),
      street: z.string(),
      country: z.string(),
      city: z.string(),
      state: z.string(),
      postalcode: z.string().optional(),
      postalCode: z.string().optional(),
    })
    .optional(),
});
