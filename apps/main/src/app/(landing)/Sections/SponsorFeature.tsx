"use client"; 

import React from "react";
import { SponsorTicketComp } from "../../lib/Components";
import AWSLogo from "@repo/ui/Logos/AWSLogo";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";

export default function SponsorFeature(): React.ReactNode {
    const { isMobile } = useDevice(); 
    const responsiveStyles = clsx(
        "flex-row my-[10vh]",
        isMobile && "flex-col items-center gap-y-10"
    );
    const ticketStyles = clsx(
        "", 
        isMobile && "scale-[225%]"
    );
  return (
    <div className={` flex ${responsiveStyles} gap-8 items-center justify-center`}>
      <div className="text-charcoalFogDark">
        <p className="font-NeulisNeue-Bold text-2xl ">HackBeanpot 2026</p>{" "}
        <p className="font-NeulisNeue-Regular">is proudly brought to you by</p>
      </div>
          <div className="relative">
              <div className={ticketStyles}>
                  <SponsorTicketComp />
              </div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-125">
          <AWSLogo />
        </div>
      </div>
    </div>
  );
}
