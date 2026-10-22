"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import CategoryMenu from "./CategoryMenu";
import Cart from "./Cart";
import WishList from "./WishList";
import BackToTop from "@/components/common/BackToTop";
import Sidebar from "./Sidebar";
import { useCompare } from "@/components/header/CompareContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CUSTOMER_STORAGE_KEY = "customer";

function HeaderTwo() {
  const { compareItems } = useCompare();
  const [isSticky, setIsSticky] = useState(false);
  const [customerName, setCustomerName] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    try {
      const rawCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (!rawCustomer) return;

      const parsedCustomer = JSON.parse(rawCustomer) as Record<string, unknown>;
      const customer: Record<string, unknown> =
        parsedCustomer.user && typeof parsedCustomer.user === "object"
          ? (parsedCustomer.user as Record<string, unknown>)
          : parsedCustomer;
      const fullName = customer.fullName;

      if (typeof fullName === "string") {
        setCustomerName(fullName);
      }
    } catch (error) {
      console.error("Could not read customer from localStorage", error);
    }
  }, []);

  const handleMenuClick = () => {
    const sidebar = document.querySelector(".side-bar.header-two");
    if (sidebar) {
      sidebar.classList.toggle("show");
    }
  };

  const handleSearchOpen = () => {
    const sidebar = document.querySelector(".search-input-area");
    if (sidebar) {
      sidebar.classList.toggle("show");
    }
  };

  // filter search action js start
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);

    router.push(`/shop?search=${encodeURIComponent(suggestion)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  // filter search action js end

  return (
    <div>
      <>
        {/* header style two start */}
        <header className="header-style-two bg-primary-header">
          <div className="header-top-area-two">
            <div className="container-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="hader-top-between-two">
                    <p>
                      {customerName
                        ? `Welcome ${customerName} To Our Quick-Mart!`
                        : "Welcome To Our Quick-Mart!"}
                    </p>
                    {!customerName && (
                      <ul className="nav-header-top">
                        <li>
                          <Link href="/register">Register</Link>
                        </li>
                        <li>
                          <Link href="/login">Login</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="search-header-area-main">
            <div className="container-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="logo-search-category-wrapper">
                    <a
                      href="/"
                      className="logo-area"
                      style={{ maxWidth: "200px" }}
                    >
                      <img
                        src="/assets/images/logo/logo-01.png"
                        alt="logo-main"
                        className="logo"
                      />
                    </a>
                    <div className="category-search-wrapper">
                      <div className="category-btn category-hover-header">
                        <img
                          className="parent"
                          src="/assets/images/icons/bar-1.svg"
                          alt="icons"
                        />
                        <span>Categories</span>
                        <CategoryMenu />
                      </div>
                      <form
                        onSubmit={handleSubmit}
                        className="search-header"
                        autoComplete="off"
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Search for products, categories or brands"
                          required
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text">Search</div>
                          <div className="arrow-icon">
                            <i className="fa-light fa-magnifying-glass" />
                          </div>
                        </button>
                      </form>
                    </div>
                    <div className="accont-wishlist-cart-area-header">
                      <Link href="/account" className="btn-border-only account">
                        <i className="fa-light fa-user" />
                        Account
                      </Link>

                      <WishList />
                      <Cart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`rts-header-nav-area-one mobile-nav-background header--sticky  ${isSticky ? "sticky" : ""}`}
          >
            <div className="container-2">
              <div className="row">
                <div className="col-lg-12">
                  <div className="nav-and-btn-wrapper">
                    <div className="nav-area">
                      <Nav />
                    </div>
                    {/* button-area */}
                    <div className="right-location-area">
                      <i className="fa-solid fa-location-dot" />
                      <p>Delivery: Havelock Rd, Colombo -05</p>
                    </div>
                    {/* button-area end */}
                  </div>
                  <div className="logo-search-category-wrapper">
                    <Link
                      href="/"
                      className="logo-area"
                      style={{ maxWidth: "120px" }}
                    >
                      <img
                        src="/assets/images/logo/logo-01.png"
                        alt="logo-main"
                        className="logo"
                      />
                    </Link>
                    <div className="category-search-wrapper">
                      <form action="#" className="search-header">
                        <input
                          type="text"
                          placeholder="Search for products, categories"
                          required
                        />
                        <a
                          href="#"
                          className="rts-btn btn-primary radious-sm with-icon"
                        >
                          <div className="btn-text">Search</div>
                          <div className="arrow-icon">
                            <i className="fa-light fa-magnifying-glass" />
                          </div>
                          <div className="arrow-icon">
                            <i className="fa-light fa-magnifying-glass" />
                          </div>
                        </a>
                      </form>
                    </div>
                    <div className="main-wrapper-action-2 d-flex">
                      <div className="actions-area">
                        <div
                          className="menu-btn"
                          id="menu-btn"
                          onClick={handleMenuClick}
                        >
                          <svg
                            width={20}
                            height={16}
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect y={14} width={20} height={2} fill="#fff" />
                            <rect y={7} width={20} height={2} fill="#fff" />
                            <rect width={20} height={2} fill="#fff" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* header style two end */}
      </>
      <BackToTop />
      <Sidebar />
    </div>
  );
}

export default HeaderTwo;
