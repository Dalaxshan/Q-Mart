"use client";

import { useState } from "react";
import Link from "next/link";
import FooterThree from "@/components/footer/FooterThree";
import HeaderTwo from "@/components/header/HeaderTwo";
import ShortService from "@/components/service/ShortService";
import Image from "next/image";

const faqItems = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our products, add the items you need to your cart, and select Checkout. Enter your delivery details, choose a payment method, and review your order before placing it.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "You can pay using the payment methods shown at checkout. The available options may vary depending on your delivery location and order details.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is confirmed, visit the Track Order page and enter your order details. You can also contact our support team if you need help with an order status.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Contact us as soon as possible with your order number. Cancellation or changes may be possible before the order is packed or dispatched, but cannot always be guaranteed after processing has started.",
  },
  {
    question: "What if an item is damaged, missing, or incorrect?",
    answer:
      "Please contact us promptly with your order number and details of the issue. We will review the order and arrange an appropriate replacement, refund, or other resolution where applicable.",
  },
  {
    question: "Do you accept returns on grocery products?",
    answer:
      "Because of food safety requirements, many perishable products cannot be returned. Damaged, expired, incorrect, or poor-quality items may qualify for a replacement or refund under our Cancellation & Returns policy.",
  },
  {
    question: "How do I update my account details?",
    answer:
      "Sign in and open your Account page to update your profile and delivery information. Make sure your address and contact number are correct before placing an order.",
  },
  {
    question: "How can I contact QuickMart?",
    answer:
      "Visit our Contact page or call the support number shown there. Please include your order number when contacting us about an existing order so we can assist you faster.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="demo-one">
      <HeaderTwo />

      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="w-full max-w-[1696px] m-auto px-[15px]">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full shrink-0 px-[0.75rem]">
              <div className="navigator-breadcrumb-wrapper">
                <Link href="/">Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <span className="current">FAQ</span>
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

      <main className="rts-section-gap">
        <div className="w-full max-w-[1696px] m-auto px-[15px]">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full shrink-0 px-[0.75rem] lg:w-1/3">
              <div className="faq-content-left-main-wrapper">
                <h1 className="title">FAQ</h1>
                <p className="disc">
                  Find quick answers about ordering, delivery, payments, and
                  returns at QuickMart. If you still need help, send us your
                  question and our team will get back to you.
                </p>

                <div className="thumbnail-area">
                  <img
                    src="/assets/images/banner/transparent/01.png"
                    alt="QuickMart customer support"
                    className="w-full h-auto rounded-[5px] object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="w-full max-w-full shrink-0 px-[0.75rem] lg:w-2/3 pl--50 pl_md--10 pl_sm--10 mt_md--30 mt_sm--30">
              <div className="accordion-main-area-wrapper-style-1">
                {faqItems.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div className="accordion-item" key={item.question}>
                      <h2 className="accordion-header">
                        <button
                          type="button"
                          className="w-full text-left"
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${index}`}
                          onClick={() => setOpenIndex(isOpen ? -1 : index)}
                        >
                          {item.question}
                          <i
                            className={`fa-regular ${
                              isOpen ? "fa-minus" : "fa-plus"
                            } float-right`}
                            aria-hidden="true"
                          />
                        </button>
                      </h2>
                      {isOpen && (
                        <div
                          id={`faq-answer-${index}`}
                          className="accordion-body"
                          role="region"
                        >
                          <p className="disc">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ShortService />
      <FooterThree />
    </div>
  );
}
