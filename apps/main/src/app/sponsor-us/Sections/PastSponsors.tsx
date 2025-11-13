"use client";

import React from "react";
import useDevice from "@util/hooks/useDevice.ts";

import SponsorBackground from "../../lib/Assets/SVG/SponsorUsAssets/NavyBackground.tsx";
import RibbonTitle from "@repo/ui/RibbonTitle";
import SponsorTicketComp from "../../lib/Components/SponsorComponents/SponsorTicketComp.tsx";
import SponsorTicketBoothComp from "../../lib/Components/SponsorComponents/SponsorTicketBoothComp.tsx";
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
function makeSponsorRow(ticketWidthVW: number, logos: string[]) {
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
        />
      ))}
    </div>
  );
}

export default function PastSponsors(): JSX.Element {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const bgScale = isMobile ? 3.1 : isTablet ? 1.2 : 1;
  const boothPosition = isMobile ? "115%" : "165%";
  const boothWidth = isMobile ? 90 : isTablet ? 80 : 70;

  const ribbonStyles = clsx(
    "w-1/2 flex justify-center",
    isMobile && "mt-12 mb-6",
    isTablet && "mt-16 mb-6",
    isDesktop && "mt-20 mb-6"
  );

  return (
    <div className="relative w-full">
      {/* Background burst */}
      <div
        className="w-full h-auto"
        style={{
          transform: `scaleY(${bgScale})`,
          transformOrigin: "top",
        }}
      >
        <SponsorBackground />
      </div>

      {/* Content overlay */}
      <div
        className="absolute top-0 left-0 w-full flex flex-col items-center text-white"
        style={{ paddingTop: "12vw", gap: "5vw" }}
      >
        <div className={ribbonStyles}>
          <RibbonTitle text="Past Sponsors" />
        </div>

        {/* Ticket Rows */}
        <div className="relative w-full flex flex-col items-center">
          <div
            className="relative z-10 flex flex-col items-center"
            style={{ rowGap: "2vw" }}
          >
            {/* Desktop: 4 / 3 / 2 */}
            {isDesktop &&
              desktopRows.map((row, i) => (
                <React.Fragment key={`desktop-${i}`}>
                  {makeSponsorRow(20, row)}
                </React.Fragment>
              ))}

            {/* Tablet */}
            {isTablet &&
              tabletRows.map((row, i) => (
                <React.Fragment key={`tablet-${i}`}>
                  {makeSponsorRow(28, row)}
                </React.Fragment>
              ))}

            {/* Mobile */}
            {isMobile &&
              mobileRows.map((row, i) => (
                <React.Fragment key={`mobile-${i}`}>
                  {makeSponsorRow(75, row)}
                </React.Fragment>
              ))}
          </div>

          {/* Ticket Booth */}
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
  );
}
