import React from "react";
import Landing from "./Sections/Landing";
import EventSchedule from "./Sections/EventSchedule";
import OurTeamBackground from "./Sections/OurTeamBackground";
import HitTheRoad from "./Sections/HitTheRoad";
import Resources from "./Sections/Resources";
import NavBar from "./lib/Components/NavBar";
import Footer from "./lib/Components/Footer";

        
export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <NavBar />
      <Landing />
      <HitTheRoad />
      <EventSchedule />
      <Resources />
      <OurTeamBackground />
      <Footer />
    </main>
  );
}
