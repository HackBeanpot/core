"use client";

import React, { useState, useEffect } from "react";
import useDevice from "@util/hooks/useDevice.ts";
import { InfoCard } from "../../components";
import { ItemName } from "../../components/InfoCard/icons";
// import { DropDown } from "./DropDown";

export type JudgingScheduleRecord = {
  id: string;
  createdTime: string;
  fields: {
    groupName: string;
    eventLocation: string;
    start_time: string;
  };
};

export type JudgingSchedule = {
  records: JudgingScheduleRecord[];
};

export default function JudgingActive(): React.ReactNode {
  const { isMobile } = useDevice();
  const [judgingInfo, setJudgingInfo] = useState<JudgingSchedule | null>(null);
  // const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  async function getJudgingSchedule() {
    const res = await fetch("/api/judgingSchedule");
    const jsonData: JudgingSchedule = await res.json();
    const status = res.status;

    if (status == 200) {
      setJudgingInfo(jsonData);
    }
  }

  useEffect(() => {
    const fetchJudgingSchedule = async () => {
      await getJudgingSchedule();
    };

    void fetchJudgingSchedule();
  }, []);

  const locationMap: Record<string, string[]> = {};
  judgingInfo?.records.forEach((record) => {
    const { eventLocation, groupName, start_time } = record.fields;
    if (!locationMap[eventLocation]) {
      locationMap[eventLocation] = [];
    }
    locationMap[eventLocation].push(`${groupName} - ${start_time}`);
  });

  const locationMapSorted: Record<string, string[]> = {};
  Object.keys(locationMap).forEach((location) => {
    locationMap[location].sort((a: string, b: string) => {
      const toMinutes = (time: string) => {
        const [h, m] = time.match(/\d+/g)!.map(Number);
        const pm = /pm/.test(time) && h !== 12;
        const am = /am/.test(time) && h === 12;
        return (h + (pm ? 12 : 0) - (am ? 12 : 0)) * 60 + m;
      };
      return toMinutes(a) - toMinutes(b);
    });
    locationMapSorted[location] = locationMap[location];
  });

  return (
    <div className="mt-16 min-h-screen">
      <h1
        className="absolute w-full grid grid-cols-1 justify-items-center"
        style={{
          fontSize: isMobile ? "2.8vw" : "1.7vw",
          top: isMobile ? "27%" : "22%",
        }}
      >
        <span className="text-marigoldYellow font-NeulisNeue-Bold text-center w-full">
          Step right up and see your judging details!
        </span>
        <span className="text-white font-DMSans-Bold text-[0.9em] text-center w-full">
          Please show up 5 minutes before your assigned time.
        </span>
      </h1>

      {/* insert cards */}
      <div className="absolute top-[37%] left-1/2 -translate-x-1/2 z-20">
        <div className="relative flex flex-col items-center gap-24">
          <div className="flex justify-center gap-24">
            <InfoCard
              heading="Charlestown"
              text={locationMapSorted["Charlestown"] || ["No judging info available"]}
              icon={ItemName.CottonCandy}
              size="[30vw]"
            />
            <InfoCard
              heading="South Boston"
              text={
                locationMapSorted["South Boston"] || ["No judging info available"]
              }
              icon={ItemName.Popcorn}
              size="[30vw]"
            />
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-[55%] z-10 flex justify-center gap-6">
        <InfoCard
          heading="Beacon Hill"
          text={locationMapSorted["Beacon Hill"] || ["No judging info available"]}
          icon={ItemName.HotDog}
          size="[30vw]"
        />
        {/* <InfoCard
          heading="Room #4"
          text={[
            "DevSpace – 1:00pm",
            "Memora – 1:10pm",
            "CapyCrew – 1:20pm",
            "Coffee Bean’s Last Road Trip – 1:30pm",
          ]}
          icon={ItemName.IceCream}
          size="[30vw]"
        /> */}
      </div>

      {/* insert bottom bar */}
      <div className="absolute top-[73%] left-1/2 -translate-x-1/2 z-30">
        <div className="w-[calc(60vw+1.5rem)] bg-carouselCreamLight rounded-2xl p-6 shadow-md">
          <div className="flex flex-col gap-2 text-left">
            <span className="text-firecrackerRed text-[1.6vw] font-NeulisNeue-Bold">
              First time Demoing?
            </span>

            <span className="text-charcoalFog font-DMSans-Regular text-[1vw] leading-relaxed">
              Check the resources section for a demoing guide and feel free to
              reach out to a core member via Discord if you have any questions
              or concerns about demo logistics! Good luck!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
