"use client"
import React from 'react'

function FeatureTwo() {
  return (
    <div>
      <div className="rts-section-gapBottom pt--20 feature-product-area">
        <div className="container-2">
          <div className="flex flex-wrap -mx-6 -mt-12">
            <div className="w-full max-w-full shrink-0 px-6 mt-12 lg:w-1/2">
              {/* single feature product area */}
              <div className="feature-product-area-single bg_image">
                <div className="inner-image">
                  <img src="assets/images/feature/01.png" alt="feature" />
                </div>
                <div className="inner-content">
                  <h2 className="title">
                    Get Everyday Fresh <br />
                    Organic <span> Vegetable</span>
                  </h2>
                  <div className="price-area">
                    <span>Only</span>
                    <h3 className="price">$15.00</h3>
                  </div>
                </div>
              </div>
              {/* single feature product area end */}
            </div>
            <div className="w-full max-w-full shrink-0 px-6 mt-12 lg:w-1/2">
              {/* single feature product area */}
              <div className="feature-product-area-single two bg_image">
                <div className="inner-image">
                  <img src="assets/images/feature/02.png" alt="feature" />
                </div>
                <div className="inner-content">
                  <h2 className="title">
                    Get Everyday Fresh <br />
                    Organic <span> Vegetable</span>
                  </h2>
                  <div className="price-area">
                    <span>Only</span>
                    <h3 className="price">$15.00</h3>
                  </div>
                </div>
              </div>
              {/* single feature product area end */}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default FeatureTwo