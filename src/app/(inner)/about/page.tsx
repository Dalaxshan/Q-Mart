
import AboutBanner from "@/components/banner/AboutBanner";
import CounterOne from "@/components/counterup/CounterOne";
import AboutOne from "@/components/about/AboutOne";
import Team from "@/components/about/Team";
import ServiceOne from "@/components/service/ServiceOne";
import TestimonilsOne from "@/components/testimonials/TestimonilsOne";
import ShortService from "@/components/service/ShortService";

import FooterThree from "@/components/footer/FooterThree";

export default function Home() {
    return (
        <div className="demo-one">
            <AboutBanner />
            <CounterOne/>
            <AboutOne/>
            <Team/>
            <ServiceOne/>
            <TestimonilsOne/>
            <ShortService/>



               <FooterThree/>

        </div>
    );
}
