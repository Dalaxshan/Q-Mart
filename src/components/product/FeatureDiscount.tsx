"use client";
import Link from "next/link";
import React from "react";

function FeatureDiscount() {
  return (
    <div>
      <>
        {/* rts category feature area start */}
        <div className="category-feature-area rts-section-gapTop">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3 -mt-6">
              <div className="w-full max-w-full shrink-0 px-[0.75rem] mt-6 md:w-1/2 lg:w-1/4">
                <div className="single-feature-card bg_image one">
                  <div className="content-area">
                    <Link href="/shop" className="rts-btn btn-primary">
                      Weekend Discount
                    </Link>
                    <h3 className="title">
                      Drink Fresh Corn Juice <br />
                      <span>Good Taste</span>
                    </h3>
                    <Link href="/shop" className="shop-now-goshop-btn">
                      <span className="text">Shop Now</span>
                      <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                      <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full shrink-0 px-[0.75rem] mt-6 md:w-1/2 lg:w-1/4">
                <div className="single-feature-card bg_image two">
                  <div className="content-area">
                    <Link href="/shop" className="rts-btn btn-primary">
                      Weekend Discount
                    </Link>
                    <h3 className="title">
                      Organic Lemon Flavored
                      <span>Banana Chips</span>
                    </h3>
                    <Link href="/shop" className="shop-now-goshop-btn">
                      <span className="text">Shop Now</span>
                      <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                      <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full shrink-0 px-[0.75rem] mt-6 md:w-1/2 lg:w-1/4">
                <div className="single-feature-card bg_image three">
                  <div className="content-area">
                    <a href="/shop" className="rts-btn btn-primary">
                      Weekend Discount
                    </a>
                    <h3 className="title">
                      Nozes Pecanera Brasil
                      <span>Chocolate Snacks</span>
                    </h3>
                    <Link href="/shop" className="shop-now-goshop-btn">
                      <span className="text">Shop Now</span>
                      <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                      <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full shrink-0 px-[0.75rem] mt-6 md:w-1/2 lg:w-1/4">
                <div className="single-feature-card bg_image four">
                  <div className="content-area">
                    <a href="/shop" className="rts-btn btn-primary">
                      Weekend Discount
                    </a>
                    <h3 className="title">
                      Strawberry Water Drinks
                      <span>Flavors Awesome</span>
                    </h3>
                    <Link href="/shop" className="shop-now-goshop-btn">
                      <span className="text">Shop Now</span>
                      <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                      <div className="plus-icon">
                        <i className="fa-sharp fa-regular fa-plus" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rts category feature area end */}
      </>
    </div>
  );
}

export default FeatureDiscount;
