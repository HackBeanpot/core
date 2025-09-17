"use client";

import React from "react";
import LocalLink from "./LocalLink";
// import HomeIcon from "@repo/ui/Icons/HomeIcon";
// import Hamburger from "hamburger-react";

const NavBar = () => {
  // const [isOpen, setOpen] = useState(false);
  // const isMobile = useIsMobileLgScreen();

  return (
    <div className="sticky top-0 z-[50] w-full">
      <div className="bg-white flex flex-row w-full h-full justify-between align-middle drop-shadow-xl">
        <LocalLink
          href={"/projects"}
          className="text-xl flex items-center px-5"
        >
          Projects
        </LocalLink>
      </div>
    </div>
  );
};

export default NavBar;
