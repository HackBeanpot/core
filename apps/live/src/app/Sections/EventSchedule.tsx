import React from "react";
import { Section } from "@repo/ui";
import EventScheduleRoad from "../lib/Assets/SVG/EventScheduleRoad";

const EventScheduleBackground = () => {
  return (
    <div className="bg-orange h-full">
      <EventScheduleRoad />
    </div>
  );
};

const EventScheduleContent = () => {
  return (
    <div className="p-24">
      <p className="text-[clamp(3rem,7vw,7rem)] text-granolaLite font-bold font-Wilden">
        Event Schedule
      </p>
    </div>
  );
};

const EventSchedule = () => {
  return (
    <Section
      name="Event Schedule"
      background={<EventScheduleBackground />}
      content={<EventScheduleContent />}
      height={180}
    />
  );
};

export default EventSchedule;
