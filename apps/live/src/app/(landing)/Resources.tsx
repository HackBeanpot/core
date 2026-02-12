"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
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
    link: "https://drive.google.com/file/d/1__rfnuSEtiAaNOZrX-t-NXJc77qK5ncu/view?usp=sharing",
    description:
      "Basic welcome information like map of venue, due dates and more!",
  },
  {
    ticketText: "How to Demo >",
    link: "https://docs.google.com/document/d/1k4Y_z0CYGAvJYWCUo96JWJOnLNSVUNHfO6CCqg_VxgA/edit?tab=t.0",
    description:
      "Info on how to submit your project, and how to prepare for the demo!",
  },
  {
    ticketText: "Beginner Resources >",
    link: "https://docs.google.com/document/d/1E8doyvYyGSBBQUCYlsjMsvhHOaZG0Uz0YIGgPQp16T4/edit?tab=t.0",
    description:
      "First time hacker? Look no further! Find everything you need here.",
  },
  {
    ticketText: "Food Offerings >",
    link: "https://docs.google.com/document/d/1zwWd33DOnLPea59dkrOl3DXeA6mG4wYnZU0-rer5VVQ/edit?tab=t.0",
    description: "Menu information for all meals provided!",
  },
];

export default function Resources(): React.ReactNode {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const ribbonStyles = clsx(
    isDesktop && "scale-100",
    isTablet && "scale-75",
    isMobile && "scale-[60%]",
  );

  return (
    <div className={`relative bg-mossGreenDark w-full h-full z-10 -mb-2`}>
      <div className="relative w-full max-h-screen overflow-x-hidden -mt-32">
        <ResourcesBackground className="w-full h-[100vh]" />
      </div>
      {/* content container */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-[20vh]">
        <div className={ribbonStyles}>
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
    </div>
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
