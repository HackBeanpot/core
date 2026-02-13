"use client";

import React, { useEffect, useRef, useState } from "react";
import Section from "@repo/ui/Section";
import RibbonTitle from "@repo/ui/RibbonTitle";
import MentorsTable from "./MentorsTable";
import useContentHeight from "@util/hooks/useContentHeight";
import useWindowSize from "@util/hooks/useWindowSize";
import DarkGreenSquiggle from "../../lib/Assets/SVG/DarkGreenSquiggle";

export type AirtableImage = {
  id: string;
  width: number;
  height: number;
  url: string;
};

export type MentorData = {
  id: string;
  createdTime: string;
  fields: {
    "Time Slots": Array<string>;
    Name: string;
    Image: Array<AirtableImage>;
    Expertise: Array<string>;
    discord: string;
  };
};

export type AirtableData = {
  records: MentorData[];
};

const MentorSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [contentHeight] = useContentHeight(ref);
  const [data, setData] = useState<AirtableData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/mentors`);
      const jsonData: AirtableData = await res.json();
      setData(jsonData);
    }
    fetchData();
  }, []);

  if (!windowHeight || !windowWidth || !data) return;

  const MentorSectionContent = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
      <div
        className="py-24 px-48 flex flex-col items-center gap-10 overflow-x-hidden"
        ref={ref}
        id="mentors"
      >
        <DarkGreenSquiggle className="absolute -top-32 w-full" />

        <div className="scale-100">
          <RibbonTitle text="OUR MENTORS" />
        </div>
        <div className="flex flex-col bg-carouselCreamLight rounded-3xl gap-2 drop-shadow-[0_6px_0px_rgba(0,0,0,0.25)] p-8 max-w-4xl w-full">
          <h1 className="font-NeulisNeue-Bold text-firecrackerRed text-[24px]">
            Need expert advice?
          </h1>
          <p className="font-DM-Sans-Regular text-[#333333]">
            Our mentors are here to help! Filter by shift, virtual status,
            expertise, or company to find the right support. Connect on our
            hackathon platform and get insights to take your project to the next
            level!
          </p>
        </div>
        {/* Mentor listing (renders when Airtable data available) */}
        <MentorsTable data={data} />
      </div>
    );
  });

  MentorSectionContent.displayName = "MentorSectionContent";

  return (
    <Section
      name="mentors"
      background={<div className="bg-mossGreenDark h-full w-full"></div>}
      content={<MentorSectionContent ref={ref} />}
      height={(contentHeight / windowHeight) * 100}
    />
  );
};

export default MentorSection;
