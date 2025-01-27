"use client";

import React, { useEffect, useState } from "react";
import removeHoursFromDate from "../../../../../../packages/util/src/functions/removeHoursfromDate";
import { FAQDropdown } from "@repo/ui";

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

const Tab = ({ date, onClick, active }: TabProps) => {
  const raised = active ? "drop-shadow-md" : "";
  return (
    <div
      key={date + "-tab"}
      onClick={onClick}
      className={`pt-5 flex w-[3vw] h-[20vh] justify-center ${raised} rounded-l-lg bg-green cursor-pointer`}
    >
      {date.toLocaleDateString("en-us", { weekday: "short" })}
      <br />
      {date.getDate()}
      <br />
    </div>
  );
};

const EventScheduleTabs = () => {
  const [data, setData] = useState<AirtableData>({ records: [] });
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/airtable");
      const jsonData: AirtableData = await res.json();
      setData(jsonData);
    }
    fetchData();
  }, []);

  if (!data.records.length) return <div>Loading...</div>;

  const { records } = data;

  const eventsByDate: EventByDate = records.reduce((acc, record) => {
    const eventDate = new Date(record.fields.start_time);
    const uniqueEventDate = removeHoursFromDate(eventDate);
    if (!acc[uniqueEventDate.toISOString()]) {
      acc[uniqueEventDate.toISOString()] = [];
    }
    acc[uniqueEventDate.toISOString()].push(record);
    return acc;
  }, {} as EventByDate);

  const datesSorted = Object.keys(eventsByDate).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="flex flex-row w-full h-full gap-3 text-lg">
      <div className="flex flex-col">
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
      <div className="h-full w-full">
        {eventsByDate[datesSorted[selectedTab]].map((events) => {
          const { fields } = events;
          // const { end_time,
          //   eventLocation,
          //   start_time,
          //   tags,
          //   difficulty,
          //   description,
          //   eventName } = fields;
          return (
            <FAQDropdown
              key={JSON.stringify(fields)}
              dropdownQuestion={<></>}
              dropdownAnswer={<></>}
              iconType="Chevron"
            />
          );
        })}
      </div>
    </div>
  );
};

export default EventScheduleTabs;
