"use client";

// Imports
import React, { useState } from "react";

// Images
import HomeIcon from "../Assets/SVG/Icons/HomeIcon";
import MenuIcon from "../Assets/SVG/Icons/MenuIcon";

// Components
import LocalLink from "./LocalLink";

// Hooks
import useIsMobile from "@repo/util/hooks/useIsMobile";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="sticky top-0 z-[31] w-full">
      <div className="bg-white flex flex-row w-full h-full justify-between align-middle drop-shadow-xl">
        <LocalLink href={"/"} className={"px-0"}>
          <HomeIcon />
        </LocalLink>

        {isMobile ? (
          <button
            className="md:hidden flex items-center justify-center p-2 text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon />
          </button>
        ) : (
          <div className="flex flex-row align-middle justify-end">
            <LocalLink
              href={"#schedule"}
              className="text-xl flex items-center px-5 font-GT-Walsheim-Regular"
            >
              Schedule
            </LocalLink>
            <LocalLink
              href={"#challenges"}
              className="text-xl flex items-center px-5 font-GT-Walsheim-Regular"
            >
              Challenges
            </LocalLink>
            <LocalLink
              href={"#mentors"}
              className="text-xl flex items-center px-5 font-GT-Walsheim-Regular"
            >
              Mentors
            </LocalLink>
            <LocalLink
              href={"#resources"}
              className="text-xl flex items-center px-5 font-GT-Walsheim-Regular"
            >
              Resources
            </LocalLink>
            <LocalLink
              href={"#team"}
              className="text-xl flex items-center px-5 font-GT-Walsheim-Regular"
            >
              Team
            </LocalLink>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col z-40`}
        >
          <button className="self-end p-3" onClick={() => setIsOpen(false)}>
            X
          </button>
          <LocalLink
            href={"#schedule"}
            className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Schedule
          </LocalLink>
          <LocalLink
            href={"#challenges"}
            className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Challenges
          </LocalLink>
          <LocalLink
            href={"#mentors"}
            className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Mentors
          </LocalLink>
          <LocalLink
            href={"#resources"}
            className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Resources
          </LocalLink>
          <LocalLink
            href={"#team"}
            className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Team
          </LocalLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
