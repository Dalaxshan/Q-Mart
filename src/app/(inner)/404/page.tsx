import Link from "next/link";

import ShortService from "@/components/service/ShortService";

import FooterThree from "@/components/footer/FooterThree";

export default function Home() {
  return (
    <div className="demo-one">
      <div className="error-area-main-wrapper rts-section-gap2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="error-main-wrapper">
                <div className="thumbnail">
                  <img src="/assets/images/contact/01.png" alt="error" />
                </div>
                <div className="content-main">
                  <h2 className="title">This Page Can’t Be Found</h2>
                  <p>
                    Sorry, we couldn't find the page you where looking for. We
                    suggest that you return to homepage.
                  </p>
                  <Link href="/" className="rts-btn btn-primary">
                    Back To Homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShortService />
      <FooterThree />
    </div>
  );
}
