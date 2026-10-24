"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderTwo from "@/components/header/HeaderTwo";
import FooterThree from "@/components/footer/FooterThree";
import ShortService from "@/components/service/ShortService";
import { orderApi } from "@/app/api/orders/client";
import { Order } from "@/type";
import { formatPrice } from "@/app/lib/price-format";

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Just now";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const orderId = new URLSearchParams(window.location.search).get("order");
    let savedOrder: Order | null = null;

    try {
      const stored = sessionStorage.getItem("lastOrder");
      if (stored) {
        savedOrder = JSON.parse(stored) as Order;
      }
    } catch (error) {
      console.error("Could not read saved order confirmation", error);
    }

    if (savedOrder && (!orderId || savedOrder._id === orderId)) {
      setOrder(savedOrder);
      setIsLoading(false);
      return;
    }

    if (!orderId) {
      setIsLoading(false);
      return;
    }

    orderApi
      .getOneOrder(orderId)
      .then(setOrder)
      .catch((error) => {
        console.error("Could not load order confirmation", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="demo-one">
      <HeaderTwo />
      <main className="order-confirmation-area rts-section-gap">
        <div className="container">
          {isLoading ? (
            <div className="order-confirmation-empty">
              <h2>Loading your order...</h2>
            </div>
          ) : !order ? (
            <div className="order-confirmation-empty">
              <h2>Order details are unavailable</h2>
              <p>We could not find the order confirmation for this session.</p>
              <Link href="/shop" className="rts-btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <section className="order-confirmation-hero">
                <div className="order-confirmation-check" aria-hidden="true">
                  ✓
                </div>
                <h1>Thank you! Your order has been placed.</h1>
                <p>
                  We have received your order and will notify you when it is
                  on its way.
                </p>
                <div className="order-confirmation-meta">
                  <span>
                    Order number <strong>{order.orderNumber}</strong>
                  </span>
                  <span>
                    Placed on <strong>{formatDate(order.createdAt)}</strong>
                  </span>
                </div>
              </section>

              <div className="row g-5">
                <div className="col-lg-8">
                  <section className="order-confirmation-card">
                    <h3>Order details</h3>
                    <div className="order-confirmation-items">
                      {order.items.map((item) => (
                        <div className="order-confirmation-item" key={`${item.product}-${item.sku}`}>
                          <img src={item.image} alt={item.name} />
                          <div className="order-confirmation-item-info">
                            <strong>{item.name}</strong>
                            <span>
                              {item.sku ? `SKU: ${item.sku} · ` : ""}
                              Unit: {item.unit} · Qty: {item.quantity}
                            </span>
                          </div>
                          <strong>{formatPrice(item.price * item.quantity)}</strong>
                        </div>
                      ))}
                    </div>
                  </section>

                  {order.shippingAddress && (
                    <section className="order-confirmation-card">
                      <h3>Delivery details</h3>
                      <p className="order-confirmation-address">
                        <strong>{order.shippingAddress.fullName}</strong>
                        <br />
                        {order.shippingAddress.street},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.postalCode ||
                          order.shippingAddress.postalcode}
                        <br />
                        {order.shippingAddress.country}
                        <br />
                        {order.shippingAddress.email} ·{" "}
                        {order.shippingAddress.phoneNo}
                      </p>
                    </section>
                  )}
                </div>

                <div className="col-lg-4">
                  <section className="order-confirmation-card order-confirmation-summary">
                    <h3>Payment summary</h3>
                    <div><span>Subtotal</span><strong>{formatMoney(order.subtotal)}</strong></div>
                    <div><span>Discount</span><strong>- {formatMoney(order.discount)}</strong></div>
                    <div><span>Delivery</span><strong>{formatMoney(order.deliveryFee)}</strong></div>
                    <div className="order-confirmation-total">
                      <span>Total</span><strong>{formatMoney(order.total)}</strong>
                    </div>
                    <p>
                      Payment method:{" "}
                      <strong>
                        {order.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : order.paymentMethod}
                      </strong>
                    </p>
                    <p>
                      Payment status: <strong>{order.paymentStatus}</strong>
                    </p>
                  </section>
                </div>
              </div>

              <div className="order-confirmation-actions">
                <Link href="/shop" className="rts-btn btn-primary">
                  Continue Shopping
                </Link>
                <Link href="/account" className="rts-btn btn-primary">
                  View My Orders
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
      <ShortService />
         <FooterThree/>
    </div>
  );
}
