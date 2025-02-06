"use client";

// Imports
import React, { useEffect, useState, useRef, forwardRef } from "react";

// Components
import ComingUpEvent from "./ComingUpEvent";
import { Section } from "@repo/ui";
import ComingUpBackground from "../../lib/Assets/SVG/ComingUpBackground";

// Utils
import removeHoursFromDate from "@util/functions/removeHoursfromDate";

// Hooks
import useWindowSize from "@repo/util/hooks/useWindowSize";
import useContentHeight from "@repo/util/hooks/useContentHeight";

export type AirtableRecord = {
  id: string;
  createdTime: string;
  fields: {
    end_time: string;
    eventLocation: string;
    start_time: string;
    tags: string;
    difficulty: string;
    description: string;
    eventName: string;
  };
};

export type AirtableData = {
  records: AirtableRecord[];
};

type EventByDate = {
  [date: string]: AirtableRecord[];
};

const toTime = (time: string, showAmPm: boolean): string => {
  const date = new Date(time);

  if (showAmPm) {
    return date.toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Combine hours and minutes
  const timeString = `${hours}:${minutes}`;

  return timeString;
};

const getEventStatus = (startTime: string, endTime: string): string => {
  const now = new Date();
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const timeDiff = startDate.getTime() - now.getTime(); //difference in milliseconds

  if (startDate <= now && now <= endDate) {
    return "NOW!";
  } else if (timeDiff > 0 && timeDiff <= 60 * 60 * 1000) {
    //60 min × 60 sec × 1000 ms
    return "IN 1 HOUR!";
  }
  return "COMING UP!";
};

const ComingUpContent = forwardRef<HTMLDivElement>((_, ref) => {
  const [data, setData] = useState<AirtableData | null>(null);

  async function getScheduleData() {
    const res = await fetch("/api/airtable");

    const status = res.status;

    if (status == 200) {
      setData(await res.json());
    }
  }

  useEffect(() => {
    getScheduleData();
  }, []);

  const eventsByDate =
    data?.records.reduce((acc, record) => {
      const eventDate = new Date(record.fields.start_time);
      const uniqueEventDate = removeHoursFromDate(eventDate);
      if (!acc[uniqueEventDate.toISOString()]) {
        acc[uniqueEventDate.toISOString()] = [];
      }
      acc[uniqueEventDate.toISOString()].push(record);
      return acc;
    }, {} as EventByDate) || null;

  const datesSorted = Object.keys(eventsByDate || {}).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });

  const upcomingEvents = datesSorted
  .flatMap((date) => eventsByDate?.[date] || [])
  .filter((event) => {
    const now = new Date();
    const startTime = new Date(event.fields.start_time);
    const endTime = new Date(event.fields.end_time);
    return startTime >= now || (startTime <= now && now <= endTime);
  })
  .sort((a, b) => new Date(a.fields.start_time).getTime() - new Date(b.fields.start_time).getTime()) // Sort by start time
  .slice(0, 3);

  return (
    <div ref={ref}>
      <h1 className="flex justify-center text-[clamp(3rem,6vw,7rem)] text-[#045954] font-Wilden pt-[3rem]">
        COMING UP!
      </h1>
      <div
        className={`gap-16 flex items-center justify-center flex-wrap w-full h-full content-center pr-[10rem] pl-[10rem] pt-[5rem] pb-[5rem]`}
      >
        {/* if there are no upcoming events or if its null, show no events */}
        {upcomingEvents.length == 0 || upcomingEvents == undefined ? (
          <div>
            <ComingUpEvent
              title="NO EVENTS"
              subtitle="Check back later!"
              deadline=""
              description=""
            />
          </div>
        ) : (
          upcomingEvents.map((event) => (
            <ComingUpEvent
              key={event.id}
              title={getEventStatus(
                event.fields.start_time,
                event.fields.end_time,
              )}
              subtitle={event.fields.eventName}
              deadline={`${toTime(event.fields.start_time, true)} to ${toTime(event.fields.end_time, true)}`}
              description={event.fields.description}
            />
          ))
        )}
      </div>
    </div>
  );
});

ComingUpContent.displayName = "ComingUpContent";

const ComingUp = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight } = useWindowSize();
  const [contentHeight] = useContentHeight(ref);

  const height = windowHeight ? (contentHeight / windowHeight) * 100 + 10 : 110;

  return (
    <Section
      name={"Coming Up"}
      background={<ComingUpBackground />}
      content={<ComingUpContent ref={ref} />}
      height={height}
    />
  );
};

export default ComingUp;
