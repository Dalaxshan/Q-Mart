import StoreBanner from "@/components/banner/StoreBanner";
import StoreLocation from "@/components/common/StoreLocation";
import ShortService from "@/components/service/ShortService";

import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";

export default function Home() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <StoreBanner />
      <StoreLocation />
      <ShortService />
      <FooterOne />
    </div>
  );
}
