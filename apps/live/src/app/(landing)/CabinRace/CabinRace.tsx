"use client";

import React, { useEffect, useMemo, useState } from "react";
import RibbonTitle from "@repo/ui/RibbonTitle";
import useDevice from "@util/hooks/useDevice.ts";
import {
  CabinRaceRedAirBalloon,
  CabinRaceSquiggle,
} from "../../lib/Assets/SVG";
import CabinRaceCard from "../../components/CabinRaceComponents/CabinRaceCard.tsx";
import { Cabin, CabinLead } from "./CabinTypes.tsx";
import CabinRaceScoreTent from "../../components/CabinRaceComponents/CabinRaceScoreTent.tsx";

{
  /* Airtable */
}
export type CabinInfoRecord = {
  id: string;
  createdTime: string;
  fields: {
    Name: string;
    points: number;
    Description?: string;
    cabinLeads?: string[];
    "Points Tally"?: string[];
    "CabinLead Title"?: string;
  };
};

export type CabinInfo = {
  records: CabinInfoRecord[];
};

export type CabinLeadRecord = {
  id: string;
  createdTime: string;
  fields: {
    Name?: string;
    src?: string;
    url?: string;
    cabinPoints?: string[];
  };
};

export type CabinLeadInfo = {
  records: CabinLeadRecord[];
};

