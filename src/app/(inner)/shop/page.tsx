"use client";
import { useState, useEffect, Suspense, useCallback } from "react";
import HeaderTwo from "@/components/header/HeaderTwo";
import FooterOne from "@/components/footer/FooterOne";
import ShopMain from "./ShopMain";
import ShopMainList from "./ShopMainList";
import { productApi } from "@/app/api/products/client";
import { categoryApi } from "@/app/api/categories/client";
import { brandApi } from "@/app/api/brands/client";
import { Product, Category, Brand } from "@/type";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryQuery ? [categoryQuery] : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(9000);
  const [appliedMin, setAppliedMin] = useState<number>(0);
  const [appliedMax, setAppliedMax] = useState<number>(9000);

  // Fetch categories and brands once
  useEffect(() => {
    setSelectedCategories(categoryQuery ? [categoryQuery] : []);
  }, [categoryQuery]);

  useEffect(() => {
    categoryApi.getAllCategory().then(setCategories).catch(console.error);
    brandApi.getAllBrands().then(setBrands).catch(console.error);
  }, []);

  // Fetch products whenever filters change
  const fetchProducts = useCallback(async () => {
    try {
      const query: Parameters<typeof productApi.getAllProducts>[0] = {};
      if (selectedCategories.length === 1)
        query.category = selectedCategories[0];
      if (selectedBrands.length === 1) query.brand = selectedBrands[0];
      if (appliedMin > 0) query.minPrice = appliedMin;
      if (appliedMax < 9000) query.maxPrice = appliedMax;
      if (searchQuery) query.search = searchQuery;
      const data = await productApi.getAllProducts(query);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [selectedCategories, selectedBrands, appliedMin, appliedMax, searchQuery]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug],
    );
  };

  const handleBrandChange = (slug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug],
    );
  };

  const handlePriceFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedMin(minPrice);
    setAppliedMax(maxPrice);
  };

  // Client-side filter for multiple selections (API may only support single values)
  const filteredProducts = products.filter((p) => {
    const price = parseFloat(p.price ?? "0");
    if (price < appliedMin || price > appliedMax) return false;

    if (selectedCategories.length > 1) {
      const catId =
        typeof p.category === "object" ? p.category.slug : p.category;
      if (!selectedCategories.includes(catId)) return false;
    }

    if (selectedBrands.length > 1) {
      const brandId = typeof p.brand === "object" ? p.brand.slug : p.brand;
      if (!selectedBrands.includes(brandId)) return false;
    }

    return true;
  });

  return (
    <div className="shop-page">
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href="/">Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">
                  Shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container">
          <hr className="section-seperator" />
        </div>
      </div>

      <div className="shop-grid-sidebar-area rts-section-gap">
        <div className="container">
          <div className="row g-0">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-12 pr--70 pr_lg--10 pr_sm--10 pr_md--5 rts-sticky-column-item">
              <div className="sidebar-filter-main theiaStickySidebar">
                {/* Price Filter */}
                <div className="single-filter-box">
                  <h5 className="title">Widget Price Filter</h5>
                  <div className="filterbox-body">
                    <form
                      action="#"
                      className="price-input-area"
                      onSubmit={handlePriceFilterSubmit}
                    >
                      <div className="half-input-wrapper">
                        <div className="single">
                          <label htmlFor="min">Min price</label>
                          <input
                            id="min"
                            type="number"
                            value={minPrice}
                            min={0}
                            onChange={(e) =>
                              setMinPrice(parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                        <div className="single">
                          <label htmlFor="max">Max price</label>
                          <input
                            id="max"
                            type="number"
                            value={maxPrice}
                            min={0}
                            onChange={(e) =>
                              setMaxPrice(parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                      </div>
                      <input
                        type="range"
                        className="range"
                        min={0}
                        max={9000}
                        value={maxPrice}
                        onChange={(e) =>
                          setMaxPrice(parseInt(e.target.value, 10))
                        }
                      />
                      <div className="filter-value-min-max">
                       
                        <button type="submit" className="rts-btn btn-primary">
                          Filter
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Categories */}
                <div className="single-filter-box">
                  <h5 className="title">Product Categories</h5>
                  <div className="filterbox-body">
                    <div className="category-wrapper">
                      {categories.map((cat) => (
                        <div className="single-category" key={cat._id}>
                          <input
                            id={`cat-${cat._id}`}
                            type="checkbox"
                            checked={selectedCategories.includes(cat.slug)}
                            onChange={() => handleCategoryChange(cat.slug)}
                          />
                          <label htmlFor={`cat-${cat._id}`}>{cat.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="single-filter-box">
                  <h5 className="title">Select Brands</h5>
                  <div className="filterbox-body">
                    <div className="category-wrapper">
                      {brands.map((brand) => (
                        <div className="single-category" key={brand._id}>
                          <input
                            id={`brand-${brand._id}`}
                            type="checkbox"
                            checked={selectedBrands.includes(brand.slug)}
                            onChange={() => handleBrandChange(brand.slug)}
                          />
                          <label htmlFor={`brand-${brand._id}`}>
                            {brand.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-xl-9 col-lg-12">
              <div className="filter-select-area">
                <div className="top-filter">
                  <span>Showing {filteredProducts.length} results</span>
                  <div className="right-end">
                    <span>Sort: Short By Latest</span>
                    <div className="button-tab-area">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => setActiveTab("tab1")}
                            className={`nav-link single-button ${activeTab === "tab1" ? "active" : ""}`}
                          >
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <rect
                                x="0.5"
                                y="0.5"
                                width={6}
                                height={6}
                                rx="1.5"
                                stroke="#2C3B28"
                              />
                              <rect
                                x="0.5"
                                y="9.5"
                                width={6}
                                height={6}
                                rx="1.5"
                                stroke="#2C3B28"
                              />
                              <rect
                                x="9.5"
                                y="0.5"
                                width={6}
                                height={6}
                                rx="1.5"
                                stroke="#2C3B28"
                              />
                              <rect
                                x="9.5"
                                y="9.5"
                                width={6}
                                height={6}
                                rx="1.5"
                                stroke="#2C3B28"
                              />
                            </svg>
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => setActiveTab("tab2")}
                            className={`nav-link single-button ${activeTab === "tab2" ? "active" : ""}`}
                          >
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <rect
                                x="0.5"
                                y="0.5"
                                width={6}
                                height={6}
                                rx="1.5"
                                stroke="#2C3C28"
                              />
                              <rect
                                x="0.5"
                                y="9.5"
                                width={6}
                                height={6}
                                rx="1.5"
                                stroke="#2C3C28"
                              />
                              <rect
                                x={9}
                                y={3}
                                width={7}
                                height={1}
                                fill="#2C3C28"
                              />
                              <rect
                                x={9}
                                y={12}
                                width={7}
                                height={1}
                                fill="#2C3C28"
                              />
                            </svg>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-content" id="myTabContent">
                {activeTab === "tab1" && (
                  <div className="product-area-wrapper-shopgrid-list mt--20">
                    <div className="row g-4">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product: Product) => (
                          <div
                            key={product._id}
                            className="col-lg-4 col-md-6 col-sm-6 col-12"
                          >
                            <div className="single-shopping-card-one">
                              <ShopMain
                                ProductId={product._id}
                                Slug={product.slug}
                                ProductImage={product.images[0]}
                                ProductTitle={product.name}
                                Price={product.price}
                                SalePrice={product.salePrice}
                                Unit={product.unit}
                                SKU={product.sku}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py-5">
                          <h2>No Product Found</h2>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "tab2" && (
                  <div className="product-area-wrapper-shopgrid-list with-list mt--20">
                    <div className="row">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product: Product) => (
                          <div key={product._id} className="col-lg-6">
                            <div className="single-shopping-card-one discount-offer">
                              <ShopMainList
                                ProductId={product._id}
                                Slug={product.slug}
                                ProductImage={product.images[0]}
                                ProductTitle={product.name}
                                Price={product.price}
                                SalePrice={product.salePrice}
                                Unit={product.unit}
                                SKU={product.sku}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py-5">
                          <h2>No Product Found</h2>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeaderTwo />
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <ShopContent />
      </Suspense>
      <FooterOne />
    </>
  );
}
