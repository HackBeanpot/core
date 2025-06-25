"use client";

import React from "react";
import LeftCloud from "./PlaceholderAssets/LeftCloud";
import RightCloud from "./PlaceholderAssets/RightCloud";
import LargeSign from "./PlaceholderAssets/LargeSign";
import Logo from "./PlaceholderAssets/Logo";
import ExternalLink from "./PlaceholderAssets/ExternalLink";
import InstagramLogo from "./PlaceholderAssets/InstagramLogo";
import LinkedInLogo from "./PlaceholderAssets/LinkedInLogo";

const InputBox: React.FC = () => {
  return (
    <div className="relative grid grid-cols-2 top-[-30%]">
      <input
        className="font-DMSans-Regular text-xl rounded-lg w-[26vw] h-[5vh] border border-heather border-4 pl-4 bg-[#FEF9F2]"
        placeholder="Start your journey..."
      />
      <button className="hover:scale-105 transition-transform transition-duration-300 hover:bg-darkSeaFoam font-GT-Walsheim-Regular text-bold bg-seaFoam text-xl text-white rounded-lg w-[6.5vw] h-[5vh]">
        Notify Me
      </button>
    </div>
  );
};

export default function Placeholder(): React.ReactNode {
  return (
    <div className="relative bg-gradient-to-b from-skyBlue to-sunnyBlue h-screen w-screen">
      <div className="absolute top-[10%] hover:scale-110 transition-transform transition-duration-3000">
        <LeftCloud />
      </div>
      <div className="absolute right-0 top-[50%] hover:scale-110 transition-transform transition-duration-3000">
        <RightCloud />
      </div>

      <Logo className="absolute top-4 left-6" />

      <div className="absolute left-0 top-[25%] grid grid-cols-7">
        <LargeSign className="col-span-3 left-0" />
        <div className="col-span-4 grid grid-rows-4 mx-[5vw] relative top-[10%]">
          <h3 className="font-Wilden text-pavement text-6xl row-span-2">
            {
              "IT MIGHT BE THE END OF THE ROAD, BUT IT'S JUST THE START OF YOUR JOURNEY!"
            }
          </h3>
          <p className="font-GT-Walsheim-Regular mt-2 text-xl">
            Get notified when applications open!
          </p>
          <InputBox />
        </div>
      </div>

      <div className="absolute grid grid-cols-2 bottom-10 right-10 w-[6.5vw]">
        <ExternalLink href="https://www.instagram.com/hackbeanpot/?hl=en">
          <InstagramLogo />
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/company/hackbeanpot-inc/posts/?feedView=all">
          <LinkedInLogo />
        </ExternalLink>
      </div>

      <div className="absolute bottom-10 left-10 text-l">
        <p className="font-GT-Walsheim-Bold">Reach out for inquiries at</p>
        <a
          className="font-GT-Walsheim-Regular underline hover:no-underline transition-transform transition-duration-300"
          href="mailto:team@hackbeanpot.com"
        >
          team@hackbeanpot.com
        </a>
      </div>
    </div>
  );
}
