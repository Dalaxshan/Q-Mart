"use client";
import { useEffect, useState } from "react";
import { productApi } from "@/app/api/products/client";
import { Product } from "@/type";
import Link from "next/link";

function TrandingProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productApi.getAllProducts({
          newArrival: true,
          limit: 8,
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    void fetchProducts();
  }, []);

  return (
    <div>
      <>
        {/* rts top tranding product area */}
        <div className="top-tranding-product rts-section-gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="title-area-between">
                  <h2 className="title-left mb--10">New Arrival Products</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="cover-card-main-over">
                  <div className="row g-4">
                    {products.map((product) => {
                      const price = Number(product.price);
                      const salePrice = product.salePrice
                        ? Number(product.salePrice)
                        : NaN;
                      const hasSalePrice =
                        Number.isFinite(salePrice) && salePrice < price;
                      const discountPercentage = hasSalePrice
                        ? Math.round(((price - salePrice) / price) * 100)
                        : 0;
                      const image = product.images[0];
                      const imageSrc = image?.startsWith("http")
                        ? image
                        : `/assets/images/grocery/${image ?? ""}`;

                      return (
                        <div
                          className="col-xl-3 col-md-6 col-sm-12 col-12"
                          key={product._id}
                        >
                          <div className="single-shopping-card-one tranding-product">
                            <Link
                              href={`/shop/${product.slug}`}
                              className="thumbnail-preview"
                            >
                              {hasSalePrice && (
                                <div className="badge">
                                  <span>
                                    {discountPercentage}% <br />
                                    Off
                                  </span>
                                  <i className="fa-solid fa-bookmark" />
                                </div>
                              )}
                              <img src={imageSrc} alt={product.name} />
                            </Link>
                            <div className="body-content">
                              <Link href={`/shop/${product.slug}`}>
                                <h4 className="title">{product.name}</h4>
                              </Link>
                              <span className="availability">
                                {product.unit}
                              </span>
                              <div className="price-area">
                                <span className="current">
                                  LKR {hasSalePrice ? salePrice : price}
                                </span>
                                {hasSalePrice && (
                                  <div className="previous">LKR {price}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default TrandingProduct;
