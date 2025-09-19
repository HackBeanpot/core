import { Footer, NavBar } from "../lib/Components";
import React from "react";
import Teams from "./Sections/Teams";
import Landing from "./Sections/Landing";
import Sock from "./Sections/Sock";
import Hero from "../lib/Assets/SVG/OurTeamAssets/hero";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <NavBar />
      <Hero />
      <Landing />
      <Teams />
      <Sock />
      <Footer />
    </main>
  );
}
