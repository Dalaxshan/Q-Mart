import api from "@/app/lib/axios";
import { CreateOrderPayload, Order, OrderItem, OrderQuery } from "@/type";

export const orderApi = {
  async createOrder(data: CreateOrderPayload): Promise<Order> {
    const res = await api.post("/orders", data);
    return res.data;
  },

  async getMyOrders(): Promise<Order[]> {
    const res = await api.get("/orders/my");
    return res.data.data;
  },

  async getOneOrder(id: string): Promise<Order> {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },

  async getAllOrders(Query:OrderQuery): Promise<Order[]> {
    const res = await api.get("/orders", { params: Query });
    return res.data.data;
  },
};
