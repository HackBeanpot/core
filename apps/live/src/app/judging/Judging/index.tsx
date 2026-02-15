"use client";

import React from "react";
// import useDevice from "@util/hooks/useDevice.ts";
import JudgingLiveFireworks from "../../lib/Assets/SVG/Judging/JudgingLiveFireworks.tsx";
import CarnivalTitle from "@repo/ui/CarnivalTitle";
import JudgingInactive from "./JudgingInactive.tsx";
import JudgingActive from "./JudgingActive.tsx";
import JudgingHero from "../../lib/Assets/SVG/Judging/JudgingHero.tsx";
import JudgingTicketBooth from "../../lib/Assets/SVG/Judging/JudgingTicketBooth.tsx";

export default function Judging(): React.ReactNode {
  // const { isMobile } = useDevice();
  //   const [isJudging, setIsJudging] = useState(false);
  const isJudging = true;

  return (
    <div className="relative w-full min-h-screen bg-mossGreen">
      <JudgingHero className={`absolute w-full h-[180vh] overflow-hidden`} />

      <div className={`w-full overflow-hidden`}>
        <JudgingLiveFireworks
          className={`absolute w-full h-auto overflow-hidden`}
        />

        {isJudging ? <JudgingActive /> : <JudgingInactive />}

        <div
          className={`absolute w-full h-auto flex justify-center transition-all duration-300 ${
            isJudging ? "top-[15%]" : "top-[30%]"
          }`}
        >
          <CarnivalTitle text="Judging" className="w-[60vw]" />
        </div>

        <div
          className={`absolute bottom-[-85vh] z-[80] w-full h-auto flex justify-center overflow-hidden`}
        >
          <JudgingTicketBooth className="w-[80vw]" />
        </div>
      </div>
      {isJudging && <div className="h-[170vh]"></div>}
    </div>
  );
}
