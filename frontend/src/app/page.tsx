import AboutUs from "@/components/shared/AboutUs";
import { Landing } from "@/components/shared/Landing";
import Packages from "@/components/shared/Packages";
import Services from "@/components/shared/Services";
import { CAROUSELIMAGE } from "@/services/Options";
import React from "react";

function page() {
  return (
    <div>
      <Landing IMAGES={CAROUSELIMAGE} />
      <Packages />
      <Services/>
      <AboutUs/>
    </div>
  );
}

export default page;
