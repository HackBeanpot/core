"use client";

import React from "react";
import EventScheduleTabs from "./EventScheduleTabs";
import EventScheduleSquiggle from "../../lib/Assets/SVG/EventSchedule/EventScheduleSquiggle.tsx";
import EventRingToss from "../../lib/Assets/SVG/EventSchedule/EventRingToss.tsx";
import EventBush from "../../lib/Assets/SVG/EventSchedule/EventBush.tsx";
import useDevice from "@util/hooks/useDevice";
import RibbonTitle from "@repo/ui/RibbonTitle";

const EventSchedule = () => {
  const { isMobile } = useDevice();
  return (
    <div
      className={`h-[145vh] ${isMobile ? "" : "w-full"} relative font-DMSans-Bold bg-mossGreen`}
      style={{
        transform: isMobile ? "scale(0.65)" : "",
      }}
    >
      <EventBush
        className="absolute z-50"
        style={{
          transform: isMobile
            ? "translate(-20vw, -15vh) scale(0.25)"
            : "translate(-40vw, 15vw) scale(0.20)",
        }}
      />

      <EventRingToss
        className="absolute z-50"
        style={{
          transform: isMobile
            ? "translate(-20vw, -15vh) scale(0.25)"
            : "translate(75vw, 55vw) scale(1)",
        }}
      />
      <div
        className="absolute w-full z-10"
        style={{
          transform: isMobile
            ? "translate(15vw, -15vh) scale(1.25)"
            : "translate(0vw, -20vh) scale(1.25)",
        }}
      >
        <EventScheduleSquiggle />
      </div>
      <div className="px-32 mobile:ml-8 relative flex flex-col justify-center z-40">
        <RibbonTitle text="EVENT SCHEDULE" />
        <EventScheduleTabs />
      </div>
    </div>
  );
};

export default EventSchedule;
