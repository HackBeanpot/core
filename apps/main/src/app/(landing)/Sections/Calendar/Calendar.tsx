"use client";

// Imports
import React, { useState } from "react";

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
        topColor={"[#EFAB57]"}
        bottomColor={"white"}
        topComponent={
          <div className="p-1">
            <p className="text-center text-white text-xl mb-[-4px]">{month}</p>
            <p className="text-center text-white text-2xl">{date}</p>
          </div>
        }
        bottomComponent={
          <div className="p-4">
            <p className="text-center text-gray-500 text-sm mb-1">
              {dayAndTime}
            </p>
            <p className="text-center text-black font-semibold">{eventName}</p>
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

export function CalendarSection(): React.ReactNode {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center text-[#B2A0C2] p-8">
        EVENTS CALENDAR
      </h1>
      <CalendarEvents calendarEvents={events} page={currentPage} />
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-2">
        <button
          onClick={handlePrev}
          className="bg-gray-800 text-white p-4 rounded-full border border-black"
        >
          Prev
        </button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-2">
        <button
          onClick={handleNext}
          disabled={currentPage * 6 >= events.length}
          className="bg-gray-800 text-white p-4 rounded-full border border-black"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// const background = <div className="w-full h-full bg-[#423350]" />;

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

const content = <CalendarSection />;

export default function Calendar(): React.ReactNode {
  return (
    <Section
      name={"calendar"}
      background={<CalendarBackground />}
      content={content}
      height={75}
    />
  );
}
