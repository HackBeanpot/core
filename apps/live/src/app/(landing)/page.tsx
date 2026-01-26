import React from "react";
import Landing from "./Landing";
import EventSchedule from "./EventSchedule";
import MentorSection from "./Mentors";
import OurTeamBackground from "./OurTeamBackground";
import HitTheRoad from "./HitTheRoad";
import Resources from "./Resources";
import NavBar from "../lib/Components/NavBar";
import Footer from "@repo/ui/Footer";
import ComingUp from "./ComingUp/ComingUp";
import OurTeam from "./OurTeam";
import Keynote from "./Keynote";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <Landing />
      <NavBar />
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
