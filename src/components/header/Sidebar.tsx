"use client";
import Link from "next/link";
import CategoryMenu from "./CategoryMenu";
import MobileMenu from "./MobileMenu";
import Cart from "./Cart";
import { useState } from "react";

const Sidebar = () => {
  // tab
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const handleMenuClickClose = () => {
    const sidebar = document.querySelector(".side-bar.header-two");
    if (sidebar) {
      sidebar.classList.remove("show");
    }
  };

  const handleSearchClose = () => {
    const sidebar = document.querySelector(".search-input-area");
    if (sidebar) {
      sidebar.classList.remove("show");
    }
  };

  return (
    <div>
      <div id="side-bar" className="side-bar header-two">
        <button
          type="button"
          className="close-icon-menu"
          aria-label="Close menu"
          onClick={handleMenuClickClose}
        >
          <i className="far fa-times" />
        </button>
        <form action="#" className="search-input-area-menu mt--30">
          <input type="text" placeholder="Search..." />
          <button>
            <i className="fa-light fa-magnifying-glass" />
          </button>
        </form>
        <div className="mobile-menu-nav-area tab-nav-btn mt--20">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                type="button"
                id="menu-tab"
                role="tab"
                aria-selected={activeTab === "tab1"}
                onClick={() => setActiveTab("tab1")}
                className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
              >
                Menu
              </button>
              <button
                type="button"
                id="category-tab"
                role="tab"
                aria-selected={activeTab === "tab2"}
                onClick={() => setActiveTab("tab2")}
                className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
              >
                Category
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            {activeTab === "tab1" && (
              <div>
                {/* mobile menu area start */}
                <div className="mobile-menu-main">
                  <MobileMenu />
                </div>
                {/* mobile menu area end */}
              </div>
            )}
            {activeTab === "tab2" && (
              <div>
                <div className="category-btn category-hover-header menu-category">
                  <CategoryMenu />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mobile-sidebar-actions">
          <Cart />
        </div>
        {/* button area wrapper start */}
        <div className="button-area-main-wrapper-menuy-sidebar mt--50">
          <div className="contact-area">
            <div className="phone">
              <i className="fa-light fa-headset" />
              <a href="#"> 011 (250) 1109</a>
            </div>
            <div className="phone">
              <i className="fa-light fa-envelope" />
              <a href="#">info@qmart.com</a>
            </div>
          </div>
          <div className="buton-area-bottom">
            <Link href="/login" className="rts-btn btn-primary">
              Sign In
            </Link>
            <Link href="/register" className="rts-btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
        {/* button area wrapper end */}
      </div>
      <div className="search-input-area">
        <div className="w-full max-w-[1696px] m-auto px-[15px]">
          <div className="search-input-inner">
            <div className="input-div">
              <input
                id="searchInput1"
                className="search-input"
                type="text"
                placeholder="Search by keyword or #"
              />
              <button>
                <i className="far fa-search" />
              </button>
            </div>
          </div>
        </div>
        <div
          id="close"
          className="search-close-icon"
          onClick={handleSearchClose}
        >
          <i className="far fa-times" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
