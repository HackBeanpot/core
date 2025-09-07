"use client";

import React, { useRef, useState, forwardRef } from "react";

import ArrowButton from "@repo/ui/ArrowButton";
import TitleBox from "@repo/ui/TitleBox";

import useWindowSize from "@repo/util/hooks/useWindowSize";

// import CalendarBackground from "./CalendarBackground";
import EventsBackground from "../../lib/Assets/SVG/EventsBackground";
import RockVariant2 from "../../lib/Assets/SVG/Rocks/RockVariant2";
import RockVariant3 from "../../lib/Assets/SVG/Rocks/RockVariant3";
import RockVariant4 from "../../lib/Assets/SVG/Rocks/RockVariant4";
import PaginationDots from "@repo/ui/PaginationDots";

// mobile check

// Calendar Events Data
const events: CalendarEventProps[] = [
  {
    month: "FEB",
    date: "07",
    dayAndTime: "Friday, 9:30 - 10:30pm",
    eventName: "Intro to Web Dev + Git",
  },
  {
    month: "FEB",
    date: "08",
    dayAndTime: "Saturday, 9 - 10am",
    eventName: "LeetCode Workshop",
  },
  {
    month: "FEB",
    date: "08",
    dayAndTime: "Saturday, 10 - 11am",
    eventName: "3D Web Dev w/ 3JS Workshop",
  },
  {
    month: "FEB",
    date: "08",
    dayAndTime: "Saturday, 11 - 12pm",
    eventName: "Social Engineering Workshop",
  },
  {
    month: "FEB",
    date: "08",
    dayAndTime: "Saturday, 1 - 2pm",
    eventName: "Machine Learning Workshop",
  },
  {
    month: "FEB",
    date: "08",
    dayAndTime: "Saturday, 5 - 6pm",
    eventName: "Bias in A.I. Models Workshop",
  },
  {
    month: "FEB",
    date: "08",
    dayAndTime: "Thursday, 7:15 - 8pm",
    eventName: "Hacker Demo Prep Workshop",
  },
  {
    month: "FEB",
    date: "09",
    dayAndTime: "Sunday, 11:30 - 1:15pm",
    eventName: "Resumes and Internships",
  },
];

// useDeviceType Hook was made my gpt
const useDeviceType = () => {
  const windowSize = useWindowSize();
  const width = windowSize.width || 0;

  // numbers got from GPT-4 avg device sizes
  const isMobile = width < 600;
  const isTablet = width >= 600 && width <= 1024;
  const isLaptop = width > 1024;

  return {
    isMobile,
    isTablet,
    isLaptop,
    isMobileOrTablet: isMobile || isTablet,
  };
};

// Determine number of columns based on window width
const getGridColumns = (width: number) => {
  if (width < 600) return 1; // Mobile
  if (width < 900) return 2;
  if (width < 2100) return 3; // Standard desktops
  if (width < 2700) return 4;
  return 5; // Large desktops
};

// rows for tablet view
const getRowsPerPage = (width: number) => {
  if (width < 1400) return 4;
  return 4;
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
  const { isMobileOrTablet } = useDeviceType();

  // phone/tablet - horizontal layout [box layout]
  if (isMobileOrTablet) {
    return (
      <div className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden max-w-[500px] w-full mx-auto h-[120px]">
        {/* date left orange */}
        <div
          className="bg-orange-400 p-6 flex flex-col items-center justify-center min-w-[120px] h-full"
          style={{ backgroundColor: "#f4ae56" }}
        >
          <p className="text-white text-lg font-semibold mb-[-4px]">{month}</p>
          <p className="text-white text-4xl font-bold">{date}</p>
        </div>

        {/* event right white */}
        <div className="flex-1 p-4 h-full flex flex-col justify-center">
          <p className="text-gray-500 text-xs mb-1">{dayAndTime}</p>
          <p className="text-gray-800 text-sm font-semibold">{eventName}</p>
        </div>
      </div>
    );
  }

  // computer - vertical layout [box layout]
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
  const { isMobileOrTablet } = useDeviceType();

  // phone/tablet - vertical layout [ literal layout ]
  if (isMobileOrTablet) {
    const rowsPerPage = getRowsPerPage(windowSize.width || 0);
    const startIndex = page * rowsPerPage;
    const displayedEvents = calendarEvents.slice(
      startIndex,
      startIndex + rowsPerPage,
    );

    return (
      <div className="flex flex-col gap-4 w-full max-w-6xl mx-auto">
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
  // computer - grid layout [literal layout ]
  const columns = getGridColumns(windowSize.width || 0);
  const eventsPerPage = columns * 2;

  const startIndex = page * eventsPerPage;
  const displayedEvents = calendarEvents.slice(
    startIndex,
    startIndex + eventsPerPage,
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
  const { isMobileOrTablet } = useDeviceType();

  // pagination based on device type [needs new heights to match figma design] ONLY IF isMobileOrTablet
  const columns = getGridColumns(windowSize.width || 0);
  const eventsPerPage = isMobileOrTablet
    ? getRowsPerPage(windowSize.width || 0)
    : columns * 2;
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
      className="relative flex flex-col w-full min-h-screen items-center justify-center overflow-hidden"
      ref={ref}
    >
      <div className="mobile:hidden tablet:block absolute z-10 top-0 right-64">
        <RockVariant3 />
      </div>
      <div className="mobile:hidden tablet:block absolute z-10 top-6 right-24 ">
        <RockVariant4 />
      </div>
      <div className="mobile:hidden tablet:block absolute z-10 -top-20 right-32">
        <RockVariant2 />
      </div>
      <div className="absolute inset-0 z-0 w-full h-full">
        <EventsBackground
          height="100%"
          width="100%"
          preserveAspectRatio="none"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-6xl font-bold text-center text-[#B2A0C2] p-8 mt-6 font-Wilden-Regular z-10">
        PREVIOUS EVENTS
      </h1>

      <div className="relative w-full flex items-center justify-center my-8 z-20 mb-16">
        {!isMobileOrTablet && (
          <ArrowButton
            direction="left"
            arrowButtonColor="purpleButton"
            onClick={onClickLeftArrow}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-10"
          />
        )}
        {/* updated pagination are only for mobile/tablet */}
        <div className={isMobileOrTablet ? "h-[55vh]" : "h-[50vh]"}>
          <CalendarEvents calendarEvents={events} page={page} />
        </div>

        {!isMobileOrTablet && (
          <ArrowButton
            direction="right"
            arrowButtonColor="purpleButton"
            onClick={onClickRightArrow}
            className="absolute right-10 top-1/2 -translate-y-1/2 z-10"
          />
        )}
      </div>

      <div className="z-10 w-full mt-8 mb-8">
        <PaginationDots
          currentPage={page}
          totalPages={maxPages}
          color="orange"
          handleClick={handleClick}
        />
      </div>

      
    </div>
  );
});

CalendarSection.displayName = "CalendarSection";

export default function Calendar(): React.ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  return <CalendarSection ref={ref} />;
}
