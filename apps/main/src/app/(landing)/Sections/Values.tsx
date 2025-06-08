"use client";

import React from "react";
import CommunityIcon from "@repo/ui/Icons/CommunityIcon";
import ExplorationIcon from "@repo/ui/Icons/ExplorationIcon";
import GrowthIcon from "@repo/ui/Icons/GrowthIcon";
import RockVariant1 from "../../lib/Assets/SVG/Rocks/RockVariant1";
import RockVariant2 from "../../lib/Assets/SVG/Rocks/RockVariant2";
import RockVariant3 from "../../lib/Assets/SVG/Rocks/RockVariant3";
import RockVariant4 from "../../lib/Assets/SVG/Rocks/RockVariant4";

const ValuesIntroContent = (
  <div className="mx-auto font-Wilden">
    <p className="text-4xl tablet:text-8xl text-[#F3E7D7] sm:text-[#EC765A] whitespace-pre-line">
      {"WHAT \n HACKBEANPOT \n IS ALL ABOUT"}
    </p>
  </div>
);

const ValuesExplorationContent = (
  <div className="mx-[15%] flex flex-row">
    <div className="mr-10">
      <ExplorationIcon />
    </div>
    <div>
      <p className="font-GT-Walsheim-Bold mb-3 text-xl tablet:text-3xl">
        {"Exploration"}
      </p>
      <p>
        {
          "Discover new ideas and technologies with the help of our experienced mentors, or learn new skills at our beginner-friendly workshops!"
        }
      </p>
    </div>
  </div>
);

const ValuesCommunityContent = (
  <div className="mx-[15%] flex flex-row">
    <div className="mr-10">
      <CommunityIcon />
    </div>
    <div>
      <p className="font-GT-Walsheim-Bold mb-3 text-xl tablet:text-3xl">
        {"Community"}
      </p>
      <p>
        {
          "Connect with fellow students and our partners in the tech community. Make connections that will last a lifetime!"
        }
      </p>
    </div>
  </div>
);

const ValuesGrowthContent = (
    <div className="mx-[15%] flex flex-row items-center justify-center">
    <div className="mr-10">
      <GrowthIcon />
    </div>
    <div>
      <p className="font-GT-Walsheim-Bold mb-3 text-xl tablet:text-3xl">
        {"Growth"}
      </p>
      <p>
        {
          "Expand beyond your horizons and grow your current skill set in a safe and supportive environment."
        }
      </p>
    </div>
  </div>
);

const rocks = (
  <div className="flex">
    <div className="mt-[-2.5rem]">
      <RockVariant1 />
    </div>
    <div className="ml-8">
      <RockVariant4 />
    </div>
    <div className="ml-[-9rem] mt-[-7rem]">
      <RockVariant2 />
    </div>
    <div className="ml-5 mt-[-4rem]">
      <RockVariant3 />
    </div>
  </div>
);

const content = (
  <div>
    <div className="w-full h-[140vh] text-[#474747] grid grid-cols-1 tablet:grid-cols-2 tablet:grid-rows-2 justify-center content-center font-GT-Walsheim-Regular tablet:text-2xl">
      <div className="w-full bg-[#EC765A] flex flex-col justify-center font-Wilden">
        <Box>{ValuesIntroContent}</Box>
      </div>
      <div className="w-full bg-[#E2D16D] flex flex-col justify-center">
        <Box>{ValuesExplorationContent}</Box>
      </div>
      <div className="w-full bg-[#5BB9B3] flex flex-col justify-center">
        <Box>{ValuesCommunityContent}</Box>
      </div>
      <div className="w-full bg-[#D5CAE7] flex flex-col justify-center">
        <Box>{ValuesGrowthContent}</Box>
      </div>
    </div>
    <div className="absolute z-10">{rocks}</div>
  </div>
);

export default function Values(): React.ReactNode {
  return content;
}

export function Box({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return <div className="flex flex-col justify-center py-20">{children}</div>;
}
