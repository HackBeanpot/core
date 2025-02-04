"use client"

import React, { useEffect, useState } from "react";
import ComingUpEvent from "./ComingUpEvent";
import { Section } from "@repo/ui";
import ComingUpBackground from "../../lib/Assets/SVG/ComingUpBackground";
import removeHoursFromDate from "@util/functions/removeHoursfromDate";


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

const isHappeningNow = (startTime: string, endTime: string): boolean => {
  const now = new Date();
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  return startDate <= now && now <= endDate;
};


const ComingUpContent = () => {
  const [data, setData] = useState<AirtableData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
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

      const upcomingEvents = datesSorted
      .flatMap((date) => eventsByDate?.[date] || []) // Flatten all events into a single array
      .filter((event) => {
        const now = new Date();
        const startTime = new Date(event.fields.start_time);
        const endTime = new Date(event.fields.end_time);
        return startTime >= now || (startTime <= now && now <= endTime); // Include events that are happening now
      })
      .slice(0, 3);

      console.log(upcomingEvents)
    
  return (
    <div>
      <h1 className="flex justify-center text-[clamp(3rem,6vw,7rem)] text-[#045954] font-Wilden pt-[3rem]">COMING UP!</h1>
      <div className={`flex items-center ${upcomingEvents.length == 0 ? 'justify-center' : 'justify-between'} w-full h-full content-center pr-[10rem] pl-[10rem] pt-[5rem]`}>
        {(upcomingEvents.length == 0 || upcomingEvents == undefined) ? 
        <div>
          {/* <h1 className="flex justify-center items-center text-black text-2xl mb-1">NO EVENTS</h1>  */}
          <ComingUpEvent title="NO EVENTS" subtitle="Check back later!" deadline="" description=""/>
        </div>
          :
          
          upcomingEvents.map((event) => (
          <ComingUpEvent
            key={event.id}
            title={'NOW'}
            subtitle={event.fields.eventName}
            deadline={event.fields.end_time}
            description={event.fields.description}
            // key={idx}
            // title={'NOW'}
            // subtitle={'subtitle'}
            // deadline={'deadline'}
            // description={'description'}
          />
        ))
        }
      </div>
    </div>
  );
};

const ComingUp = () => {
  // API call to fetch data

  // Filter 3 most recent events

  // Decide if event is happening now
  // return (
  //     <ComingUpEvent />
  // )

  return (
    <Section
      name={"calendar"}
      //   foreground={foreground}
      background={<ComingUpBackground />}
      content={<ComingUpContent />}
      height={100}
    />
  );
};

export default ComingUp;
