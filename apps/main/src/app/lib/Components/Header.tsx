"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiX } from "react-icons/fi";

const tabs = [
  { label: "About us", href: "/#about" },
  { label: "Our values", href: "/#values" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Projects", href: "/projects" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Our team", href: "/team" },
  { label: "FAQs", href: "/#faq" },
];

const labelStyles =
  "font-SpecialGothicCondensedOne-Regular text-xl uppercase whitespace-nowrap";

const buttonStyles = clsx(
  labelStyles,
  "relative flex items-center justify-center rounded-xl border border-[#ffda82] px-5 py-2.5 transition-[filter] hover:brightness-110",
);

const handleApplyClick = () => {
  alert(
    "Applications for HackBeanpot 2026 are closed! Please follow us on Instagram @HackBeanpot for more updates.",
  );
};

const HeaderButtons = () => (
  <div className="flex items-center gap-3">
    <Link
      href="/sponsor-us"
      className={clsx(
        buttonStyles,
        "bg-gradient-to-t from-[rgba(233,172,29,0.2)] to-[rgba(255,210,104,0.2)] text-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1),inset_0px_0px_20px_0px_rgba(255,255,255,0.1)] backdrop-blur-[4px]",
      )}
    >
      Sponsor us
    </Link>
    <button
      type="button"
      onClick={handleApplyClick}
      className={clsx(
        buttonStyles,
        "bg-gradient-to-t from-[#e9ac1d] to-[#ffd268] text-[#512309] shadow-[0px_0px_10px_rgba(0,0,0,0.1),inset_0px_0px_20px_0px_rgba(255,255,255,0.1)]",
      )}
    >
      Apply
    </button>
  </div>
);

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="relative z-50 w-full">
      <nav className="flex items-center justify-between gap-8 px-8 py-5 mobile:px-5">
        <Link href="/" aria-label="HackBeanpot home" className="shrink-0">
          <Image
            src="/header/logo.png"
            alt="HackBeanpot"
            width={163}
            height={52.395}
            priority
            className="h-[52.395px] w-[163px] object-cover"
          />
        </Link>

        <div className="flex items-center justify-end gap-9 max-[1400px]:gap-6 tablet:hidden mobile-xl:hidden mobile:hidden">
          {tabs.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={clsx(labelStyles, "pt-1 text-white hover:opacity-80")}
            >
              {label}
            </Link>
          ))}
          <HeaderButtons />
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setOpen((prev) => !prev)}
          className="hidden text-white tablet:block mobile-xl:block mobile:block"
        >
          {isOpen ? <FiX size={32} /> : <RxHamburgerMenu size={32} />}
        </button>
      </nav>

      {isOpen && (
        <div className="absolute left-0 top-full hidden w-full flex-col items-start gap-6 bg-gradient-to-b from-[#322243] to-[#251930] px-8 py-8 tablet:flex mobile-xl:flex mobile:flex mobile:px-5">
          {tabs.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={clsx(labelStyles, "text-white hover:opacity-80")}
            >
              {label}
            </Link>
          ))}
          <HeaderButtons />
        </div>
      )}
    </header>
  );
};

export default Header;
