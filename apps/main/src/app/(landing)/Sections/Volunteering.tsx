"use client";

import React from "react";
import RibbonTitle from "@repo/ui/RibbonTitle";
import { VolunteeringBackground } from "../../lib/Assets/SVG";
import { VolunteeringInfoCard } from "../../lib/Components";

export default function Volunteering(): React.ReactNode {
  const mentorInfo = {
    title: "Become a Mentor",
    content:
      "Want to be a HBP 2026 Mentor? Click to view more information about how to become a mentor!",
    url: "https://forms.gle/ctezfrwxrqawzB2j7",
  };
  const judgeInfo = {
    title: "Become a Judge",
    content:
      "Want to be a HBP 2026 Judge? Click to view more information about how to become a judge!",
    url: "https://forms.gle/ctezfrwxrqawzB2j7",
  };
  return (
    <div className="relative w-full p-[5vh] z-20">
      <VolunteeringBackground className="absolute inset-0 w-full h-full top-[25%]" />
      <RibbonTitle text="VOLUNTEERING" />
      <div className="mt-[5vh] flex flex-row justify-center gap-x-8 relative z-30">
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
