import React from "react";
import { Section } from "@repo/ui";
import Image from "next/image";
import TimeRemainingSign from "../components/TimeRemainingSign";

export default function Landing(): JSX.Element {
  const background = (
    <div className="w-full h-full overflow-hidden pointer-events-none relative">
      <Image alt="ProjectsBackground" src="/landing_live_background.png" fill />
    </div>
  );

  const content = (
    <div className="relative w-full h-full flex flex-col justify-between p-20 items-center">
      <div className="text-center mt-[5%]">
        <h3 className="text-[clamp(0.9rem,2vw,3rem)] text-center font-semibold text-white mb-5 font-GT-Walsheim-Light-Trial">
          Buckle up! We&apos;re going on a...
        </h3>
        <p className="text-[clamp(2.5rem,6vw,5rem)] text-granolaLite font-bold font-Wilden-Regular">
          ROADTRIP!
        </p>
      </div>
      <div className="absolute top-[15vh] right-[0%]">
        <TimeRemainingSign target={new Date("02/20/2025 9:00:00")} />
      </div>
      <div className="flex justify-center mt-[5%]">
        <Image
          alt="Van"
          src="/van.png"
          width={400}
          height={200}
          className="w-[32vw] h-auto max-w-[700px] min-w-[100px]"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full flex flex-row justify-between">
        <div>
          <Image
            alt="Fern"
            src="/fern.png"
            width={400}
            height={200}
            className="w-[20vw] h-auto max-w-[700px] min-w-[100px] scale-x-[-1]"
          />
        </div>
        <div>
          <Image
            alt="Fern"
            src="/fern.png"
            width={400}
            height={200}
            className="w-[20vw] h-auto max-w-[700px] min-w-[100px]"
          />
        </div>
      </div>
    </div>
  );

  return (
    <Section
      name={"Landing"}
      background={background}
      content={content}
      height={70}
    />
  );
}
