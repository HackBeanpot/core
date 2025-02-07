"use client";

import React from "react";
import { Section } from "@repo/ui";
import Road from "../lib/Assets/SVG/Road";

export default function HitTheRoad(): JSX.Element {
  const background = (
    <div className="w-full h-full flex items-center bg-[#F2E6D7]">
      <div className="ml-[15%] h-full w-[88vw] ">
        <Road />
      </div>
    </div>
  );

  const content = (
    <div className="w-full h-full flex items-center">
      <div className="py-24 px-32 font-GT-Walsheim-Bold">
        <div className="flex flex-col text-xl gap-5">
          <div className="flex items-center justify-between max-w-[55vw]">
            <p className="text-[clamp(2vw,5vw,9vw)] text-tomato font-bold font-Wilden leading-[1.2] min-h-[5]">
              Hit the Road with HackBeanpot 2025!
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className=" text-[clamp(0.9vw,1.6vw,3vw)] max-w-[50vw] font-GT-Walsheim-Regular">
              At HackBeanpot 2025, we&apos;re hitting the road with a community
              of explorers driven by creativity, learning, and meaningful
              connections.
              <br />
              <br />
              Get ready to put your resourcefulness to the test on this journey.
              Whether you&apos;re a seasoned hackathon traveler, a
              “never-written-a-line-of-code” beginner, or somewhere in between,
              we&apos;re thrilled to have you join this adventure!
              <br />
              <br />
              Learn more at{" "}
              <a
                href="https://www.hackbeanpot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                www.hackbeanpot.com
              </a>
            </p>
          </div>
          <div className="mt-8 items-center">
            <a
              className=" bg-orange text-white py-3 px-7 rounded-[64px] max-w-[20vw]"
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/4JUtKxxDnw"
            >
              {"Join our Discord"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Section
      name={"Hit The Road!"}
      background={background}
      content={content}
      height={100}
    />
  );
}
