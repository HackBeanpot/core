import React from "react";
import Landing from "./Sections/Landing";
import EventSchedule from "./Sections/EventSchedule";
import Resources from "./Sections/Resources";
import NavBar from "./lib/Components/NavBar";
import Footer from "./lib/Components/Footer";
import ComingUp from "./Sections/ComingUp/ComingUp";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <NavBar />
      <Landing />
      <ComingUp />
      <EventSchedule />
      <Resources />
      <Footer />
    </main>
  );
}
