"use client";

import Link from "next/link";
import React, { useState, MouseEvent } from "react";

type MenuItem = {
  icon: string;
    label: string;
    slug: string;
  submenu: string[] | null;
};

function CategoryMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    const menuItems: MenuItem[] = [
  
       {
      icon: "01.svg",
            label: "Fruits & Vegetables",
      slug:"fruits-vegetables",
      submenu: null,
        },
    {
      icon: "02.svg",
        label: "Meat & Seafood",
        slug:"meat-seafood",
      submenu: null,
    },
    {
      icon: "07.svg",
        label: "Beverages",
      slug:"beverages",
      submenu: null,
    },
    {
      icon: "04.svg",
        label: "Snacks",
        slug:"snacks",
      submenu: null,
    },
    {
      icon: "03.svg",
        label: "Cooking Essentials",
        slug:"cooking-essentials",
      submenu: null,
    },
    {
      icon: "06.svg",
        label: "Frozen Foods",
      slug:"frozen-foods",
      submenu: null,
    },
    {
      icon: "09.svg",
      label: "Household",
      submenu: null,
    },
    {
      icon: "05.svg",
        label: "Personal Care",
      slug:"personal-care",
      submenu: null,
    },
    {
      icon: "10.svg",
        label: "Baby Products",
      slug:"baby-products",
      submenu: null,
    },
    
 
  ];

  return (
    <div>
      <ul className="category-sub-menu" id="category-active-four">
        {menuItems.map((cat, index) => (
          <li key={cat.label}>
            <Link href={`/shop?search=${cat.slug}`} className="menu-item">
            
                <img
                  src={`/assets/images/icons/${cat.icon}`}
                  alt={cat.label}
                />
              <span>{cat.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryMenu;
