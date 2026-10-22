"use client";
import Link from "next/link";
function NavItem() {
  return (
    <div>
      <nav>
        <ul className="parent-nav">
          <li className="parent">
            <Link href="/">Home</Link>
          </li>
          
          <li className="parent">
            <Link href="/shop">Shop</Link>
          </li>
          <li className="parent">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavItem;
