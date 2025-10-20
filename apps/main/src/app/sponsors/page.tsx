"use client";

// import { Footer, NavBar } from "../lib/Components";
import React from "react";
import SponsorBackground from "../lib/Assets/SVG/SponsorAssets/SponsorBackground.tsx";
import { NavBar } from "../lib/Components";
import SponsorTicketComp from "../lib/Components/SponsorComponents/SponsorTicketComp.tsx";
// import SponsorTicketBoothComp from "../lib/Components/SponsorComponents/SponsorTicketBoothComp.tsx";
import useDevice from "@util/hooks/useDevice.ts";
import SponsorText from "../lib/Assets/SVG/SponsorAssets/SponsorText.tsx";

function makeSponsorRow(numSponsors: number, ticketSize: number, gap: number) {
  return (
    <div
      className="flex justify-center"
      style={{
        gap: `${gap}vw`,
      }}
    >
      {Array.from({ length: numSponsors }).map((_, i) => (
        <SponsorTicketComp
          key={i}
          isSponsorUs={false}
          ticketWidthVW={ticketSize}
        />
      ))}
    </div>
  );
}

{
  /* TODO: add sponsor logos when available by adding logoPath=String param to SponsorticketComp*/
}
export default function Page(): JSX.Element {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const bgScale = isMobile ? 3 : isTablet ? 1.2 : 1;

  return (
    <main className="flex flex-col items-center min-h-screen relative">
      <NavBar />

      <div className="relative w-full">
        {/* Background SVG */}
        <SponsorBackground
          className="w-full h-auto"
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
          <SponsorText className="w-[75vw] h-auto" />

          {/* Tickets here */}
          {isDesktop && (
            <>
              {makeSponsorRow(3, 27, 5)}
              {makeSponsorRow(4, 21, 2)}
              {makeSponsorRow(5, 17, 1)}
            </>
          )}

          {isTablet && (
            <>
              {makeSponsorRow(1, 27, 5)}
              {makeSponsorRow(2, 21, 2)}
              {makeSponsorRow(3, 17, 1)}
              {makeSponsorRow(4, 17, 1)}
            </>
          )}

          {isMobile && (
            <>
              {makeSponsorRow(1, 90, 5)}
              {makeSponsorRow(1, 90, 5)}
              {makeSponsorRow(1, 90, 5)}
              {makeSponsorRow(2, 40, 5)}
              {makeSponsorRow(2, 40, 5)}
              {makeSponsorRow(2, 35, 5)}
              {makeSponsorRow(2, 35, 5)}
              {makeSponsorRow(1, 35, 1)}
            </>
          )}

          {/*<div className="absolute left-1/2 transform -translate-x-1/2"*/}
          {/*       style={{top: '10vh'}}>*/}
          {/*    <SponsorTicketBoothComp/>*/}
          {/*  </div>*/}
        </div>
      </div>
    </main>
  );
}
