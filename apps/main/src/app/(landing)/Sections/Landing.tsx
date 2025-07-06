"use client";

import React from "react";
import useDevice from "@repo/util/hooks/useDevice";
import Image from "next/image";
import ExternalLink from "../../lib/Components/ExternalLink";
import LandingBackground from "../../lib/Assets/SVG/LandingBackground";
import Guardrail from "../../lib/Assets/SVG/RoadAssets/Guardrail";
import Road from "../../lib/Assets/SVG/RoadAssets/Road";
import Bus from "../../lib/Assets/SVG/RoadAssets/Bus";
import clsx from "clsx";

export default function Landing(): React.ReactNode {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const containerStyles = clsx(
    "relative w-screen",
    isDesktop && "h-auto mb-8",
    isMobile && "",
  );

  const bgStyles = clsx(
    "w-full",
    isDesktop && "h-full",
    isMobile && "h-[22vh]",
  );

  const foregroundStyles = clsx(
    "absolute grid grid-rows-2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 h-[125%] top-[50%]",
    isDesktop && "",
    isMobile && "",
  );

  const busStyles = clsx(
    "absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 w-[40vw] top-[75%]",
    isDesktop && "",
    isMobile && "top-[70%]",
  );

  const licensePlateStyles = clsx(
    "absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2  w-[20vw] h-auto max-w-[700px] min-w-[300px]",
    isDesktop && "top-[35%] scale-[185%]",
    isTablet && "top-[40%] scale-[100%]",
    isMobile && "scale-[55%] top-[30%]",
  );

  const roadContainer = clsx(
    "absolute w-full grid",
    isDesktop && "grid-rows-2 bottom-[-10%]",
    isTablet && "grid-rows-2 bottom-[-18%]",
    isMobile && "grid-rows-2 bottom-[0%]",
  );

  const guardrailStyles = clsx(
    "w-full",
    isDesktop && "relative bottom-[-10%]",
    isMobile && "",
  );

  const roadStyles = clsx("w-full", isDesktop && "", isMobile && "");

  const socialsStyles = clsx(
    "absolute top-5 right-10 gap-2",
    isDesktop && "flex ",
    isTablet && "hidden",
    isMobile ? "hidden" : "flex",
  );

  return (
    <div className={containerStyles}>
      <div className={bgStyles}>
        <LandingBackground />
        <div className={roadContainer}>
          <div className={guardrailStyles}>
            <Guardrail />
          </div>
          <div className={roadStyles}>
            <Road />
          </div>
        </div>
        <div className={foregroundStyles}>
          <div className={licensePlateStyles}>
            <Image
              alt="LicensePlate"
              src="/license_plate.png"
              width={400}
              height={200}
            />
          </div>
          <div className={busStyles}>
            <Bus />
          </div>
        </div>
      </div>
      <div className={socialsStyles}>
        <ExternalLink href="https://www.instagram.com/hackbeanpot/?hl=en">
          <Image
            alt="InstagramLogo"
            src="/instagram_logo.png"
            width={40}
            height={40}
          />
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/company/hackbeanpot-inc/posts/?feedView=all">
          <Image
            alt="LinkedinLogo"
            src="/linkedin_logo.png"
            width={40}
            height={40}
          />
        </ExternalLink>
        <ExternalLink href="mailto:team@hackbeanpot.com">
          <Image alt="EmailLogo" src="/email_logo.png" width={40} height={40} />
        </ExternalLink>
      </div>
    </div>
  );
}
