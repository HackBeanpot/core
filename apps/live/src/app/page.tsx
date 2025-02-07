import React from "react";
import Landing from "./Sections/Landing";
import EventSchedule from "./Sections/EventSchedule";
import MentorSection from "./Sections/Mentors";
import OurTeamBackground from "./Sections/OurTeamBackground";
import HitTheRoad from "./Sections/HitTheRoad";
import Resources from "./Sections/Resources";
import NavBar from "./lib/Components/NavBar";
import Footer from "./lib/Components/Footer";
import ComingUp from "./Sections/ComingUp/ComingUp";
import OurTeam from "./Sections/OurTeam";
import Keynote from "./Sections/Keynote";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <NavBar />
      <Landing />
      <ComingUp />
      <HitTheRoad />
      <EventSchedule />
      <Keynote />
      <MentorSection />
      <Resources />
      <OurTeam />
      <OurTeamBackground />
      <Footer />
    </main>
  );
}
