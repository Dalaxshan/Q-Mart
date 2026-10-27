import Link from 'next/link';
import React from 'react';

function BannerFive() {
  return (
    <div>
      <>
  {/* rts banner areaas tart */}
  <div className="rts-banner-area rts-section-gap pt_sm--20">
    <div className="w-full max-w-[1696px] m-auto px-[15px]">
      <div className="flex flex-wrap -mx-6 -mt-12 sm:-mx-3 sm:-mt-6">
        <div className="w-full max-w-full shrink-0 px-6 mt-12 sm:px-[0.75rem] sm:mt-6 lg:w-3/4">
          <div className="banner-left-five-area-start bg_image">
            <div className="inner-content-banner-five">
              <span>Get up to 30% off on your first LKR 5,000 purchase</span>
              <h1 className="title">
                Do not miss our amazing <br />
                grocery deals
              </h1>
              <p>
                We have prepared special discounts for you on grocery products.
                Don't miss these opportunities...
              </p>
              <Link
                href="/shop"
                className="rts-btn btn-primary radious-sm with-icon"
              >
                <div className="btn-text">Shop Now</div>
                <div className="arrow-icon">
                  <i className="fa-light fa-arrow-right" />
                </div>
                <div className="arrow-icon">
                  <i className="fa-light fa-arrow-right" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full max-w-full shrink-0 px-6 mt-12 sm:px-[0.75rem] sm:mt-6 lg:w-1/4">
          <div className="banner-five-right-content bg_image">
            <div className="content-area">
              <Link href="#" className="rts-btn btn-primary">
                Weekend Discount
              </Link>
              <h3 className="title">
                Strawberry Water Drinks
                <span>Flavors Awesome</span>
              </h3>
              <Link
                href="/shop"
                className="shop-now-goshop-btn"
              >
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
  {/* rts banner areaas end */}
</>

    </div>
  );
}

export default BannerFive;
