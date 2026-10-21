"use client";
import { useEffect, useState } from "react";
import WeeklyBestSellingMain from "@/components/product-main/WeeklyBestSellingMain";
import { productApi } from "@/app/api/products/route";
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
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
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
        <div className="row g-4">
          {products.map((product: Product) => (
            <div
              key={product._id}
              className="col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12"
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
