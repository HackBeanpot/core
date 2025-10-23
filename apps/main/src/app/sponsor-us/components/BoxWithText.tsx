"use client";

import React from "react";
import Impact from "./Impact.tsx";

const BoxWithText = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Impact badge */}
      <div className="absolute -top-10">
        <Impact />
      </div>

      {/* Red box */}
      <div className="bg-[#C33A2E] rounded-md p-8 border-[20px] border-[#F88E78] shadow-2xl max-w-3xl mx-auto">
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
    </div>
  );
};

export default BoxWithText;
