"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import WeeklyBestSellingMain from "@/components/product-main/WeeklyBestSellingMain";
import { productApi } from "@/app/api/products/route";
import { Product } from "@/type";

interface RelatedProductProps {
  categoryName: string;
}

function RelatedProduct({ categoryName }: RelatedProductProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched = await productApi.getAllProducts({ category: categoryName, limit: 10 });
        setProducts(fetched);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    void fetchProducts();
  }, [categoryName]);

  return (
    <div className="rts-grocery-feature-area rts-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-between">
              <h2 className="title-left">Related Product</h2>
              <div className="next-prev-swiper-wrapper">
                <div className="swiper-button-prev related-product-prev">
                  <i className="fa-regular fa-chevron-left" />
                </div>
                <div className="swiper-button-next related-product-next">
                  <i className="fa-regular fa-chevron-right" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="category-area-main-wrapper-one">
              <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={products.length >= 6}
                navigation={{
                  nextEl: ".related-product-next",
                  prevEl: ".related-product-prev",
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
                {products.map((product: Product) => (
                  <SwiperSlide key={product._id}>
                    <div className="single-shopping-card-one">
                      <WeeklyBestSellingMain
                        ProductId={product._id}
                        Slug={product.slug}
                        ProductImage={product.images[0]}
                        ProductTitle={product.name}
                        Price={product.price}
                        SalePrice={product.salePrice}
                        Unit={product.unit}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RelatedProduct;
