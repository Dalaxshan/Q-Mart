"use client";

import { useEffect, useState } from "react";
import ShortService from "@/components/service/ShortService";
import RelatedProduct from "@/components/product/RelatedProduct";
import FooterThree from "@/components/footer/FooterThree";
// import Product from "@/data/Product.json";
import { useParams } from "next/navigation";

import { useCart } from "@/components/header/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "@/type";
import { productApi } from "@/app/api/products/client";
import HeaderTwo from "@/components/header/HeaderTwo";
import { formatPrice } from "@/app/lib/price-format";

const getRelationName = (
  relation: string | { name: string } | undefined,
): string => (typeof relation === "string" ? relation : (relation?.name ?? ""));

const CompareElements: React.FC = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [activeImage, setActiveImage] = useState<string>("");

  const { addToCart } = useCart();

  //f
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetched = await productApi.getOneProduct(slug as string);
        setProduct(fetched);
        setActiveImage(fetched.images?.[0] ?? "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    void fetchProduct();
  }, [slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const categoryName = getRelationName(product.category);
  const brandName = getRelationName(product.brand);



  const handleAdd = () => {
    addToCart({
      _id: product._id,
      image: product.images?.[0] ?? "",
      title: product.name,
      price: parseFloat(product.price ?? "0"),
      quantity: 1,
      sku: product.sku,
      active: true,
    });
    setAdded(true);
    toast("Successfully Added To Cart!");
    setTimeout(() => setAdded(false), 5000);
  };

  return (
    <div>
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <a href="/">Home</a>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">
                  Product Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-seperator bg_light-1">
        <div className="container">
          <hr className="section-seperator" />
        </div>
      </div>
      <div className="rts-chop-details-area rts-section-gap bg_light-1">
        <div className="container">
          <div className="shopdetails-style-1-wrapper">
            <div className="row g-5">
              <div className="col-xl-8 col-lg-8 col-md-12">
                <div className="product-details-popup-wrapper in-shopdetails">
                  <div className="rts-product-details-section rts-product-details-section2 product-details-popup-section">
                    <div className="product-details-popup">
                      <div className="details-product-area">
                        <div className="product-thumb-area">
                          <div className="cursor" />
                          <div className="thumb-wrapper one filterd-items figure">
                            <div className="product-thumb">
                              <img src={activeImage} alt={product.name} />
                            </div>
                          </div>
                        </div>

                        <div className="contents">
                          <div className="product-status">
                            <span className="product-catagory">
                              {categoryName}
                            </span>
                            <div className="rating-stars-group">
                              <div className="rating-star">
                                <i className="fas fa-star" />
                              </div>
                              <div className="rating-star">
                                <i className="fas fa-star" />
                              </div>
                              <div className="rating-star">
                                <i className="fas fa-star-half-alt" />
                              </div>
                              <span>10 Reviews</span>
                            </div>
                          </div>
                          <h2 className="product-title">{product.name}</h2>
                          <p className="mt--20 mb--20">
                            {product.shortDescription}
                          </p>
                          <span
                            className="product-price mb--15 d-block"
                            style={{ color: "#DC2626", fontWeight: 600 }}
                          >
                            {formatPrice(product.salePrice ?? product.price)}
                            {product.salePrice && (
                              <span className="old-price ml--15">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </span>

                          <div className="product-bottom-action">
                            <a
                              href="#"
                              className="rts-btn btn-primary radious-sm with-icon"
                              onClick={(e) => {
                                e.preventDefault();
                                handleAdd();
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

                          <div className="product-uniques">
                            <span className="sku product-unipue mb--10">
                              <strong>SKU:</strong> {product.sku}
                            </span>
                            <span className="catagorys product-unipue mb--10">
                              <strong>Brand:</strong> {brandName}
                            </span>
                            <span className="tags product-unipue mb--10">
                              <strong>Tags:</strong> {product.tags.join(", ")}
                            </span>
                            <span className="tags product-unipue mb--10">
                              <strong>Unit:</strong> {product.unit}
                            </span>
                            <span className="tags product-unipue mb--10">
                              <strong>Stock:</strong> {product.stock}
                            </span>
                          </div>

                          {/* <div className="share-option-shop-details">
                            <div className="single-share-option">
                              <div className="icon">
                                <i className="fa-regular fa-heart" />
                              </div>
                              <span>Add To Wishlist</span>
                            </div>
                            <div className="single-share-option">
                              <div className="icon">
                                <i className="fa-solid fa-share" />
                              </div>
                              <span>Share On social</span>
                            </div>
                            <div className="single-share-option">
                              <div className="icon">
                                <i className="fa-light fa-code-compare" />
                              </div>
                              <span>Compare</span>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-discription-tab-shop mt--50">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab("tab1")}
                        className={`nav-link LKR {activeTab === "tab1" ? "active" : ""}`}
                      >
                        Product Details
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setActiveTab("tab3")}
                        className={`nav-link LKR {activeTab === "tab3" ? "active" : ""}`}
                      >
                        Customer Reviews ({product.reviewCount})
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    {activeTab === "tab1" && (
                      <div>
                        <div className="single-tab-content-shop-details">
                          <p className="disc">{product.description}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "tab3" && (
                      <div>
                        <div className="single-tab-content-shop-details">
                          <div className="product-details-review-product-style">
                            <div className="submit-review-area">
                              <form action="#" className="submit-review-area">
                                <h5 className="title">Submit Your Review</h5>
                                <div className="your-rating">
                                  <span>Your Rating Of This Product :</span>
                                  <div className="stars">
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                    <i className="fa-solid fa-star" />
                                  </div>
                                </div>
                                <div className="half-input-wrapper">
                                  <div className="half-input">
                                    <input
                                      type="text"
                                      placeholder="Your Name*"
                                    />
                                  </div>
                                  <div className="half-input">
                                    <input
                                      type="text"
                                      placeholder="Your Email *"
                                    />
                                  </div>
                                </div>
                                <textarea
                                  name="#"
                                  id="#"
                                  placeholder="Write Your Review"
                                  defaultValue={""}
                                />
                                <button className="rts-btn btn-primary">
                                  SUBMIT REVIEW
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-4 col-md-12 offset-xl-1  rts-sticky-column-item">
                <div className="theiaStickySidebar">
                  <div className="shop-sight-sticky-sidevbar mb--20">
                    <h6 className="title">Available offers</h6>
                    <div className="single-offer-area">
                      <div className="icon">
                        <img src="/assets/images/shop/01.svg" alt="icon" />
                      </div>
                      <div className="details">
                        <p>
                          Get 5% instant discount for the 1st Flipkart Order
                          using QuickMart UPI
                        </p>
                      </div>
                    </div>
                    <div className="single-offer-area">
                      <div className="icon">
                        <img src="/assets/images/shop/02.svg" alt="icon" />
                      </div>
                      <div className="details">
                        <p>
                          Flat LKR 250 off on Citi Credit Card EMI Transactions
                          over LKR 30
                        </p>
                      </div>
                    </div>
                    <div className="single-offer-area">
                      <div className="icon">
                        <img src="/assets/images/shop/03.svg" alt="icon" />
                      </div>
                      <div className="details">
                        <p>
                          Free Worldwide Shipping on all orders over LKR 100
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="our-payment-method">
                    <h5 className="title">Guaranteed Safe Checkout</h5>
                    <img src="/assets/images/shop/03.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedProduct categoryName={categoryName} />
      <ShortService />
         <FooterThree/>
      <ToastContainer />
    </div>
  );
};

export default CompareElements;
