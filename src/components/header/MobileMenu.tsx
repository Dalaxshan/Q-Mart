"use client";

import Link from "next/link";

const MobileMenu = () => {
  return (
    <nav className="nav-main mainmenu-nav mt--30">
      <ul className="mainmenu metismenu" id="mobile-menu-active">
        <li>
          <Link className="main" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="main" href="/shop">
            Shop
          </Link>
        </li>
        <li>
          <Link className="main" href="/about">
            About
          </Link>
        </li>

        {/* Contact */}
        <li>
          <Link className="main" href="/contact">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
