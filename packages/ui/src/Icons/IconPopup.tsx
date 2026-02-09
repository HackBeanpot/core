import Image from "next/image";
import TimeIcon from "../TimeIcon";
import DivIcon from "./DivIcon";
import DiscordIcon from "./DiscordIcon";
import InactiveIcon from "../InactiveIcon";
import CloseIcon from "./CloseIcon";
import useDevice from "@repo/util/hooks/useDevice";
import React from "react";

const IconPopup = () => {
  const { isDesktop } = useDevice();

  return (
    <div className="absolute inset-0 flex justify-center items-center z-50">
      <div
        className={`
          relative
          bg-[#F4E3C9]
          rounded-2xl
          ${isDesktop ? "w-[850px] h-[490px]" : "w-full mx-4"}
        `}
      >
        <div className="absolute top-4 left-4 z-20 cursor-pointer">
          <CloseIcon />
        </div>

        <div
          className={`
            relative z-10 pt-10 pb-10
            ${
              isDesktop
                ? "flex items-center gap-16 pl-20"
                : "flex flex-col items-center gap-8 px-6"
            }
          `}
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Image
                src="/headshots/directors/Emma.jpg"
                alt="Emma Voneulow"
                width={190}
                height={190}
                className="object-cover rounded-full border-6 border-firecrackerRed"
              />
              <div className="absolute bottom-1 translate-x-[-35px] right-0">
                <InactiveIcon />
              </div>
            </div>

            <h1 className="font-bold mt-2">Emma Voneulow</h1>

            <div className="flex items-center gap-2">
              <DiscordIcon />
              <p>emmavonbeulow</p>
            </div>
          </div>

          <div className="bg-[#FFF5E5] p-6 rounded-lg w-full max-w-md">
            <div className="flex items-center gap-2 pb-4">
              <DivIcon />
              <h1 className="font-bold">Expertise</h1>
            </div>

            <p>React, Typescript, Next.js, Tailwind CSS, Python</p>

            <hr className="border border-carouselCream my-5" />

            <div className="flex items-center gap-2 pb-4">
              <TimeIcon />
              <h1 className="font-bold">Availability</h1>
            </div>

            <p>Friday</p>
            <ul className="list-disc pl-5 pb-2">
              <li>10AM - 11AM</li>
              <li>1PM - 4PM</li>
            </ul>

            <p>Saturday</p>
            <ul className="list-disc pl-5 pb-2">
              <li>1PM - 4PM</li>
            </ul>

            <p>Sunday</p>
            <ul className="list-disc pl-5">
              <li>1PM - 4PM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IconPopup;
