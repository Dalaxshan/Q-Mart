"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import WeeklyBestSellingMain from "@/components/product-main/WeeklyBestSellingMain";
import { Product } from "@/type";
import { productApi } from "@/app/api/products/route";

function FeatureProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productApi.getAllProducts({
          featured: true,
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    void fetchProducts();
  }, []);
  // number count up and down
  useEffect(() => {
    const handleQuantityClick = (e: Event) => {
      const button = e.currentTarget as HTMLElement;
      const parent = button.closest(".quantity-edit") as HTMLElement | null;
      if (!parent) return;

      const input = parent.querySelector(".input") as HTMLInputElement | null;
      const addToCart = parent.querySelector(
        "a.add-to-cart",
      ) as HTMLElement | null;
      if (!input) return;

      let oldValue = parseInt(input.value || "1", 10);
      let newVal = oldValue;

      if (button.classList.contains("plus")) {
        newVal = oldValue + 1;
      } else if (button.classList.contains("minus")) {
        newVal = oldValue > 1 ? oldValue - 1 : 1;
      }

      input.value = newVal.toString();
      if (addToCart) {
        addToCart.setAttribute("data-quantity", newVal.toString());
      }
    };

    const buttons = document.querySelectorAll(".quantity-edit .button");

    // 💡 Remove any existing handlers first (safe rebind)
    buttons.forEach((button) => {
      button.removeEventListener("click", handleQuantityClick);
      button.addEventListener("click", handleQuantityClick);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleQuantityClick);
      });
    };
  }, []);

  // modal activation
  type ModalType = "one" | "two" | "three" | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleClose = () => setActiveModal(null);

  return (
    <div>
      <>
        {/* rts grocery feature area start */}
        <div className="rts-grocery-feature-area rts-section-gapBottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-area-between">
                  <h2 className="title-left">Featured Grocery</h2>
                  <div className="next-prev-swiper-wrapper">
                    <div className="swiper-button-prev feature-product-prev">
                      <i className="fa-regular fa-chevron-left" />
                    </div>
                    <div className="swiper-button-next feature-product-next">
                      <i className="fa-regular fa-chevron-right" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="category-area-main-wrapper-one">
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    scrollbar={{
                      hide: true,
                    }}
                    autoplay={{
                      delay: 3000, 
                      disableOnInteraction: false, // Continue autoplay after user interactions
                    }}
                    loop={true}
                    navigation={{
                      nextEl: ".feature-product-next",
                      prevEl: ".feature-product-prev",
                    }}
                    className="mySwiper-category-1"
                    breakpoints={{
                      0: { slidesPerView: 1, spaceBetween: 30 },
                      320: { slidesPerView: 2, spaceBetween: 30 },
                      480: { slidesPerView: 3, spaceBetween: 30 },
                      640: { slidesPerView: 3, spaceBetween: 30 },
                      840: { slidesPerView: 4, spaceBetween: 30 },
                      1140: { slidesPerView: 6, spaceBetween: 30 },
                    }}
                  >
                    {products.map((post: Product) => (
                      <SwiperSlide key={post._id}>
                        <div>
                          <div className="single-shopping-card-one">
                            <WeeklyBestSellingMain
                              Slug={post.slug}
                              ProductImage={post.images[0]}
                              ProductTitle={post.name}
                              Price={post.price}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rts grocery feature area end */}
      </>
    </div>
  );
}

export default FeatureProduct;
