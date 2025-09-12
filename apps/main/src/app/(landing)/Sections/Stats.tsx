"use client";

import React from "react";
import StatsPage from "../../lib/Assets/SVG/StatsPage";
// import clsx from "clsx";
// import useDevice from "@repo/util/hooks/useDevice";

export default function Stats(): React.ReactNode {
  return (
    <div className="
          w-[90%] h-[90%]        
          tablet:w-[100%] h-auto       
          desktop:w-[100%]       
          desktop-xl:w-[100%]    
          desktop-2xl:w-[100%]   
        ">
      <StatsPage className="w-full h-auto" />
    </div>
  );
}
