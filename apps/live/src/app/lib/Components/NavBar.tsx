"use client";

import React from "react";
import { HomeIcon } from "@repo/ui";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="sticky top-0 z-[31] w-full">
      <div className="bg-white flex flex-row w-full h-full justify-between align-middle drop-shadow-xl pr-20">
        {/* TODO: Figure out scrolling to top smoothly*/}
        <Link href={"/"} className={"px-0"}>
          <HomeIcon />
        </Link>

        <div className="flex flex-row align-middle justify-end">
          <Link href={"#schedule"} className="text-xl flex items-center px-5">
            Schedule
          </Link>
          <Link href={"#challenges"} className="text-xl flex items-center px-5">
            Challenges
          </Link>
          <Link href={"#mentors"} className="text-xl flex items-center px-5">
            Mentors
          </Link>
          <Link href={"#resourcse"} className="text-xl flex items-center px-5">
            Resourcse
          </Link>
          <Link href={"#team"} className="text-xl flex items-center px-5">
            Team
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
