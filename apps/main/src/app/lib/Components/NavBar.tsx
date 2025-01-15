"use client";

import React, { useEffect, useRef, useState } from "react";
import { HomeIcon, MlhBanner } from "../Assets/SVG";
import LocalLink from "./LocalLink";

const DELAY = 100;

const useShouldBeginAnimation = () => {
  const [shouldBeginAnimation, setShouldBeginAnimation] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const position = window.scrollY;
      if (position <= 0) {
        setShouldBeginAnimation(false);
      } else {
        timeoutRef.current = setTimeout(() => {
          setShouldBeginAnimation(true);
        }, DELAY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return shouldBeginAnimation;
};

const NavBar = () => {
  const shouldBeginAnimation = useShouldBeginAnimation();

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
          <LocalLink
            href={"#apply"}
            className="bg-green text-xl flex items-center px-5 text-text-light"
          >
            Apply
          </LocalLink>
        </div>
      </div>

      {/* MLH banner */}
      <div className={"w-0 h-0 pl-[5vw]"}>
        <MlhBanner
          className={`${shouldBeginAnimation ? "animate-popAndShrink" : ""}`}
        />
      </div>
    </div>
  );
};

export default NavBar;
