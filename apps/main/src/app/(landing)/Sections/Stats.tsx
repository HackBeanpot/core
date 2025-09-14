"use client";

import React, { useEffect, useState } from "react";
import useDevice from "@repo/util/hooks/useDevice";

import TicketBooth from "../../lib/Assets/SVG/StatsPage/TicketBooth.tsx";
import TicketsBack from "../../lib/Assets/SVG/StatsPage/TicketsBack.tsx";
import TicketsFront from "../../lib/Assets/SVG/StatsPage/TicketsFront.tsx";

export default function Stats(): JSX.Element {
  const { isMobile } = useDevice();
  const DESIGN_WIDTH = 1200;
  const DESIGN_HEIGHT = 681;
  const canvasRatio = DESIGN_HEIGHT / DESIGN_WIDTH; // ≈0.5675

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : DESIGN_WIDTH,
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
    <div
      className="w-full bg-carouselCream flex justify-center"
      style={{ height: creamHeight }}
    >
      <div className="relative w-full h-full mx-auto ">
        {/* Back Tickets Top */}
        <div
          className="absolute"
          style={{
            width: pxToPercentW(1500),
            height: pxToPercentH(114.141),
            top: pxToPercentH(-103),
            left: 0,
            transform: "translateX(-5%) rotate(170.42deg)",
            opacity: 1,
            transformOrigin: "bottom center",
            overflow: "visible",
          }}
        >
          <TicketsBack className="w-full h-full" />
        </div>

        {/* Back Tickets Bottom */}
        <div
          className="absolute"
          style={{
            width: pxToPercentW(1500),
            height: pxToPercentH(114.141),
            top: pxToPercentH(600),
            left: 0,
            transform: "translateX(-5%) rotate(170.42deg)",
            transformOrigin: "top center",
            overflow: "visible",
          }}
        >
          <TicketsBack className="w-full h-full" />
        </div>

        {/* Front Tickets */}
        <div
          className="absolute left-0"
          style={{
            top: pxToPercentH(isMobile ? 20 : 110),
            width: "100vw", // parent fills the viewport
            overflow: "visible",
            transform: isMobile
              ? `translateX(-42%) translateY(60%) rotate(9.58deg)`
              : `translateX(-12%) translateY(60%) rotate(9.58deg)`,
            transformOrigin: "top center",
          }}
        >
          <TicketsFront
            style={{
              width: isMobile ? "145vw" : "100vw", // scale relative to viewport
              height: "auto",
              display: "block",
            }}
          />
        </div>

        {/* Ticket Booth */}
        {!isMobile && (
          <div
            className="absolute bottom-0 right-0"
            style={{
              width: pxToPercentW(270.42),
              height: pxToPercentH(566.78),
              transform: "translateX(10%) rotate(9.62deg)",
              transformOrigin: "bottom center",
            }}
          >
            <TicketBooth className="w-full h-full" viewBox="0 0 276 568" />
          </div>
        )}
      </div>
    </div>
  );
}
