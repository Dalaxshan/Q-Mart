"use client";
import React, { useState, useEffect } from "react";
import { useWishlist } from "@/components/header/WishlistContext";
import { useCart } from "@/components/header/CartContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { formatPrice } from "@/app/lib/price-format";

const CartMain = () => {
  const { wishlistItems, removeFromWishlist, updateItemQuantity } =
    useWishlist();
  const [discount, setDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = wishlistItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setSubtotal(total);
  }, [wishlistItems]);

  const clearCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("wishlistItems");
      localStorage.removeItem("coupon");
      localStorage.removeItem("discount");
    }
    setDiscount(0);
    wishlistItems.forEach((item) => removeFromWishlist(item._id));
  };

  const finalTotal = subtotal - subtotal * discount;
  const freeShippingThreshold = 5000;
  const remaining = freeShippingThreshold - finalTotal;

  // add to cart to page
  const { addToCart } = useCart();
  const handleAdd = (item: any) => {
    addToCart({
      _id: item._id,
      image: item.image,
      title: item.name ?? "Default Product Title",
      price: parseFloat(item.price ?? "0"),
      quantity: 1,
      sku: item.sku,
      active: true,
    });
  };
  const addcart = () => toast("Successfully Add To Cart!");

  return (
    <div className="rts-cart-area rts-section-gap bg_light-1">
      <div className="container">
        <div className="row g-5">
          {/* Cart Items */}
          <div className="col-xl-12 col-12 order-2 order-xl-1">
            <div className="cart-area-main-wrapper">
              <div className="cart-top-area-note">
                <p>
                  Spend More <span>{formatPrice(remaining)}</span> to
                  Reach{" "}Free Shipping.
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

            <div className="rts-cart-list-area">
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
                <div className="subtotal">
                  <p>Add to Cart</p>
                </div>
              </div>

              {wishlistItems.map((item) => (
                <div
                  className="single-cart-area-list main item-parent"
                  key={item._id}
                >
                  <div className="product-main-cart">
                    <div
                      className="close section-activation"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      <i className="fa-regular fa-x" />
                    </div>
                    <div className="thumbnail">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="information">
                      <h6 className="title">{item.title}</h6>
                      <span>{item.sku}</span>
                    </div>
                  </div>
                  <div className="price">
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
                  <div className="button-area">
                    <a
                      href="#"
                      className="rts-btn btn-primary radious-sm with-icon"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAdd(item);
                        addcart();
                      }}
                    >
                      <div className="btn-text">Add to Cart</div>
                      <div className="arrow-icon">
                        <i className="fa-regular fa-cart-shopping" />
                      </div>
                      <div className="arrow-icon">
                        <i className="fa-regular fa-cart-shopping" />
                      </div>
                    </a>
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
        </div>
      </div>
    </div>
  );
};

export default CartMain;
