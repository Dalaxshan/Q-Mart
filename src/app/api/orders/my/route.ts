import { NextRequest } from "next/server";
import { connectDB } from "@/server/db";
import { Order } from "@/server/models/Order";
import { handleError, list } from "@/server/http";
import { requireAuth } from "@/server/auth";

// GET /api/orders/my – the logged-in customer's orders
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const user = await requireAuth(req);
    return list(await Order.find({ user: user.id }).sort({ createdAt: -1 }));
  } catch (err) {
    return handleError(err);
  }
}
