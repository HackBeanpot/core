import React from "react";
import EventSchedule from "./EventSchedule";
import MentorSection from "./Mentors";
import Welcome from "./Welcome";
import Resources from "./Resources";
import NavBar from "../lib/Components/NavBar";
import Footer from "@repo/ui/Footer";
import OurTeam from "./OurTeam";
import Keynote from "./Keynote";
import CabinRace from "./CabinRace/CabinRace.tsx";
import SponsorFeature from "./SponsorFeature.tsx";
import CarnivalScene from "./CarnivalLanding/CarnivalScene.tsx";
import Sponsors from "./Sponsors.tsx";
import Sock from "./Sock.tsx";
export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <NavBar />
      <CarnivalScene />
      <SponsorFeature />
      <Welcome />
      <Resources />
      <EventSchedule />
      <CabinRace />
      <Keynote />
      <MentorSection />
      <OurTeam />
      <Sponsors />
      <Sock />
      <Footer />
    </main>
  );
}
