
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
                  <a className="current" href="/terms-and-conditions">
                    Terms & Conditions
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

        {/* Terms & Conditions area start */}
        <div className="rts-pricavy-policy-area rts-section-gap">
          <div className="w-full max-w-[1696px] m-auto px-[15px]">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full max-w-full shrink-0 px-[0.75rem]">
                <div className="container-privacy-policy">
                  <h1 className="title mb--40">
                    QuickMart Terms & Conditions
                  </h1>

                  <p className="disc">
                    Welcome to QuickMart! These Terms and Conditions govern
                    your access to and use of our website, services, and online
                    grocery shopping platform. By visiting our website,
                    creating an account, or placing an order, you agree to
                    comply with these terms. Please read them carefully before
                    using our services.
                  </p>

                  <p className="disc">
                    QuickMart provides an online shopping platform where
                    customers can browse and purchase groceries, fresh
                    produce, household essentials, and other everyday products.
                    We aim to make grocery shopping convenient, reliable, and
                    accessible to our customers.
                  </p>

                  <p className="disc mb--15">
                    These terms apply to all customers and visitors using the
                    QuickMart website. We reserve the right to update or modify
                    these terms when necessary. Any changes will be published
                    on this page, and continued use of our services indicates
                    acceptance of the updated terms.
                  </p>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      1. Account Registration and Responsibilities
                    </h2>
                    <ul>
                      <li>
                        <p>
                          Customers may need to create an account to access
                          certain features and place orders through QuickMart.
                        </p>
                      </li>
                      <li>
                        <p>
                          You must provide accurate, complete, and up-to-date
                          information, including your name, email address,
                          contact number, and delivery address.
                        </p>
                      </li>
                      <li>
                        <p>
                          You are responsible for maintaining the
                          confidentiality of your account credentials and all
                          activities performed through your account.
                        </p>
                      </li>
                      <li>
                        <p>
                          Please notify us promptly if you suspect unauthorized
                          access to your account.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      2. Products and Availability
                    </h2>
                    <ul>
                      <li>
                        <p>
                          QuickMart offers groceries, fresh fruits, vegetables,
                          food items, beverages, household essentials, and
                          other products through its online platform.
                        </p>
                      </li>
                      <li>
                        <p>
                          All products are subject to availability. We reserve
                          the right to limit quantities or discontinue products
                          without prior notice.
                        </p>
                      </li>
                      <li>
                        <p>
                          Product images are provided for illustration
                          purposes. Actual packaging, appearance, size, or
                          brand presentation may occasionally differ.
                        </p>
                      </li>
                      <li>
                        <p>
                          For fresh and perishable products, we make reasonable
                          efforts to ensure quality and freshness at the time
                          of delivery.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      3. Orders and Order Confirmation
                    </h2>
                    <ul>
                      <li>
                        <p>
                          Customers can place orders by selecting products,
                          adding them to their shopping cart, and completing
                          the checkout process.
                        </p>
                      </li>
                      <li>
                        <p>
                          After placing an order, customers will receive an
                          order confirmation through the available
                          communication channels.
                        </p>
                      </li>
                      <li>
                        <p>
                          QuickMart reserves the right to reject, cancel, or
                          limit any order due to product unavailability,
                          incorrect pricing, suspected fraudulent activity,
                          or other operational reasons.
                        </p>
                      </li>
                      <li>
                        <p>
                          Customers should review their shopping cart,
                          delivery details, and order total carefully before
                          confirming an order.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      4. Pricing and Payments
                    </h2>
                    <ul>
                      <li>
                        <p>
                          All product prices displayed on QuickMart are shown
                          in the applicable currency indicated on our website.
                        </p>
                      </li>
                      <li>
                        <p>
                          Prices may change from time to time depending on
                          supplier costs, promotions, and market conditions.
                        </p>
                      </li>
                      <li>
                        <p>
                          The final order amount, including applicable delivery
                          charges and other fees, will be displayed during
                          checkout.
                        </p>
                      </li>
                      <li>
                        <p>
                          Customers must complete payment using the payment
                          methods made available by QuickMart at checkout.
                        </p>
                      </li>
                      <li>
                        <p>
                          QuickMart reserves the right to correct pricing
                          errors and cancel affected orders where necessary.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      5. Delivery and Shipping
                    </h2>
                    <ul>
                      <li>
                        <p>
                          QuickMart aims to deliver orders to the address
                          provided by the customer during checkout.
                        </p>
                      </li>
                      <li>
                        <p>
                          Delivery times are estimates and may vary depending
                          on location, weather conditions, traffic, product
                          availability, and other circumstances.
                        </p>
                      </li>
                      <li>
                        <p>
                          Customers must provide a correct and accessible
                          delivery address and ensure someone is available
                          to receive the order.
                        </p>
                      </li>
                      <li>
                        <p>
                          Additional delivery charges may apply depending on
                          the delivery location and order requirements. Any
                          applicable charges will be displayed at checkout.
                        </p>
                      </li>
                      <li>
                        <p>
                          QuickMart is not responsible for delays caused by
                          circumstances beyond our reasonable control.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      6. Cancellations, Returns and Refunds
                    </h2>
                    <ul>
                      <li>
                        <p>
                          Customers may request order cancellation before the
                          order has been processed or dispatched, subject to
                          approval by QuickMart.
                        </p>
                      </li>
                      <li>
                        <p>
                          Due to the perishable nature of grocery products,
                          certain food items, fresh produce, and other
                          perishable goods may not be eligible for return
                          unless they are damaged, defective, incorrect, or
                          otherwise covered by applicable consumer laws.
                        </p>
                      </li>
                      <li>
                        <p>
                          If you receive damaged, defective, expired, or
                          incorrect products, please contact our customer
                          support team as soon as possible with relevant
                          order details and supporting evidence.
                        </p>
                      </li>
                      <li>
                        <p>
                          Approved refunds will be processed through the
                          applicable payment method or another agreed
                          arrangement.
                        </p>
                      </li>
                      <li>
                        <p>
                          Refund processing times may vary depending on the
                          payment provider and financial institution.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      7. Promotions and Discounts
                    </h2>
                    <ul>
                      <li>
                        <p>
                          QuickMart may offer promotional discounts,
                          special offers, vouchers, and other marketing
                          campaigns from time to time.
                        </p>
                      </li>
                      <li>
                        <p>
                          Promotional offers may be subject to specific
                          conditions, validity periods, and eligibility
                          requirements.
                        </p>
                      </li>
                      <li>
                        <p>
                          Unless otherwise stated, promotional offers cannot
                          be exchanged for cash or combined with other
                          discounts.
                        </p>
                      </li>
                      <li>
                        <p>
                          QuickMart reserves the right to modify or withdraw
                          promotional offers at any time, subject to
                          applicable law.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      8. Customer Responsibilities and Prohibited Activities
                    </h2>
                    <ul>
                      <li>
                        <p>
                          Customers must use the QuickMart platform for
                          lawful purposes only.
                        </p>
                      </li>
                      <li>
                        <p>
                          You must not provide false information, misuse
                          promotional offers, or engage in fraudulent
                          transactions.
                        </p>
                      </li>
                      <li>
                        <p>
                          Unauthorized access, attempts to disrupt our
                          website, or activities that compromise platform
                          security are strictly prohibited.
                        </p>
                      </li>
                      <li>
                        <p>
                          Customers must not use our website to distribute
                          harmful software, malicious content, or engage in
                          activities that interfere with other users.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      9. Privacy and Personal Information
                    </h2>
                    <ul>
                      <li>
                        <p>
                          QuickMart collects and processes customer
                          information to manage accounts, process orders,
                          arrange deliveries, and provide customer support.
                        </p>
                      </li>
                      <li>
                        <p>
                          We take reasonable measures to protect customer
                          information against unauthorized access, misuse,
                          alteration, or disclosure.
                        </p>
                      </li>
                      <li>
                        <p>
                          Customer information will be handled in accordance
                          with our Privacy Policy and applicable data
                          protection laws.
                        </p>
                      </li>
                      <li>
                        <p>
                          By using our services, you acknowledge that certain
                          personal information is necessary to provide the
                          services you request.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      10. Intellectual Property
                    </h2>
                    <ul>
                      <li>
                        <p>
                          All content on the QuickMart website, including
                          logos, designs, text, graphics, images, and website
                          materials, is owned by or licensed to QuickMart.
                        </p>
                      </li>
                      <li>
                        <p>
                          You may not copy, reproduce, distribute, modify,
                          or commercially use our website content without
                          prior written permission.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      11. Limitation of Liability
                    </h2>
                    <ul>
                      <li>
                        <p>
                          QuickMart makes reasonable efforts to maintain
                          accurate product information, reliable services,
                          and a smooth shopping experience.
                        </p>
                      </li>
                      <li>
                        <p>
                          We do not guarantee uninterrupted or error-free
                          website availability at all times.
                        </p>
                      </li>
                      <li>
                        <p>
                          To the extent permitted by applicable law, QuickMart
                          shall not be liable for indirect losses arising
                          from the use of our website or services.
                        </p>
                      </li>
                      <li>
                        <p>
                          Nothing in these terms excludes or limits any
                          consumer rights or legal responsibilities that
                          cannot be excluded under applicable law.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      12. Changes to These Terms
                    </h2>
                    <p>
                      QuickMart may update these Terms and Conditions from
                      time to time to reflect changes in our services,
                      business operations, or applicable legal requirements.
                      Updated terms will be published on this page. We
                      encourage customers to review this page periodically.
                    </p>
                  </div>

                  <div className="section-list mt--40">
                    <h2 className="title">
                      13. Contact Us
                    </h2>
                    <p>
                      If you have any questions, concerns, or complaints
                      regarding these Terms and Conditions, please contact
                      the QuickMart customer support team through the contact
                      details provided on our website.
                    </p>
                    <p
                      className="disc mt--30"
                      style={{ color: "#616164", fontWeight: 500 }}
                    >
                      By using QuickMart and placing an order through our
                      platform, you acknowledge that you have read,
                      understood, and agreed to these Terms and Conditions.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Terms & Conditions area end */}
      </>

      <ShortService />
      <FooterThree />
    </div>
  );
}
