"use client"

import React from "react";
import Image from "next/image";
import { Section } from "@repo/ui";
import useIsMobile from "@util/hooks/useIsMobile";

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
    <div className="relative m-auto w-3/6 flex justify-center text-center items-center text-2xl pb-3">
      <p>
        We’re going on a roadtrip! Reach new destinations at our hackathon.
        Applications close 12/3 @ 11:59 PM.
      </p>
    </div>

      <button
        onClick={() =>
          alert("apply not implemented yet")
        }
        className="p-3 bg-[#84AF67] text-text-light rounded-full drop-shadow-md w-44 h-14 text-2xl"
        >
        Apply here
      </button>
    </div>
    ): (
      <div>
        <div className="relative top-28">
          <Image
            alt="LeftLogs"
            src="/left_logs.svg"
            width={300}
            height={700}
            className=""
          />
        </div>

        <div className="absolute top-32 right-0">
          <Image
            alt="RightLogs"
            src="/right_logs.svg"
            width={300}
            height={700}
            className=""
          />
        </div>
        <div className="relative flex flex-col bottom-40 justify-center text-center items-center">
          <div className="relative m-auto w-3/6 flex justify-center text-center items-center text-2xl pb-10">
            <p>
              We’re going on a roadtrip! Reach new destinations at our hackathon.
              Applications close 12/3 @ 11:59 PM.
            </p>
          </div>

            <button
              onClick={() =>
                alert("apply not implemented yet")
              }
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
}

export default Apply;