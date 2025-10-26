"use client";

import React from "react";
import CloudBackground from "../../Assets/SVG/SponsorUsAssets/CloudBackground";
import TopClouds from "../../Assets/SVG/SponsorUsAssets/TopClouds";
// import RibbonTitle from "@repo/ui/RibbonTitle";

export default function SponsorUsBenefitCardComp() {
  return (
    <div className="relative aspect-square w-full overflow-visible">
      <TopClouds className="absolute top-0 z-10 w-[100vw]" />
      <CloudBackground 
        className="absolute bottom-0 w-[100vw] h-auto z-0"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
}
