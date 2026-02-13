"use client";

import React from "react";
import HBPLogo from "main/src/app/lib/Assets/SVG/Hero/LandingAssets/HBPLogo.tsx";
import CountdownTimer from "./CountdownTimer.tsx";
import UntilSubmissionsClose from "../../../lib/Assets/SVG/CarnivalLanding/UntilSubmissionsClose.tsx";

const OpeningText: React.FC = () => {
  return (
    <div className="w-96 flex flex-col justify-start items-center gap-2">
      <div className="w-full text-center text-marigoldYellow text-3xl font-bold font-['NeulisNeue-Bold']">
        Step on stage,
      </div>
      <HBPLogo className="w-96 h-auto" />
      <div className="w-full text-center text-marigoldYellow text-3xl font-bold font-['NeulisNeue-Bold']">
        is in town!{" "}
      </div>
      <CountdownTimer />
      <UntilSubmissionsClose />
    </div>
  );
};

export default OpeningText;
