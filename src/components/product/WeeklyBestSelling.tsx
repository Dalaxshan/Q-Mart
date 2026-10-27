"use client";
import { useEffect, useState } from "react";
import WeeklyBestSellingMain from "@/components/product-main/WeeklyBestSellingMain";
import { productApi } from "@/app/api/products/client";
import { Product } from "@/type";

const TABS = [
  { label: "Bakery", value: "bakery" },
  { label: "Beverages", value: "beverages" },
  { label: "Organic Products", value: "organic-products" },
  { label: "Fruits & Vegetables", value: "fruits-vegetables" },
];

const WeeklyBestSelling: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("bakery");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productApi.getAllProducts({
          category: activeTab,
          limit: 6,
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    void fetchProducts();
  }, [activeTab]);

  return (
    <div className="weekly-best-selling-area rts-section-gap bg_light-1">
      <div className="w-full max-w-[1696px] m-auto px-[15px]">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full shrink-0 px-[0.75rem]">
            <div className="title-area-between">
              <h2 className="title-left">Weekly Best Selling Groceries</h2>
              <ul
                className="nav nav-tabs best-selling-grocery"
                id="myTab"
                role="tablist"
              >
                {TABS.map((tab) => (
                  <li key={tab.value} className="nav-item" role="presentation">
                    <button
                      onClick={() => setActiveTab(tab.value)}
                      className={`nav-link ${activeTab === tab.value ? "active" : ""}`}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 -mt-6">
          {products.map((product: Product) => (
            <div
              key={product._id}
              className="w-full max-w-full shrink-0 px-[0.75rem] mt-6 md:w-1/3 xl:w-1/4 2xl:w-1/6"
            >
              <div className="single-shopping-card-one">
                <WeeklyBestSellingMain
                  ProductId={product._id}
                  Slug={product.slug}
                  ProductImage={product.images[0]}
                  ProductTitle={product.name}
                  Price={product.price}
                  SalePrice={product.salePrice}
                  Unit={product.unit}
                  SKU={product.sku}
                  CategoryName={typeof product.category === "string" ? product.category : product.category.name}
                  Stock={product.stock}
                  Rating={product.rating}
                  ReviewCount={product.reviewCount}
                  Tags={product.tags}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyBestSelling;
