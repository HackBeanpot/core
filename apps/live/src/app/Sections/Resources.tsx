"use client";

import React, { useRef } from "react";
import { Section } from "@repo/ui";
import Image from "next/image";
import useContentHeight from "@repo/util/hooks/useContentHeight";
import useWindowSize from "@repo/util/hooks/useWindowSize";
const background = <div className="w-full h-full bg-seaFoam" />;

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
        <TicketCard onClick={() => {}}>
          <p>{"Beginner Resource Guide"}</p>
        </TicketCard>
        <TicketCard>
          <p>{"Hacker Welcome Guide"}</p>
        </TicketCard>
        <TicketCard>
          <p>{"Project Demo Guide"}</p>
        </TicketCard>
        <TicketCard>
          <p>{"Judging Process Guide"}</p>
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
}: {
  children: React.ReactNode;
  onClick?: () => void;
}): React.ReactNode {
  return (
    <div onClick={onClick} className="relative cursor-pointer">
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

      <div className="absolute right-[49%] top-[70%] items-center justify-center -translate-y-1/2 w-full max-w-[5vw] text-darkSeaFoam flex flex-col text-[clamp(1.5rem,1vw,1rem)]">
        {children}
      </div>
    </div>
  );
}
