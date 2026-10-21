'use client';

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useCart } from "@/components/header/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  productImage: string;
  productTitle: string;
  productPrice: string;
  productSalePrice?: string;
  productShortDescription?: string;
  productId?: string;
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
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const { addToCart } = useCart();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const regularPrice = parseFloat(productPrice) || 0;
  const salePrice = productSalePrice ? parseFloat(productSalePrice) : NaN;
  const hasSalePrice = Number.isFinite(salePrice) && salePrice > 0 && salePrice < regularPrice;
  const currentPrice = hasSalePrice ? salePrice : regularPrice;
  const totalPrice = (currentPrice * quantity).toFixed(2);
  const displayRating = rating ?? 3.5;
  const displayReviewCount = reviewCount ?? 10;
  const displayStock = stock ?? 1;

  const addcart = () => toast.success('Successfully Added To Cart!');

  const handleAdd = () => {
    const item = {
      _id: productId ?? "",
      image: productImage,
      title: productTitle,
      price: currentPrice,
      quantity: quantity,
      sku: productSku,
      active: true,
    };

    addToCart(item);
    addcart();
  };

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-compare"
      >
        <div className="product-details-popup-wrapper popup">
          <div className="rts-product-details-section rts-product-details-section2 product-details-popup-section">
            <div className="product-details-popup">
              <button className="product-details-close-btn" onClick={handleClose}>
                <i className="fal fa-times" />
              </button>
              <div className="details-product-area">
                <div className="product-thumb-area">
                  <div className="cursor" />
                  <div className="thumb-wrapper one filterd-items figure">
                    {activeTab === 'tab1' && (
                      <div className="product-thumb zoom">
                        <img src={productImage} alt="product-thumb" />
                      </div>
                    )}
                    {activeTab === 'tab2' && (
                      <div className="product-thumb zoom">
                        <img src={productImage} alt="product-thumb" />
                      </div>
                    )}
                    {activeTab === 'tab3' && (
                      <div className="product-thumb zoom">
                        <img src={productImage} alt="product-thumb" />
                      </div>
                    )}
                  </div>
                  <div className="product-thumb-filter-group">
                    {['tab1', 'tab2', 'tab3'].map((tab) => (
                      <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`thumb-filter filter-btn ${activeTab === tab ? 'active' : ''}`}
                      >
                        <img src={productImage} alt={`thumb-${tab}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="contents">
                  <div className="product-status">
                    <span className="product-catagory">{categoryName ?? 'Category unavailable'}</span>
                    <div className="rating-stars-group">
                      {Array.from({ length: 5 }, (_, index) => (
                        <div className="rating-star" key={index}>
                          <i className={`fas ${index + 1 <= displayRating ? 'fa-star' : index < displayRating ? 'fa-star-half-alt' : 'fa-star'}`} />
                        </div>
                      ))}
                      <span>{displayRating.toFixed(1)} ({displayReviewCount} Reviews)</span>
                    </div>
                  </div>

                  <h2 className="product-title">
                    {productTitle} <span className="stock">{displayStock > 0 ? `In Stock (${displayStock})` : 'Out of Stock'}</span>
                  </h2>

                  <span className="product-price">
                    {hasSalePrice && <span className="old-price">LKR {regularPrice.toFixed(2)}</span>}
                    LKR {totalPrice}
                  </span>

                  <p>
                    {productShortDescription}
                  </p>

                  <div className="product-bottom-action">
                    <div className="cart-edit">
                      <div className="quantity-edit action-item">
                        <button className="button" onClick={decreaseQuantity}>
                          <i className="fal fa-minus minus" />
                        </button>
                        <input type="text" className="input" value={quantity} readOnly />
                        <button className="button plus" onClick={increaseQuantity}>
                          <i className="fal fa-plus plus" />
                        </button>
                      </div>
                    </div>

                    <Link
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
                    </Link>

                    <Link href="javascript:void(0);" className="rts-btn btn-primary ml--20">
                      <i className="fa-light fa-heart" />
                    </Link>
                  </div>

                  <div className="product-uniques">
                    <span className="sku product-unipue"><span>SKU: </span> {productSku ?? 'Unavailable'}</span>
                    <span className="catagorys product-unipue"><span>Categories: </span> {categoryName ?.toUpperCase() ?? 'Unavailable'}</span>
                    <span className="tags product-unipue"><span>Tags: </span> {tags?.length ? tags.toString().toUpperCase() : 'Unavailable'}</span>
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
