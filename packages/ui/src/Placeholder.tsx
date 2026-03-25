"use client";

import React from "react";
import clsx from "clsx";
import useDevice from "@repo/util/hooks/useDevice";
import useCloudEffect from "@repo/util/hooks/useCloudEffect";

import Cloud from "./PlaceholderAssets/Cloud";
import LargeSign from "./PlaceholderAssets/LargeSign";
import Logo from "./PlaceholderAssets/Logo";
import ExternalLink from "./PlaceholderAssets/ExternalLink";
import InstagramLogo from "./PlaceholderAssets/InstagramLogo";
import LinkedInLogo from "./PlaceholderAssets/LinkedInLogo";
import RadialBackground from "./PlaceholderAssets/Radial-Background";
import SocialsButtonsRow from "./SocialsButtonsRow";

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
    "relative flex justify-center gap-4",
    isDesktop && "top-[-185%]",
    isTablet && "top-[-50%]",
    isMobile && "grid-cols-4 top-[-65%]",
  );

  const inputClass = clsx(
    "font-DMSans-Regular text-[#7b7b7b] pl-4 bg-[#FFF5E5] h-[5vh]",
    isDesktop && "rounded-full w-[20vw] text-xl",
    isTablet && "rounded-full w-[42vw] text-xl",
    isMobile && "rounded-full w-[85%] border-2 h-[5vh] col-span-3",
  );

  const buttonClass = clsx(
    "hover:scale-105 transition-transform hover:bg-[#FDC558] font-NeulisNeue-Regular bg-marigoldYellow text-charcoal h-[5vh] disabled:opacity-50 disabled:cursor-not-allowed",
    isDesktop && "text-xl rounded-full w-[8vw]",
    isTablet && "text-xl rounded-full w-[15vw]",
    isMobile && "relative rounded-full w-[25vw] left-[-30%]",
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

  const wrapperClass =
    "relative bg-gradient-to-b from-skyBlue to-sunnyBlue h-screen w-screen";

  const logoClass = clsx(
    "absolute top-4 left-6 hover:scale-110 transition-transform transition-duration-300",
    isMobile && "left-4",
  );

  const layoutClass = clsx(
    "absolute flex justify-center items-center flex-col text-center w-full px-24 gap-8",
    isDesktop && "top-[25%]",
    isTablet && "top-[15%]",
    isMobile && "top-[10%]",
  );

  const headingClass = clsx(
    "font-NeulisNeue-Bold text-[#FFF5E5]",
    isDesktop && "text-6xl row-span-2",
    isTablet && "text-5xl",
    isMobile && "text-4xl",
  );

  const paragraphClass = clsx(
    "font-DM-Sans-Regular text-[#FFF5E5]",
    isDesktop && "text-xl",
    isTablet && "mt-4 text-xl",
    isMobile && "mt-2",
  );

  const socialIconsClass = clsx(
    "absolute grid grid-cols-3 gap-5 place-items-center top-10 right-10",
    isDesktop && "w-[6.5vw]",
    isTablet && "w-[14vw]",
    isMobile && "w-[24vw] right-6",
  );

  const link = clsx(
    "font-DM-Sans-Regular text-[#FFF5E5] underline",
    isDesktop && "text-xl",
    isTablet && "mt-4 text-xl",
    isMobile && "mt-2",
  );

  const contactWrapperClass = "absolute bottom-10 left-10 text-l text-[#FFF5E5]";
  const emailClass =
    "font-GT-Walsheim-Regular underline hover:no-underline transition-transform transition-duration-300";

  return (
    <div className={wrapperClass}>
      <RadialBackground
          className={`w-full ${isMobile ? "h-auto" : "min-h-screen"}`}
          style={{
            transform: isMobile ? "scale(2.5)" : "scale(1)",
            transformOrigin: "top center",
          }}
      />
      
      
      <div className="flex items-center gap-4">
        <ExternalLink href="https://www.instagram.com/hackbeanpot/?hl=en">
        <Logo className={logoClass} />
      </ExternalLink>

      <SocialsButtonsRow className="socialIconsClass"/>
      </div>
      
      

      <div className={layoutClass}>
        <h3 className={headingClass}>
          {
            "We hope you enjoyed the ride!"
          }
        </h3>
        <p className={paragraphClass}>Thank you for coming to HackBeanpot 2026! Sign up for our newsletter for more information and any upcoming events!</p>
        <InputBox
          isMobile={isMobile}
          isTablet={isTablet}
          isDesktop={isDesktop}
        />
        <a className={link} href="2026.hackbeanpot.com">Visit our last year's site</a>
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
