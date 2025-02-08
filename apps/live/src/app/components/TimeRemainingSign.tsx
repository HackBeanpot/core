"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useIsMobile from "@repo/util/hooks/useIsMobile";

const TimeRemainingSign: React.FC<{ target: Date }> = ({ target }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        setDays(days);
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        setHours(hours);
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        setMinutes(minutes);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center transform translate-x-7">
      <div
        className={`max-w-[500px] relative ${
          isMobile ? "w-[50vw]" : "w-[30vw]"
        }`}
      >
        <Image
          alt="Time Remaining Sign"
          src="/time_remaining.png"
          width={500}
          height={250}
        />
        <div
          className={`absolute top-[30%] left-0 right-[7%] flex items-baseline justify-center text-center px-10 text-white font-GT-Walsheim-Regular ${
            isMobile
              ? "text-[clamp(1.2rem,3vw,4rem)]"
              : "text-[clamp(0.2rem,3vw,3rem)]"
          }`}
        >
          <div className="flex flex-col items-center">
            <p className="font-bold">{days}</p>
            <p className="text-[clamp(0.4rem,1vw,1rem)] ">days</p>
          </div>
          <p className="mx-2 text-[clamp(0.2rem,2vw,2rem)]">:</p>
          <div className="flex flex-col items-center">
            <p className="font-bold">{hours}</p>
            <p className="text-[clamp(0.4rem,1vw,1rem)]">hours</p>
          </div>
          <p className="mx-2 text-[clamp(0.2rem,2vw,2rem)]">:</p>
          <div className="flex flex-col items-center">
            <p className="font-bold">{minutes}</p>
            <p className="text-[clamp(0.4rem,1vw,1rem)]">minutes</p>
          </div>
        </div>
        <div className="absolute top-[86%] w-full flex items-center justify-center -translate-y-1/2 font-GT-Walsheim-Regular">
          <p
            className={`text-center flex ${
              isMobile
                ? "text-[clamp(0.5rem,1vw,1.2rem)]"
                : "text-[clamp(0.3rem,1.2vw,1rem)]"
            }`}
          >
            <a
              className="w-full flex items-center justify-center"
              href="https://www.hackbeanpot.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              SHARE WITH YOUR FRIENDS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="ml-1"
                style={{
                  width: "1.2em",
                  height: "1.2em",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeRemainingSign;
