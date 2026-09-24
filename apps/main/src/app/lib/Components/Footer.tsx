"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Merriweather } from "next/font/google";
import clsx from "clsx";
import isValidEmail from "@repo/util/functions/isValidEmail";
import ExternalLink from "./ExternalLink";

const merriweather = Merriweather({
  weight: ["300", "400"],
  subsets: ["latin"],
});

const goldButtonStyles =
  "relative flex items-center justify-center rounded-lg border border-[#ffda82] bg-gradient-to-t from-[#e9ac1d] to-[#ffd268] shadow-[0px_0px_10px_rgba(0,0,0,0.1),inset_0px_0px_20px_0px_rgba(255,255,255,0.1)] transition-[filter] hover:brightness-105";

const GoldButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      goldButtonStyles,
      "px-5 py-2.5 font-SpecialGothicCondensedOne-Regular text-xl text-[#833711] whitespace-nowrap",
    )}
  >
    {text}
  </button>
);

// Instagram and LinkedIn buttons are exported from Figma with their drop shadow
// baked in (88x88 SVG around a 48x48 button), so they're offset by the shadow.
const SocialIconButton = ({
  href,
  alt,
  src,
}: {
  href: string;
  alt: string;
  src: string;
}) => (
  <ExternalLink
    href={href}
    aria-label={alt}
    className="relative block size-12 shrink-0 transition-[filter] hover:brightness-105"
  >
    <Image
      src={src}
      alt={alt}
      width={88}
      height={88}
      className="absolute inset-[-41.67%] block max-w-none size-[88px]"
    />
  </ExternalLink>
);

// Positions are relative to the pyramid group's top-left in the Figma frame.
const pyramidPieces: {
  src?: string;
  left: number;
  top: number;
  width: number;
  height: number;
  background?: string;
}[] = [
  {
    src: "/footer/pyramid-front-highlight.svg",
    left: 167.69,
    top: 0,
    width: 126.054,
    height: 166.531,
  },
  {
    src: "/footer/pyramid-small-right.svg",
    left: 416.91,
    top: 110.44,
    width: 72.279,
    height: 54.354,
  },
  {
    src: "/footer/pyramid-small-left.svg",
    left: 41.63,
    top: 67.07,
    width: 105.816,
    height: 99.456,
  },
  {
    src: "/footer/pyramid-main.svg",
    left: 100.61,
    top: 0,
    width: 341.157,
    height: 161.905,
  },
  {
    src: "/footer/pyramid-mask-1.svg",
    left: 314.56,
    top: 52.04,
    width: 38.163,
    height: 5.782,
  },
  {
    src: "/footer/pyramid-mask-2.svg",
    left: 340,
    top: 115.65,
    width: 77.483,
    height: 3.469,
  },
  { left: 0, top: 161.9, width: 540.068, height: 8.095, background: "#de9027" },
  {
    left: 234.76,
    top: 126.05,
    width: 136.463,
    height: 8.095,
    background:
      "linear-gradient(89.9deg, rgb(219, 127, 16) 0%, rgb(249, 160, 35) 74.247%)",
  },
  {
    left: 327.28,
    top: 141.09,
    width: 46.259,
    height: 8.095,
    background: "#f9a023",
  },
  {
    left: 290.27,
    top: 76.33,
    width: 46.259,
    height: 9.252,
    background: "#f9a023",
  },
  {
    src: "/footer/pyramid-mask-3.svg",
    left: 147.55,
    top: 95.83,
    width: 20.772,
    height: 3.147,
  },
  {
    src: "/footer/pyramid-mask-4.svg",
    left: 161.4,
    top: 130.45,
    width: 42.174,
    height: 1.888,
  },
  {
    left: 104.12,
    top: 136.11,
    width: 74.277,
    height: 4.406,
    background:
      "linear-gradient(89.9deg, rgb(223, 131, 19) 0%, rgb(249, 160, 35) 84.972%)",
  },
  {
    left: 154.48,
    top: 144.3,
    width: 25.179,
    height: 4.406,
    background: "#f9a023",
  },
  {
    left: 134.33,
    top: 109.04,
    width: 25.179,
    height: 5.036,
    background: "#f9a023",
  },
];

