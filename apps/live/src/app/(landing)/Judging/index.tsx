"use client";

import React from "react";
import useDevice from "@util/hooks/useDevice.ts";
import JudgingTicketBooth from "../../lib/Assets/SVG/Judging/JudgingTicketBooth.tsx"
import JudgingLiveBackground from "../../lib/Assets/SVG/Judging/JudgingLiveBackground.tsx";
import JudgingLiveFireworks from "../../lib/Assets/SVG/Judging/JudgingLiveFireworks.tsx";
import FrontGreenWave from "../../lib/Assets/SVG/Judging/FrontGreenWave.tsx";
import JudgingRoad from "../../lib/Assets/SVG/Judging/JudgingRoad.tsx";
import FrontBush from "../../lib/Assets/SVG/Judging/FrontBush.tsx";
import BackBush from "../../lib/Assets/SVG/Judging/BackBush.tsx";
import CarnivalTitle from "@repo/ui/CarnivalTitle";

export default function Judging(): React.ReactNode {
    const { isMobile} = useDevice();
  
    return (
      <div className="relative w-full min-h-screen z-10 bg-mossGreen">
        <JudgingLiveBackground className = {`absolute inset-0 w-full h-auto overflow-hidden`}/>
        
        <div className={`relative w-full overflow-hidden ${
            isMobile ? "aspect-[1]" : "aspect-[1]"
          }`}>

        <JudgingLiveFireworks className = {`absolute inset-0 w-full h-auto overflow-hidden`}/>
        
        <h1
            className="absolute left-1/2 -translate-x-1/2 font-NeulisNeue-Bold text-marigoldYellow flex flex-col items-center"
            style={{
                fontSize: isMobile ? "2.8vw" : "1.7vw",
                top: isMobile ? "40%" : "30%"
            }}
            >
            Come back after submissions close<br/>
            to see where you will be demoing!
        </h1>
        
        <div className = "absolute top-[20%] left-1/2 -translate-x-1/2 w-[85vw] h-auto" >
            <CarnivalTitle text="Judging" />
        </div>

        <div className = "absolute bottom-1/4 left-1/2 -translate-x-1/2 z-20 w-[55vw] h-auto" >
            <JudgingTicketBooth />
        </div>

        <div className = "absolute bottom-[4%] left-1/2 -translate-x-1/2 z-10 w-[30vw] h-auto" >
            <JudgingRoad />
        </div>

        <div className = "absolute bottom-[23%] left-[20%] -translate-x-1/2 z-20 w-[20vw] h-auto" >
            <BackBush />
        </div>

        <div className = "absolute bottom-[10%] left-[53%] translate-x-1/3 z-20 w-[30vw] h-auto" >
            <FrontBush />
        </div>
        
        <FrontGreenWave
          className={`absolute bottom-[15%] left-1/2 -translate-x-1/2 h-auto ${isMobile ? "w-[100vw]" : "w-[100vw]"}`}
        />

        </div>      
      </div>
    );
  }
  