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
    <div className={`relative w-full bg-mossGreen`}>
      {/* foreground */}
      <EventScheduleSquiggle
        className={`absolute z-20 top-0 w-full -mt-[15vh]`}
      />
      <EventBush
        className={`absolute z-40`}
        style={{
          transform: isMobile
            ? "translate(-25vw, 52vh) scale(0.45)"
            : "translate(8vw, 100vh) scale(1)",
        }}
      />
      <EventRingToss
        className={`absolute z-20`}
        style={{
          transform: isMobile
            ? "translate(50vw, 60vh) scale(0.50)"
            : "translate(75vw, 115vh) scale(1)",
        }}
      />
      {/* Content */}
      <div
        className={`relative z-30 flex flex-col items-center ${isMobile ? "h-[110vh] p-12 -mt-[25vh]" : "h-[145vh] w-full p-24"}`}
        style={{ transform: isMobile ? "scale(0.65)" : "" }}
      >
        <RibbonTitle text="EVENT SCHEDULE" />
        <div className={`${isMobile ? "" : ""}`}>
          <EventScheduleTabs />
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;
