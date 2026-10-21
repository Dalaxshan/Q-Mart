"use client";
import React, { useState } from "react";
import { useCart } from "@/components/header/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BlogGridMainProps {
  ProductId: string;
  Slug: string;
  ProductImage: string;
  ProductTitle?: string;
  Price?: string;
  SalePrice?: string;
  Unit?: string;
  SKU?: string;
}

const ShopMainList: React.FC<BlogGridMainProps> = ({
  ProductId,
  Slug,
  ProductImage,
  ProductTitle,
  Price,
  SalePrice,
  Unit,
  SKU,
}) => {
  const productImageSrc = ProductImage?.startsWith("http")
    ? ProductImage
    : `/assets/images/grocery/${ProductImage}`;

  // 🔥 FIXED QUANTITY (React State Only)
  const [qty, setQty] = useState(1);
  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  // cart item
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      _id: ProductId,
      image: productImageSrc,
      title: ProductTitle ?? "Default Product Title",
      price: parseFloat(Price ?? "0"),
      quantity: qty, // 👈 FIXED
      sku: SKU,
      active: true,
    });
    toast("Successfully Add To Cart !");
  };

  return (
    <>
      <div className="single-shopping-card-one discount-offer">
        <a href={`/shop/${Slug}`} className="thumbnail-preview">
          <div className="badge">
            <span>
              25% <br /> Off
            </span>
            <i className="fa-solid fa-bookmark" />
          </div>
          <img src={productImageSrc} alt="grocery" />
        </a>

        <div className="body-content">
          <div className="title-area-left">
            <a href={`/shop/${Slug}`}>
              <h4 className="title">
                {ProductTitle ?? "How to growing your business"}
              </h4>
            </a>

            <span className="availability">{Unit ?? "1kg"}</span>

            <div className="price-area">
              <span className="current">LKR {SalePrice || Price}</span>
              {SalePrice && <div className="previous">LKR {Price}</div>}
            </div>

            <div className="cart-counter-action">
              <div className="quantity-edit">
                <input type="text" className="input" value={qty} readOnly />

                <div className="button-wrapper-action">
                  <button className="button minus" onClick={decreaseQty}>
                    <i className="fa-regular fa-chevron-down" />
                  </button>

                  <button className="button plus" onClick={increaseQty}>
                    +<i className="fa-regular fa-chevron-up" />
                  </button>
                </div>
              </div>

              <a
                href="#"
                className="rts-btn btn-primary radious-sm with-icon"
                onClick={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
              >
                <div className="btn-text">Add To Cart</div>

                <div className="arrow-icon">
                  <i className="fa-regular fa-cart-shopping" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopMainList;
