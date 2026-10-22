"use client";
import { useEffect, useState } from "react";
import DiscountProductMain from "@/components/product-main/DiscountProductMain";
import { Product } from "@/type";
import { productApi } from "@/app/api/products/route";
interface PostType {
  category?: string;
  slug: string;
  image: string;
  title?: string;
  author?: string;
  publishedDate?: string;
  price?: string;
}

function DiscountProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await productApi.getAllProducts({
          featured: true,
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    void fetchProducts();
  }, []);

  const postIndicesSection1 = [1, 5, 6, 4];

  // Helper function to get posts from indices
  const getPostsByIndices = (indices: number[]): Product[] =>
    indices.map((index) => products[index]).filter(Boolean);

  // Prepare post groups
  const postsSection1 = getPostsByIndices(postIndicesSection1);

  return (
    <div>
      {/* rts grocery feature area start */}
      <div className="rts-grocery-feature-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left">Products With Discounts</h2>
                
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="product-with-discount">
                <div className="row g-5">
                  <div className="col-xl-4 col-lg-12">
                    <a
                      href="shop-details.html"
                      className="single-discount-with-bg"
                    >
                      <div className="inner-content">
                        <h4 className="title">
                          Alpro Organic Flavored <br />
                          Fresh Juice
                        </h4>
                        <div className="price-area">
                          <span>Only</span>
                          <h4 className="title">LKR 2500.00</h4>
                        </div>
                      </div>
                    </a>
                    <a
                      href="shop-details.html"
                      className="single-discount-with-bg bg-2"
                    >
                      <div className="inner-content">
                        <h4 className="title">
                          Alpro Organic Flavored <br />
                          Fresh Juice
                        </h4>
                        <div className="price-area">
                          <span>Only</span>
                          <h4 className="title">LKR 1500.00</h4>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col-xl-8 col-lg-12">
                    <div className="row g-4">
                      {postsSection1.map((post: Product, index: number) => (
                        <div key={index} className="col-lg-6">
                          <div className="single-shopping-card-one discount-offer">
                            <DiscountProductMain
                              Slug={post.slug}
                              ProductImage={post.images[0]}
                              ProductTitle={post.name}
                              Price={post.price}
                              SalePrice={post.salePrice}
                              Unit={post.unit}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts grocery feature area end */}
    </div>
  );
}

export default DiscountProduct;
