"use client";

import React from "react";
import Image from "next/image";
import { Section, StreetSign } from "@repo/ui";
import TopAboutBar from "../../lib/Assets/SVG/AboutAssets/TopAboutBar";
import BottomAboutBar from "../../lib/Assets/SVG/AboutAssets/BottomAboutBar";
import Squiggle from "../../lib/Assets/SVG/AboutAssets/Squiggle";
import Cities from "../../lib/Assets/SVG/AboutAssets/Cities";
import Journal from "../../lib/Assets/SVG/AboutAssets/Journal";
import Thumbtack1 from "../../lib/Assets/SVG/AboutAssets/Thumbtack1";
import Thumbtack2 from "../../lib/Assets/SVG/AboutAssets/Thumbtack2";
import Thumbtack3 from "../../lib/Assets/SVG/AboutAssets/Thumbtack3";

const background = (
  <div className="w-full h-full bg-[#F3E7D7] flex flex-col flex-none">
    <div className="w-[100vw]">
      <TopAboutBar />
    </div>
    <div className="w-[55vw]">
      <Squiggle />
    </div>
    <div className="absolute w-[45vw] left-[56vw] transform top-[2vh]">
      <Journal />
    </div>
    <div className="w-[100vw] mt-auto">
      <BottomAboutBar />
    </div>
  </div>
);

const AboutText = () => {
  return (
    <p className="font-GT-Walsheim-Regular mt-12">
      We&apos;re a non-profit organization in the Boston area that organizes an
      annual undergraduate hackathon. Our goal is to expand and nurture the
      hacker culture that exists in Boston and the surrounding areas. We connect
      students and other aspiring nerds to their colleagues so that they can
      meet new people, learn new things, and have a great time.
    </p>
  );
};

const content = (
  <div className="h-full w-[50vw] ml-24 mr-auto mt-24 flex text-[1.8vw]">
    <div className="w-[50vw]">
      <StreetSign streetName={"ABOUT"} suffix="HBP" />
      <AboutText />
      <button className="mt-12 bg-[#02877F] text-white py-3 px-7 rounded-[64px]">
        {"View Past Photos"}
      </button>
    </div>
  </div>
);

const foreground = [
  {
    item: (
      <div className="w-[70vw]">
        <Cities />
      </div>
    ),
    coordinate: { x: 15, y: 66 },
  },
  {
    item: (
      <Image alt="AboutPicture" src="/about_1.png" width={250} height={100} />
    ),
    coordinate: { x: 90, y: 12 },
  },
  {
    item: (
      <Image alt="AboutPicture" src="/about_2.png" width={350} height={200} />
    ),
    coordinate: { x: 90, y: 42 },
  },
  {
    item: (
      <Image alt="AboutPicture" src="/about_3.png" width={300} height={300} />
    ),
    coordinate: { x: 60, y: 24 },
  },
  {
    item: <Thumbtack1 />,
    coordinate: { x: 63, y: 24 },
  },
  {
    item: <Thumbtack2 />,
    coordinate: { x: 94, y: 40 },
  },
  {
    item: <Thumbtack3 />,
    coordinate: { x: 94, y: 17 },
  },
];

export default function Values(): React.ReactNode {
  return (
    <Section
      name={"values"}
      background={background}
      content={content}
      foreground={foreground}
      height={100}
    />
  );
}
