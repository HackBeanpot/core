import React from "react";
import { Section } from "@repo/ui";
import EventScheduleRoad from "../../lib/Assets/SVG/EventScheduleRoad";
import EventScheduleTabs from "./EventScheduleTabs";

const EventScheduleBackground = () => {
  return (
    <div className="bg-orange h-full">
      <EventScheduleRoad />
    </div>
  );
};

const EventScheduleContent = async () => {
  return (
    <div className="py-24 px-48 font-GT-Walsheim-Bold">
      <div className="flex flex-col py-10 text-xl gap-10">
        <div className="flex items-center justify-between">
          <p className="text-[clamp(3rem,7vw,7rem)] text-granolaLite font-bold font-Wilden">
            Event Schedule
          </p>
        </div>
        <p className="text-white text-xl font-GT-Walsheim-Regular">
          Dates and times are displayed in your local timezone. Schedule in EST
          can be found here. The password for all Zoom meetings can be found
          pinned in the #announcements Slack channel. Please be sure to attend
          all events labeled &quot;Everyone&quot;.
        </p>
      </div>
      <EventScheduleTabs />
    </div>
  );
};

const EventSchedule = () => {
  return (
    <Section
      name="schedule"
      background={<EventScheduleBackground />}
      content={<EventScheduleContent />}
      height={125}
    />
  );
};

export default EventSchedule;
