"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { SceneId } from "../../(landing)/scenes/types";
import { site } from "../content/site";
import { Button } from "./museum";
import MobileMenu from "./MobileMenu";
import {
  headerTabs,
  showApplicationsClosed,
  type HeaderTab,
} from "./navigation";

/** Apply button: links to the portal, or falls back to the closed alert. */
const ApplyButton = () =>
  site.applicationUrl ? (
    <Button variant="gold" href={site.applicationUrl} external>
      Apply
    </Button>
  ) : (
    <Button variant="gold" onClick={showApplicationsClosed}>
      Apply
    </Button>
  );

const HeaderButtons = () => (
  <div className="flex items-center gap-3">
    <Button variant="ghost" href={site.sponsorUsHref}>
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
    className="group flex flex-col items-center justify-center gap-1 rounded-sm pt-1 font-gothic text-xl uppercase leading-normal whitespace-nowrap text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
  /**
   * `false` hides the logo below 640px while the header is over the page's
   * first screen. The landing page's SM hero has its MLH badge in the logo's
   * corner (SM hero `5615:22626` shows only the menu button); once the hero
   * scrolls away the logo comes back.
   */
  smLogo?: boolean;
};

/**
 * Site header.
 *
 * - LG (≥1280): logo, 8 section tabs, Sponsor Us + Apply
 * - MD (640–1279): logo, Sponsor Us + Apply, hamburger
 * - SM (<640): logo, hamburger
 *
 * The hamburger opens `MobileMenu`. The header is fixed at every size. On SM
 * (which scrolls normally) it's transparent over the first screen, then a
 * tinted, blurred bar so it stays readable over the sections below.
 */
/** True while the page is scrolled less than one screen (minus the bar). */
function useOverFirstScreen() {
  const [over, setOver] = useState(true);
  useEffect(() => {
    const update = () =>
      setOver(window.scrollY < window.innerHeight - HEADER_HEIGHT);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return over;
}

/** Height of the SM bar (20px padding around the 40px menu button). */
const HEADER_HEIGHT = 80;

const Header = ({
  activeSection,
  visible = true,
  smLogo = true,
}: HeaderProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // inert keeps the hidden header's links out of the tab order. Set it on the
  // DOM node because React 18 doesn't know the attribute.
  useEffect(() => {
    if (headerRef.current) headerRef.current.inert = !visible;
  }, [visible]);

  // SM: whether the bar still sits over the first screen (the hero).
  const overTop = useOverFirstScreen();

  // Restore focus on Esc/close, but not after a link click: focusing the
  // hamburger would scroll SM back to the top.
  const closeMenu = ({ restoreFocus }: { restoreFocus: boolean }) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  };

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 w-full transition-[opacity,transform,background-color] duration-300 ease-out",
        !overTop && "max-sm:bg-[rgba(6,8,37,0.72)] max-sm:backdrop-blur-[8px]",
        !visible && "pointer-events-none -translate-y-2 opacity-0",
      )}
      ref={headerRef}
      aria-hidden={visible ? undefined : true}
    >
      <div className="flex items-center justify-between p-5 sm:py-4 xl:px-8 xl:py-5">
        <a
          href="#"
          aria-label="HackBeanpot home"
          className={clsx(
            "shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
            "transition-[opacity,visibility] duration-300",
            !smLogo && overTop && "max-sm:invisible max-sm:opacity-0",
          )}
        >
          <Image
            src="/header/logo.png"
            alt=""
            width={163}
            height={52.395}
            priority
            className="h-[52.395px] w-[163px] object-cover hidden sm:block"
          />
          {/* SM uses the Mobile Menu navbar logo (5847:800) */}
          <span className="flex items-center gap-2 font-gothic text-[28px] leading-normal text-white sm:hidden">
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
          className="hidden items-center justify-end gap-9 [@media(max-width:1399px)]:gap-6 xl:flex"
        >
          {headerTabs.map((tab) => (
            <Tab key={tab.id} {...tab} active={activeSection === tab.id} />
          ))}
          <HeaderButtons />
        </nav>

        <div className="flex items-center gap-5 xl:hidden">
          <div className="hidden sm:block">
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
