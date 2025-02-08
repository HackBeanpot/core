"use client";

import React from "react";
import LocalLink from "./LocalLink";
import { HomeIcon } from "@repo/ui";
import { ExternalLink } from ".";

const NavBar = () => {
  return (
    <div className="sticky top-0 z-[31] w-full">
      <div className="bg-white flex flex-row w-full h-full justify-between align-middle drop-shadow-xl">
        {/* TODO: Figure out scrolling to top smoothly*/}
        <LocalLink href={"/"} className={"px-0"}>
          <HomeIcon />
        </LocalLink>

        <div className="flex flex-row align-middle justify-end">
          <LocalLink href={"/"} className="text-xl flex items-center px-5">
            About
          </LocalLink>
          <LocalLink
            href={"/projects"}
            className="text-xl flex items-center px-5"
          >
            Projects
          </LocalLink>
          <LocalLink
            href={"/sponsors"}
            className="text-xl flex items-center px-5"
          >
            Sponsors
          </LocalLink>
          <LocalLink href={"/team"} className="text-xl flex items-center px-5">
            Team
          </LocalLink>
          <LocalLink
            href={"#sponsor-us"}
            className="bg-orange text-xl flex items-center px-5 text-text-light"
          >
            Sponsor Us
          </LocalLink>
          <ExternalLink
            href={"https://apply.hackbeanpot.com"}
            className="bg-green text-xl flex items-center px-5 text-text-light"
          >
            Apply
          </ExternalLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
