"use client";

import React, { useState } from "react";
import Logo from "../../../../../../packages/ui/src/Logos/HackBeanpotLogo";
import LocalLink from "./LocalLink";
import Button from "@repo/ui/Button";
import useDevice from "@util/hooks/useDevice";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiX } from "react-icons/fi";
import clsx from "clsx";

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useDevice();

  type LocalLinkInfo = {
    pageName: string;
    link: string;
  };

  const localLinkArr: LocalLinkInfo[] = [
    { pageName: "About", link: "/" },
    { pageName: "Projects", link: "/projects" },
    { pageName: "Team", link: "/team" },
    { pageName: "Sponsors", link: "/sponsors" },
  ];

  const outerDivStyles = clsx(
    "sticky top-0 z-[50] w-full h-fit bg-white flex flex-row",
    isDesktop ? "flex-row p-2" : "flex-col",
    isOpen && isMobile && "fixed",
  );

  const navBarStyles = clsx(
    "flex flex-row items-center left-0 w-full",
    isMobile && "p-2",
  );

  const iconStyles = clsx(
    "flex flex-row w-full items-center justify-end pr-2",
    isTablet && "pr-6"
  );

  const navBarItemsStyles = clsx(
    "flex gap-10 w-full items-center z-10",
    isDesktop
      ? "flex-row justify-end self-center p-4"
      : "flex-col gap-8 bg-starlightBlue text-white top-10 p-10",
    isMobile ? "h-screen" : "h-fit",
  );

  const buttonsStyles = clsx(
    "flex flex-row gap-2 items-center",
    isDesktop && "justify-end pr-4",
  );

  return (
    <div className={outerDivStyles}>
      <div className={navBarStyles}>
        <LocalLink href={"/"}>
          <Logo />
        </LocalLink>

        {!isDesktop && (
          <div
            className={iconStyles}
            onClick={() => setOpen((prev) => !prev)}
          >
            {isOpen ? (
              <FiX size={36} color="black" />
            ) : (
              <RxHamburgerMenu size={36} color="black" />
            )}
          </div>
        )}
      </div>

      {(isDesktop || isOpen) && (
        <div className={navBarItemsStyles}>
          {localLinkArr.map((item) => (
            <LocalLink
              key={item.pageName}
              href={item.link}
              className="text-lg font-DMSans-Bold"
            >
              {item.pageName}
            </LocalLink>
          ))}
          <div className={buttonsStyles}>
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
      )}
    </div>
  );
};

export default NavBar;
