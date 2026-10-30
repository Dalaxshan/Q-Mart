"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useCart } from "@/components/header/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatPrice } from "@/app/lib/price-format";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  productImage: string;
  productTitle: string;
  productPrice: string;
  productSalePrice?: string;
  productShortDescription?: string;
  productId?: string | number;
  productSku?: string;
  categoryName?: string;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
}

const ProductDetails: React.FC<ModalProps> = ({
  show,
  handleClose,
  productImage,
  productTitle,
  productPrice,
  productSalePrice,
  productShortDescription,
  productId,
  productSku,
  categoryName,
  stock,
  rating,
  reviewCount,
  tags,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const { addToCart } = useCart();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const regularPrice = parseFloat(productPrice) || 0;
  const salePrice = productSalePrice ? parseFloat(productSalePrice) : NaN;
  const hasSalePrice =
    Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice;
  const currentPrice = hasSalePrice ? salePrice : regularPrice;
  const totalPrice = currentPrice * quantity;
  const displayRating = rating ?? 3.5;
  const displayReviewCount = reviewCount ?? 10;
  const displayStock = stock ?? 1;

  const addcart = () => toast.success("Successfully Added To Cart!");

  const handleAdd = () => {
    if (productId === undefined || productId === null || String(productId).length === 0) {
      toast.error("This product cannot be added to cart.");
      return;
    }

    const item = {
      _id: String(productId),
      image: productImage,
      title: productTitle,
      price: currentPrice,
      quantity: quantity,
      sku: productSku,
      active: true,
    };

    addToCart(item);
    addcart();
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        maxWidthClassName="max-w-[1800px]"
      >
        <div className="product-details-popup-wrapper popup">
          <div className="rts-product-details-section rts-product-details-section2 product-details-popup-section">
            <div className="product-details-popup product-details-popup-modal">
              <button
                type="button"
                aria-label="Close product details"
                className="product-details-close-btn"
                onClick={handleClose}
              >
                <i className="fal fa-times" />
              </button>
              <div className="details-product-area">
                <div className="product-thumb-area">
                  <div className="cursor" />
                  <div className="thumb-wrapper one filterd-items figure">
                    {activeTab === "tab1" && (
                      <div className="product-thumb zoom">
                        <img src={productImage} alt="product-thumb" />
                      </div>
                    )}
                    {activeTab === "tab2" && (
                      <div className="product-thumb zoom">
                        <img src={productImage} alt="product-thumb" />
                      </div>
                    )}
                    {activeTab === "tab3" && (
                      <div className="product-thumb zoom">
                        <img src={productImage} alt="product-thumb" />
                      </div>
                    )}
                  </div>
                  <div className="product-thumb-filter-group">
                    {["tab1", "tab2", "tab3"].map((tab) => (
                      <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`thumb-filter filter-btn ${activeTab === tab ? "active" : ""}`}
                      >
                        <img src={productImage} alt={`thumb-${tab}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="product-contents">
                  <div className="product-status">
                    <span className="product-catagory">
                      {categoryName ?? "Category unavailable"}
                    </span>
                  </div>

                  <h2 className="product-title">
                    {productTitle}{" "}
                    <span className="stock">
                      {displayStock > 0
                        ? `In Stock (${displayStock})`
                        : "Out of Stock"}
                    </span>
                  </h2>

                  <span className="product-price">
                    {hasSalePrice && (
                      <span className="old-price">
                        {formatPrice(regularPrice)}
                      </span>
                    )}
                    {formatPrice(totalPrice)}
                  </span>

                  <p>{productShortDescription}</p>

                  <div className="product-bottom-action">
                    <div className="cart-edit">
                      <div className="quantity-edit action-item">
                        <button className="button" onClick={decreaseQuantity}>
                          <i className="fal fa-minus minus" />
                        </button>
                        <input
                          type="text"
                          className="input"
                          value={quantity}
                          readOnly
                        />
                        <button
                          className="button plus"
                          onClick={increaseQuantity}
                        >
                          <i className="fal fa-plus plus" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="rts-btn btn-primary radious-sm with-icon"
                      onClick={handleAdd}
                    >
                      <div className="btn-text">Add To Cart</div>
                      <div className="arrow-icon">
                        <i className="fa-regular fa-cart-shopping" />
                      </div>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductDetails;
