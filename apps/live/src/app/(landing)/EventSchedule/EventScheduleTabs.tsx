"use client";

import React, { useEffect, useState } from "react";
import EventDropdown from "./EventDropdown";
import CodeIcon from "../../lib/Assets/SVG/Icons/expandIcon.tsx";
import FoodIcon from "../../lib/Assets/SVG/Icons/foodIcon.tsx";
import StarIcon from "../../lib/Assets/SVG/Icons/starIcon.tsx";
import ShareIcon from "../../lib/Assets/SVG/Icons/codeIcon.tsx";
import ClockIcon from "../../lib/Assets/SVG/Icons/clockIcon.tsx";
import LocationIcon from "../../lib/Assets/SVG/Icons/locationIcon.tsx";
import removeHoursFromDate from "@util/functions/removeHoursfromDate";
import useDevice from "@util/hooks/useDevice.ts";

const HappeningNow = () => (
  <div className="text-green flex items-center gap-2">
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="5" fill="green" />
    </svg>
    Now
  </div>
);

type EventByDate = {
  [date: string]: AirtableRecord[];
};

const iconTypes: Record<string, React.ComponentType> = {
  Code: CodeIcon,
  Food: FoodIcon,
  Star: StarIcon,
};

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
    iconType: string;
  };
};

export type AirtableData = {
  records: AirtableRecord[];
};

type TabProps = {
  date: Date;
  onClick: () => void;
  active: boolean;
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

const isHappeningNow = (startTime: string, endTime: string): boolean => {
  const now = new Date();
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  return startDate <= now && now <= endDate;
};

const Tab = ({ date, onClick, active }: TabProps) => {
  const { isMobile } = useDevice();
  const raised = active ? "bg-starlightBlue" : "bg-starlightBlueDark";
  return (
    <div
      key={date + "-tab"}
      onClick={onClick}
      className={`pt-2 flex  ${isMobile ? "w-[40vw]" : "w-[20vw]"} h-[10vh] justify-center ${raised} z-0 rounded-t-2xl cursor-pointer text-white hover:bg-starlightBlueLight transition-all shadow-lg hover:-translate-y-2`}
    >
      {date.toLocaleDateString("en-us", { weekday: "long" })}{" "}
    </div>
  );
};

const EventScheduleTabs = () => {
  const [data, setData] = useState<AirtableData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  async function getScheduleData() {
    setLoading(true);
    const res = await fetch("/api/airtable");

    const status = res.status;

    if (status == 200) {
      setData(await res.json());
    }
    setLoading(false);
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

  return (
    <div className="flex flex-col w-full h-[80vh] -gap-1 text-lg">
      <div className="flex flex-row ml-5 mobile:items-center translate-y-10">
        {datesSorted.map((date, index) => {
          const dateObj = new Date(date);
          const isActive = index === selectedTab;
          return (
            <Tab
              key={`${date}-tab`}
              date={dateObj}
              onClick={() => setSelectedTab(index)}
              active={isActive}
            />
          );
        })}
      </div>
      <div className="flex flex-col flex-1 bg-starlightBlue mobile:w-[145vw] p-6 rounded-2xl gap-5 max-h-full z-10">
        {loading && <div className="text-white">Loading...</div>}
        {!loading && !data && (
          <button className="text-white" onClick={getScheduleData}>
            Reload
          </button>
        )}
        {!!data && (
          <>
            <p className="px-6 text-4xl text-white">
              {new Date(datesSorted[selectedTab]).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="flex flex-col overflow-y-auto px-6 overflow-x-hidden">
              <div className="flex flex-col w-full gap-3">
                {eventsByDate &&
                  eventsByDate[datesSorted[selectedTab]]
                    .sort((a, b) => {
                      const dateA = new Date(a.fields.start_time);
                      const dateB = new Date(b.fields.start_time);
                      return dateA.getTime() - dateB.getTime();
                    })
                    .map((events) => {
                      const { fields } = events;
                      const {
                        end_time,
                        eventLocation,
                        start_time,
                        tags,
                        difficulty,
                        description,
                        eventName,
                        iconType,
                      } = fields;
                      const startTime = toTime(start_time, false);
                      const endTime = toTime(end_time, true);
                      const Icon = iconTypes["Food"];
                      const dropdownQuestion = (
                        <div className="grid grid-cols-[3fr_4fr_3fr] gap-20 items-center w-full">
                          <div className="flex flex-row gap-4 ml-4 my-2">
                            <Icon />
                            <div className="flex flex-col">
                              <p className="font-bold text-2xl">{eventName}</p>
                              <p className="font-bold text-firecrackerRed">{`${startTime} - ${eventLocation}`}</p>
                              <div className="flex items-center gap-1"></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex gap-5">
                              {isHappeningNow(start_time, end_time) && (
                                <HappeningNow />
                              )}
                              {isHappeningNow(start_time, end_time) && (
                                <HappeningNow />
                              )}
                            </div>
                          </div>
                          {difficulty && (
                            <div className="rounded-full bg-green py-1 px-4 ml-auto ">
                              {difficulty}
                            </div>
                          )}
                        </div>
                      );
                      return (
                        <EventDropdown
                          key={JSON.stringify(fields)}
                          dropdownQuestion={dropdownQuestion}
                          dropdownAnswer={description}
                          iconType="Symbol"
                        />
                      );
                    })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventScheduleTabs;
