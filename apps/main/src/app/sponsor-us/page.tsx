"use client";

import React from "react";
import TicketBooth from "../lib/Assets/SponsorUsAssets/TicketBooth";
import Ticket from "../lib/Assets/SponsorUsAssets/Ticket";
import Button from "@repo/ui/Button";
import useDevice from "@repo/util/hooks/useDevice";

const SponsorUsPage = () => {
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <div className="relative z-10 w-full">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="w-full flex justify-center">
          {isMobile ? <Ticket /> : <TicketBooth />}
        </div>

        <div className="pointer-events-none absolute inset-0 flex">
          <div
            className={`text-left
              ${isMobile ? "max-w-sm space-y-2 relative mt-[100%] ml-[13%]" : ""}
              ${isTablet ? "max-w-full space-y-4 mt-[50%] ml-[40%]" : ""}
              ${isDesktop ? "max-w-2xl space-y-5 mt-[34%] ml-[40%]" : ""}
            `}
          >
            <h1
              className={`
                font-NeulisNeue-Bold mb-3 text-charcoalFog
                ${isMobile ? "text-xl" : ""}
                ${isTablet ? "text-2xl" : ""}
                ${isDesktop ? "text-4xl" : ""}
              `}
            >
              Interested in sponsoring us?
            </h1>

            <p
              className={`
                font-NeulisNeue-Regular text-charcoalFog leading-relaxed mb-6
                ${isMobile ? "text-sm" : ""}
                ${isTablet ? "text-lg" : ""}
                ${isDesktop ? "text-2xl" : ""}
              `}
            >
              Reach out to us at team@hackbeanpot.com
              <br /> or check out our sponsorship package!
            </p>

            <Button
              text="View Sponsorship Package"
              color="starlightBlue"
              textColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorUsPage;
