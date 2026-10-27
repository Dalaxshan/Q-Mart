import ShortService from "@/components/service/ShortService";
import FooterThree from "@/components/footer/FooterThree";
import HeaderTwo from "@/components/header/HeaderTwo";

export default function Home() {
  return (
    <div className="demo-one">
      <HeaderTwo />

      <>
        {/* rts contact main wrapper */}
        <div className="rts-contact-main-wrapper-banner bg_image">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem] co-lg-12">
                <div className="contact-banner-content">
                  <h1 className="title">Ask Us Question</h1>
                  <p className="disc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque pretium mollis ex, vel interdum augue faucibus sit
                    amet. Proin tempor purus ac suscipit...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rts contact main wrapper end */}

        <div className="rts-map-contact-area rts-section-gap2">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem] lg:w-1/3">
                <div className="contact-left-area-main-wrapper">
                  <h2 className="title">You can ask us questions !</h2>
                  <p className="disc">
                    Contact us for all your questions and opinions, or you can
                    solve your problems in a shorter time with our contact
                    offices.
                  </p>
                  <div className="location-single-card">
                    <div className="icon">
                      <i className="fa-light fa-location-dot" />
                    </div>
                    <div className="information">
                      <h3 className="title">QuickMart Store</h3>
                      <p>No 48, Havelock Rd, Colombo 05</p>
                      <a href="#" className="number">
                          +94 (11) 250 1109 / +94 (70) 150 7075
                      </a>
                      <a href="#" className="email">
                        info@quickmart.com
                      </a>
                    </div>
                  </div>
                  <div className="location-single-card">
                    <div className="icon">
                      <i className="fa-light fa-location-dot" />
                    </div>
                    <div className="information">
                      <h3 className="title">Q-Cafe Restaurant</h3>
                      <p>No 48, Havelock Rd, Colombo 05</p>
                      <a href="#" className="number">
                        +94 (11) 250 1109 / +94 (70) 150 7075
                      </a>
                      <a href="#" className="email">
                        info@quickmart.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full shrink-0 px-[0.75rem] lg:w-2/3 pl--50 pl_sm--5 pl_md--5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9600807539487!2d79.8580971735071!3d6.895378418733227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b003c81c2eb%3A0x79578609d5d5f0f6!2sQmart!5e0!3m2!1sen!2slk!4v1792477366413!5m2!1sen!2slk"
                  width={600}
                  height={540}
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
        {/* rts contact-form area start */}
        <div className="rts-contact-form-area rts-section-gapBottom">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                <div className="bg_light-1 contact-form-wrapper-bg">
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full shrink-0 px-[0.75rem] lg:w-7/12 pr--30 pr_md--10 pr_sm--5">
                      <div className="contact-form-wrapper-1">
                        <h3 className="title mb--50">
                          Fill Up The Form If You Have Any Question
                        </h3>
                        <form action="#" className="contact-form-1">
                          <div className="contact-form-wrapper--half-area">
                            <div className="single">
                              <input type="text" placeholder="name*" />
                            </div>
                            <div className="single">
                              <input type="text" placeholder="Email*" />
                            </div>
                          </div>
                          <div className="single-select">
                            <select>
                              <option data-display="Subject*">
                                All Categories
                              </option>
                              <option value={1}>Some option</option>
                              <option value={2}>Another option</option>
                              <option value={3}>Potato</option>
                            </select>
                          </div>
                          <textarea
                            name="message"
                            placeholder="Write Message Here"
                            defaultValue={""}
                          />
                          <button className="rts-btn btn-primary mt--20">
                            Send Message
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="w-full max-w-full shrink-0 px-[0.75rem] lg:w-5/12 mt_md--30 mt_sm--30">
                      <div className="thumbnail-area">
                        <img
                          src="assets/images/contact/02.jpg"
                          alt="contact_form"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rts contact-form area end */}
      </>

      <ShortService />
         <FooterThree/>
    </div>
  );
}
