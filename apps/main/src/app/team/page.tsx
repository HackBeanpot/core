"use client";

import { Footer, NavBar } from "../lib/Components";
import React from "react";
import Teams from "./Sections/Teams";
import Sock from "./Sections/Sock";
import Hero from "../lib/Assets/SVG/OurTeamAssets/hero";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <NavBar />
      <Hero />
      <Teams />
      <Sock />
      <div className="w-full -mt-8">
        <Footer />
      </div>
    </main>
  );
}