export default function CabinRace(): JSX.Element {
  const { isDesktop, isTablet } = useDevice();

  const [cabinData, setCabinData] = useState<CabinInfo | null>(null);

  async function getCabinPoints() {
    const res = await fetch("/api/cabinPoints");
    const jsonData: CabinInfo = await res.json();
    const status = res.status;

    if (status == 200) {
      setCabinData(jsonData);
    }
  }

  useEffect(() => {
    const fetchCabins = async () => {
      await getCabinPoints();
    };

    void fetchCabins();
  }, []);

  const [cabinLeads, setCabinLeads] = useState<CabinLeadRecord[]>([]);

  useEffect(() => {
    if (!cabinData) return;

    const leadIds = cabinData.records.flatMap(
      (record) => record.fields.cabinLeads ?? [],
    );

    if (!leadIds.length) return;

    const fetchLeads = async () => {
      const res = await fetch(`/api/cabinLeads?ids=${leadIds.join(",")}`);
      const data: CabinLeadInfo = await res.json();
      setCabinLeads(data.records);
    };

    void fetchLeads();
  }, [cabinData]);

  const fetchedCabins = useMemo<Cabin[]>(() => {
    if (!cabinData) return [];

    const leadsById: Record<string, CabinLead> = Object.fromEntries(
      cabinLeads.map((lead) => [
        lead.id,
        {
          name: lead.fields.Name ?? "",
          src: lead.fields.src ?? "",
          url: lead.fields.url ?? "",
          cabinPoints: lead.fields.cabinPoints ?? [],
        },
      ]),
    );

    return cabinData.records.map((record) => ({
      name: record.fields.Name,
      points: record.fields.points,
      description: record.fields.Description ?? "",
      cabinLeads: (record.fields.cabinLeads ?? [])
        .map((id) => leadsById[id])
        .filter((lead): lead is CabinLead => Boolean(lead)),
      cabinLeadTitle: record.fields["CabinLead Title"] ?? "",
    }));
  }, [cabinData, cabinLeads]);

  const cabinsByName: Record<string, Cabin> = Object.fromEntries(
    fetchedCabins.map((cabin) => [cabin.name, cabin]),
  );
  const cabinNames: string[] = fetchedCabins.map((cabin) => cabin.name);
  const [selectedCabinName, setSelectedCabinName] = useState<string | null>(
    null,
  );
  useEffect(() => {
    if (cabinNames.length && !selectedCabinName) {
      setSelectedCabinName(cabinNames[0]);
    }
  }, [cabinNames, selectedCabinName]);

  return (
    <>
      <div className="relative w-full bg-mossGreenDark flex flex-col items-center gap-[3vw] py-[6vw]">
        {/* Squiggle at top */}
        <CabinRaceSquiggle
          className={`absolute top-0 w-full -mt-[10vw]`}
        ></CabinRaceSquiggle>

        {/* Ribbon Title */}
        <div className={`relative w-[60vw] h-auto`}>
          <RibbonTitle text={"CABIN RACE"}></RibbonTitle>
        </div>

        {/* Welcome Hackers Text*/}
        <div
          className={`relative flex flex-col 
              rounded-2xl bg-carouselCreamLight
              justify-center px-6
              ${isDesktop ? "w-[60vw] h-[20vw]" : isTablet ? "w-[80vw] min-h-[40vw]" : "w-[60vw] min-h-[40vh]"}`}
        >
          <p
            className={`text-firecrackerRed font-DMSans-Bold
            ${isDesktop ? "text-[2vw]" : isTablet ? "text-[3vw]" : "text-[4vw]"}`}
          >
            Welcome to the carnival, hackers!
          </p>
          <div
            className={`flex w-full gap-4 ${isDesktop ? "flex-row" : "flex-col"}`}
          >
            <p
              className={`text-charcoalFogDark font-DMSans-Regular
              ${isDesktop ? "text-[1.3vw]" : isTablet ? "text-[2vw]" : "text-[3vw]"}`}
            >
              Aside from hacking away and building an amazing project, you’re
              also here to have fun — and what better way to do that than with
              friends? In preparation for the carnival, you’ll be grouped into a
              guild of performers who are interested in the same activities as
              you.
            </p>
            <p
              className={`text-charcoalFogDark font-DMSans-Regular
              ${isDesktop ? "text-[1.3vw]" : isTablet ? "text-[2vw]" : "text-[3vw]"}`}
            >
              <span className="font-DMSans-Bold">
                Complete activities together
              </span>{" "}
              with your guild members to earn points and possibly win some cool
              prizes! Most importantly, make some new friends who you can enjoy
              the event with! All the while, you’ll be enjoying{" "}
              <span className="font-DMSans-Bold">free food</span>, learning new
              tricks from <span className="font-DMSans-Bold">workshops</span>,
              and building your professional skills at{" "}
              <span className="font-DMSans-Bold">career events</span>.
            </p>
          </div>
        </div>

        {/* Cabin Info Section*/}
        {/* Buttons section */}
        <div className="flex flex-wrap gap-3 justify-center z-30 p-6">
          {cabinNames.map((name) => {
            const isSelected = selectedCabinName === name;
            return (
              <button
                key={name}
                onClick={() => setSelectedCabinName(name)}
                className={`px-[clamp(0.75rem,3vw,1.4rem)]
                      py-[clamp(0.4rem,2vw,0.8rem)]
                      rounded-[clamp(0.4rem,0.8vw,0.6rem)]
                      text-[clamp(0.75rem,1.2vw,1rem)]
                      font-DMSans-Bold
                      transition-all duration-200
                      shadow-lg
                      hover:-translate-y-2
                      hover:bg-canopyGreen
                      hover:text-[#DEFFB8]
                      ${
                        isSelected
                          ? "bg-canopyGreen text-[#DEFFB8]"
                          : "bg-mossGreen text-charcoalFog"
                      }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Card + balloons */}
        <div
          className="relative mx-auto"
          style={{
            width: isDesktop ? "60vw" : isTablet ? "55vw" : "90vw",
            height: "auto",
          }}
        >
          {/* Cabin card */}
          {selectedCabinName && cabinsByName[selectedCabinName] && (
            <div
              className="relative z-10"
              style={{ transform: isDesktop ? "translateX(8rem)" : "none" }}
            >
              <CabinRaceCard cabinInfo={cabinsByName[selectedCabinName]} />
            </div>
          )}

          {/* Balloons */}
          {isDesktop && (
            <CabinRaceRedAirBalloon
              className="absolute w-[18vw] h-auto top-0"
              style={{ transform: "translateX(clamp(-6rem, -6.5vw, 5rem))" }}
            />
          )}
          {isTablet && (
            <CabinRaceRedAirBalloon
              className="absolute z-20 w-[15vw] top-0 h-auto"
              style={{ transform: "translateX(50vw)" }}
            />
          )}
        </div>
        <CabinRaceScoreTent cabinInfo={fetchedCabins}></CabinRaceScoreTent>
      </div>
    </>
  );
}
