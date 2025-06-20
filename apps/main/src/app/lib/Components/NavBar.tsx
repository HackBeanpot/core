"use client";

import React, { useState } from "react";
import LocalLink from "./LocalLink";
import HomeIcon from "@repo/ui/Icons/HomeIcon";
import Hamburger from "hamburger-react";
import useIsMobileLgScreen from "@repo/util/hooks/useIsMobileLgScreen";
const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const isMobile = useIsMobileLgScreen();

  return (
    <div className="sticky top-0 z-[31] w-full">
      <div className="bg-white flex flex-row w-full h-full justify-between align-middle drop-shadow-xl">
        {/* TODO: Figure out scrolling to top smoothly*/}
        <LocalLink href={"/"} className={"px-0"}>
          <HomeIcon />
        </LocalLink>

        {!isMobile && (
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
            <LocalLink
              href={"/team"}
              className="text-xl flex items-center px-5"
            >
              Team
            </LocalLink>
            <LocalLink
              href={"#sponsor-us"}
              className="bg-orange text-xl flex items-center px-5 text-text-light"
            >
              Sponsor Us
            </LocalLink>
            <LocalLink
              href={""}
              className="bg-green text-xl flex items-center px-5 text-text-light"
              onClick={() => alert("apply not implemented yet")}
            >
              Apply
            </LocalLink>
          </div>
        )}

        {isMobile && (
          <div>
            <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
          </div>
        )}
      </div>

      {isMobile && isOpen && (
        <div className="bg-white drop-shadow-md px-4 py-3 space-y-3">
          <LocalLink
            href={"/"}
            className="block text-lg"
            onClick={() => setOpen(false)}
          >
            About
          </LocalLink>
          <LocalLink
            href={"/projects"}
            className="block text-lg"
            onClick={() => setOpen(false)}
          >
            Projects
          </LocalLink>
          <LocalLink
            href={"/sponsors"}
            className="block text-lg"
            onClick={() => setOpen(false)}
          >
            Sponsors
          </LocalLink>
          <LocalLink
            href={"/team"}
            className="block text-lg"
            onClick={() => setOpen(false)}
          >
            Team
          </LocalLink>
          <LocalLink
            href={"#sponsor-us"}
            className="block bg-orange text-text-light px-3 py-2 rounded"
            onClick={() => setOpen(false)}
          >
            Sponsor Us
          </LocalLink>
          <LocalLink
            href={""}
            className="block bg-green text-text-light px-3 py-2 rounded"
            onClick={() => {
              setOpen(false);
              alert("apply not implemented yet");
            }}
          >
            Apply
          </LocalLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
