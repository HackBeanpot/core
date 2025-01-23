"use client";

// Imports
import React, { useState } from "react";
import clsx from "clsx";

// Components
import { ArrowButton, Section, TitleBox } from "@repo/ui";
import CalendarBackground from "./CalendarBackground";

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
  // TODO: Make eventsPerPage dynamic
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

// Pagination Dots Component
// TODO: Move to own file?
type PaginationDotsProps = {
  currentPage: number;
  totalPages: number;
};

const PaginationDots: React.FC<PaginationDotsProps> = ({
  currentPage,
  totalPages,
}) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <div
          key={index}
          className={clsx(
            "w-4 h-4 rounded-full cursor-pointer",
            currentPage === index + 1
              ? "bg-orange" // Highlight current page
              : "bg-orange opacity-40",
          )}
        />
      ))}
    </div>
  );
};

// Calendar Section Component
export function CalendarSection(): React.ReactNode {
  const [page, setPage] = useState(1); // 1 index pagination

  const maxPages = Math.ceil(events.length / 6);

  function onClickLeftArrow() {
    setPage((prevPage) => {
      const newPage = prevPage > 1 ? prevPage - 1 : 1;
      return newPage;
    });
  }

  function onClickRightArrow() {
    setPage((prevPage) => {
      const newPage = prevPage < maxPages ? prevPage + 1 : maxPages;
      return newPage;
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center text-[#B2A0C2] p-8 mt-6 mb-3 font-Wilden-Regular">
        EVENTS CALENDAR
      </h1>
      <ArrowButton
        direction="left"
        arrowButtonColor="purpleButton"
        onClick={onClickLeftArrow}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 z-2"
      />
      <ArrowButton
        direction="right"
        arrowButtonColor="purpleButton"
        onClick={onClickRightArrow}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 z-2"
      />
      <CalendarEvents calendarEvents={events} page={page} />
      <div className="absolute bottom-7 w-full">
        <PaginationDots currentPage={page} totalPages={maxPages} />
      </div>
    </div>
  );
}

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
