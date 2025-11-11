"use client";

import React from "react";
import RibbonTitle from "@repo/ui/RibbonTitle";
import { VolunteeringBackground } from "../../lib/Assets/SVG";
import { VolunteeringInfoCard } from "../../lib/Components";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";

export default function Volunteering(): React.ReactNode {
  const { isMobile } = useDevice();
  const cardStyles = clsx(
    "flex-row gap-x-8",
    isMobile && "flex-col items-center gap-y-8",
  );

  const mentorInfo = {
    title: "Become a Mentor",
    content:
      "Want to be a HBP 2026 Mentor? Click to view more information about how to become a mentor!",
    url: "https://drive.google.com/file/d/1CqnEvZiVzT_v9z_DVYeTWzsmI0474LIg/view?usp=sharing",
  };
  const judgeInfo = {
    title: "Become a Judge",
    content:
      "Want to be a HBP 2026 Judge? Click to view more information about how to become a judge!",
    url: "https://drive.google.com/file/d/1U671uCJpBVy6XClP8Vsku_m0IfU55GMW/view?usp=sharing",
  };

  return (
    <div className="relative w-full mt-[10vh] p-[5vh] z-20">
      <VolunteeringBackground className="absolute inset-0 left-1/2 w-[100vw] mobile:w-[175vw] h-[60vh] mobile:h-[100vh] -translate-x-1/2" />
      <div className="relative">
        <RibbonTitle text="VOLUNTEERING" />
      </div>

      <div className={`mt-[5vh] flex ${cardStyles} justify-center relative`}>
        <VolunteeringInfoCard
          title={mentorInfo.title}
          content={mentorInfo.content}
          url={mentorInfo.url}
        />
        <VolunteeringInfoCard
          title={judgeInfo.title}
          content={judgeInfo.content}
          url={judgeInfo.url}
        />
      </div>
    </div>
  );
}
