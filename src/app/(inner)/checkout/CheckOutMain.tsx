"use client";
import React, { useState } from "react";
import { useCart } from "@/components/header/CartContext";
import { orderApi } from "@/app/api/orders/route";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const DEFAULT_SHIPPING_COST = 350;

export default function CheckOutMain() {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();
  const [discount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacing, setIsPlacing] = useState(false);

  const [billingInfo, setBillingInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    orderNotes: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = subtotal * discount;
  const shippingCost = discount > 0 ? 0 : DEFAULT_SHIPPING_COST;
  const total = subtotal - discountAmount + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const requiredFields: (keyof typeof billingInfo)[] = [
      "email", "firstName", "lastName", "country", "street", "city", "state", "zip", "phone",
    ];
    for (const field of requiredFields) {
      if (!billingInfo[field].trim()) {
        toast.error(`Please fill in the ${field} field.`);
        return;
      }
    }

    setIsPlacing(true);
    try {
      await orderApi.createOrder({
        channel: "online",
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.title,
          image: item.image,
          unit: "1",
          sku: item.sku ?? "",
          price: item.price,
          quantity: item.quantity,
          lineTotal: item.price * item.quantity,
        })),
        subtotal,
        discount: discountAmount,
        deliveryFee: shippingCost,
        total,
        paymentMethod,
        paymentStatus: "pending",
        orderStatus: "pending",
        shippingAddress: {
          firstName: billingInfo.firstName,
          lastName: billingInfo.lastName,
          email: billingInfo.email,
          phone: billingInfo.phone,
          company: billingInfo.company,
          country: billingInfo.country,
          street: billingInfo.street,
          city: billingInfo.city,
          state: billingInfo.state,
          zip: billingInfo.zip,
          orderNotes: billingInfo.orderNotes,
        },
      });

      cartItems.forEach((item) => removeFromCart(item._id));
      toast.success("Order placed successfully!");
      router.push("/");
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="checkout-area rts-section-gap">
      <div className="container">
        <div className="row">
          {/* Left: Billing Details */}
          <div className="col-lg-8 pr--40 order-2 order-xl-1">
            <div className="rts-billing-details-area">
              <h3 className="title">Billing Details</h3>
              <form onSubmit={handlePlaceOrder}>
                {[
                  { id: "email", label: "Email Address*" },
                  { id: "firstName", label: "First Name*" },
                  { id: "lastName", label: "Last Name*" },
                  { id: "company", label: "Company Name (Optional)" },
                  { id: "country", label: "Country / Region*" },
                  { id: "street", label: "Street Address*" },
                  { id: "city", label: "Town / City*" },
                  { id: "state", label: "State*" },
                  { id: "zip", label: "Zip Code*" },
                  { id: "phone", label: "Phone*" },
                ].map(({ id, label }) => (
                  <div className="single-input" key={id}>
                    <label htmlFor={id}>{label}</label>
                    <input
                      id={id}
                      value={(billingInfo as Record<string, string>)[id]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
                <div className="single-input">
                  <label htmlFor="orderNotes">Order Notes (Optional)</label>
                  <textarea
                    id="orderNotes"
                    value={billingInfo.orderNotes}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Payment methods */}
                <div className="cottom-cart-right-area mt--30">
                  <ul>
                    {[
                      { id: "bank", value: "bank", label: "Direct Bank Transfer" },
                      { id: "check", value: "check", label: "Check Payments" },
                      { id: "cod", value: "cod", label: "Cash On Delivery" },
                      { id: "paypal", value: "paypal", label: "Paypal" },
                    ].map((opt) => (
                      <li key={opt.id}>
                        <input
                          type="radio"
                          id={opt.id}
                          name="payment"
                          value={opt.value}
                          checked={paymentMethod === opt.value}
                          onChange={() => setPaymentMethod(opt.value)}
                        />
                        <label htmlFor={opt.id}>{opt.label}</label>
                      </li>
                    ))}
                  </ul>
                  <div className="single-category mb--30">
                    <input id="terms" type="checkbox" required />
                    <label htmlFor="terms">
                      I have read and agree to terms and conditions *
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="rts-btn btn-primary"
                    disabled={isPlacing}
                  >
                    {isPlacing ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="col-lg-4 order-1 order-xl-2">
            <h3 className="title-checkout">Your Order</h3>
            <div className="right-card-sidebar-checkout">
              <div className="top-wrapper">
                <div className="product">Products</div>
                <div className="price">Price</div>
              </div>

              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div className="single-shop-list" key={item._id}>
                    <div className="left-area">
                      <img src={item.image} alt={item.title} />
                      <span className="title">
                        {item.title} × {item.quantity}
                      </span>
                    </div>
                    <span className="price">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))
              )}

              <div className="single-shop-list">
                <div className="left-area"><span>Subtotal</span></div>
                <span className="price">LKR {subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="single-shop-list">
                  <div className="left-area"><span>Discount</span></div>
                  <span className="price">LKR {discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="single-shop-list">
                <div className="left-area"><span>Shipping</span></div>
                <span className="price">LKR {shippingCost.toFixed(2)}</span>
              </div>

              <div className="single-shop-list">
                <div className="left-area">
                  <span style={{ fontWeight: 600, color: "#2C3C28" }}>Total Price:</span>
                </div>
                <span className="price" style={{ color: "#629D23" }}>
                  LKR {total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
