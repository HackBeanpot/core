"use client";

import React from "react";
import { SponsorTicketComp } from "../../../../main/src/app/lib/Components/index.ts";
import Section from "@repo/ui/Section";
// import useIsMobile from "@repo/util/hooks/useIsMobile";

export default function SponsorFeature(): JSX.Element {
  // const isMobile = useIsMobile();

  const background = (
    <div className='w-full h-full bg-mossGreen ${isMobile ? "w-[100vw]" : "w-[80vw]"}'></div>
  );

  const content = (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex items-center gap-x-8">
          <div className="flex flex-col text-left text-cream">
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
              ticketWidthVW={10}
              logoWidth={90}
            />
            <SponsorTicketComp
              isSponsorUs={false}
              logoPath="/sponsor-logos/maven.svg"
              ticketWidthVW={10}
              logoWidth={90}
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
