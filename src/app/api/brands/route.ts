import api from "@/app/lib/axios";
import { Brand, BrandPayload } from "@/type";

export const brandApi = {
  async getAllBrands(): Promise<Brand[]> {
    const res = await api.get("/brands");
    return res.data.data;
  },

  async getOneBrand(slug: string): Promise<Brand> {
    const res = await api.get(`/brands/${slug}`);
    return res.data;
  },

  async createBrand(data: BrandPayload): Promise<Brand> {
    const res = await api.post("/brands", data);
    return res.data;
  },

  async updateBrand(
    slug: string,
    data: Partial<BrandPayload>,
  ): Promise<Brand> {
    const res = await api.patch(`/brands/${slug}`, data);
    return res.data;
  },

  async deleteBrand(slug: string): Promise<void> {
    await api.delete(`/brands/${slug}`);
  },
};