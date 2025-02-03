"use client";

// Imports
import React, { useState } from "react";
import Link from "next/link";

// Icons
import { HomeIcon } from "@repo/ui";
import MenuIcon from "../Assets/SVG/MenuIcon";
import CloseIcon from "../Assets/SVG/CloseIcon";

// Hooks
import useIsMobile from "@repo/util/hooks/useIsMobile";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <div className="sticky top-0 z-[31] w-full">
        <div className="bg-white flex flex-row w-full h-full justify-between align-middle drop-shadow-xl pr-[3vw]">
          {/* TODO: Figure out scrolling to top smoothly*/}
          <Link href={"/"} className={"px-0"}>
            <HomeIcon />
          </Link>

          {isMobile ? (
            <button
              className="flex items-center justify-center p-2 text-black hover:scale-110"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon />
            </button>
          ) : (
            <div className="flex flex-row align-middle justify-end">
              <Link
                href={"#schedule"}
                className="text-[clamp(1rem, 1.3vw, 4rem)] flex items-center px-[1.2vw]"
              >
                Schedule
              </Link>
              <Link
                href={"#challenges"}
                className="text-[clamp(1rem, 1.3vw, 4rem)] flex items-center px-[1.2vw]"
              >
                Challenges
              </Link>
              <Link
                href={"#mentors"}
                className="text-[clamp(1rem,1.3vw, 4rem)] flex items-center px-[1.2vw]"
              >
                Mentors
              </Link>
              <Link
                href={"#resources"}
                className="text-[clamp(1rem, 1.3vw, 4rem)] flex items-center px-[1.2vw]"
              >
                Resources
              </Link>
              <Link
                href={"#team"}
                className="text-[clamp(1rem, 1.3vw, 4rem)] flex items-center px-[1.2vw]"
              >
                Team
              </Link>
            </div>
          )}
        </div>

        {isOpen && (
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col z-40`}
          >
            <button className="self-end p-3" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
            <Link
              href={"#schedule"}
              className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Schedule
            </Link>
            <Link
              href={"#challenges"}
              className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Challenges
            </Link>
            <Link
              href={"#mentors"}
              className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Mentors
            </Link>
            <Link
              href={"#resources"}
              className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
            <Link
              href={"#team"}
              className="text-xl py-2 font-GT-Walsheim-Regular hover:bg-beige px-3 rounded-md cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Team
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
