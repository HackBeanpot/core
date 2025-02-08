import React from "react";
import { Section, Heading, Body } from "@repo/ui";
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
    <div className="m-[5vw]">
      <div className="flex flex-col py-10 gap-10">
        <div className="flex items-center justify-between">
          <Heading className="text-granolaLite">
            Event Schedule
          </Heading>
        </div>
        <Body className="text-white">
          Dates and times are displayed in your local timezone. Schedule in EST
          can be found here. The password for all Zoom meetings can be found
          pinned in the #announcements Slack channel. Please be sure to attend
          all events labeled &quot;Everyone&quot;.
        </Body>
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
      height={140}
    />
  );
};

export default EventSchedule;
