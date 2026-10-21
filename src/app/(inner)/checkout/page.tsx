import HeaderOne from "@/components/header/HeaderOne";
import ShortService from "@/components/service/ShortService";
import CheckOutMain from "./CheckOutMain";
import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";

export default function Home() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <CheckOutMain />
      <ShortService />
      <FooterOne />
    </div>
  );
}
