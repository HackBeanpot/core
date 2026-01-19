"use client";

import React from "react";
import SponsorBackground from "../lib/Assets/SVG/SponsorAssets/SponsorBackground.tsx";
import { Footer, NavBar } from "../lib/Components";
import SponsorTicketComp from "./components/SponsorTicketComp.tsx";
import SponsorTicketBoothComp from "./components/SponsorTicketBoothComp.tsx";
import useDevice from "@util/hooks/useDevice.ts";
import SponsorText from "../lib/Assets/SVG/SponsorAssets/SponsorText.tsx";

function makeSponsorRow(
  ticketSizes: number[],
  logos?: string[], // array of logo paths
) {
  return (
    <div
      className="flex justify-center"
      style={{
        gap: `${ticketSizes.length > 1 ? 2 : 5}vw`,
      }}
    >
      {ticketSizes.map((width, i) => (
        <SponsorTicketComp
          key={i}
          isSponsorUs={false}
          logoPath={logos?.[i] ?? ""}
          ticketWidthVW={width}
        />
      ))}
    </div>
  );
}

{
  /* TODO: add sponsor logos when available by adding logoPath=String param to SponsorticketComp
   *  example is to feed row ['path1', 'path2', 'path3']
   *  probs can change makeSponsorRow better but later
   */
}
export default function Page(): JSX.Element {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const bgScale = isMobile ? 3.1 : isTablet ? 1.2 : 1;
  const boothPosition = isMobile ? "115%" : "165%";
  const boothWidth = isMobile ? 90 : isTablet ? 80 : 70;

  return (
    <main className="flex flex-col items-center min-h-screen relative">
      <NavBar />
      <div className="relative w-full mobile:mb-[250vw] tablet:mb-[20vw] desktop-xl:mb-[0vw] desktop:mb-[0vw]">
        {/* Background SVG */}
        <SponsorBackground
          className="w-full h-auto -mb-[1vh]"
          style={{
            transform: `scaleY(${bgScale})`,
            transformOrigin: "top",
          }}
        />

        {/* Stuff on top of bg SVG */}
        <div
          className="flex flex-col items-center text-white absolute top-0 left-0 w-full"
          style={{ paddingTop: "12vw", gap: "5vw" }}
        >
          {/* Sponsors text */}
          <SponsorText />

          {/* Tickets here */}
          <div className="relative w-full flex flex-col items-center">
            <div
              className="relative z-10 flex flex-col items-center"
              style={{ rowGap: "2vw" }}
            >
              {/* Desktop */}
              {isDesktop && (
                <>
                  {makeSponsorRow([27, 27, 27])}
                  {makeSponsorRow([21, 21, 21, 21])}
                  {makeSponsorRow([17, 17, 17, 17, 17])}
                </>
              )}

              {/* Tablet */}
              {isTablet && (
                <>
                  {makeSponsorRow([27])}
                  {makeSponsorRow([21, 21])}
                  {makeSponsorRow([17, 17, 17])}
                  {makeSponsorRow([17, 17, 17, 17])}
                </>
              )}

              {/* Mobile */}
              {isMobile && (
                <>
                  {makeSponsorRow([90])}
                  {makeSponsorRow([90])}
                  {makeSponsorRow([90])}
                  {makeSponsorRow([40, 40])}
                  {makeSponsorRow([40, 40])}
                  {makeSponsorRow([35, 35])}
                  {makeSponsorRow([35, 35])}
                  {makeSponsorRow([35])}
                </>
              )}
            </div>

            {/* Ticket booth positioned around bg */}
            <div
              className="absolute z-20 w-full flex justify-center"
              style={{
                top: boothPosition,
                transform: "translateY(-50%)",
              }}
            >
              <SponsorTicketBoothComp widthVW={boothWidth} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full items center tablet:-mt-[20vw]">
        <Footer />
      </div>
    </main>
  );
}
