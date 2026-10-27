"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { categoryApi } from "@/app/api/categories/client";
import { Category } from "@/type";


function CategoryBannerBottom() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await categoryApi.getAllCategory();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    void fetchCategories();
  }, []);

  if (!categories.length) return null;
  return (
    <div className="rts-caregory-area-one">
      <div className="w-full max-w-[1696px] m-auto px-[15px]">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full shrink-0 px-[0.75rem]">
            <div className="category-area-main-wrapper-one">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={12}
                slidesPerView={10}
                loop={true}
                speed={1000}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  0: { slidesPerView: 2, spaceBetween: 12 },
                  320: { slidesPerView: 2, spaceBetween: 12 },
                  480: { slidesPerView: 3, spaceBetween: 12 },
                  640: { slidesPerView: 4, spaceBetween: 12 },
                  840: { slidesPerView: 4, spaceBetween: 12 },
                  1140: { slidesPerView: 10, spaceBetween: 12 },
                }}
              >
                {categories?.map((cat, idx) => (
                  <SwiperSlide key={idx}>
                    <Link href={`shop/?category=${cat.slug}`} className="single-category-one">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={60}
                        height={60}
                        style={{ objectFit: "contain" }}
                      />
                      <p>{cat.name}</p>
                    </Link>
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

export default CategoryBannerBottom;
