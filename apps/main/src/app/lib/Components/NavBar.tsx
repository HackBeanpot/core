"use client";

import React, { useState } from "react";
import Logo from "../Assets/SVG/HackBeanpotLogo";
import LocalLink from "./LocalLink";
import Button from "@repo/ui/Button";
import useDevice from "@util/hooks/useDevice";
import { RxHamburgerMenu } from "react-icons/rx";

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const { isDesktop } = useDevice();

  type LocalLinkInfo = {
    pageName: string;
    link: string;
  };

  const localLinkArr: LocalLinkInfo[] = [
    { pageName: "About", link: "/" },
    { pageName: "Projects", link: "/projects" },
    { pageName: "Sponsors", link: "/sponsors" },
    { pageName: "Team", link: "/team" },
  ];

  return (
    <div className={`sticky top-0 z-[50] w-full h-fit bg-white flex ${isOpen && !isDesktop ? "flex-col" : "flex-row"}`}>
      <div className={`p-2 left-0 ${!isDesktop && "flex flex-row w-full"}`}>
        <LocalLink href={"/"}>
          <Logo />
        </LocalLink>

        {!isDesktop && 
          <div 
            className="flex flex-row w-full items-center justify-end pr-2"
            onClick={() => setOpen((prev) => !prev)}
          >
            <RxHamburgerMenu size={36} color="black" />
          </div>
        }
      </div>

      {isOpen && !isDesktop &&
        <div className="flex flex-col gap-2 w-full items-start p-2 pl-4">
          {localLinkArr.map((item) => (
            <LocalLink
              key={item.pageName}
              href={item.link}
              className="text-lg font-DMSans-Bold"
            >
              {item.pageName}
            </LocalLink>
          ))}
          <div className="flex flex-col gap-2 items-start">
            <LocalLink href={"/sponsor-us"}>
              <Button textColor="white" text="Sponsor Us" size="medium" />
            </LocalLink>
            <Button
              textColor="white"
              text="Apply"
              color="firecrackerRedLight"
              size="medium"
              onClick={() => alert("2026 Applications haven't opened yet!")}
            />
          </div>
        </div>
      }

      {isDesktop && 
        <div className="flex flex-row gap-10 w-full items-center justify-end">
          {localLinkArr.map((item) => (
            <LocalLink
              key={item.pageName}
              href={item.link}
              className="text-lg font-DMSans-Bold"
            >
              {item.pageName}
            </LocalLink>
          ))}
          <div className="flex flex-row gap-2 items-center justify-end pr-10">
            <LocalLink href={"/sponsor-us"}>
              <Button textColor="white" text="Sponsor Us" size="medium" />
            </LocalLink>
            <Button
              textColor="white"
              text="Apply"
              color="firecrackerRedLight"
              size="medium"
              onClick={() => alert("2026 Applications haven't opened yet!")}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default NavBar;
