"use client";

import React, { useRef, useState, forwardRef } from "react";

import ArrowButton from "@repo/ui/ArrowButton";
import TitleBox from "@repo/ui/TitleBox";

import useWindowSize from "@repo/util/hooks/useWindowSize";

// import CalendarBackground from "./CalendarBackground";
import EventsBackground from "../../../lib/Assets/SVG/EventsBackground";
import RockVariant2 from "../../../lib/Assets/SVG/Rocks/RockVariant2";
import RockVariant3 from "../../../lib/Assets/SVG/Rocks/RockVariant3";
import RockVariant4 from "../../../lib/Assets/SVG/Rocks/RockVariant4";
import PaginationDots from "@repo/ui/PaginationDots";

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
    eventName: "React.js Workshop",
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
    eventName: "Introduction to Data Science",
  },
  {
    month: "NOV",
    date: "22",
    dayAndTime: "Monday, 10am - 12pm",
    eventName: "React.js Workshop",
  },
  {
    month: "DEC",
    date: "5",
    dayAndTime: "Friday, 1 - 2pm",
    eventName: "Introduction to Data Science",
  },
  {
    month: "JAN",
    date: "18",
    dayAndTime: "Tuesday, 2 - 3pm",
    eventName: "JavaScript Deep Dive",
  },
];

// Determine number of columns based on window width
const getGridColumns = (width: number) => {
  if (width < 600) return 1; // Mobile
  if (width < 900) return 2;
  if (width < 2100) return 3; // Standard desktops
  if (width < 2700) return 4;
  return 5; // Large desktops
};

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
  const windowSize = useWindowSize();
  const gridRef = useRef<HTMLDivElement>(null);

  const columns = getGridColumns(windowSize.width || 0);
  const eventsPerPage = columns * 2;

  const startIndex = page * eventsPerPage;
  const displayedEvents = calendarEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  return (
    <div
      ref={gridRef}
      className="grid gap-10"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
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
export const CalendarSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [page, setPage] = useState(0);

  const windowSize = useWindowSize();
  const columns = getGridColumns(windowSize.width || 0);
  const eventsPerPage = columns * 2;
  const maxPages = Math.ceil(events.length / eventsPerPage);

  function onClickLeftArrow() {
    setPage((prevPage) => {
      const newPage = prevPage > 0 ? prevPage - 1 : maxPages - 1;
      return newPage;
    });
  }

  function onClickRightArrow() {
    setPage((prevPage) => {
      const newPage = prevPage < maxPages - 1 ? prevPage + 1 : 0;
      return newPage;
    });
  }

  function handleClick(index: number) {
    setPage(index);
  }

  return (
    <div
      className="relative flex flex-col w-full h-full items-center justify-center"
      ref={ref}
    >
      <div className="absolute inset-0 z-0">
        <EventsBackground
          height={750}
          width={1920}
          preserveAspectRatio="none"
        />
      </div>
      <h1 className="text-6xl font-bold text-center text-[#B2A0C2] p-8 mt-6 font-Wilden-Regular z-10">
        EVENTS CALENDAR
      </h1>

      <div className="relative w-full flex items-center justify-center my-8 z-20">
        <ArrowButton
          direction="left"
          arrowButtonColor="purpleButton"
          onClick={onClickLeftArrow}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-10"
        />
        <div className="h-[50vh]">
          <CalendarEvents calendarEvents={events} page={page} />
        </div>

        <ArrowButton
          direction="right"
          arrowButtonColor="purpleButton"
          onClick={onClickRightArrow}
          className="absolute right-10 top-1/2 -translate-y-1/2 z-10"
        />
      </div>

      <div className="bottom-0 z-10 w-full">
        <PaginationDots
          currentPage={page}
          totalPages={maxPages}
          color="orange"
          handleClick={handleClick}
        />
      </div>
      <div className="absolute z-10 top-0 right-64">
        <RockVariant3 />
      </div>
      <div className="absolute z-10 top-6 right-24">
        <RockVariant4 />
      </div>
      <div className="absolute z-10 -top-20 right-32">
        <RockVariant2 />
      </div>
    </div>
  );
});

CalendarSection.displayName = "CalendarSection";

export default function Calendar(): React.ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  return <CalendarSection ref={ref} />;
}
