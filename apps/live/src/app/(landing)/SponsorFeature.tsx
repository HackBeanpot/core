"use client";

import React from "react";
import { SponsorTicketComp } from "../../../../main/src/app/lib/Components/index.ts";
import Section from "@repo/ui/Section";
import useDevice from "@repo/util/hooks/useDevice";

export default function SponsorFeature(): JSX.Element {
  const { isMobile } = useDevice();

  const background = (
    <div
      className={`w-full h-full bg-mossGreen ${isMobile ? "w-[100vw]" : "w-[80vw]"}`}
    ></div>
  );

  const ticketWidthVW = isMobile ? 40 : 10;
  const logoWidth = isMobile ? 130 : 90;

  const content = (
    <div className="relative w-full h-full overflow-hidden">
      <div className={`flex items-center justify-center h-full w-full `}>
        <div
          className={`flex items-center gap-x-8 ${isMobile ? "flex-col" : "flex-row"}`}
        >
          <div
            className={`flex flex-col ${isMobile ? "text-center" : "text-left"} text-cream`}
          >
            <div className="font-NeulisNeue-Bold text-[40px]">
              HackBeanpot 2026
            </div>
            <div className="font-NeulisNeue text-[20px]">
              is proudly brought to you by
            </div>
          </div>

          <div className="flex flex-col justify-center gap-y-4">
            <SponsorTicketComp
              isSponsorUs={false}
              logoPath="/sponsor-logos/amazon.svg"
              ticketWidthVW={ticketWidthVW}
              logoWidth={logoWidth}
            />
            <SponsorTicketComp
              isSponsorUs={false}
              logoPath="/sponsor-logos/maven.svg"
              ticketWidthVW={ticketWidthVW}
              logoWidth={logoWidth}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Section
      name={"sponsorfeature"}
      background={background}
      content={content}
      height={40}
    />
  );
}
