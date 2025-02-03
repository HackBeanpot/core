import React from "react";
import Landing from "./Sections/Landing";
import EventSchedule from "./Sections/EventSchedule";
import HitTheRoad from "./Sections/HitTheRoad";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center">
      <Landing />
      <HitTheRoad />
      <EventSchedule />
    </main>
  );
}
