"use client";

import React from "react";
import { Section } from "@repo/ui";
import Image from "next/image";
const background = <div className="w-full h-full bg-[#0F786E]" />;

const content = (
  <div>
    <div className="mt-[5.2%] ml-[9%]">
      <p className="text-[clamp(2rem,7vw,7rem)] text-sandyBeach font-bold font-Wilden">
        RESOURCES
      </p>
    </div>

    <div className="tablet:text-2xl font-semibold flex flex-wrap justify-center gap-16">
      <TicketCard>
        <p className="text-[clamp(1.5rem,1vw,1rem)]">
          {"Beginner Resource Guide"}
        </p>
      </TicketCard>

      <TicketCard>
        <p className="text-[clamp(1.5rem,1vw,1rem)]">
          {"Hacker Welcome Guide"}
        </p>
      </TicketCard>

      <TicketCard>
        <p className="text-[clamp(1.5rem,1vw,1rem)]">{"Project Demo Guide"}</p>
      </TicketCard>

      <TicketCard>
        <p className="text-[clamp(1.5rem,1vw,1rem)]">
          {"Judging Process Guide"}
        </p>
      </TicketCard>
    </div>

    <div className="relative">
      <Image
        alt="Buildings"
        src="/resources_buildings.svg"
        height={100}
        width={600}
        className="absolute top-44 left-0 w-full h-auto"
      />
    </div>
  </div>
);

export default function Resources(): React.ReactNode {
  return (
    <Section
      name={"resources"}
      background={background}
      content={content}
      height={150.5}
    />
  );
}

export function TicketCard({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="relative">
      <Image
        alt="TicketCard"
        src="/resources_card.svg"
        height={100}
        width={250}
        className="w-[250px] h-auto"
      />
      <div className="absolute right-[10%] top-[10%]">
        <Image
          alt="LinkArrow"
          src="/resources_link_arrow.svg"
          height={42}
          width={42}
          className="w-[42px] h-[42px]"
        />
      </div>

      <div className="absolute right-[49%] top-[70%] items-center justify-center -translate-y-1/2 w-full max-w-[5vw] text-[#083D3A] flex flex-col">
        {children}
      </div>
    </div>
  );
}
