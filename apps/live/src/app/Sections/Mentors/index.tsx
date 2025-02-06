'use client';

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@repo/ui";
import MentorsTable from "./MentorsTable";
import useContentHeight from "@util/hooks/useContentHeight";
import useWindowSize from "@util/hooks/useWindowSize";

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
    "Time Slots": Array<string>;
    Name: string;
    Image: Array<{ url: string }>;
    Expertise: Array<string>;
    Certification: string;
    LinkedIn: string;
    IsVirtual: "True" | "False";
  };
};

export type AirtableData = {
  records: AirtableRecord[];
};

const MentorSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [contentHeight] = useContentHeight(ref);
  const [data, setData] = useState<AirtableData | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/mentors");
      const jsonData: AirtableData = await res.json();
      setData(jsonData);
    }
    fetchData();
  }, []);

  if (!windowHeight || !windowWidth || !data) return;

  const MentorSectionBackground = () => {
    return (
      <div className="w-full h-full overflow-hidden pointer-events-none relative">
        <Image
          src="/MentorSectionBackground.svg"
          alt="mentorsectionbackground"
          fill
          className="object-cover"
        />
      </div>
    );
  };
  
  const MentorSectionContent = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
    return (
      <div className="py-24 px-48" ref={ref}>
        <p className="text-[clamp(3rem,7vw,7rem)] text-[#546ECD] font-bold font-Wilden drop-shadow-lg">
          Our Mentors
        </p>
        <p className="font-GT-Walsheim-Regular text-[#333333]">
          Need expert advice? Our mentors are here to help! Filter by shift,
          virtual status, expertise, or company to find the right support. Connect
          on our hackathon platform and get insights to take your project to the
          next level!
        </p>
        <MentorsTable data={data}/>
      </div>
    );
  });

  return (
    <Section
      name="mentors"
      background={<MentorSectionBackground />}
      content={<MentorSectionContent ref={ref}/>}
      height={(contentHeight / windowHeight) * 100}
    />
  );
};

export default MentorSection;
