import React from 'react'

function OfferAdd() {
    return (
        <>
            {/* rts offer area start */}
            <div className="rts--offer-area-start rts-section-gapBottom">
                <div className="container-2">
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                            <div className="offer-area-main-wrapper">
                                <span>Weekend Discount</span>
                                <h3 className="title">
                                    Healthy vegetable that you deserve to eat fresh
                                </h3>
                                <p className="disc">
                                    We have prepared special discounts for you on grocery products.{" "}
                                    <br /> Don't miss these opportunities...
                                </p>
                                <div className="offer-iamge">
                                    <img src="assets/images/offer/01.png" alt="offer-area" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* rts offer area end */}
        </>

    )
}

export default OfferAdd