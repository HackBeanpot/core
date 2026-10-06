"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import type { SceneId } from "../../(landing)/scenes/types";
import { APPLICATION_URL, SPONSOR_US_HREF } from "../siteConfig";
import { headerTabs, showApplicationsClosed } from "./navigation";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const itemStyles =
  "rounded-sm font-SpecialGothicCondensedOne-Regular text-[28px] uppercase leading-normal whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

type MobileMenuProps = {
  id: string;
  activeSection?: SceneId;
  onClose: (options: { restoreFocus: boolean }) => void;
};

/**
 * Full-screen menu overlay from Figma "Mobile Menu" (5694:48024), opened by
 * the header hamburger on MD and SM. No open/close animation (SM is static).
 * Locks body scroll, traps focus, and closes on Esc or link click.
 */
const MobileMenu = ({ id, activeSection, onClose }: MobileMenuProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose({ restoreFocus: true });
      return;
    }
    if (e.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // The hash jump has to wait until the menu unmounts and unlocks body
  // scroll, or the browser scrolls a locked page and lands in the wrong place.
  const closeAfterNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = new URL(e.currentTarget.href).hash;
    e.preventDefault();
    onClose({ restoreFocus: false });
    requestAnimationFrame(() => {
      window.history.pushState(null, "", hash || window.location.pathname);
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
      else window.scrollTo({ top: 0 });
    });
  };

  return (
    <div
      ref={dialogRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#15173b] to-[#060825]"
    >
      {/* Decorative art, anchored to the bottom of the 402×874 frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Image
          src="/header/mobile-menu/dinosaur.svg"
          alt=""
          width={648}
          height={648}
          className="absolute bottom-[-123px] left-[51px] max-w-none"
        />
        <Image
          src="/header/mobile-menu/circular-glow.svg"
          alt=""
          width={37.2059}
          height={37.2058}
          className="absolute bottom-[77px] left-[163.13px] max-w-none mix-blend-overlay"
        />
        <Image
          src="/header/mobile-menu/sparkle.svg"
          alt=""
          width={11.8227}
          height={10.9555}
          className="absolute bottom-[91.3px] left-[175.54px] max-w-none -scale-x-100"
        />
        <Image
          src="/header/mobile-menu/dune.svg"
          alt=""
          width={932}
          height={946.34}
          className="absolute bottom-[-463.34px] left-[-390px] max-w-none"
        />
      </div>

      <div className="relative flex items-center justify-between p-5">
        <a
          href="#"
          onClick={closeAfterNavigate}
          aria-label="HackBeanpot home"
          className={clsx(
            itemStyles,
            "flex items-center gap-2 normal-case text-white",
          )}
        >
          <Image
            src="/header/mobile-menu/logo-mark.svg"
            alt=""
            width={28}
            height={28}
          />
          HackBeanpot
        </a>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close menu"
          onClick={() => onClose({ restoreFocus: true })}
          className="size-10 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <Image
            src="/header/mobile-menu/close.svg"
            alt=""
            width={40}
            height={40}
          />
        </button>
      </div>

      <nav aria-label="Sections" className="relative px-5 pb-10 pt-[17px]">
        <ul className="flex flex-col items-start gap-5">
          {headerTabs.map(({ label, id: tabId }) => {
            const active = activeSection === tabId;
            return (
              <li key={tabId}>
                <a
                  href={`#${tabId}`}
                  onClick={closeAfterNavigate}
                  aria-current={active ? "true" : undefined}
                  className={clsx(
                    itemStyles,
                    "flex flex-col gap-1",
                    active ? "text-white" : "text-white/75 hover:text-white",
                  )}
                >
                  {label}
                  {active && (
                    <span aria-hidden className="relative h-0 w-full">
                      <Image
                        src="/header/mobile-menu/underline.svg"
                        alt=""
                        width={91}
                        height={3}
                        className="absolute inset-x-0 -top-[3px] h-[3px] w-full max-w-none"
                      />
                    </span>
                  )}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={SPONSOR_US_HREF}
              onClick={closeAfterNavigate}
              className={clsx(itemStyles, "text-white/75 hover:text-white")}
            >
              Sponsor us
            </a>
          </li>
          <li>
            {APPLICATION_URL ? (
              <a
                href={APPLICATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(itemStyles, "text-white/75 hover:text-white")}
              >
                Apply
              </a>
            ) : (
              <button
                type="button"
                onClick={showApplicationsClosed}
                className={clsx(itemStyles, "text-white/75 hover:text-white")}
              >
                Apply
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
