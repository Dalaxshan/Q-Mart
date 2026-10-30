
import ShortService from "@/components/service/ShortService";
import FooterThree from "@/components/footer/FooterThree";
import HeaderTwo from "@/components/header/HeaderTwo";

export default function Home() {
  return (
    <div className="demo-one">
      <HeaderTwo />

      <>
        <div className="rts-navigation-area-breadcrumb bg_light-1">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                <div className="navigator-breadcrumb-wrapper">
                  <a href="/">Home</a>
                  <i className="fa-regular fa-chevron-right" />
                  <a className="current" href="/privacy-policy">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-seperator bg_light-1">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <hr className="section-seperator" />
          </div>
        </div>

        {/* Privacy Policy area start */}
        <div className="rts-pricavy-policy-area rts-section-gap">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                <div className="container-privacy-policy">
                  <h1 className="title mb--40">
                    QuickMart Privacy Policy
                  </h1>

                  <p className="disc">
                    At QuickMart, we value your privacy and are committed to
                    protecting your personal information. This Privacy Policy
                    explains how we collect, use, store, and protect your
                    information when you visit our website, create an account,
                    purchase groceries, or use any of our online shopping
                    services.
                  </p>

                  <p className="disc">
                    By using the QuickMart website and services, you
                    acknowledge that your information may be processed as
                    described in this policy. We encourage you to read this
                    document carefully to understand our privacy practices.
                  </p>

                  <p className="disc mb--15">
                    This policy applies to all customers, registered users,
                    and visitors who interact with the QuickMart website.
                    We may update this Privacy Policy from time to time to
                    reflect changes in our services, business operations,
                    or applicable legal requirements.
                  </p>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      1. Information We Collect
                    </h2>
                    <p className="disc">
                      To provide a convenient and reliable grocery shopping
                      experience, QuickMart may collect the following types
                      of information:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Personal Information: Your name, email address,
                          contact number, and other details provided when
                          creating an account or placing an order.
                        </p>
                      </li>
                      <li>
                        <p>
                          Delivery Information: Your delivery address,
                          location details, and other information required
                          to deliver your grocery orders.
                        </p>
                      </li>
                      <li>
                        <p>
                          Order Information: Purchased products, shopping
                          cart details, order history, delivery preferences,
                          and transaction records.
                        </p>
                      </li>
                      <li>
                        <p>
                          Technical Information: IP address, browser type,
                          device information, website activity, and other
                          technical data collected through cookies and
                          similar technologies.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      2. How We Use Your Information
                    </h2>
                    <p className="disc">
                      QuickMart uses collected information to operate,
                      maintain, and improve our online grocery shopping
                      services. This may include:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Creating and managing customer accounts.
                        </p>
                      </li>
                      <li>
                        <p>
                          Processing orders, payments, and delivery
                          arrangements.
                        </p>
                      </li>
                      <li>
                        <p>
                          Sending order confirmations, payment updates,
                          delivery notifications, and important service
                          communications.
                        </p>
                      </li>
                      <li>
                        <p>
                          Providing customer support and responding to
                          questions, complaints, or refund requests.
                        </p>
                      </li>
                      <li>
                        <p>
                          Improving our website functionality, shopping
                          experience, and customer services.
                        </p>
                      </li>
                      <li>
                        <p>
                          Detecting fraudulent activities, preventing
                          unauthorized access, and maintaining platform
                          security.
                        </p>
                      </li>
                      <li>
                        <p>
                          Sending promotional offers and marketing
                          communications where permitted by law and
                          applicable consent requirements.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      3. Sharing of Personal Information
                    </h2>
                    <p className="disc">
                      QuickMart respects your privacy and does not sell
                      customer personal information. However, we may share
                      necessary information with trusted third parties
                      when required to provide our services.
                    </p>
                    <ul>
                      <li>
                        <p>
                          Delivery Partners: Customer names, contact numbers,
                          and delivery addresses may be shared with delivery
                          personnel to complete orders.
                        </p>
                      </li>
                      <li>
                        <p>
                          Payment Providers: Relevant transaction information
                          may be shared with payment service providers to
                          securely process payments.
                        </p>
                      </li>
                      <li>
                        <p>
                          Service Providers: We may work with trusted
                          technology, hosting, analytics, and communication
                          providers to maintain and improve our platform.
                        </p>
                      </li>
                      <li>
                        <p>
                          Legal Requirements: Information may be disclosed
                          when required by applicable laws, regulations,
                          legal proceedings, or authorized government
                          requests.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      4. Payment Information Security
                    </h2>
                    <ul>
                      <li>
                        <p>
                          QuickMart may support different payment methods
                          through authorized payment service providers.
                        </p>
                      </li>
                      <li>
                        <p>
                          Payment transactions are handled through the
                          relevant payment provider's systems and security
                          procedures.
                        </p>
                      </li>
                      <li>
                        <p>
                          We do not intentionally store complete payment
                          card details on our platform unless explicitly
                          required and supported by appropriate security
                          measures.
                        </p>
                      </li>
                      <li>
                        <p>
                          Customers should never share their passwords,
                          payment credentials, or verification codes with
                          unauthorized individuals.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      5. Cookies and Tracking Technologies
                    </h2>
                    <p className="disc">
                      QuickMart may use cookies and similar technologies
                      to improve website functionality and provide a better
                      shopping experience.
                    </p>
                    <ul>
                      <li>
                        <p>
                          Essential Cookies: Help maintain important website
                          functions, including account sessions and shopping
                          cart activities.
                        </p>
                      </li>
                      <li>
                        <p>
                          Preference Cookies: Help remember customer
                          preferences and website settings.
                        </p>
                      </li>
                      <li>
                        <p>
                          Analytics Cookies: Help us understand how visitors
                          interact with our website so we can improve
                          performance and usability.
                        </p>
                      </li>
                    </ul>
                    <p className="disc mt--30">
                      You may manage or disable cookies through your browser
                      settings. However, disabling certain cookies may affect
                      some website features and shopping functionality.
                    </p>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      6. Data Storage and Security
                    </h2>
                    <ul>
                      <li>
                        <p>
                          QuickMart takes reasonable technical and
                          organizational measures to protect personal
                          information against unauthorized access,
                          disclosure, alteration, or destruction.
                        </p>
                      </li>
                      <li>
                        <p>
                          Access to customer information is limited to
                          authorized personnel and service providers who
                          require it to perform their responsibilities.
                        </p>
                      </li>
                      <li>
                        <p>
                          We retain personal information only for as long
                          as reasonably necessary to provide our services,
                          fulfill legal obligations, resolve disputes,
                          and maintain business records.
                        </p>
                      </li>
                      <li>
                        <p>
                          Although we take appropriate security precautions,
                          no online platform or electronic transmission
                          method can guarantee complete security.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      7. Customer Rights and Choices
                    </h2>
                    <p className="disc">
                      Depending on applicable data protection laws, customers
                      may have certain rights regarding their personal
                      information, including:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Request access to the personal information we hold
                          about you.
                        </p>
                      </li>
                      <li>
                        <p>
                          Request correction of inaccurate or incomplete
                          personal information.
                        </p>
                      </li>
                      <li>
                        <p>
                          Request deletion of personal information where
                          legally permitted.
                        </p>
                      </li>
                      <li>
                        <p>
                          Withdraw consent where processing is based on
                          consent, subject to applicable legal requirements.
                        </p>
                      </li>
                      <li>
                        <p>
                          Opt out of promotional and marketing communications
                          using the available unsubscribe options.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      8. Third-Party Websites and Services
                    </h2>
                    <ul>
                      <li>
                        <p>
                          Our website may contain links to third-party
                          websites, payment gateways, or external services.
                        </p>
                      </li>
                      <li>
                        <p>
                          These third-party services may have their own
                          privacy policies and data handling practices.
                        </p>
                      </li>
                      <li>
                        <p>
                          QuickMart is not responsible for the privacy
                          practices or content of external websites.
                          We encourage customers to review their privacy
                          policies before providing personal information.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      9. Children's Privacy
                    </h2>
                    <p className="disc">
                      QuickMart's online shopping services are intended
                      for individuals who can legally enter into purchasing
                      transactions. We do not knowingly collect personal
                      information from children in violation of applicable
                      laws. If we become aware that personal information
                      has been collected unlawfully from a child, we will
                      take reasonable steps to address the situation.
                    </p>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      10. Changes to This Privacy Policy
                    </h2>
                    <p className="disc">
                      QuickMart may revise this Privacy Policy periodically
                      to reflect changes in our services, technology, or
                      legal requirements. Any updated version will be
                      published on this page with the revised information.
                      Customers are encouraged to review this policy
                      regularly.
                    </p>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      11. Contact Us
                    </h2>
                    <p className="disc">
                      If you have questions, concerns, or requests regarding
                      this Privacy Policy or the handling of your personal
                      information, please contact the QuickMart customer
                      support team through the contact details available
                      on our website.
                    </p>

                    <p
                      className="disc mt--30"
                      style={{ color: "#616164", fontWeight: 500 }}
                    >
                      At QuickMart, protecting your personal information
                      is important to us. We are committed to handling
                      customer data responsibly and maintaining a safe,
                      reliable, and trustworthy online grocery shopping
                      experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Privacy Policy area end */}
      </>

      <ShortService />
      <FooterThree />
    </div>
  );
}
