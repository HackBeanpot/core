"use client";

import React from "react";
import Image from "next/image";
import { Section } from "@repo/ui";
import useIsMobile from "@util/hooks/useIsMobile";
import ApplyLeftLog from "../../lib/Assets/SVG/ApplyAssets/ApplyLeftLog";
import ApplyRightLog from "../../lib/Assets/SVG/ApplyAssets/ApplyRightLog";

const Apply = () => {
  const isMobile = useIsMobile();

  const background = (
    <div className="relative h-screen overflow-hidden top-[-45%]">
      <Image
        alt="applyBackground"
        src="/apply_background.svg"
        fill
        className="object-cover"
      />
    </div>
  );

  const content = (
    <div>
      {isMobile ? (
        <div className="relative flex flex-col top-10 justify-center text-center items-center">
          <div className="relative m-auto w-3/6 flex justify-center text-center items-center text-2xl pb-3 font-GT-Walsheim-Regular">
            <p>
              We’re going on a roadtrip! Reach new destinations at our
              hackathon. Applications close 12/3 @ 11:59 PM.
            </p>
          </div>

          <button
            onClick={() => alert("apply not implemented yet")}
            className="p-3 bg-[#84AF67] text-text-light rounded-full drop-shadow-md w-44 h-14 text-2xl font-GT-Walsheim-Regular"
          >
            Apply here
          </button>
        </div>
      ) : (
        <div className="h-full w-full">
          <div className="relative top-20">
            <ApplyLeftLog />
          </div>

          <div className="absolute top-20 right-0">
            <ApplyRightLog />
          </div>
          <div className="relative flex flex-col bottom-72 justify-center text-center items-center">
            <div className="relative m-auto w-3/6 flex justify-center text-center items-center text-2xl pb-7 font-GT-Walsheim-Regular">
              <p>
                We’re going on a roadtrip! Reach new destinations at our
                hackathon. Applications close 12/3 @ 11:59 PM.
              </p>
            </div>

            <button
              onClick={() => alert("apply not implemented yet")}
              className="p-3 bg-[#84AF67] text-text-light rounded-full drop-shadow-md w-44 h-14 text-2xl"
            >
              Apply here
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Section
      name={"apply"}
      background={background}
      content={content}
      height={40}
    />
  );
};

export default Apply;
