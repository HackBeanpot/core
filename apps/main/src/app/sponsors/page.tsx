"use client";

// import { Footer, NavBar } from "../lib/Components";
import React from "react";
import SponsorBackground from "../lib/Assets/SVG/SponsorAssets/SponsorBackground.tsx";
import { NavBar } from "../lib/Components";
import SponsorTicketComp from "../lib/Components/SponsorComponents/SponsorTicketComp.tsx";
import SponsorTicketBoothComp from "../lib/Components/SponsorComponents/SponsorTicketBoothComp.tsx";

{
  /* TODO: add sponsor logos when available by adding logoPath=String param to SponsorticketComp*/
}
export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen relative">
      <NavBar />

      <div>
        <SponsorBackground></SponsorBackground>
        <SponsorTicketComp isSponsorUs={false}></SponsorTicketComp>
      </div>

      <SponsorTicketBoothComp />
    </main>
  );
}
