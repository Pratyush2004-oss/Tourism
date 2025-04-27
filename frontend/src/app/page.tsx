import AboutUs from "@/components/shared/AboutUs";
import { Landing } from "@/components/shared/Landing";
import Packages from "@/components/shared/Packages";
import React from "react";

function page() {
  return (
    <div>
      <Landing />
      <Packages />
      <AboutUs/>
    </div>
  );
}

export default page;
