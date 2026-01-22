"use client";

import React from "react";
import SponsorText from "../lib/Assets/SVG/SponsorAssets/SponsorText.tsx";
import SponsorBackground from "../lib/Assets/SVG/SponsorAssets/SponsorBackground.tsx";
import { Footer, NavBar } from "../lib/Components";
import { SponsorTicketComp, SponsorTicketBoothComp } from "../lib/Components";
import useDevice from "@util/hooks/useDevice.ts";
import AWSLogo from "@repo/ui/Logos/AWSLogo.svg";
import CodeCraftersLogo from "@repo/ui/Logos/CodeCraftersLogo.svg";
import FlagLogicLogo from "@repo/ui/Logos/FlagLogicLogo.svg";
import KlaviyoLogo from "@repo/ui/Logos/KlaviyoLogo.svg";
import MavenAGILogo from "@repo/ui/Logos/MavenAGILogo.svg";
import RGLogo from "@repo/ui/Logos/RGLogo.svg";
import WhoopLogo from "@repo/ui/Logos/WhoopLogo.svg";
import PureButton from "@repo/ui/Logos/PureButton.svg";

function makeSponsorRow(
  ticketSizes: number[],
  logos?: string[], // array of logo paths
  logoSizes?: number[], // array og logo sizes in vw
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
          logoWidth={logoSizes?.[i] ?? 50}
        />
      ))}
    </div>
  );
}

export default function Page(): JSX.Element {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const bgScale = isMobile ? 2 : isTablet ? 1.1 : 1;
  const boothPosition = isMobile ? "155%" : "135%";
  const boothWidth = isMobile ? 90 : isTablet ? 80 : 70;

  const logos = [
    [AWSLogo, MavenAGILogo],
    [KlaviyoLogo],
    [WhoopLogo, RGLogo],
    [CodeCraftersLogo, FlagLogicLogo, PureButton],
  ];

  return (
    <main className="flex flex-col items-center min-h-screen relative">
      <NavBar />
      <div className="relative w-full mobile:mb-[120vw] tablet:mb-[20vw] desktop-xl:mb-[0vw] desktop:mb-[0vw]">
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
          style={{ paddingTop: "12vw" }}
        >
          {/* Sponsors text */}
          <SponsorText />

          {/* Tickets here */}
          <div className="relative w-full flex flex-col items-center mt-[-5%]">
            <div
              className="relative z-10 flex flex-col items-center"
              style={{ rowGap: "2vw" }}
            >
              {/* Desktop */}
              {isDesktop && (
                <>
                  {makeSponsorRow([30, 30], logos[0], [250, 250])}
                  {makeSponsorRow([25], logos[1], [175])}
                  {makeSponsorRow([21, 21], logos[2], [200, 100])}
                  {makeSponsorRow([17, 17, 17], logos[3], [200, 200, 200])}
                </>
              )}

              {/* Tablet */}
              {isTablet && (
                <>
                  {makeSponsorRow([30, 30], logos[0], [150, 150])}
                  {makeSponsorRow([25], logos[1], [125])}
                  {makeSponsorRow([21, 21], logos[2], [115, 115])}
                  {makeSponsorRow([17, 17, 17], logos[3], [120, 120, 120])}
                </>
              )}

              {/* Mobile */}
              {isMobile && (
                <>
                  {makeSponsorRow([45, 45], logos[0], [85, 110])}
                  {makeSponsorRow([40], logos[1], [75])}
                  {makeSponsorRow([30, 30], logos[2], [115, 45])}
                  {makeSponsorRow([25, 25, 25], logos[3], [85, 85, 85])}
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
