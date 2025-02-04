import React from "react";
import Landing from "./Sections/Landing";
import EventSchedule from "./Sections/EventSchedule";
import MentorSection from "./Sections/Mentors";

import Resources from "./Sections/Resources";
import NavBar from "./lib/Components/NavBar";
import Footer from "./lib/Components/Footer";
        
export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <NavBar />
      <Landing />
      <EventSchedule />
      <MentorSection />
      <Resources />
      <Footer />

    </main>
  );
}
