"use client";
import { useState } from "react";
import WeeklyBestSellingMain from "@/components/product-main/WeeklyBestSellingMain";
import Product from "@/data/Product.json";

interface PostType {
  category?: string;
  slug: string;
  image: string;
  title?: string;
  author?: string;
  publishedDate?: string;
  price?: string;
  ProductImage?: string;
}

const WeeklyBestSelling: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  // product content
  const selectedPosts = Product.slice(1, 11);

  const postIndicesSection1 = [1, 5, 6, 4, 7, 8, 9, 10, 11, 12, 13, 15];
  const postIndicesSection2 = [5, 6, 4, 7, 8, 5, 6, 5, 8, 9, 18, 12];
  const postIndicesSection3 = [5, 6, 8, 7, 3, 2, 1, 5, 8, 9, 13, 2];
  const postIndicesSection4 = [1, 2, 6, 7, 10, 2, 1, 5, 8, 11, 12, 16];

  // Helper function to get posts from indices
  const getPostsByIndices = (indices: number[]): PostType[] =>
    indices.map((index) => Product[index]).filter(Boolean);

  // Prepare post groups
  const postsSection1 = getPostsByIndices(postIndicesSection1);
  const postsSection2 = getPostsByIndices(postIndicesSection2);
  const postsSection3 = getPostsByIndices(postIndicesSection3);
  const postsSection4 = getPostsByIndices(postIndicesSection4);

  return (
    <div>
      <>
        <div className="popular-product-col-7-area rts-section-gapBottom w-full max-w-[1696px] m-auto px-[15px] pb-0!">
          <div className="w-full max-w-[1696px] m-auto px-[15px] cover-card-main-over-white mt--60">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                <div className="cover-card-main-over-1">
                  <div className="w-full max-w-[1696px] m-auto px-[15px]">
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                        <div className="title-area-between">
                          <h2 className="title-left">
                            Weekly Best Selling Groceries
                          </h2>
                          <ul
                            className="nav nav-tabs best-selling-grocery"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                onClick={() => setActiveTab("tab1")}
                                className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                              >
                                Frozen Foods
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                onClick={() => setActiveTab("tab2")}
                                className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                              >
                                Diet Foods
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                onClick={() => setActiveTab("tab3")}
                                className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
                              >
                                Healthy Foods
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                onClick={() => setActiveTab("tab4")}
                                className={`nav-link ${activeTab === "tab4" ? "active" : ""}`}
                              >
                                Vitamin Items
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 plr--30 plr_sm--5">
                      <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                        {activeTab === "tab1" && (
                          <div>
                            <div className="flex flex-wrap -mx-3 -mt-6">
                              {postsSection1.map(
                                (post: PostType, index: number) => (
                                  <div
                                    key={index}
                                    className="w-full max-w-full shrink-0 px-[0.75rem] mt-6 md:w-1/3 xl:w-1/4 2xl:w-1/6"
                                  >
                                    <div className="single-shopping-card-one">
                                      <WeeklyBestSellingMain
                                        Slug={post.slug}
                                        ProductImage={post.image}
                                        ProductTitle={post.title}
                                        Price={post.price}
                                      />
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                        {activeTab === "tab2" && (
                          <div>
                            <div className="flex flex-wrap -mx-3 -mt-6">
                              {postsSection2.map(
                                (post: PostType, index: number) => (
                                  <div
                                    key={index}
                                    className="w-full max-w-full shrink-0 px-[0.75rem] mt-6 md:w-1/3 xl:w-1/4 2xl:w-1/6"
                                  >
                                    <div className="single-shopping-card-one">
                                      <WeeklyBestSellingMain
                                        Slug={post.slug}
                                        ProductImage={post.image}
                                        ProductTitle={post.title}
                                        Price={post.price}
                                      />
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                        {activeTab === "tab3" && (
                          <div>
                            <div className="flex flex-wrap -mx-3 -mt-6">
                              {postsSection3.map(
                                (post: PostType, index: number) => (
                                  <div
                                    key={index}
                                    className="w-full max-w-full shrink-0 px-[0.75rem] mt-6 md:w-1/3 xl:w-1/4 2xl:w-1/6"
                                  >
                                    <div className="single-shopping-card-one">
                                      <WeeklyBestSellingMain
                                        Slug={post.slug}
                                        ProductImage={post.image}
                                        ProductTitle={post.title}
                                        Price={post.price}
                                      />
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                        {activeTab === "tab4" && (
                          <div>
                            <div className="flex flex-wrap -mx-3 -mt-6">
                              {postsSection4.map(
                                (post: PostType, index: number) => (
                                  <div
                                    key={index}
                                    className="w-full max-w-full shrink-0 px-[0.75rem] mt-6 md:w-1/3 xl:w-1/4 2xl:w-1/6"
                                  >
                                    <div className="single-shopping-card-one">
                                      <WeeklyBestSellingMain
                                        Slug={post.slug}
                                        ProductImage={post.image}
                                        ProductTitle={post.title}
                                        Price={post.price}
                                      />
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default WeeklyBestSelling;
