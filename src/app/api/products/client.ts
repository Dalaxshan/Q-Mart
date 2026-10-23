import api from "@/app/lib/axios";
import { Product, ProductPayload, ProductQuery } from "@/type";

export const productApi = {
  async getAllProducts(Query: ProductQuery): Promise<Product[]> {
    const res = await api.get("/products", { params: Query });
    return res.data.data;
  },

  async getOneProduct(slug: string): Promise<Product> {
    const res = await api.get(`/products/${slug}`);
    return res.data;
  },

  async createProduct(data: ProductPayload): Promise<Product> {
    const res = await api.post("/products", data);
    return res.data;
  },

  async updateProduct(
    slug: string,
    data: Partial<ProductPayload>,
  ): Promise<Product> {
    const res = await api.patch(`/products/${slug}`, data);
    return res.data;
  },

  async deleteProduct(slug: string): Promise<void> {
    await api.delete(`/products/${slug}`);
  },
};