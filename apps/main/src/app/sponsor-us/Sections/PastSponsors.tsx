"use client";

import React from "react";
import useDevice from "@util/hooks/useDevice.ts";

import SponsorBackground from "../../lib/Assets/SVG/SponsorUsAssets/NavyBackground.tsx";
import RibbonTitle from "@repo/ui/RibbonTitle";
import SponsorTicketComp from "../../lib/Components/SponsorComponents/SponsorTicketComp.tsx";
import clsx from "clsx";
import GoogleLogo from "../../lib/Assets/SVG/SponsorUsAssets/Logos/google.svg";
import CarGurusLogo from "../../lib/Assets/SVG/SponsorUsAssets/Logos/cargurus.svg";
import MetaLogo from "../../lib/Assets/SVG/SponsorUsAssets/Logos/meta.svg";
import DatadogLogo from "../../lib/Assets/SVG/SponsorUsAssets/Logos/datadog.svg";
import SimplisafeLogo from "../../lib/Assets/SVG/SponsorUsAssets/Logos/simplisafe.svg";
import WoodMacLogo from "../../lib/Assets/SVG/SponsorUsAssets/Logos/woodmak.svg";
import YelpLogo from "../../lib/Assets/SVG/SponsorUsAssets/Logos/yelp.svg";
import VMwareLogo from "../../lib/Assets/SVG/SponsorUsAssets/Logos/vmware.svg";
import ToastLogo from "../../lib/Assets/SVG/SponsorUsAssets/Logos/toast.svg";


const desktopRows: string[][] = [
  [GoogleLogo, CarGurusLogo, MetaLogo, DatadogLogo],
  [SimplisafeLogo, WoodMacLogo, YelpLogo],
  [VMwareLogo, ToastLogo],
];

const tabletRows: string[][] = [
  [GoogleLogo, CarGurusLogo],
  [MetaLogo, DatadogLogo],
  [SimplisafeLogo, WoodMacLogo],
  [YelpLogo, VMwareLogo],
  [ToastLogo],
];

const mobileRows: string[][] = [
  [GoogleLogo],
  [CarGurusLogo],
  [MetaLogo],
  [DatadogLogo],
  [SimplisafeLogo],
  [WoodMacLogo],
  [YelpLogo],
  [VMwareLogo],
  [ToastLogo],
];

// generate single row of tickets
function makeSponsorRow(
  ticketWidthVW: number,
  logos: string[],
  logoSizes: number[]
) {
  return (
    <div
      className="flex justify-center"
      style={{ gap: `${logos.length > 1 ? 2 : 5}vw` }}
    >
      {logos.map((logo, i) => (
        <SponsorTicketComp
          key={i}
          logoPath={logo}
          isSponsorUs={false}
          ticketWidthVW={ticketWidthVW}
          logoWidth={logoSizes[i]}
        />
      ))}
    </div>
  );
}

export default function PastSponsors(): JSX.Element {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const bgScale = isMobile ? 3.75 : isTablet ? 1 : 0.75;

  const ribbonStyles = clsx(
    `${isMobile ? "transform scale-[0.65]" : ""}`,
    isMobile && "mt-12 mb-6",
    isTablet && "mt-16 mb-6",
    isDesktop && "mt-20 mb-20"
  );

  return (
    <div className="relative w-full flex flex-col mobile:h-[180vh] mobile-xl:h-[180vh] desktop:h-[100vh]">
      {/* Background burst */}
      <div
        className=" h-auto flex justify-center"
      >
        <SponsorBackground
          className="w-full h-auto -mb-[1vh]"
          style={{
            transform: `scaleY(${bgScale})`,
            transformOrigin: "top",
          }}
        />
      </div>

      {/* Content overlay */}
      <div
        className="absolute top-0 left-0 w-full flex flex-col items-center text-white"
        
      >
        <div className={ribbonStyles}>
          <RibbonTitle text="PAST SPONSORS" />
        </div>

        {/* Ticket Rows */}
        <div className=" relative w-full flex flex-col items-center">
          <div
            className="relative z-10 flex flex-col items-center"
            style={{ rowGap: "2vw" }}
          >
            {/* Desktop: 4 / 3 / 2 */}
            {isDesktop && (
              <>
                {makeSponsorRow(20, desktopRows[0], [150, 150, 150, 100])}
                {makeSponsorRow(20, desktopRows[1], [150, 150, 150])}
                {makeSponsorRow(20, desktopRows[2], [150, 100])}
              </>
            )}

            {/* Tablet */}
            {isTablet && (
              <>
                {makeSponsorRow(28, tabletRows[0], [150, 150])}
                {makeSponsorRow(28, tabletRows[1], [150, 100])}
                {makeSponsorRow(28, tabletRows[2], [150, 150])}
                {makeSponsorRow(28, tabletRows[3], [150, 150])}
                {makeSponsorRow(28, tabletRows[4], [100])}
              </>
            )}

            {/* Mobile */}
            {isMobile && (
              <>
                {makeSponsorRow(75, mobileRows[0], [150])}
                {makeSponsorRow(75, mobileRows[1], [150])}
                {makeSponsorRow(75, mobileRows[2], [150])}
                {makeSponsorRow(75, mobileRows[3], [100])}
                {makeSponsorRow(75, mobileRows[4], [150])}
                {makeSponsorRow(75, mobileRows[5], [150])}
                {makeSponsorRow(75, mobileRows[6], [150])}
                {makeSponsorRow(75, mobileRows[7], [150])}
                {makeSponsorRow(75, mobileRows[8], [100])}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
