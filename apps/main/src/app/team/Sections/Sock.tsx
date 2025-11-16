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
    <div className="relative w-full overflow-hidden pb-[33%]">
      <div className="absolute inset-0 w-full h-full">
        <JoinCoreBackground
          className="w-full h-full"
          preserveAspectRatio="none"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <Card />
      </div>
    </div>
  );
};

export default Sock;




