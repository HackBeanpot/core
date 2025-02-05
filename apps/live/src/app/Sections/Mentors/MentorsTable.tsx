"use client";

import isTimeRange from "@util/functions/isTimeRange";
import React, { useEffect, useState } from "react";
// import Image from "next/image";

const date = new Date();

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
    Availability: string;
    Email: string;
    TimeSlots: Array<string>;
    Name: string;
    Image: Array<{ url: string }>;
    Expertise: Array<string>;
    Certification: string;
    LinkedIn: string;
  };
};

export type AirtableData = {
  records: AirtableRecord[];
};

export type FilterableSkill = "POSTGRES" | "REACT" | "PYTHON";

export type Filters = {
  skills: Set<FilterableSkill>;
  avalibility: boolean;
  virtual: boolean;
};

const MentorsTable = () => {
  const [data, setData] = useState<AirtableData>({ records: [] });

  const [activeFilter, setActiveFilter] = useState<Filters>({
    skills: new Set(),
    avalibility: false,
    virtual: false,
  });

  const [hasFilter, setHasFilter] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/mentors");
      const jsonData: AirtableData = await res.json();
      setData(jsonData);
    }
    fetchData();
  }, []);

  // checking if current filter is default or not. if default it means dont have to do any filtering logic.
  useEffect(() => {
    setHasFilter(
      activeFilter.avalibility !== false ||
        activeFilter.virtual !== false ||
        activeFilter.skills.size !== 0,
    );
  }, [activeFilter]);

  const { records } = data;
  console.log(records[0]);
  return (
    <div>
      {/* buttons */}
      <div className="flex flex-row gap-4 font-GT-Walsheim-Regular py-4">
        <select className="rounded-[1vw] border-2 border-[#eaeaea] select-none h-8 px-2">
          <option value="default" selected disabled hidden>
            Expertise
          </option>
          {records.map((record, index) => (
            <option
              key={index}
              style={{ whiteSpace: "normal", overflowWrap: "break-word" }}
            >
              {record.fields.Name}
            </option>
          ))}
        </select>

        <button className="rounded-[1vw] h-8 px-2 bg-[#647ACE] text-white w-32 border-[#5062A5] border-[1px] transition-transform duration-300 transform scale-100 hover:scale-[102%]">
          Available
        </button>

        <button
          className="rounded-[1vw] h-8 px-2 bg-[#647ACE] text-white w-32 border-[#5062A5] border-[1px] transition-transform duration-300 transform scale-100 hover:scale-[102%]"
          onClick={() => {
            setActiveFilter({
              ...activeFilter,
              virtual: !activeFilter.virtual,
            });
          }}
        >
          Virtual
        </button>
      </div>

      <div className="grid grid-cols-5 grid-rows-2 gap-4 p-4">
        {records
          .filter((filtered) => {
            if (!hasFilter) {
              return true;
            }

            let virtual = false;
            let hasSkills = false;
            let isAvailable = false;
            for (let i = 1; i < filtered.fields.TimeSlots.length; i++) {
              isAvailable =
                isTimeRange(filtered.fields.TimeSlots[i], date) || isAvailable;
            }

            for (let i = 1; i < filtered.fields.Expertise.length; i++) {
              const cleanedSkill = filtered.fields.Expertise[i]
                .trim()
                .toUpperCase();

              hasSkills =
                activeFilter.skills.has(cleanedSkill as FilterableSkill) ||
                hasSkills;
            }

            virtual = activeFilter.virtual;

            return virtual && hasSkills && isAvailable;
          })

          .map((record, index) => (
            <div
              key={index}
              className="aspect-square flex flex-col items-center justify-center p-2 rounded-lg "
            >
              <div className="w-full pb-[100%] relative overflow-hidden rounded-lg">
                <img
                  src={record.fields.Image[0].url}
                  alt={record.id}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <a className="mt-2 text-sm font-medium truncate w-full">
                {record.fields.Name}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MentorsTable;
