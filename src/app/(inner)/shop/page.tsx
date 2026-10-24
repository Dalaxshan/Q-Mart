"use client";
import { useState, useEffect, Suspense, useCallback } from "react";
import HeaderTwo from "@/components/header/HeaderTwo";
import FooterThree from "@/components/footer/FooterThree";
import ShopMain from "./ShopMain";
import ShopMainList from "./ShopMainList";
import { productApi } from "@/app/api/products/client";
import { categoryApi } from "@/app/api/categories/client";
import { brandApi } from "@/app/api/brands/client";
import { Product, Category, Brand } from "@/type";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const brandQuery = searchParams.get("brand") || "";
  const minPriceQuery = searchParams.get("minPrice") || "";
  const maxPriceQuery = searchParams.get("maxPrice") || "";
  const pageQuery = searchParams.get("page") || "1";

  const parseSlugs = (value: string) =>
    value
      .split(",")
      .map((slug) => slug.trim().replace(/\/+$/, ""))
      .filter(Boolean);
  const parsedMinPrice = Number(minPriceQuery);
  const parsedMaxPrice = Number(maxPriceQuery);
  const urlMinPrice =
    minPriceQuery && Number.isFinite(parsedMinPrice) ? parsedMinPrice : 0;
  const urlMaxPrice =
    maxPriceQuery && Number.isFinite(parsedMaxPrice) ? parsedMaxPrice : 9000;
  const parsedPage = Number(pageQuery);
  const requestedPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const productsPerPage = 10;

  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    parseSlugs(categoryQuery),
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    parseSlugs(brandQuery),
  );
  const [minPrice, setMinPrice] = useState<number>(urlMinPrice);
  const [maxPrice, setMaxPrice] = useState<number>(urlMaxPrice);
  const [appliedMin, setAppliedMin] = useState<number>(urlMinPrice);
  const [appliedMax, setAppliedMax] = useState<number>(urlMaxPrice);

  // Fetch categories and brands once
  useEffect(() => {
    setSelectedCategories(parseSlugs(categoryQuery));
    setSelectedBrands(parseSlugs(brandQuery));
    setMinPrice(urlMinPrice);
    setMaxPrice(urlMaxPrice);
    setAppliedMin(urlMinPrice);
    setAppliedMax(urlMaxPrice);
  }, [categoryQuery, brandQuery, minPriceQuery, maxPriceQuery]);

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
      query.limit = 200;
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
    const next = selectedCategories.includes(slug)
      ? selectedCategories.filter((category) => category !== slug)
      : [...selectedCategories, slug];
    setSelectedCategories(next);
    updateUrl("category", next);
  };

  const handleBrandChange = (slug: string) => {
    const next = selectedBrands.includes(slug)
      ? selectedBrands.filter((brand) => brand !== slug)
      : [...selectedBrands, slug];
    setSelectedBrands(next);
    updateUrl("brand", next);
  };

  function updateUrl(name: string, values: string[] | number | "") {
    const params = new URLSearchParams(searchParams.toString());
    const value = Array.isArray(values) ? values.join(",") : String(values);

    if (value) params.set(name, value);
    else params.delete(name);
    if (name !== "page") params.delete("page");

    router.replace(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
  }

  /* Keep all active filters shareable and restorable on refresh. */
  const updatePriceUrl = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (min > 0) params.set("minPrice", String(min));
    else params.delete("minPrice");
    if (max < 9000) params.set("maxPrice", String(max));
    else params.delete("maxPrice");
    params.delete("page");
    router.replace(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handlePriceFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedMin(minPrice);
    setAppliedMax(maxPrice);
    updatePriceUrl(minPrice, maxPrice);
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
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage),
  );
  const currentPage = Math.min(requestedPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const goToPage = (page: number) => {
    const nextPage = Math.max(1, Math.min(page, totalPages));
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage === 1) params.delete("page");
    else params.set("page", String(nextPage));
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
  };

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
                      {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product: Product) => (
                          <div
                            key={product._id}
                            className="col-lg-3 col-md-6 col-sm-6 col-12 shop-product-column"
                          >
                            <div className="single-shopping-card-one shop-product-card">
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
                      {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product: Product) => (
                          <div
                            key={product._id}
                            className="col-lg-6 shop-product-column"
                          >
                            <div className="single-shopping-card-one discount-offer shop-product-card">
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
              {totalPages > 1 && (
                <div
                  className="rts-pagination-area mt--40"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <nav>
                    <ul
                      className="pagination"
                      style={{
                        display: "flex",
                        gap: "6px",
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <li>
                        <button
                          className="page-link"
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          style={{
                            border: "1px solid #629D23",
                            color: "#629D23",
                            borderRadius: "4px",
                            background: "#fff",
                            padding: "6px 16px",
                            cursor:
                              currentPage === 1 ? "not-allowed" : "pointer",
                            opacity: currentPage === 1 ? 0.5 : 1,
                          }}
                        >
                          <i className="fa-regular fa-chevron-left" /> Previous
                        </button>
                      </li>
                      <li>
                        <button
                          className="page-link"
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          style={{
                            border: "1px solid #629D23",
                            color: "#629D23",
                            borderRadius: "4px",
                            background: "#fff",
                            padding: "6px 16px",
                            cursor:
                              currentPage === totalPages
                                ? "not-allowed"
                                : "pointer",
                            opacity: currentPage === totalPages ? 0.5 : 1,
                          }}
                        >
                          Next <i className="fa-regular fa-chevron-right" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
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
      <FooterThree />
    </>
  );
}
