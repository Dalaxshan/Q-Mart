import ShortService from "@/components/service/ShortService";
import CheckOutMain from "./CheckOutMain";
import FooterThree from "@/components/footer/FooterThree";
import HeaderTwo from "@/components/header/HeaderTwo";

export default function Home() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <CheckOutMain />
      <ShortService />
         <FooterThree/>
    </div>
  );
}