const Pyramids = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute bottom-[-13px] left-[calc(50%-303px)] h-[170px] w-[540px] mobile:left-1/2 mobile:-translate-x-1/2 mobile:scale-75 mobile:origin-bottom"
  >
    {pyramidPieces.map(
      ({ src, left, top, width, height, background }, index) => {
        const style = { left, top, width, height, background };
        return src ? (
          <Image
            key={index}
            src={src}
            alt=""
            width={width}
            height={height}
            className="absolute block max-w-none"
            style={style}
          />
        ) : (
          <div key={index} className="absolute" style={style} />
        );
      },
    )}
  </div>
);

const Footer = () => {
  const [mailingEmail, setMailingEmail] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMailingEmail(e.target.value);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!mailingEmail || !isValidEmail(mailingEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    const res = await fetch("/api/joinMailingList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: mailingEmail,
        reactivate_existing: false,
        send_welcome_email: true,
      }),
    });
    if (res.ok) {
      setMailingEmail("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <footer className="relative w-full min-h-[289px] overflow-hidden bg-gradient-to-b from-[#322243] to-[#251930]">
      <div className="relative z-10 flex flex-row items-center justify-between gap-10 px-20 pt-[70px] pb-[70px] tablet:flex-col tablet:items-start tablet:px-12 tablet:pb-[200px] mobile-xl:flex-col mobile-xl:items-start mobile-xl:px-6 mobile-xl:pb-[200px] mobile:flex-col mobile:items-start mobile:px-5 mobile:pb-[160px]">
        <div className="flex w-[343px] max-w-full shrink-0 flex-col items-start gap-4">
          <GoldButton text="BACK TO TOP" onClick={handleBackToTop} />
          <div className="flex items-center gap-2">
            <SocialIconButton
              href="https://www.instagram.com/hackbeanpot/?hl=en"
              alt="HackBeanpot Instagram"
              src="/footer/instagram-button.svg"
            />
            <SocialIconButton
              href="https://www.linkedin.com/company/hackbeanpot-inc"
              alt="HackBeanpot LinkedIn"
              src="/footer/linkedin-button.svg"
            />
            <ExternalLink
              href="https://www.tiktok.com/@hackbeanpot"
              aria-label="HackBeanpot TikTok"
              className={clsx(goldButtonStyles, "size-12 shrink-0")}
            >
              <Image
                src="/footer/tiktok-icon.svg"
                alt=""
                width={20}
                height={20}
                className="block size-5"
              />
            </ExternalLink>
          </div>
          <p
            className={clsx(
              merriweather.className,
              "text-sm font-light text-[#cecece]",
            )}
          >
            HackBeanpot is a 501(c)(3) non-profit organization.
          </p>
        </div>

        <div className="flex w-[411px] max-w-full shrink-0 flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-1 text-white">
            <h3 className="font-SpecialGothicCondensedOne-Regular text-[28px] leading-[1.4] uppercase">
              Join our mailing list
            </h3>
            <p className={clsx(merriweather.className, "text-base font-light")}>
              Stay up to date with HackBeanpot by signing up for our mailing
              list!
            </p>
          </div>
          <div className="flex w-full items-center gap-3">
            <input
              type="email"
              aria-label="Email address"
              placeholder="example@email.com"
              value={mailingEmail}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className={clsx(
                merriweather.className,
                "min-w-0 flex-1 rounded-lg bg-[#f4f4f4] px-5 py-3 text-base text-[#5d5d5d] placeholder:text-[#5d5d5d] outline-none focus:ring-2 focus:ring-[#ffd268]",
              )}
            />
            <GoldButton text="SUBMIT" onClick={handleSubmit} />
          </div>
        </div>
      </div>
      <Pyramids />
    </footer>
  );
};

export default Footer;
