// import React from "react";
// import useAirtableData from "@repo/util/hooks/useAirtableData";
// import isSameDay from "../../../../../../packages/util/src/functions/isSameDay";
// import removeHoursFromDate from "../../../../../../packages/util/src/functions/removeHoursfromDate";

// const AIRTABLE_BASE_ID = `${process.env.SCHEDULE_BASE_ID}`;
// const AIRTABLE_SCHEDULE_TABLE_NAME = "schedule";

// type EventByDate = {
//   [date: string]: AirtableRecord[];
// };

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

// const EventScheduleTabs = async () => {
//   const { records } = await useAirtableData(
//     AIRTABLE_BASE_ID,
//     AIRTABLE_SCHEDULE_TABLE_NAME,
//     true,
//   );

//   const eventsByDate: EventByDate = records.reduce((acc, record) => {
//     const eventDate = new Date(record.fields.start_time);
//     const uniqueEventDate = removeHoursFromDate(eventDate);
//     if (!acc[uniqueEventDate.toISOString()]) {
//       acc[uniqueEventDate.toISOString()] = [];
//     }
//     acc[uniqueEventDate.toISOString()].push(record);
//     return acc;
//   }, {} as EventByDate);
//   return <></>;
// };
