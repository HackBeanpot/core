"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { SceneId } from "../../(landing)/scenes/types";
import { APPLICATION_URL, SPONSOR_US_HREF } from "../siteConfig";
import { Button } from "./museum";
import MobileMenu from "./MobileMenu";
import {
  headerTabs,
  showApplicationsClosed,
  type HeaderTab,
} from "./navigation";

/** Apply button: links to the portal, or falls back to the closed alert. */
const ApplyButton = () =>
  APPLICATION_URL ? (
    <Button variant="gold" href={APPLICATION_URL} external>
      Apply
    </Button>
  ) : (
    <Button variant="gold" onClick={showApplicationsClosed}>
      Apply
    </Button>
  );

const HeaderButtons = () => (
  <div className="flex items-center gap-3">
    <Button variant="ghost" href={SPONSOR_US_HREF}>
      Sponsor us
    </Button>
    <ApplyButton />
  </div>
);

// Figma "Tab" (5346:5992): the underline is a hand-drawn stroke sitting 3px
// above the bottom of the tab.
const Tab = ({ label, id, active }: HeaderTab & { active: boolean }) => (
  <a
    href={`#${id}`}
    aria-current={active ? "true" : undefined}
    className="group flex flex-col items-center justify-center gap-1 rounded-sm pt-1 font-SpecialGothicCondensedOne-Regular text-xl uppercase leading-normal whitespace-nowrap text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
  >
    {label}
    <span aria-hidden className="relative h-0 w-full">
      <Image
        src={
          active
            ? "/header/tab-underline.svg"
            : "/header/tab-underline-hover.svg"
        }
        alt=""
        width={34}
        height={3}
        className={clsx(
          "absolute inset-x-0 -top-[3px] h-[3px] w-full max-w-none transition-opacity",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      />
    </span>
  </a>
);

type HeaderProps = {
  /** Tab to underline and mark `aria-current`. */
  activeSection?: SceneId;
  /**
   * `false` fades the header out (opacity + translateY, 300ms) and disables
   * pointer events. The hero sets this; MS-401 wires it to scroll.
   */
  visible?: boolean;
};

/**
 * Site header.
 *
 * - LG (≥1280): logo, 8 section tabs, Sponsor Us + Apply
 * - MD (640–1279): logo, Sponsor Us + Apply, hamburger
 * - SM (<640): logo, hamburger
 *
 * The hamburger opens `MobileMenu`. The header is fixed over the scenes on
 * LG/MD and sits at the top of the page on SM (SM scrolls normally).
 */
const Header = ({ activeSection, visible = true }: HeaderProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // inert keeps the hidden header's links out of the tab order. Set it on the
  // DOM node because React 18 doesn't know the attribute.
  useEffect(() => {
    if (headerRef.current) headerRef.current.inert = !visible;
  }, [visible]);

  // Restore focus on Esc/close, but not after a link click: focusing the
  // hamburger would scroll SM back to the top.
  const closeMenu = ({ restoreFocus }: { restoreFocus: boolean }) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 w-full transition-[opacity,transform] duration-300 ease-out mobile-xl:absolute mobile:absolute",
        !visible && "pointer-events-none -translate-y-2 opacity-0",
      )}
      ref={headerRef}
      aria-hidden={visible ? undefined : true}
    >
      <div className="flex items-center justify-between px-8 py-5 tablet:px-5 tablet:py-4 mobile-xl:p-5 mobile:p-5">
        <a
          href="#"
          aria-label="HackBeanpot home"
          className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src="/header/logo.png"
            alt=""
            width={163}
            height={52.395}
            priority
            className="h-[52.395px] w-[163px] object-cover mobile-xl:hidden mobile:hidden"
          />
          {/* SM uses the Mobile Menu navbar logo (5847:800) */}
          <span className="hidden items-center gap-2 font-SpecialGothicCondensedOne-Regular text-[28px] leading-normal text-white mobile-xl:flex mobile:flex">
            <Image
              src="/header/mobile-menu/logo-mark.svg"
              alt=""
              width={28}
              height={28}
              priority
            />
            HackBeanpot
          </span>
        </a>

        <nav
          aria-label="Sections"
          className="flex items-center justify-end gap-9 [@media(max-width:1399px)]:gap-6 tablet:hidden mobile-xl:hidden mobile:hidden"
        >
          {headerTabs.map((tab) => (
            <Tab key={tab.id} {...tab} active={activeSection === tab.id} />
          ))}
          <HeaderButtons />
        </nav>

        <div className="hidden items-center gap-5 tablet:flex mobile-xl:flex mobile:flex">
          <div className="mobile-xl:hidden mobile:hidden">
            <HeaderButtons />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            // 40px hit area around the 25.8×19.2 icon without changing spacing
            className="-mx-[7px] flex size-10 items-center justify-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <Image
              src="/header/menu.svg"
              alt=""
              width={25.8333}
              height={19.1667}
            />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <MobileMenu
          id="mobile-menu"
          activeSection={activeSection}
          onClose={closeMenu}
        />
      )}
    </header>
  );
};

export default Header;
