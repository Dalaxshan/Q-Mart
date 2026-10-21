export interface Order {
  _id: string;
  orderNumber: string;
  user: string | null;
  items: OrderItem[];
  channel: "pos" | string;
  pos?: PosOrderDetails;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | string;
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  unit: string;
  sku: string;
  price: number;
  quantity: number;
  listPrice?: number;
  costPrice?: number;
  lineDiscount?: number;
  taxRate?: number;
  tax?: number;
  lineTotal?: number;
}

export interface PosPayment {
  method: string;
  amount: number;
}

export interface PosOrderDetails {
  cashier?: string;
  cashierName?: string;
  payments: PosPayment[];
  tendered?: number;
  change?: number;
}

export interface CreateOrderPayload {
  user?: string | null;
  items: OrderItem[];
  channel: "online" | "pos" | string;
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
  total: number;
  paymentMethod: string;
  paymentStatus?: string;
  orderStatus?: string;
  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  orderNotes?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string | ProductCategory;
  brand: string | ProductBrand;
  images: string[];
  price: string;
  salePrice?: string;
  sku: string;
  stock: number;
  unit: string;
  specifications: ProductSpecification[];
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  status: "published" | "draft" | string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductBrand {
  logo?: string;
  _id: string;
  name: string;
  slug: string;
}

export interface ProductQuery {
  category?: string;
  brand?: string;
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface ProductSpecification {
  key: string;
  value: string;
  _id?: string;
}

export interface ProductPayload {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  brand: string;
  images: string[];
  price: number;
  sku: string;
  stock: number;
  unit: string;
  specifications: ProductSpecification[];
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  status: "published" | "draft" | string;
  rating: number;
  reviewCount: number;
  soldCount: number;
}


export interface Subcategory {
  subcategoryName: string;
  subcategorySlug: string;
  _id: string;
}
export interface CategoryHome {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent: string | null;
  status: "active" | "inactive" | string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryPayload {
  name: string;
  slug: string;
  description: string;
  image: string;
  parent: string | null;
  status: "active" | "inactive" | string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  status: "active" | "inactive" | string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandPayload {
  name: string;
  slug: string;
  description: string;
  logo: string;
  status: "active" | "inactive" | string;
}

export interface District {
  id: string;
  name: string;
  districtSlug: string;
}