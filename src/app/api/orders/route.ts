import api from "@/app/lib/axios";
import { CreateOrderPayload, Order } from "@/type";

export const orderService = {
  async createOrder(data: CreateOrderPayload): Promise<Order> {
    const res = await api.post("/orders", data);
    return res.data;
  },

  async getMyOrders(): Promise<Order[]> {
    const res = await api.get("/orders/my");
    return res.data;
  },

  async getOneOrder(id: string): Promise<Order> {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },

  async getAllOrders(): Promise<Order[]> {
    const res = await api.get("/orders");
    return res.data;
  },

  async verifyPayment(
    id: string,
    paymentStatus: "pending" | "paid" | "failed",
  ): Promise<Order> {
    const res = await api.patch(`/orders/${id}/payment`, { paymentStatus });
    return res.data;
  },
};
