"use client";

import React from "react";
import Button from "@repo/ui/Button";
import TopBackground from "./TopBackground.tsx";
import Impact from "./Impact.tsx";
const SponsorTop = () => {
  return (
    <div>
      <TopBackground />
      <div className="relative mx-auto max-w-3xl bg-[#C33A2E] rounded-sm p-6 border-[20px] border-cottonCandyCoral shadow-2xl">
        <p className="text-white text-lg leading-relaxed">
          Sponsors empower HackBeanpot in celebrating innovation, diversity, and
          inclusion in the tech community. HackBeanpot is a selective hackathon,
          drawing candidates from schools throughout Boston to propel
          passionate, committed, and motivated technologists to grow their
          skillset.
        </p>
        <p className="text-white text-lg leading-relaxed mt-4">
          We provide sponsors the ability to provide mentorship that will shape
          the lives of emerging individuals, as well as the opportunity to
          network and bond early on with our hackers to hone their aptitude and
          potential into professional careers in the long run.
        </p>
      </div>
      <div className="absolute mobile:top-[67.5%] mobile:left-[30%] desktop:top-[69%] desktop:left-[45%]">
        <Impact />
      </div>
      <div className="absolute mobile:top-[101%] mobile:left-[20%] desktop:top-[102%] desktop:left-[44%]">
        <Button
          text="View Sponsorship Packet"
          textColor="white"
          color="firecrackerRed"
          size="medium"
          onClick={() =>
            window.open("https://archive.hackbeanpot.com/", "_blank")
          }
        ></Button>
      </div>
    </div>
  );
};
export default SponsorTop;
