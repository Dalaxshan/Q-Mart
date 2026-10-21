import api from "@/app/lib/axios";
import { Customer, CustomerPayload } from "@/type";

export interface LoginResponse {
  customer: Customer;
  token: string;
}

export const customerApi = {
  async register(data: CustomerPayload): Promise<Customer> {
    const res = await api.post("/customers/register", data);
    return res.data;
    },

    async login(data: { email: string; password: string }): Promise<LoginResponse> {
        const res = await api.post("/customers/login", data);
        return res.data;
    },

    async getProfile(): Promise<Customer> {
        const res = await api.get("/customers/profile");
        return res.data;
    },

    async updateProfile(id: string, data: Partial<CustomerPayload>): Promise<Customer> {
        const res = await api.patch(`/customers/${id}`, data);
        return res.data;
    },

    async logout(): Promise<void> {
        await api.post("/customers/logout");
    },
    

};
