"use client";

import React from "react";
import RibbonTitle from "@repo/ui/RibbonTitle";
import Image from "next/image";
import FullCloudBackground from "../../lib/Assets/SVG/SponsorUsPageAssets/FullCloudBackground";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";

type BalloonProps = {
  src: string;
  alt?: string;
  desktop: { width: number; height: number; transform: string };
  tablet: { width: number; height: number; transform: string };
  mobile: { width: number; height: number; transform: string };
  zIdx: string;
};

export default function SponsorUsBenefitCardComp() {
  const { isMobile, isTablet, isDesktop } = useDevice();

  const ribbonStyles = clsx(
    "w-1/2",
    isMobile && "mt-52 mb-10",
    isTablet && "mt-48 mb-8",
    isDesktop && "mt-64 mb-12",
  );

  const balloons: BalloonProps[] = [
    {
      src: "/sponsor-stats/orangeballoon.svg",
      desktop: { width: 200, height: 300, transform: "translate(32vw, 20vw)" },
      tablet: { width: 100, height: 200, transform: "translate(32vw, 20vw)" },
      mobile: { width: 100, height: 200, transform: "translate(32vw, 16vw)" },
      zIdx: "z-10",
    },
    {
      src: "/sponsor-stats/darkgreenballoon.svg",
      desktop: { width: 200, height: 300, transform: "translate(10vw, 30vw)" },
      tablet: { width: 100, height: 200, transform: "translate(10vw, 30vw)" },
      mobile: { width: 70, height: 200, transform: "translate(10vw, 30vw)" },
      zIdx: "z-10",
    },
    {
      src: "/sponsor-stats/purpleballoon.svg",
      desktop: { width: 200, height: 300, transform: "translate(70vw, 20vw)" },
      tablet: { width: 100, height: 200, transform: "translate(70vw, 20vw)" },
      mobile: { width: 80, height: 200, transform: "translate(63vw, 25vw)" },
      zIdx: "z-10",
    },
    {
      src: "/sponsor-stats/lightgreenballoon.svg",
      desktop: { width: 200, height: 300, transform: "translate(48vw, 4vw)" },
      tablet: { width: 100, height: 200, transform: "translate(48vw, 4vw)" },
      mobile: { width: 80, height: 200, transform: "translate(52vw, -8vw)" },
      zIdx: "z-10",
    },
    {
      src: "/sponsor-stats/darkredballoon.svg",
      desktop: { width: 150, height: 200, transform: "translate(11vw, 4vw)" },
      tablet: { width: 80, height: 150, transform: "translate(12vw, 2vw)" },
      mobile: { width: 70, height: 200, transform: "translate(15vw, 0vw)" },
      zIdx: "z-0",
    },
    {
      src: "/sponsor-stats/peachballoon.svg",
      desktop: { width: 150, height: 200, transform: "translate(30vw, -3vw)" },
      tablet: { width: 80, height: 150, transform: "translate(30vw, -5vw)" },
      mobile: { width: 60, height: 200, transform: "translate(33vw, -10vw)" },
      zIdx: "z-0",
    },
    {
      src: "/sponsor-stats/navyballoon.svg",
      desktop: { width: 150, height: 200, transform: "translate(70vw, 0vw)" },
      tablet: { width: 80, height: 150, transform: "translate(70vw, -4vw)" },
      mobile: { width: 50, height: 200, transform: "translate(74vw, 6vw)" },
      zIdx: "z-0",
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden mobile:mt-[4.5vh] mobile-xl:mt-[5vh] tablet:mt-[6vh] desktop:mt-[7.5vh]">
      <FullCloudBackground
        className="absolute z-0 inset-0 w-[100vw] h-full justify-self-center"
        preserveAspectRatio="none"
      />
      <div className="relative inset-0 z-20 flex flex-col items-center justify-center">
        <div className={ribbonStyles}>
          <RibbonTitle text={"STATS"} />
        </div>
        <div className="relative w-full flex h-full">
          {balloons.map((aBalloon, idx) => {
            const balloonSize = isMobile
              ? aBalloon.mobile
              : isTablet
                ? aBalloon.tablet
                : aBalloon.desktop;

            return (
              <Image
                key={`${aBalloon.src.toString}-${idx}`}
                src={aBalloon.src}
                alt={aBalloon.alt || ""}
                width={balloonSize.width}
                height={balloonSize.height}
                style={{
                  transform: balloonSize.transform,
                }}
                className={`absolute ${aBalloon.zIdx}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
