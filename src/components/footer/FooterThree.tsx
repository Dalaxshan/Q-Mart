import Image from "next/image";
import React from "react";

function FooterThree() {
  return (
    <div>
      <div className="rts-footer-area pt--80 bg_blue-footer">
        <div className="w-full max-w-[1696px] m-auto px-[15px]">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full shrink-0 px-[0.75rem]">
              <div className="footer-main-content-wrapper footer-three-main-content-wrapper pb--70">
                {/* single footer area wrapper */}
                <div className="single-footer-wized">
                  <h3 className="footer-title animated fadeIn">
                    About Company
                  </h3>
                  <div className="call-area">
                    <div className="icon">
                      <i className="fa-solid fa-phone-rotary" />
                    </div>
                    <div className="info">
                      <span>Have Question? Call Us 24/7</span>
                      <a href="#" className="number">
                        011 (250) 1109 <br /> 070 (150) 7075
                      </a>
                    </div>
                  </div>
                  <div className="opening-hour">
                    <div className="single">
                      <p>
                        Monday - Friday: <span>7:00am - 11:00pm</span>
                      </p>
                    </div>
                    <div className="single">
                      <p>
                        Saturday & Sunday: <span>7:00am - 11:00pm</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* single footer area wrapper */}
                <div className="single-footer-wized">
                  <h3 className="footer-title animated fadeIn">
                    Shop Categories
                  </h3>
                  <div className="footer-nav">
                    <ul>
                      <li>
                        <a href="shop?category=organic-products">
                          Organic Products
                        </a>
                      </li>
                      <li>
                        <a href="shop?category=fruits-vegetables">
                          Fruits &amp; Vegetables
                        </a>
                      </li>
                      <li>
                        <a href="shop?category=meat-seafood">
                          Meats &amp; Seafoods
                        </a>
                      </li>
                      <li>
                        <a href="shop?category=personal-care">
                          Medical &amp; Healthcare
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* single footer area wrapper */}
                <div className="single-footer-wized">
                  <h3 className="footer-title animated fadeIn">Our Stores</h3>
                  <div className="footer-nav">
                    <ul>
                      <li>
                        <a href="faq">FAQ</a>
                      </li>
                      <li>
                        <a href="contact">Contact Us</a>
                      </li>

                      <li>
                        <a href="careers">Careers</a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* single footer area wrapper */}
                <div className="single-footer-wized">
                  <h3 className="footer-title animated fadeIn">Useful Links</h3>
                  <div className="footer-nav">
                    <ul>
                      <li>
                        <a href="/privacy-policy">Privacy &amp; Policy</a>
                      </li>
                      <li>
                        <a href="/terms-condition">Terms &amp; Conditions</a>
                      </li>
                      <li>
                        <a href="#">Cancellation &amp; Returns</a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Location Iframe */}
                <div className="single-footer-wized">
                  <h3 className="footer-title animated fadeIn">Find Us</h3>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.819893819119!2d79.85794683064151!3d6.8947935229105415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b003c81c2eb%3A0x79578609d5d5f0f6!2sQmart!5e0!3m2!1sen!2slk!4v1792989826280!5m2!1sen!2slk"
                    title="QuickMart location"
                    width="100%"
                    height="170"
                    style={{ border: 0, borderRadius: "10px" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                {/* single footer area wrapper */}
              </div>
              <div className="social-and-payment-area-wrapper">
                <div className="social-one-wrapper">
                  <span>Follow Us:</span>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-youtube" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-whatsapp" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="payment-access">
                  <span className="payment-title">Payment Accepts:</span>
                  <Image
                    height={80}
                    width={200}
                    src="/assets/images/shop/03.png"
                    alt="payment"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterThree;
