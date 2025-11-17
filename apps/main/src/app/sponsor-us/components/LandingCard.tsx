"use client";

import React from "react";
import Impact from "./Impact.tsx";

const LandingCard = () => {
  return (
    <div className="mobile:scale-[0.90]">
      <div className="relative flex flex-col items-center">
        <div className="absolute -top-11 z-10">
          <Impact />
        </div>
      </div>

      <div className="mobile:scale-[0.90]">
        <div className="relative bg-[#F88E78] rounded-sm outline font-['DMSans-Regular'] outline-[20px] outline-[#F88E78] drop-shadow-[4px_4px_0_#CC322D] max-w-3xl mx-auto">
          <div className="bg-[#C33A2E] rounded-xl shadow-[inset_-10px_10px_0_rgba(0,0,0,0.25)] p-8">
            <p className="text-white text-lg leading-relaxed">
              Sponsors empower HackBeanpot in celebrating innovation, diversity,
              and inclusion in the tech community. HackBeanpot is a selective
              hackathon, drawing candidates from schools throughout Boston to
              propel passionate, committed, and motivated technologists to grow
              their skillset.
            </p>
            <p className="text-white text-lg leading-relaxed mt-4">
              We provide sponsors the ability to provide mentorship that will
              shape the lives of emerging individuals, as well as the
              opportunity to network and bond early on with our hackers to hone
              their aptitude and potential into professional careers in the long
              run.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingCard;
