import BannerOne from "@/components/banner/BannerOne";
import FeatureOne from "@/components/feature/FeatureOne";
import DiscountProduct from "@/components/product/DiscountProduct";
import FeatureProduct from "@/components/product/FeatureProduct";
import WeeklyBestSelling from "@/components/product/WeeklyBestSelling";
import FeatureDiscount from "@/components/product/FeatureDiscount";
import TrandingProduct from "@/components/product/TrandingProduct";
import { CartProvider } from "@/components/header/CartContext";
import { WishlistProvider } from "@/components/header/WishlistContext";
import { ToastContainer, toast } from "react-toastify";
import HeaderTwo from "@/components/header/HeaderTwo";
import FooterThree from "@/components/footer/FooterThree";
import CategoryOne from "@/components/category/CategoryOne";
import { GroceryHero } from "@/components/banner/GroceryHero";
import BestDiscount from "@/components/product/BestDiscount";

export default function Home() {
  return (
    <WishlistProvider>
      <CartProvider>
        <div className="demo-one">
          <ToastContainer position="top-right" autoClose={3000} />
          <HeaderTwo />
          <GroceryHero />
          <FeatureOne />
          <FeatureProduct />
          <DiscountProduct />
          <WeeklyBestSelling />
          <FeatureDiscount />
          <TrandingProduct />
          <BestDiscount/>
          <CategoryOne />
          {/* <BlogOne /> */}
          <FooterThree />
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}
