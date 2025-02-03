import React from "react";
import Landing from "./Sections/Landing";
import EventSchedule from "./Sections/EventSchedule";
import MentorSection from "./Sections/Mentors";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <Landing />
      <EventSchedule />
      <MentorSection />
    </main>
  );
}
