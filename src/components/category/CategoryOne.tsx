"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import { categoryApi } from "@/app/api/categories/client";
import { Category } from "@/type";

const FALLBACK_IMAGE = "/assets/images/category/01.png";
const MIN_SLIDES_FOR_LOOP = 9; // loop needs more slides than the widest slidesPerView (8)

// Read a field from the API object, trying a few common key names.
// Adjust these keys if your Category type uses different ones.
function pick<T = unknown>(cat: Category, keys: string[]): T | undefined {
  const record = cat as unknown as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") return value as T;
  }
  return undefined;
}

function CategoryOne() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // works whether getAllCategory() returns an array or a Promise of one
        const result = await Promise.resolve(categoryApi.getAllCategory());
        if (!cancelled) setCategories(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Could not load categories", error);
        if (!cancelled) setCategories([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // nothing to show: render nothing instead of an empty section
  if (!loading && categories.length === 0) return null;

  return (
    <div>
      {/* rts category area start */}
      <div className="rts-caregory-area-two rts-section-gap">
        <div className="container-2">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full shrink-0 px-[0.75rem]">
              {/* Section heading */}
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  
                  <h2 className="m-0 mt-1 text-2xl font-bold leading-tight text-[#1f1f25] md:text-3xl">
                    Shop by Category
                  </h2>
                  <div className="mt-2 h-1 w-12 rounded-full bg-[#629d23]" />
                </div>
               
              </div>

              <div className="category-area-main-wrapper-two">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={1}
                  slidesPerView={8}
                  loop={categories.length >= MIN_SLIDES_FOR_LOOP}
                  speed={2000}
                  autoplay={{ delay: 4000 }}
                  className="mySwiper-category-1 swiper-data"
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 0 },
                    320: { slidesPerView: 2, spaceBetween: 0 },
                    480: { slidesPerView: 3, spaceBetween: 0 },
                    640: { slidesPerView: 6, spaceBetween: 0 },
                    840: { slidesPerView: 7, spaceBetween: 0 },
                    1140: { slidesPerView: 8, spaceBetween: 0 },
                  }}
                >
                  {categories.map((category, index) => {
                    const id = pick<string | number>(category, ["id", "_id", "categoryId"]);
                    const slug = pick<string>(category, ["slug"]);
                    const name =
                      pick<string>(category, ["name", "categoryName", "title"]) ?? "Category";
                    const image =
                      pick<string>(category, ["image", "imageUrl", "img", "thumbnail", "icon"]) ??
                      FALLBACK_IMAGE;
                    const count = pick<number>(category, [
                      "productCount",
                      "productsCount",
                      "itemCount",
                      "totalProducts",
                      "count",
                    ]);
                    const key = String(id ?? slug ?? `${name}-${index}`);
                    const target = slug ?? id;

                    return (
                      <SwiperSlide key={key}>
                        <div className="single-category-one">
                          <Link
                            href={
                              target !== undefined
                                ? `/shop?category=${encodeURIComponent(String(target))}`
                                : "/shop"
                            }
                          >
                            <img src={image} alt={name} />
                            <p>{name}</p>
                            {typeof count === "number" && (
                              <span>
                                {count} {count === 1 ? "Item" : "Items"}
                              </span>
                            )}
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts category area end */}
    </div>
  );
}

export default CategoryOne;