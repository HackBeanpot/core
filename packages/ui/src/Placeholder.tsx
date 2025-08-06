"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useDevice from "@repo/util/hooks/useDevice";

import LeftCloud from "./PlaceholderAssets/LeftCloud";
import RightCloud from "./PlaceholderAssets/RightCloud";
import LargeSign from "./PlaceholderAssets/LargeSign";
import Logo from "./PlaceholderAssets/Logo";
import ExternalLink from "./PlaceholderAssets/ExternalLink";
import InstagramLogo from "./PlaceholderAssets/InstagramLogo";
import LinkedInLogo from "./PlaceholderAssets/LinkedInLogo";

const InputBox: React.FC<{
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}> = ({ isMobile, isTablet, isDesktop }) => {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async () => {
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/joinMailingList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const buttonText =
    status === "loading"
      ? "Submitting…"
      : status === "success"
        ? "Subscribed!"
        : "Notify Me";

  const containerClass = clsx(
    "relative grid grid-cols-2",
    isDesktop && "top-[-185%]",
    isTablet && "top-[-50%]",
    isMobile && "grid-cols-4 top-[-65%]",
  );

  const inputClass = clsx(
    "font-DMSans-Regular border border-heather border-4 pl-4 bg-[#FEF9F2] h-[5.5vh]",
    isDesktop && "rounded-lg w-[20vw] text-xl",
    isTablet && "rounded-xl w-[42vw] text-xl",
    isMobile && "rounded-lg w-[85%] border-2 h-[5vh] col-span-3",
  );

  const buttonClass = clsx(
    "hover:scale-105 transition-transform hover:bg-darkSeaFoam font-GT-Walsheim-Regular bg-seaFoam text-white h-[5vh] disabled:opacity-50 disabled:cursor-not-allowed",
    isDesktop && "text-xl rounded-lg w-[8vw]",
    isTablet && "text-xl rounded-xl w-[15vw]",
    isMobile && "relative rounded-lg w-[25vw] left-[-30%]",
  );

  const alert =
    status === "success"
      ? { text: "You’re on the list! Yayyy!!! 🎉", style: "bg-emerald-500" }
      : status === "error"
        ? { text: "Something went wrong. Try again.", style: "bg-rose-500" }
        : null;

  return (
    <div className="relative">
      {alert && (
        <div
          role="alert"
          className={`absolute -top-12 left-1/2 -translate-x-1/2 rounded-md px-4 py-2 text-white text-sm shadow-md ${alert.style}`}
        >
          {alert.text}
        </div>
      )}

      <div className={containerClass}>
        <input
          className={inputClass}
          placeholder="Start your journey..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={status === "loading"}
        />
        <button
          className={buttonClass}
          onClick={handleSubmit}
          disabled={status === "loading"}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default function Placeholder(): React.ReactNode {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const [wasCloudClicked, setRotateCloud] = useState(false);
  const [, setCloudClicks] = useState(0);
  const [isMouseOnCloud, setMouseOnCloud] = useState(false);

  const handleFiveClicks = () => {
    setCloudClicks((prev) => {
      let newCount = prev;

      if (isMouseOnCloud) {
        newCount += 1;

        if (newCount === 5) {
          setRotateCloud(true);

          console.log("current count: %d", newCount);
          console.log("is mouse hovering cloud?:", isMouseOnCloud);
          console.log("Clicked at", Date.now());

          return 0;
        }

        setRotateCloud(false);
        return newCount;
      }

      setRotateCloud(false);
      return 0;
    });
  };

  const wrapperClass =
    "relative bg-gradient-to-b from-skyBlue to-sunnyBlue h-screen w-screen";

  const leftCloudClass = clsx(
    "absolute top-[10%]",
    wasCloudClicked && "animate-spin duration-150",
    !wasCloudClicked && "hover:scale-110 transition-transform transition-duration-3000"
  );

  const rightCloudClass =
    "absolute right-0 top-[50%] hover:scale-110 transition-transform transition-duration-3000";
  const logoClass = clsx(
    "absolute top-4 left-6 hover:scale-110 transition-transform transition-duration-300",
    isMobile && "left-4",
  );

  const layoutClass = clsx(
    "absolute left-0 grid",
    isDesktop && "top-[25%] grid-cols-7",
    isTablet && "top-[15%] grid-rows-2",
    isMobile && "top-[10%] grid-rows-2",
  );

  const largeSignClass = clsx(
    "relative left-0",
    isDesktop && "col-span-3",
    isTablet && "row-start-2 w-[65%] -mt-36",
    isMobile && "row-start-2 w-[85%] -mt-64",
  );

  const contentWrapperClass = clsx(
    "relative mx-[5vw] grid grid-rows-3",
    isDesktop && "px-10 left-[7%] col-span-4 top-[10%]",
    isTablet && "",
    isMobile && "top-8 left-2",
  );

  const headingClass = clsx(
    "font-Wilden text-pavement",
    isDesktop && "text-6xl row-span-2",
    isTablet && "text-5xl",
    isMobile && "text-4xl",
  );

  const paragraphClass = clsx(
    "font-GT-Walsheim-Regular",
    isDesktop && "text-xl",
    isTablet && "mt-4 text-xl",
    isMobile && "mt-2",
  );

  const socialIconsClass = clsx(
    "absolute grid grid-cols-2 bottom-10 right-10",
    isDesktop && "w-[6.5vw]",
    isTablet && "w-[14vw]",
    isMobile && "w-[24vw] right-6",
  );

  const contactWrapperClass = "absolute bottom-10 left-10 text-l";
  const emailClass =
    "font-GT-Walsheim-Regular underline hover:no-underline transition-transform transition-duration-300";

  return (
    <div className={wrapperClass}>
      <div 
        className={leftCloudClass} 
        onClick={() => handleFiveClicks()} 
        onMouseEnter={() => setMouseOnCloud(true)} 
        onMouseLeave={() => setMouseOnCloud(false)}
      >
        <LeftCloud />
      </div>

      <div className={rightCloudClass}>
        <RightCloud />
      </div>

      <Logo className={logoClass} />

      <div className={layoutClass}>
        <LargeSign className={largeSignClass} />
        <div className={contentWrapperClass}>
          <h3 className={headingClass}>
            {
              "IT MIGHT BE THE END OF THE ROAD, BUT IT'S JUST THE START OF YOUR JOURNEY!"
            }
          </h3>
          <p className={paragraphClass}>Get notified when applications open!</p>
          <InputBox
            isMobile={isMobile}
            isTablet={isTablet}
            isDesktop={isDesktop}
          />
        </div>
      </div>

      <div className={socialIconsClass}>
        <ExternalLink href="https://www.instagram.com/hackbeanpot/?hl=en">
          <InstagramLogo />
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/company/hackbeanpot-inc/posts/?feedView=all">
          <LinkedInLogo />
        </ExternalLink>
      </div>

      <div className={contactWrapperClass}>
        <p className="font-GT-Walsheim-Bold">Reach out for inquiries at</p>
        <a className={emailClass} href="mailto:team@hackbeanpot.com">
          team@hackbeanpot.com
        </a>
      </div>
    </div>
  );
}
