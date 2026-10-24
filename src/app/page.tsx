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

export default function Home() {
  return (
    <WishlistProvider>
      <CartProvider>
        <div className="demo-one">
          <ToastContainer position="top-right" autoClose={3000} />
          <HeaderTwo />
          <BannerOne />
          <FeatureOne />
          <FeatureProduct />
          <DiscountProduct />
          <WeeklyBestSelling />
          <FeatureDiscount />
          <TrandingProduct />
          {/* <BlogOne /> */}
          <FooterThree/>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}
