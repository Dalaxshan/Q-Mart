"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "./Nav"; // re-export of NavItem (or change to "./NavItem")

const cartItems = [
  {
    id: 1,
    title: "Foster Farms Breast Nuggets Shaped Chicken",
    qty: 1,
    price: 36,
    img: "/assets/images/shop/cart-1.png",
  },
  {
    id: 2,
    title: "Foster Farms Breast Nuggets Shaped Chicken",
    qty: 1,
    price: 36,
    img: "/assets/images/shop/05.png",
  },
  {
    id: 3,
    title: "Foster Farms Breast Nuggets Shaped Chicken",
    qty: 1,
    price: 36,
    img: "/assets/images/shop/04.png",
  },
];

const FREE_SHIPPING_AT = 125;

function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = () => {
    document.querySelector(".side-bar.header-two")?.classList.toggle("show");
  };

  const handleSearchOpen = () => {
    document.querySelector(".search-input-area")?.classList.toggle("show");
  };

  const subTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const progress = Math.min(100, (subTotal / FREE_SHIPPING_AT) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_AT - subTotal);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        isSticky
          ? "shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          : "border-b border-gray-100"
      }`}
    >
      {/* ===== Top promo bar ===== */}
      <div className="hidden bg-[#629d23] text-white md:block">
        <div className="mx-auto flex w-full max-w-[1696px] items-center justify-between px-4 py-2 text-[13px]">
          <p className="m-0">
            Free shipping on orders over LKR {FREE_SHIPPING_AT}.00
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="font-medium hover:underline">
              Trending Products
            </a>
            <button className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[#629d23] transition hover:bg-[#f2f9ea]">
              Get 30% Discount Now
              <span className="rounded bg-[#629d23] px-1.5 py-0.5 text-[10px] uppercase text-white">
                Sale
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== Main row: logo / search / actions ===== */}
      <div className="mx-auto flex w-full max-w-[1696px] items-center gap-4 px-4 py-3 lg:gap-8">
        <Link href="/" className="logo-area shrink-0">
          <img
            src="/assets/images/logo/logo-01.png"
            alt="logo-main"
            className="logo h-10 w-auto lg:h-12"
          />
        </Link>

        {/* Search (desktop) */}
        <form
          action="#"
          className="search-header hidden flex-1 items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 pl-5 transition focus-within:border-[#629d23] focus-within:bg-white md:flex"
        >
          <input
            type="text"
            placeholder="Search for products, categories or brands"
            required
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="flex h-11 shrink-0 items-center gap-2 bg-[#629d23] px-6 text-sm font-semibold text-white transition hover:bg-[#4f7f1c]"
          >
            <span>Search</span>
            <i className="fa-light fa-magnifying-glass" />
          </button>
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            href="/account"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#1f1f25] transition hover:bg-gray-100 lg:flex"
          >
            <i className="fa-light fa-user" />
            Account
          </Link>

          <Link
            href="/wishlist"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#1f1f25] transition hover:bg-gray-100 lg:flex"
          >
            <i className="fa-regular fa-heart" />
            Wishlist
          </Link>

          {/* Cart with hover dropdown */}
          <div className="group relative">
            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-full bg-[#f2f9ea] px-4 py-2 text-sm font-semibold text-[#629d23] transition hover:bg-[#629d23] hover:text-white"
            >
              <span className="relative">
                <i className="fa-sharp fa-regular fa-cart-shopping" />
                <span className="absolute -right-2.5 -top-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#629d23] px-1 text-[10px] text-white group-hover:bg-white group-hover:text-[#629d23]">
                  {cartItems.length}
                </span>
              </span>
              <span className="hidden sm:inline">My Cart</span>
            </Link>

            <div className="invisible absolute right-0 top-full z-50 w-[360px] max-w-[92vw] translate-y-2 rounded-xl border border-gray-100 bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <h5 className="mb-3 text-base font-semibold">
                Shopping Cart ({String(cartItems.length).padStart(2, "0")})
              </h5>

              <div className="max-h-[280px] divide-y divide-gray-100 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.img}
                        alt=""
                        className="h-14 w-14 rounded-lg bg-gray-50 object-contain"
                      />
                      <div>
                        <Link href="/shop-details">
                          <h5 className="m-0 line-clamp-2 text-[13px] font-medium leading-snug">
                            {item.title}
                          </h5>
                        </Link>
                        <p className="m-0 mt-1 text-xs text-gray-500">
                          {item.qty} ×{" "}
                          <span className="font-semibold text-[#629d23]">
                            LKR {item.price.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button
                      aria-label="Remove item"
                      className="text-xs text-gray-400 transition hover:text-red-500"
                    >
                      <i className="fa-regular fa-x" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Sub Total:</span>
                  <span className="font-bold text-[#629d23]">
                    LKR {subTotal.toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#629d23] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mb-3 mt-2 text-xs text-gray-500">
                  {remaining > 0 ? (
                    <>
                      Spend{" "}
                      <span className="font-semibold text-[#629d23]">
                        LKR {remaining.toFixed(2)}
                      </span>{" "}
                      more to reach{" "}
                      <span className="font-semibold">Free Shipping</span>
                    </>
                  ) : (
                    <span className="font-semibold text-[#629d23]">
                      You've unlocked Free Shipping!
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="/cart"
                    className="flex-1 rounded-full bg-[#629d23] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#4f7f1c]"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    className="flex-1 rounded-full border border-[#629d23] py-2.5 text-center text-sm font-semibold text-[#629d23] transition hover:bg-[#629d23] hover:text-white"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: search + menu */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              id="search"
              aria-label="Search"
              onClick={handleSearchOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
            >
              <svg
                width={17}
                height={16}
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 14.7188L11.5625 10.5312C12.4688 9.4375 12.9688 8.03125 12.9688 6.5C12.9688 2.9375 10.0312 0 6.46875 0C2.875 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.46875 13C7.96875 13 9.375 12.5 10.5 11.5938L14.6875 15.7812C14.8438 15.9375 15.0312 16 15.25 16C15.4375 16 15.625 15.9375 15.75 15.7812C16.0625 15.5 16.0625 15.0312 15.75 14.7188ZM1.5 6.5C1.5 3.75 3.71875 1.5 6.5 1.5C9.25 1.5 11.5 3.75 11.5 6.5C11.5 9.28125 9.25 11.5 6.5 11.5C3.71875 11.5 1.5 9.28125 1.5 6.5Z"
                  fill="#1F1F25"
                />
              </svg>
            </button>
          </div>
          <button
            aria-label="Open menu"
            onClick={handleMenuClick}
            className="menu-btn flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 lg:hidden"
          >
            <svg
              width={20}
              height={16}
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y={14} width={20} height={2} fill="#1F1F25" />
              <rect y={7} width={20} height={2} fill="#1F1F25" />
              <rect width={20} height={2} fill="#1F1F25" />
            </svg>
          </button>
        </div>
      </div>

      {/* ===== Category strip (horizontal, with icons) ===== */}
      <div className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex w-full max-w-[1696px] items-center px-4">
          <Nav />
        </div>
      </div>
    </header>
  );
}

export default Header;
