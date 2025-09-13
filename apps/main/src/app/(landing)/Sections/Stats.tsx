"use client";

import React, { useEffect, useState } from "react";
import useDevice from "@repo/util/hooks/useDevice";

import TicketBooth from "../../lib/Assets/SVG/StatsPage/TicketBooth.tsx";
import TicketsBack from "../../lib/Assets/SVG/StatsPage/TicketsBack.tsx";
import TicketsFront from "../../lib/Assets/SVG/StatsPage/TicketsFront.tsx";

export default function Stats(): React.ReactNode {
  const { isMobile } = useDevice();
  const DESIGN_WIDTH = 1200;
  const DESIGN_HEIGHT = 681;
  const canvasRatio = DESIGN_HEIGHT / DESIGN_WIDTH; // ≈0.5675

  const [windowWidth, setWindowWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH
  );

  // update width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const creamHeight = windowWidth * canvasRatio; // keep same aspect ratio

  const pxToPercentW = (px: number) => `${(px / DESIGN_WIDTH) * 100}%`;
  const pxToPercentH = (px: number) => `${(px / DESIGN_HEIGHT) * 100}%`;


  return (
      <div className="w-full bg-carouselCream flex justify-center" style={{ height: creamHeight }}>
        <div className="relative w-full h-full mx-auto">

          <div
              className="absolute"
              style={{
                width: pxToPercentW(1033.693),
                height: pxToPercentH(114.141),
                top: pxToPercentH(-103),
                left: 0,
                transform: "rotate(170.42deg)",
                opacity: 1,
                transformOrigin: "bottom center",
              }}
          >
            <TicketsBack className="w-full h-full overflow-visible"/>
          </div>

          <div
              className="absolute"
              style={{
                width: pxToPercentW(1033.693),
                height: pxToPercentH(114.141),
                top: pxToPercentH(400),
                left: 0,
                transform: "translateY(75%) rotate(170.42deg)",
                opacity: 1,
                transformOrigin: "center center",
              }}
          >
            <TicketsBack className="w-full h-full overflow-visible"/>
          </div>


          <div
              className="absolute left-0 w-full"
              style={{
                top: pxToPercentH(isMobile ? 30.9 : 110),
                transform: `translateX(-12%) translateY(60%) rotate(${isMobile ? -9.58 : 9.58}deg)`,
                transformOrigin: "top center",
              }}
          >
            <TicketsFront className="w-full h-auto"/>
          </div>

          <div
              className="absolute bottom-0 right-0 Mobile-xl:hidden"
              style={{
                width: pxToPercentW(270.42),
                height: pxToPercentH(566.78),
                transform: "translateX(10%) rotate(9.62deg)",
                transformOrigin: "bottom center",
              }}
          >
            <TicketBooth className="w-full h-full" viewBox="0 0 276 568"/>
          </div>
        </div>
      </div>
  );
}
