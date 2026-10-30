
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
                  <a
                    className="current"
                    href="/cancellation-returns"
                  >
                    Cancellation & Returns
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

        {/* Cancellation & Returns area start */}
        <div className="rts-pricavy-policy-area rts-section-gap">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                <div className="container-privacy-policy">
                  <h1 className="title mb--40">
                    Cancellation & Returns
                  </h1>

                  <p className="disc">
                    At QuickMart, we want every grocery shopping experience
                    to be convenient and satisfying. We understand that
                    customers may sometimes need to cancel an order, report
                    an issue with a product, or request a refund. This
                    Cancellation and Returns Policy explains how these
                    requests are handled.
                  </p>

                  <p className="disc">
                    Our policy applies to all purchases made through the
                    QuickMart online shopping platform. We aim to handle
                    cancellation, return, and refund requests fairly and
                    efficiently while maintaining the quality and safety
                    of our grocery products.
                  </p>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      1. Order Cancellation
                    </h2>
                    <ul>
                      <li>
                        <p>
                          Customers may request to cancel an order before
                          it has been processed or dispatched.
                        </p>
                      </li>
                      <li>
                        <p>
                          Once an order has been packed, dispatched, or
                          handed over to the delivery team, cancellation
                          may no longer be possible.
                        </p>
                      </li>
                      <li>
                        <p>
                          To request a cancellation, customers should
                          contact QuickMart customer support as soon
                          as possible and provide their order number.
                        </p>
                      </li>
                      <li>
                        <p>
                          QuickMart reserves the right to cancel an order
                          due to product unavailability, pricing errors,
                          payment issues, or other operational reasons.
                        </p>
                      </li>
                      <li>
                        <p>
                          If a prepaid order is successfully cancelled,
                          an eligible refund will be processed according
                          to our refund policy.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      2. Return Eligibility
                    </h2>
                    <p className="disc">
                      Due to the nature of grocery products, not all items
                      are eligible for return. We review return requests
                      based on the product type and the reason for the
                      request.
                    </p>
                    <ul>
                      <li>
                        <p>
                          Damaged Products: Products received in damaged
                          condition may qualify for a return, replacement,
                          or refund.
                        </p>
                      </li>
                      <li>
                        <p>
                          Expired Products: Products delivered beyond their
                          expiry date may qualify for a refund or replacement.
                        </p>
                      </li>
                      <li>
                        <p>
                          Incorrect Products: If you receive an item
                          different from what you ordered, please contact
                          our support team.
                        </p>
                      </li>
                      <li>
                        <p>
                          Missing Products: If an item is missing from
                          your order, you may report the issue for
                          verification and resolution.
                        </p>
                      </li>
                      <li>
                        <p>
                          Quality Issues: Fresh fruits, vegetables, dairy
                          products, and other groceries that arrive in
                          unacceptable condition may be reviewed for
                          a suitable resolution.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      3. Non-Returnable Products
                    </h2>
                    <p className="disc">
                      For health, hygiene, and food safety reasons, certain
                      grocery items may not be eligible for return unless
                      they are defective, damaged, expired, incorrect,
                      or otherwise covered by applicable consumer laws.
                    </p>
                    <ul>
                      <li>
                        <p>
                          Fresh fruits, vegetables, meat, seafood, and
                          other perishable food items.
                        </p>
                      </li>
                      <li>
                        <p>
                          Opened or partially consumed food and beverage
                          products.
                        </p>
                      </li>
                      <li>
                        <p>
                          Products with damaged or removed original
                          packaging due to customer handling.
                        </p>
                      </li>
                      <li>
                        <p>
                          Personal care and hygiene products that have
                          been opened or used.
                        </p>
                      </li>
                    </ul>
                    <p className="disc mt--30">
                      These restrictions do not affect any mandatory
                      rights customers may have under applicable law.
                    </p>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      4. How to Request a Return or Report an Issue
                    </h2>
                    <p className="disc">
                      If you experience an issue with your order, please
                      follow these steps:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Contact QuickMart customer support with your
                          order number and registered contact details.
                        </p>
                      </li>
                      <li>
                        <p>
                          Clearly explain the issue, including whether
                          the product is damaged, expired, incorrect,
                          missing, or of unsatisfactory quality.
                        </p>
                      </li>
                      <li>
                        <p>
                          Provide clear photographs or other supporting
                          evidence where applicable.
                        </p>
                      </li>
                      <li>
                        <p>
                          Our team will review your request and may
                          contact you for additional information.
                        </p>
                      </li>
                      <li>
                        <p>
                          Once the request has been reviewed, we will
                          inform you of the available resolution.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      5. Refund Policy
                    </h2>
                    <p className="disc">
                      QuickMart may issue refunds for eligible cancelled
                      orders, damaged products, expired items, incorrect
                      deliveries, missing products, or other approved
                      complaints.
                    </p>
                    <ul>
                      <li>
                        <p>
                          Refund requests are subject to review and
                          verification by our customer support team.
                        </p>
                      </li>
                      <li>
                        <p>
                          Approved refunds will generally be returned
                          through the original payment method where
                          supported.
                        </p>
                      </li>
                      <li>
                        <p>
                          If the original payment method cannot be used,
                          an alternative refund arrangement may be
                          discussed with the customer.
                        </p>
                      </li>
                      <li>
                        <p>
                          Refunds for cash-on-delivery orders will be
                          handled through an appropriate arrangement
                          agreed upon with the customer.
                        </p>
                      </li>
                      <li>
                        <p>
                          Delivery charges may also be refunded where
                          applicable, depending on the circumstances
                          and applicable consumer rights.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      6. Refund Processing Time
                    </h2>
                    <p className="disc">
                      Once a refund has been approved, processing time
                      may vary depending on the original payment method
                      and the relevant financial institution.
                    </p>
                    <ul>
                      <li>
                        <p>
                          Card and online payments: Refund processing
                          depends on the payment gateway and the
                          customer's bank.
                        </p>
                      </li>
                      <li>
                        <p>
                          Bank transfers: Processing time depends on
                          the relevant banking institution.
                        </p>
                      </li>
                      <li>
                        <p>
                          Cash-on-delivery orders: Refund arrangements
                          will be communicated directly by our support
                          team.
                        </p>
                      </li>
                    </ul>
                    <p className="disc mt--30">
                      Customers will be notified when their refund
                      request has been reviewed and approved. Actual
                      crediting times may differ from the approval date.
                    </p>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      7. Product Replacement
                    </h2>
                    <ul>
                      <li>
                        <p>
                          If an item is damaged, defective, incorrect,
                          or of unacceptable quality, QuickMart may
                          offer a replacement where available.
                        </p>
                      </li>
                      <li>
                        <p>
                          Replacement products are subject to stock
                          availability and delivery arrangements.
                        </p>
                      </li>
                      <li>
                        <p>
                          If a suitable replacement is unavailable,
                          an eligible refund may be offered instead.
                        </p>
                      </li>
                      <li>
                        <p>
                          Customers will be informed of the available
                          options before the replacement or refund
                          is arranged.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      8. Incorrect Delivery Address and Failed Deliveries
                    </h2>
                    <ul>
                      <li>
                        <p>
                          Customers are responsible for providing
                          accurate delivery information when placing
                          an order.
                        </p>
                      </li>
                      <li>
                        <p>
                          If a delivery cannot be completed because
                          of an incorrect address or the unavailability
                          of the recipient, customers should contact
                          our support team.
                        </p>
                      </li>
                      <li>
                        <p>
                          Additional delivery arrangements or charges
                          may apply depending on the circumstances.
                        </p>
                      </li>
                      <li>
                        <p>
                          Any cancellation or refund request resulting
                          from a failed delivery will be reviewed
                          individually.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      9. Refund Request Rejections
                    </h2>
                    <p className="disc">
                      QuickMart may decline a return or refund request
                      if it does not meet the applicable eligibility
                      requirements. Reasons may include:
                    </p>
                    <ul>
                      <li>
                        <p>
                          The product was damaged due to improper
                          handling or storage after delivery.
                        </p>
                      </li>
                      <li>
                        <p>
                          The request does not relate to an eligible
                          product or valid issue.
                        </p>
                      </li>
                      <li>
                        <p>
                          The information provided is insufficient
                          to verify the reported issue.
                        </p>
                      </li>
                      <li>
                        <p>
                          The request involves suspected fraudulent
                          activity or misuse of the returns process.
                        </p>
                      </li>
                    </ul>
                    <p className="disc mt--30">
                      All requests will be assessed fairly, and this
                      policy does not limit any rights available to
                      customers under applicable consumer protection laws.
                    </p>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      10. Changes to This Policy
                    </h2>
                    <p className="disc">
                      QuickMart reserves the right to update this
                      Cancellation and Returns Policy when necessary.
                      Any changes will be published on this page.
                      Customers are encouraged to review the policy
                      periodically to stay informed about our
                      cancellation, return, and refund procedures.
                    </p>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      11. Contact QuickMart
                    </h2>
                    <p className="disc">
                      If you need assistance with an order cancellation,
                      return, replacement, or refund, please contact
                      the QuickMart customer support team through
                      the contact information available on our website.
                    </p>

                    <p
                      className="disc mt--30"
                      style={{ color: "#616164", fontWeight: 500 }}
                    >
                      Your satisfaction matters to us. At QuickMart,
                      we are committed to providing a reliable grocery
                      shopping experience and resolving customer
                      concerns as fairly and promptly as possible.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cancellation & Returns area end */}
      </>

      <ShortService />
      <FooterThree />
    </div>
  );
}
