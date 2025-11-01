"use client";

import React from "react";
import Card from "../components/Card.tsx";

import Image from "next/image";
import AboutUs from "../../lib/Assets/SVG/OurTeamPageAssets/AboutUs.png";

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
      className="relative w-full
      mobile:aspect-[3/2]
      tablet:aspect-[701/386]
      desktop:aspect-[1200/660]
      flex items-center justify-center"
    >
      <Image
        src={AboutUs}
        alt="About Us Background"
        fill
        className="absolute inset-0 object-cover -z-10"
      />
      <Card />
    </div>
  );
};

export default Sock;
