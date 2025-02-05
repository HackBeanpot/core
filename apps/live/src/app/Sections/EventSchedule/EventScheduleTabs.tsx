"use client";

import React, { useEffect, useState } from "react";
import removeHoursFromDate from "../../../../../../packages/util/src/functions/removeHoursfromDate";
import { FAQDropdown } from "@repo/ui";
import LocationDot from "../../lib/Assets/SVG/LocationDot";

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
  const raised = active ? "drop-shadow-md bg-grapePurple" : "bg-darkerPurple";
  return (
    <div
      key={date + "-tab"}
      onClick={onClick}
      className={`pt-5 flex w-[3vw] h-full justify-center ${raised} rounded-l-2xl cursor-pointer text-white hover:bg-grapePurple`}
    >
      {date.toLocaleDateString("en-us", { weekday: "short" })}
      <br />
      {date.getDate()}
      <br />
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
    <div className="flex flex-row w-full h-[80vh] gap-1 text-lg">
      <div className="flex flex-col h-full">
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
      <div className="flex flex-col flex-1 bg-grapePurple w-full p-6 rounded-r-2xl gap-5 max-h-full">
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
                      } = fields;
                      const startTime = toTime(start_time, false);
                      const endTime = toTime(end_time, true);
                      const dropdownQuestion = (
                        <div className="grid grid-cols-[2fr_5fr_3fr] gap-20 items-center w-full">
                          <div>
                            <p className="text-xl font-bold">{`${startTime} - ${endTime}`}</p>
                            <div className="flex items-center gap-1">
                              <LocationDot /> {eventLocation}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-light text-tomato">
                              {tags}
                            </div>
                            <div className="flex gap-5">
                              <p className="text-2xl font-bold">{eventName}</p>
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
                        <FAQDropdown
                          key={JSON.stringify(fields)}
                          dropdownQuestion={dropdownQuestion}
                          dropdownAnswer={description}
                          iconType="Chevron"
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
