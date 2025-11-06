"use client";

import React from "react";
import Card from "../components/Card.tsx";

import JoinCoreBackground from "../../lib/Assets/SVG/OurTeamAssets/JoinCoreBackground.tsx";

// TODO: replace png with svg once exporting issue is figured out, delete png
// import AboutUs from "../../lib/Assets/SVG/OurTeamAssets/AboutUs.tsz";

/**
 * Sock component for teams site
 * Right now AboutUs background is being exported as svg very strangely
 * Currently using png as temporary fix (same location as svg)
 */
const Sock = () => {
  return (
    <div
      className="relative w-full z-10
      mobile:aspect-[3/2]
      tablet:aspect-[701/386]
      desktop:aspect-[1600/660]
      flex items-center justify-center overflow-hidden"
    >
      <div className="absolute">
        <JoinCoreBackground preserveAspectRatio="none"/>
      </div>
      <Card />
    </div>
  );
};

export default Sock;
