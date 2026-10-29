"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import DiscountProductMain from "@/components/product-main/DiscountProductMain";
import { Product } from "@/type";
import { productApi } from "@/app/api/products/client";

function DiscountProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productApi.getAllProducts({
          featured: true,
          limit: 12,
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    void fetchProducts();
  }, []);

  const productGroups = products.reduce<Product[][]>(
    (groups, product, index) => {
      const groupIndex = Math.floor(index / 4);
      if (!groups[groupIndex]) {
        groups[groupIndex] = [];
      }
      groups[groupIndex].push(product);
      return groups;
    },
    [],
  );

  return (
    <div>
      {/* rts grocery feature area start */}
      <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="w-full max-w-[1696px] m-auto px-[15px]">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full shrink-0 px-[0.75rem]">
              <div className="title-area-between">
                <h2 className="title-left">Products With Discounts</h2>
                
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full shrink-0 px-[0.75rem]">
              <div className="product-with-discount">
                <div className="flex flex-wrap -mx-6 -mt-12">
                  <div className="w-full max-w-full shrink-0 px-6 mt-12 xl:w-1/3">
                    <a
                      href="shop"
                      className="single-discount-with-bg"
                    >
                      <div className="inner-content">
                        <h4 className="title">
                          Alpro Organic Flavored <br />
                          Fresh Juice
                        </h4>
                        <div className="price-area">
                          <span>Only</span>
                          <h4 className="title">LKR 2,500.00</h4>
                        </div>
                      </div>
                    </a>
                    <a
                      href="shop"
                      className="single-discount-with-bg bg-2"
                    >
                      <div className="inner-content">
                        <h4 className="title">
                          Alpro Organic Flavored <br />
                          Fresh Juice
                        </h4>
                        <div className="price-area">
                          <span>Only</span>
                          <h4 className="title">LKR 1,500.00</h4>
                        </div>
                      </div>
                    </a>
                  </div>
                  
                  <div className="w-full max-w-full shrink-0 px-6 mt-12 xl:w-2/3">
                    <div className="discount-product-slider">
                      <Swiper
                        modules={[Navigation]}
                        navigation={{
                          nextEl: ".discount-product-next",
                          prevEl: ".discount-product-prev",
                        }}
                        slidesPerView={1}
                        slidesPerGroup={1}
                        spaceBetween={24}
                      >
                        {productGroups.map((group, groupIndex) => (
                          <SwiperSlide key={`discount-group-${groupIndex}`}>
                            <div className="discount-product-grid">
                              {group.map((post) => (
                                <div
                                  className="single-shopping-card-one discount-offer"
                                  key={post._id}
                                >
                                  <DiscountProductMain
                                    Slug={post.slug}
                                    ProductImage={post.images[0]}
                                    ProductTitle={post.name}
                                    Price={post.price}
                                    SalePrice={post.salePrice}
                                    Unit={post.unit}
                                  />
                                </div>
                              ))}
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="discount-product-slider-controls">
                        <button
                          type="button"
                          className="swiper-button-prev discount-product-prev"
                          aria-label="Previous discounted products"
                        >
                          <i className="fa-regular fa-chevron-left" />
                        </button>
                        <button
                          type="button"
                          className="swiper-button-next discount-product-next"
                          aria-label="Next discounted products"
                        >
                          <i className="fa-regular fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts grocery feature area end */}
    </div>
  );
}

export default DiscountProduct;
