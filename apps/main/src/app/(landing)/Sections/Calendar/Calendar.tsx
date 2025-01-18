"use client";

// Imports
import React from "react";

// Components
import { Section, TitleBox } from "@repo/ui";
import CalendarBackground from "./CalendarBackground";

// Calendar Event Component
type CalendarEventProps = {
  month: string;
  date: string;
  dayAndTime: string;
  eventName: string;
};

export function CalendarEvent({
  month,
  date,
  dayAndTime,
  eventName,
}: CalendarEventProps): React.ReactNode {
  return (
    <div className="flex justify-center items-center">
      <TitleBox
        topColor="orange"
        bottomColor="white"
        topComponent={
          <div className="p-1">
            <p className="text-center text-white text-xl mb-[-4px] font-GT-Walsheim-Regular">
              {month}
            </p>
            <p className="text-center text-white text-3xl font-GT-Walsheim-Regular">
              {date}
            </p>
          </div>
        }
        bottomComponent={
          <div className="p-4">
            <p className="text-center text-[#A6A6A6] text-sm mb-1 font-GT-Walsheim-Regular">
              {dayAndTime}
            </p>
            <p className="text-center text-[#4D4D4D] text-lg font-semibold font-GT-Walsheim-Regular">
              {eventName}
            </p>
          </div>
        }
        height="h-[12rem]"
        width="w-[17rem]"
      />
    </div>
  );
}

// Calendar Event Grid Component
type CalendarEventsProps = {
  calendarEvents: CalendarEventProps[];
  page: number;
};

export function CalendarEvents({
  calendarEvents,
  page,
}: CalendarEventsProps): React.ReactNode {
  // TODO: Pagination
  const eventsPerPage = 6;
  const startIndex = (page - 1) * eventsPerPage;
  const displayedEvents = calendarEvents.slice(
    startIndex,
    startIndex + eventsPerPage,
  );

  return (
    <div className="grid grid-cols-3 gap-10 sm:grid-cols-1 max-w-screen-lg mx-auto px-8">
      {displayedEvents.map((event, index) => (
        <CalendarEvent
          key={index}
          month={event.month}
          date={event.date}
          dayAndTime={event.dayAndTime}
          eventName={event.eventName}
        />
      ))}
    </div>
  );
}

// Calendar Section Component
export function CalendarSection(): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center text-[#B2A0C2] p-8 mt-6 mb-3 font-Wilden-Regular">
        EVENTS CALENDAR
      </h1>
      <CalendarEvents calendarEvents={events} page={1} />
    </div>
  );
}

// Calendar Events Data
const events: CalendarEventProps[] = [
  {
    month: "OCT",
    date: "05",
    dayAndTime: "Thursday, 9 - 10pm",
    eventName: "Introduction to Web Development",
  },
  {
    month: "OCT",
    date: "05",
    dayAndTime: "Thursday, 9 - 10pm",
    eventName: "Introduction to Web Development",
  },
  {
    month: "OCT",
    date: "05",
    dayAndTime: "Thursday, 9 - 10pm",
    eventName: "Introduction to Web Development",
  },
  {
    month: "OCT",
    date: "05",
    dayAndTime: "Thursday, 9 - 10pm",
    eventName: "Introduction to Web Development",
  },
  {
    month: "OCT",
    date: "09",
    dayAndTime: "Monday, 5 - 6pm",
    eventName: "Databases for Developers",
  },
  {
    month: "OCT",
    date: "10",
    dayAndTime: "Tuesday, 4 - 5pm",
    eventName: "Intro to Git and Version Control",
  },
  {
    month: "OCT",
    date: "11",
    dayAndTime: "Wednesday, 3 - 4pm",
    eventName: "Full Stack Development Overview",
  },
  {
    month: "OCT",
    date: "12",
    dayAndTime: "Thursday, 9 - 10pm",
    eventName: "Introduction to Web Development",
  },
  {
    month: "OCT",
    date: "10",
    dayAndTime: "Tuesday, 4 - 5pm",
    eventName: "Intro to Git and Version Control",
  },
  {
    month: "OCT",
    date: "11",
    dayAndTime: "Wednesday, 3 - 4pm",
    eventName: "Full Stack Development Overview",
  },
  {
    month: "OCT",
    date: "12",
    dayAndTime: "Thursday, 9 - 10pm",
    eventName: "Introduction to Web Development",
  },
];

export default function Calendar(): React.ReactNode {
  return (
    <Section
      name={"calendar"}
      background={<CalendarBackground />}
      content={<CalendarSection />}
      height={85}
    />
  );
}
