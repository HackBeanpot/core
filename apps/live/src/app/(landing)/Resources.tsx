"use client";

import React, { useRef } from "react";
import Section from "@repo/ui/Section";
import Image from "next/image";
import useContentHeight from "@repo/util/hooks/useContentHeight";
import useWindowSize from "@repo/util/hooks/useWindowSize";
import ResourcesBackground from "../lib/Assets/SVG/ResourcesBackground";
import RibbonTitle from "@repo/ui/RibbonTitle";
import useDevice from "@repo/util/hooks/useDevice";

type TicketInfo = {
  ticketText: string;
  link: string;
  description: string;
};

const tickets: TicketInfo[] = [
  {
    ticketText: "Hacker Guide >",
    link: "https://docs.google.com/document/d/15XfcqKupkjGC7WLHvigt_nzUeM7LHQ1-o916hmZkCwo/edit?usp=sharing",
    description:
      "Basic welcome information like map of venue, due dates and more!",
  },
  {
    ticketText: "How to Demo >",
    link: "https://drive.google.com/file/d/18UrWcSD3gIQZC0W5JggKnVi7w5YBwc1L/view?usp=sharing",
    description:
      "Basic welcome information like map of venue, due dates and more!",
  },
  {
    ticketText: "Resources >",
    link: "https://docs.google.com/document/d/1JLBsSnUCa7nx5HBpUAV52qTS4-IIsyqkaUPuSXqI8cA/edit?usp=sharing",
    description:
      "Basic welcome information like map of venue, due dates and more!",
  },
  {
    ticketText: "Resources >",
    link: "https://docs.google.com/document/d/1Zy-EQfEap4irB7vSPygL1uwpsAJ4djqjNRVxP_lluv4/edit?usp=sharing",
    description:
      "Basic welcome information like map of venue, due dates and more!",
  },
];

const background = (
  <div
    className="absolute inset-0 w-full overflow-hidden pointer-events-none z-10"
    style={{ transform: "translateY(-10vh)", height: "calc(100% + 10vh)" }}
  >
    <ResourcesBackground />
  </div>
);

export default function Resources(): React.ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight } = useWindowSize();
  const [contentHeight] = useContentHeight(ref);
  const { isMobile } = useDevice();

  const height = windowHeight ? (contentHeight / windowHeight) * 100 + 70 : 110;
  const content = (
    <div ref={ref}>
      <div className={`${isMobile ? "transform scale-[0.85]" : ""} mt-5`}>
        <RibbonTitle text="RESOURCES" />
      </div>

      <div className="tablet:text-2xl font-semibold text-2xl grid grid-cols-1 mobile:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 tablet:grid-cols-2 desktop:grid-cols-2 gap-8 justify-center mx-auto w-fit mt-20">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.link}
            ticketText={ticket.ticketText}
            description={ticket.description}
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
  description,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  ticketText: string;
  description: string;
}): React.ReactNode {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer hover:scale-105 transition-transform drop-shadow-lg"
    >
      <Image
        alt="TicketCard"
        src="/resources/resourceCard.svg"
        height={100}
        width={250}
        className="w-[250px] h-auto"
      />
      <div className="absolute left-5 top-[15%] flex items-center gap-2">
        <Image
          alt="Coin"
          src="/resources/coin.svg"
          height={24}
          width={24}
          className="w-[24px] h-[24px] flex-shrink-0"
        />
        <div className="text-sm truncate pr-5">{ticketText}</div>
      </div>

      <div className="absolute left-5 right-5 top-[45%] text-xs font-normal overflow-hidden">
        <div className="line-clamp-2">{description}</div>
      </div>

      {children && (
        <div className="absolute right-[49%] top-[70%] items-center justify-center -translate-y-1/2 w-full max-w-[5vw] text-darkSeaFoam flex flex-col text-[clamp(1.5rem,1vw,1rem)]">
          {children}
        </div>
      )}
    </div>
  );
}
