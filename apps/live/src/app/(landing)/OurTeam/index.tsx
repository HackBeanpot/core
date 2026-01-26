"use client";
import React from "react";
import OurTeamGrid from "./OurTeamGrid";
import RibbonTitle from "@repo/ui/RibbonTitle";

export default function OurTeam(): React.ReactNode {
  return (
    <div className="py-24 px-48 font-NeulisNeue-Regular flex flex-col gap-8 relative">
      <RibbonTitle text={"OUR TEAM"} />
      <div className="bg-carouselCreamLight rounded-xl p-8">
        <h1 className="font-NeulisNeue-Bold text-firecrackerRed text-[24px]">
          Need to reach out to a core member?
        </h1>
        <p className="font-DM-Sans-Regular">
          Feel free to reach out to a core member via Discord if you have any
          questions or concerts about event logistics, applying to be part of
          the HBP core team, or more!
        </p>
      </div>
      <OurTeamGrid />
    </div>
  );
}
