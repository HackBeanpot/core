"use client";

import React, { useRef } from "react";
import { Section } from "@repo/ui";
import Image from "next/image";
import useContentHeight from "@repo/util/hooks/useContentHeight";
import useWindowSize from "@repo/util/hooks/useWindowSize";
import ResourcesBackground from "../lib/Assets/SVG/ResourcesBackground";

type TicketInfo = {
  ticketText: string;
  link: string;
}

const tickets: TicketInfo[] = [
  {
    ticketText: "Beginner Resource Guide",
    link: "https://docs.google.com/document/d/15XfcqKupkjGC7WLHvigt_nzUeM7LHQ1-o916hmZkCwo/edit?usp=sharing",
  },
  {
    ticketText: "Hacker Welcome Guide",
    link: "https://drive.google.com/file/d/18UrWcSD3gIQZC0W5JggKnVi7w5YBwc1L/view?usp=sharing",
  },
  {
    ticketText: "Project Demo Guide",
    link: "https://docs.google.com/document/d/1JLBsSnUCa7nx5HBpUAV52qTS4-IIsyqkaUPuSXqI8cA/edit?usp=sharing",
  },
  {
    ticketText: "Judging Process Guide",
    link: "https://docs.google.com/document/d/1Zy-EQfEap4irB7vSPygL1uwpsAJ4djqjNRVxP_lluv4/edit?usp=sharing",
  }
]

const background = (
  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
    <ResourcesBackground />
  </div>
);

export default function Resources(): React.ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight } = useWindowSize();
  const [contentHeight] = useContentHeight(ref);

  const height = windowHeight ? (contentHeight / windowHeight) * 100 + 46 : 85;
  const content = (
    <div ref={ref}>
      <div className="mt-[5.2%] ml-[9%]">
        <p className="text-[clamp(2rem,7vw,7rem)] text-sandyBeach font-bold font-Wilden">
          RESOURCES
        </p>
      </div>

      <div className="tablet:text-2xl font-semibold flex flex-wrap justify-center gap-16">
        {tickets.map((ticket) => (
          <TicketCard
            ticketText={ticket.ticketText}
            onClick={() => {
              window.open(ticket.link, "_blank");
            }}
          ></TicketCard>
        ))}
      </div>
    </div>
  );

  return (
    <Section
      name={"resources"}
      background={background}
      content={content}
      height={height}
    />
  );
}

export function TicketCard({
  children,
  onClick,
  ticketText,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  ticketText: string;
}): React.ReactNode {
  return (
    <div onClick={onClick} className="relative cursor-pointer hover:scale-105 transition-transform drop-shadow-lg">
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
      <div className="absolute left-5 right-5 bottom-[20%]">{ticketText}</div>

      <div className="absolute right-[49%] top-[70%] items-center justify-center -translate-y-1/2 w-full max-w-[5vw] text-darkSeaFoam flex flex-col text-[clamp(1.5rem,1vw,1rem)]">
        {children}
      </div>
    </div>
  );
}
