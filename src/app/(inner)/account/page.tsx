"use client";
import ShortService from "@/components/service/ShortService";
import Accordion from "./Accordion";
import FooterThree from "@/components/footer/FooterThree";
import HeaderTwo from "@/components/header/HeaderTwo";

export default function Home() {
  return (
    <div className="demo-one">
      <HeaderTwo />

      <>
        <Accordion />
      </>

      <ShortService />
         <FooterThree/>
    </div>
  );
}
