"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/components/header/CartContext";
import { formatPrice } from "@/app/lib/price-format";
import Link from "next/link";

const CartMain = () => {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      const price = item.price;
      const quantity = item.quantity || 1;
      return acc + (isNaN(price) ? 0 : price * quantity);
    }, 0);
    setSubtotal(total);
  }, [cartItems]);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon === "12345") {
      setDiscount(0.25);
      setCouponMessage("Coupon applied -25% successfully");
      localStorage.setItem("coupon", coupon);
      localStorage.setItem("discount", "0.25");
    } else {
      setDiscount(0);
      setCouponMessage("Coupon code is incorrect");
      localStorage.removeItem("coupon");
      localStorage.removeItem("discount");
    }
  };

  const clearCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
      localStorage.removeItem("coupon");
      localStorage.removeItem("discount");
    }
    setCoupon("");
    setDiscount(0);
    setCouponMessage("");
    cartItems.forEach((item) => removeFromCart(item._id));
  };

  const finalTotal = subtotal - subtotal * discount;
  const freeShippingThreshold = 5000;
  const remaining = freeShippingThreshold - finalTotal;

  return (
    <div className="rts-cart-area rts-section-gap bg_light-1">
      <div className="w-full max-w-[1696px] m-auto px-[15px]">
        <div className="flex flex-wrap -mx-6 -mt-12">
          {/* Cart Items */}
          <div className="w-full max-w-full shrink-0 px-6 mt-12 order-1! xl:w-3/4 xl:order-1!">
            <div className="cart-area-main-wrapper">
              <div className="cart-top-area-note">
                <p>
                  {" "}
                  Spend Morew <span>{formatPrice(remaining)}</span> to Reach Free
                  Shipping.
                </p>

                <div className="bottom-content-deals mt--10">
                  <div className="single-progress-area-incard">
                    <div className="progress">
                      <div
                        className="progress-bar wow fadeInLeft"
                        role="progressbar"
                        style={{ width: "80%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* product list */}
            <div className="rts-cart-list-area cart-product-list">
              <div className="single-cart-area-list head">
                <div className="product-main">
                  <p>Products</p>
                </div>
                <div className="price">
                  <p>Price</p>
                </div>
                <div className="quantity">
                  <p>Quantity</p>
                </div>
                <div className="subtotal">
                  <p>SubTotal</p>
                </div>
              </div>

              {cartItems.map((item) => (
                <div
                  className="single-cart-area-list main item-parent"
                  key={item._id}
                >
                  <div className="product-main-cart">
                    <div
                      className="close section-activation"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <i className="fa-regular fa-x" />
                    </div>
                    <div className="thumbnail">
                      <img src={item.image} alt="shop" />
                    </div>
                    <div className="information">
                      <h6 className="title">{item.title}</h6>
                      <span>SKU:{item.sku}</span>
                    </div>
                  </div>
                  <div className="price">
                    {" "}
                    <p>{formatPrice(item.price)}</p>
                  </div>
                  <div className="quantity">
                    <div className="quantity-edit">
                      <input
                        type="text"
                        className="input"
                        value={item.quantity}
                        readOnly
                      />
                      <div className="button-wrapper-action">
                        <button
                          className="button minus"
                          onClick={() =>
                            item.quantity > 1 &&
                            updateItemQuantity(item._id, item.quantity - 1)
                          }
                        >
                          <i className="fa-regular fa-chevron-down" />
                        </button>
                        <button
                          className="button plus"
                          onClick={() =>
                            updateItemQuantity(item._id, item.quantity + 1)
                          }
                        >
                          <i className="fa-regular fa-chevron-up" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="subtotal">
                    <p>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}

              {/* Coupon + Clear */}
              <div className="bottom-cupon-code-cart-area">
              
                <button
                  onClick={clearCart}
                  className="rts-btn btn-primary mr--50"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Summary Area */}
          <div className="w-full max-w-full shrink-0 px-6 mt-12 order-2! xl:w-1/4 xl:order-2!">
            <div className="cart-total-area-start-right">
              <h5 className="title">Cart Totals</h5>
              <div className="subtotal">
                <span>Subtotal</span>
                <h6 className="price">{formatPrice(subtotal)}</h6>
              </div>
               <div className="subtotal">
                <span>Discount</span>
                <h6 className="price">{formatPrice(discount)}</h6>
              </div>
              {/* <div className="shipping">
                <span>Shipping</span>
                <ul>
                  <li>
                    <input type="radio" id="f-option" name="selector" />
                    <label htmlFor="f-option">Free Shipping</label>
                  </li>
                  <li>
                    <input type="radio" id="s-option" name="selector" />
                    <label htmlFor="s-option">Flat Rate</label>
                  </li>
                  <li>
                    <input type="radio" id="t-option" name="selector" />
                    <label htmlFor="t-option">Local Pickup</label>
                  </li>
                  <li>
                    <p>Shipping options will be updated during checkout</p>
                    <p className="bold">Calculate Shipping</p>
                  </li>
                </ul>
              </div> */}
              <div className="bottom">
                <div className="wrapper">
                  <span>Total</span>
                  <h6 className="price">{formatPrice(finalTotal)}</h6>
                </div>
                <div className="button-area">
                  <Link href="/checkout"  className="rts-btn btn-primary text-center w-full">
                    Proceed To Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMain;
