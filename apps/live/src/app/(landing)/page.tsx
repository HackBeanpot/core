import React from "react";
import Landing from "./Landing";
import EventSchedule from "./EventSchedule";
import MentorSection from "./Mentors";
import Welcome from "./Welcome";
// import HitTheRoad from "./HitTheRoad";
import Resources from "./Resources";
import NavBar from "../lib/Components/NavBar";
import Footer from "@repo/ui/Footer";
// import ComingUp from "./ComingUp/ComingUp";
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
      <Landing />
      <NavBar />
      {/*<ComingUp />*/}
      {/*<HitTheRoad />*/}
      <CarnivalScene />
      <SponsorFeature />
      <Welcome />
      <EventSchedule />
      <CabinRace />
      <Keynote />
      <MentorSection />
      <Resources />
      <OurTeam />
      <Sponsors />
      <Sock />
      <Footer />
    </main>
  );
}
