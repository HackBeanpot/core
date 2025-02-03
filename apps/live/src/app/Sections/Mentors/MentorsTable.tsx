"use client";

import React, { useEffect, useState } from "react";

export type AirtableImage = {
  id: string;
  width: number;
  height: number;
  url: string;
};

export type AirtableRecord = {
  id: string;
  createdTime: string;
  fields: {
    company: string;
    exptertise: Array<string>;
    image: AirtableImage[];
    name: string;
    shift: Array<string>;
    shiftEnd: Array<string>;
    shiftStart: Array<string>;
    slack: string;
  };
};

export type AirtableData = {
  records: AirtableRecord[];
};

const MentorsTable = () => {
  const [data, setData] = useState<AirtableData>({ records: [] });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/mentors");
      const jsonData: AirtableData = await res.json();
      setData(jsonData);
    }
    fetchData();
  }, []);

  const { records } = data;
  console.log(records[0]);
  return (
    <div>
      {/* buttons */}
      <div className="flex flex-row gap-4">
        <select className="rounded-md border-2 border-[#eaeaea]">
          <option value="" selected disabled hidden>
            Company
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

        <div className="w-48">
          <select className="rounded-md border-2 border-[#eaeaea] select-none w-full">
            {" "}
            act
            <option value="All" selected>
              All
            </option>
            {records.map((record, index) => (
              <option
                key={index}
                style={{ whiteSpace: "normal", overflowWrap: "break-word" }}
              >
                {record.fields.company}
              </option>
            ))}
          </select>
        </div>

        <button>Available</button>

        <button>Virtual</button>
      </div>

      <div className="grid grid-cols-5 grid-rows-2 gap-4 p-4">
        {records.map((record, index) => (
          <div
            key={index}
            className="aspect-square flex flex-col items-center justify-center p-2 rounded-lg "
          >
            <div className="w-full pb-[100%] relative overflow-hidden rounded-lg">
              <img
                src={record.fields.image[0].url}
                alt={record.id}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
            <a className="mt-2 text-sm font-medium truncate w-full">
              {record.fields.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsTable;
