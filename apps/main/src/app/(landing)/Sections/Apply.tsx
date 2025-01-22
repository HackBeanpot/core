import React from "react";
import Image from "next/image";
import { Section } from "@repo/ui";

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

    <div className="relative bottom-40 m-auto w-3/6 flex justify-center text-center items-center text-2xl">
      <p>
        We’re going on a roadtrip! Reach new destinations at our hackathon.
        Applications close 12/3 @ 11:59 PM.
      </p>
    </div>
  </div>
);

export default function Apply(): React.ReactNode {
  return (
    <Section
      name={"apply"}
      background={background}
      content={content}
      height={40}
    />
  );
}
