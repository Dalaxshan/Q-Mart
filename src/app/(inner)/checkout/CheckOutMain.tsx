"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/components/header/CartContext";
import { orderApi } from "@/app/api/orders/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ShippingAddress } from "@/type";
import { formatPrice } from "@/app/lib/price-format";

const DEFAULT_SHIPPING_COST = 350;
const STORAGE_KEY = "customer";

const emptyBillingInfo: ShippingAddress = {
  email: "",
  fullName: "",
  country: "",
  street: "",
  city: "",
  state: "",
  postalcode: "",
  phoneNo: "",
};

export default function CheckOutMain() {
  const { cartItems, removeFromCart } = useCart();
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const router = useRouter();
  const [discount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPlacing, setIsPlacing] = useState(false);
  const [billingInfo, setBillingInfo] =
    useState<ShippingAddress>(emptyBillingInfo);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      const data = parsed.user || parsed;
      setUser(data);
      setBillingInfo({
        email: data.email || "",
        fullName: data.fullName || "",
        country: data.country || "",
        street: data.streetAddress || "",
        city: data.city || "",
        state: data.province || data.state || "",
        postalcode: data.postalcode || data.postalCode || "",
        phoneNo: data.phoneNo || "",
      });
    } catch (err) {
      console.error("Could not read user from localStorage", err);
    }
  }, []);

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
      "email",
      "fullName",
      "country",
      "street",
      "city",
      "state",
      "postalcode",
      "phoneNo",
    ];
    for (const field of requiredFields) {
      if (!(billingInfo[field] ?? "").trim()) {
        toast.error(`Please fill in the ${field} field.`);
        return;
      }
    }

    setIsPlacing(true);
    try {
      const order = await orderApi.createOrder({
        user: user?._id || null,
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
          fullName: billingInfo.fullName,
          email: billingInfo.email,
          phoneNo: billingInfo.phoneNo,
          country: billingInfo.country,
          street: billingInfo.street,
          city: billingInfo.city,
          state: billingInfo.state,
          postalcode: billingInfo.postalcode,
        },
      });

      try {
        sessionStorage.setItem("lastOrder", JSON.stringify(order));
      } catch (storageError) {
        console.error("Could not save order confirmation locally", storageError);
      }
      cartItems.forEach((item) => removeFromCart(item._id));
      toast.success("Order placed successfully!");
      router.push(`/order-confirmation?order=${encodeURIComponent(order._id)}`);
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="checkout-area rts-section-gap">
      <div className="w-full max-w-[1696px] m-auto px-[15px]">
        <div className="flex flex-wrap -mx-3">
          {/* Left: Billing Details */}
          <div className="w-full max-w-full shrink-0 px-[0.75rem] order-1! lg:w-2/3 xl:order-1! pr--40">
            <div className="rts-billing-details-area">
              <h3 className="title">Shipping Details</h3>
              <form onSubmit={handlePlaceOrder}>
                {[
                  { id: "email", label: "Email Address*" },
                  { id: "fullName", label: "Full Name*" },
                  { id: "country", label: "Country / Region*" },
                  { id: "street", label: "Street Address*" },
                  { id: "city", label: "Town / City*" },
                  { id: "state", label: "State*" },
                  { id: "postalcode", label: "Postal Code*" },
                  { id: "phoneNo", label: "Phone*" },
                ].map(({ id, label }) => (
                  <div className="single-input" key={id}>
                    <label htmlFor={id}>{label}</label>
                    <input
                      id={id}
                      value={billingInfo[id as keyof ShippingAddress]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full max-w-full shrink-0 px-[0.75rem] order-2! lg:w-1/3 xl:order-2!">
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
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))
              )}

              <div className="single-shop-list">
                <div className="left-area">
                  <span>Subtotal</span>
                </div>
                <span className="price">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="single-shop-list">
                  <div className="left-area">
                    <span>Discount (25%)</span>
                  </div>
                  <span className="price">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="single-shop-list">
                <div className="left-area">
                  <span>Shipping</span>
                </div>
                <span className="price">{formatPrice(shippingCost)}</span>
              </div>

              <div className="single-shop-list">
                <div className="left-area">
                  <span style={{ fontWeight: 600, color: "#2C3C28" }}>
                    Total Price:
                  </span>
                </div>
                <span className="price" style={{ color: "#629D23" }}>
                  {formatPrice(total)}
                </span>
              </div>

              {/* Payment methods */}
              <form onSubmit={handlePlaceOrder}>
              <div className="cottom-cart-right-area">
                <ul>
                  {[
                    { id: "bank", label: "Direct Bank Transfer" },
                  
                    { id: "cod", label: "Cash On Delivery" },
                   
                  ].map(({ id, label }) => (
                    <li key={id}>
                      <input
                        type="radio"
                        id={id}
                        name="payment"
                        value={id}
                        checked={paymentMethod === id}
                        onChange={() => setPaymentMethod(id)}
                      />
                      <label htmlFor={id}>{label}</label>
                    </li>
                  ))}
                </ul>
               
                <button type="submit" className="rts-btn btn-primary" disabled={isPlacing}>
                  {isPlacing ? "Placing Order..." : "Place Order"}
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
