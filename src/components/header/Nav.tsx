"use client";
import Link from "next/link";

const SHOP = `/shop?category=`;

export const categories = [
  { name: "Fruits & Vegetables", icon: "/assets/images/icons/01.svg", href: SHOP + "fruits-vegetables" },
  { name: "Meats & Seafood", icon: "/assets/images/icons/02.svg", href: SHOP + "meat-seafood" },
  { name: "Breads & Bakery", icon: "/assets/images/icons/03.svg", href: SHOP + "bakery" },
  { name: "Chips & Snacks", icon: "/assets/images/icons/04.svg", href: SHOP + "snacks" },
  { name: "Medical Healthcare", icon: "/assets/images/icons/05.svg", href: SHOP + "personal-care" },
  { name: "Cooking & Essentials", icon: "/assets/images/icons/06.svg", href: SHOP + "cooking-essentials" },
  { name: "Dairy & Eggs", icon: "/assets/images/icons/07.svg", href: SHOP + "dairy-eggs" },
  { name: "Frozen Foods", icon: "/assets/images/icons/08.svg", href: SHOP + "frozen-foods" },
  { name: "Organic & Natural", icon: "/assets/images/icons/09.svg", href: SHOP + "organic-products" },
  // { name: "Other Items", icon: "/assets/images/icons/10.svg", href: "/shop" },
];

// Second-row navigation: all categories, horizontal, icon + label, divider between items
function NavItem() {
  return (
    <nav className="min-w-0 flex-1" aria-label="Categories">
      <ul className="m-0! flex! list-none! items-center! gap-0 overflow-x-auto p-0! [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:justify-center!">
        {categories.map((cat, i) => (
          <li
            key={`${cat.name}-${i}`}
            className={`m-0! shrink-0 p-0! ${
              i > 0 ? "border-l border-white/40" : ""
            }`}
          >
            <Link
              href={cat.href}
              className="group flex! items-center! gap-2 whitespace-nowrap px-4 py-3.5 text-[13px] font-semibold uppercase tracking-wide text-white! no-underline! transition-colors hover:bg-white/10"
            >
              {/* <img
                src={cat.icon}
                alt=""
                className="h-5 w-5 object-contain brightness-0 invert"
                loading="lazy"
              /> */}
              <span className="transition-colors group-hover:text-[#b9e27f]">
                {cat.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavItem;