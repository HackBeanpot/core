import { Footer, NavBar } from "../lib/Components";
import React from "react";
import Teams from "./Sections/Teams";
import Landing from "./Sections/Landing";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <NavBar />
      <Landing />
      <Teams />
      <Footer />
    </main>
  );
}
