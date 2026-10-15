import api from "@/app/lib/axios";
import { Category, CategoryPayload } from "@/type";

export const categoryApi = {
  async getAllCategory(): Promise<Category[]> {
    const res = await api.get("/categories");
    return res.data.data;
  },

  async getOneCategory(slug: string): Promise<Category> {
    const res = await api.get(`/categories/${slug}`);
    return res.data;
  },

  async createCategory(data: CategoryPayload): Promise<Category> {
    const res = await api.post("/categories", data);
    return res.data;
  },

  async updateCategory(slug: string, data: Partial<Category>): Promise<Category> {
    const res = await api.patch(`/categories/${slug}`, data);
    return res.data;
  },

  async deleteCategory(slug: string): Promise<void> {
    await api.delete(`/categories/${slug}`);
  },
};
