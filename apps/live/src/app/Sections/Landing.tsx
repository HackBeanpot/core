"use client";

import React from "react";
import { Section } from "@repo/ui";
import Image from "next/image";
import TimeRemainingSign from "../components/TimeRemainingSign";
import useIsMobile from "@repo/util/hooks/useIsMobile";

export default function Landing(): JSX.Element {
  const isMobile = useIsMobile();

  const background = (
    <div className="w-full h-full overflow-hidden pointer-events-none relative">
      <Image alt="ProjectsBackground" src="/landing_live_background.png" fill />
    </div>
  );

  const content = (
    <div className="relative w-full h-full flex flex-col justify-between p-20 items-center">
      <div className="text-center z-50">
        <h3 className="text-[clamp(0.9rem,2vw,3rem)] text-center text-white font-GT-Walsheim-Regular">
          Buckle up! We&apos;re going on a...
        </h3>
        <p className="text-[clamp(3rem,7vw,7rem)] text-granolaLite font-bold font-Wilden">
          ROADTRIP!
        </p>
      </div>
      <div
        className={`absolute right-[0] ${isMobile ? "top-[25vh]" : "top-[15vh]"} z-50`}
      >
        <TimeRemainingSign target={new Date("02/20/2025 9:00:00")} />
      </div>
      <div className="relative w-full h-full">
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            isMobile ? "top-[80%]" : "top-[60%]"
          }`}
        >
          <Image
            alt="Van"
            src="/van.png"
            width={400}
            height={200}
            className="w-[40vw] max-w-[600px] h-[35vh] max-h-[500px] object-contain"
          />
        </div>
      </div>
      {!isMobile && (
        <div className="absolute bottom-0 left-0 w-full flex flex-row justify-between">
          <div>
            <Image
              alt="Fern"
              src="/fern.png"
              width={400}
              height={200}
              className="w-[20vw] h-auto max-w-[550px] min-w-[100px] scale-x-[-1]"
            />
          </div>
          <div>
            <Image
              alt="Fern"
              src="/fern.png"
              width={400}
              height={200}
              className="w-[20vw] h-auto max-w-[550px] min-w-[100px]"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Section
      name={"landing"}
      background={background}
      content={content}
      height={70}
    />
  );
}
