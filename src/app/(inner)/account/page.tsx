"use client";
import HeaderOne from "@/components/header/HeaderOne";
import ShortService from "@/components/service/ShortService";
import Accordion from "./Accordion";
import FooterOne from "@/components/footer/FooterOne";
import HeaderTwo from "@/components/header/HeaderTwo";

export default function Home() {
  return (
    <div className="demo-one">
      <HeaderTwo />

      <>
        <Accordion />
      </>

      <ShortService />
      <FooterOne />
    </div>
  );
}
