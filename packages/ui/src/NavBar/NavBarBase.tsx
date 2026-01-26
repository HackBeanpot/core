"use client";

import React, { useState } from "react";
import HackBeanpotLogo from "../Logos/HackBeanpotLogo";
import LocalLink from "./LocalLink";
import Button from "@repo/ui/Button";
import useDevice from "@repo/util/hooks/useDevice";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiX } from "react-icons/fi";
import clsx from "clsx";

export type LinkProps = {
  pageName: string;
  link: string;
  buttonColor?: string;
  useExternalLink?: boolean;
  onClick?: () => void;  // ADDED: onClick support
};

export type NavBarProps = {
  links: LinkProps[];
  buttonLinks: LinkProps[];
  solidDropdownColor?: boolean;
};

const LinkedButton = ({
  useExternalLink,
  linkInfo,
}: {
  useExternalLink: boolean;
  linkInfo: LinkProps;
}) => {
  if (linkInfo.onClick) {
    return (
      <Button
        textColor="white"
        text={linkInfo.pageName}
        color={linkInfo.buttonColor}
        size="medium"
        className="w-fit"
        onClick={linkInfo.onClick}
      />
    );
  }

  return useExternalLink ? (
    <Button
      textColor="white"
      text={linkInfo.pageName}
      color={linkInfo.buttonColor}
      size="medium"
      className="w-fit"
      onClick={() => window.open(linkInfo.link)}
    />
  ) : (
    <LocalLink href={linkInfo.link}>
      <Button
        textColor="white"
        text={linkInfo.pageName}
        color={linkInfo.buttonColor}
        size="medium"
        className="w-fit"
      />
    </LocalLink>
  );
};

const NavBarBase: React.FC<NavBarProps> = ({
  links,
  buttonLinks,
  solidDropdownColor,
}) => {
  const [isOpen, setOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useDevice();

  const outerDivStyles = clsx(
    "sticky top-0 z-[100] w-full h-fit bg-white flex flex-row",
    isDesktop ? "flex-row p-2" : "flex-col",
    isOpen && isMobile && "fixed",
  );

  const navBarStyles = clsx(
    "flex flex-row items-center left-0 w-full",
    !isDesktop && "p-2",
  );

  const iconStyles = clsx(
    "flex flex-row w-full items-center justify-end pr-2",
    isTablet && "pr-6",
  );

  const navBarItemsStyles = clsx(
    "flex gap-10 w-full items-center z-10 text-md",
    isDesktop
      ? "flex-row justify-end self-center p-4 text-lg"
      : "flex-col gap-8 bg-starlightBlue top-10 p-10",
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
          <HackBeanpotLogo className="w-[10vw] min-w-[100px]" />
        </LocalLink>

        {!isDesktop && (
          <div className={iconStyles} onClick={() => setOpen((prev) => !prev)}>
            {isOpen ? (
              <FiX size={32} color="black" />
            ) : (
              <RxHamburgerMenu size={32} color="black" />
            )}
          </div>
        )}
      </div>

      {(isDesktop || isOpen) && (
        <div className={navBarItemsStyles}>
          {links.map((item) => (
            <LocalLink
              key={item.pageName + "-" + item.link}
              href={item.link}
              className={`${isOpen && !isDesktop ? "text-white" : "text-charcoalFog"} hover:text-charcoalFogLight font-DMSans-Bold`}
            >
              {item.pageName}
            </LocalLink>
          ))}
          <div className={buttonsStyles}>
            {buttonLinks.map((linkItem) =>
              solidDropdownColor && !isDesktop ? (
                <LocalLink
                  key={linkItem.pageName + "-" + linkItem.link}
                  href={linkItem.link}
                  className={`${isOpen && !isDesktop ? "text-white" : "text-charcoalFog"} hover:text-charcoalFogLight font-DMSans-Bold`}
                >
                  {linkItem.pageName}
                </LocalLink>
              ) : (
                <LinkedButton
                  key={linkItem.pageName + "-" + linkItem.link}
                  useExternalLink={linkItem.useExternalLink ?? false}
                  linkInfo={linkItem}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarBase;