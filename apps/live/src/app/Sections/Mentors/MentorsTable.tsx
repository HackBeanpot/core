"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

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
  const onLoadingComplete = React.useRef(null);

  console.log(JSON.stringify(data, null, 2));
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
              {record.fields.company}
            </option>
          ))}
        </select>

        <button className="rounded-[1vw] h-8 px-2 bg-[#647ACE] text-white w-32 border-[#5062A5] border-[1px] transition-transform duration-300 transform scale-100 hover:scale-[102%]">Available</button>

        <button className="rounded-[1vw] h-8 px-2 bg-[#647ACE] text-white w-32 border-[#5062A5] border-[1px] transition-transform duration-300 transform scale-100 hover:scale-[102%]">Virtual</button>
      </div>

      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        {records.map((record, index) => (
          <div
            key={index}
            className="aspect-square flex flex-col items-center justify-center p-2 rounded-lg "
          >
            <div className="w-full pb-[100%] relative overflow-hidden rounded-lg">
              <Image
                ref={onLoadingComplete}
                src={record.fields.image[0].url}
                height={record.fields.image[0].height}
                width={record.fields.image[0].width}
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
