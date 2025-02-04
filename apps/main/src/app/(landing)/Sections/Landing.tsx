import React from "react";
import { Section } from "@repo/ui";
import Image from "next/image";
import ExternalLink from "../../lib/Components/ExternalLink";
import LandingBackground from "../../lib/Assets/SVG/LandingBackground";
import Guardrail from "../../lib/Assets/SVG/RoadAssets/Guardrail";
import Road from "../../lib/Assets/SVG/RoadAssets/Road";
import Bus from "../../lib/Assets/SVG/RoadAssets/Bus";

export default function Landing(): JSX.Element {
  const background = (
    <div className="w-full h-full bg-[#F9EAD1] overflow-hidden">
      <LandingBackground />
    </div>
  );

  const content = (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-4">
      <div className="absolute top-14">
        <Image
          alt="LicensePlate"
          src="/license_plate.png"
          width={400}
          height={200}
          className="w-[30vw] h-auto max-w-[700px] min-w-[300px]"
        />
      </div>
      <div className="absolute top-5 right-5 flex gap-2">
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

  const roadSetup = (
    <div className="w-full h-full">
      <div className="relative w-[100vw] mb-[-9px]">
        <Guardrail />
      </div>
      <div className="relative w-[100vw]">
        <Road />
      </div>
      <div className="absolute w-[40vw] left-1/2 top-[12%] transform -translate-x-1/2 -translate-y-1/2">
        <Bus />
      </div>
    </div>
  );

  const foreground = [
    {
      item: roadSetup,
      coordinate: { x: 0, y: 60 },
    },
  ];

  return (
    <Section
      name={"Landing"}
      background={background}
      content={content}
      foreground={foreground}
      height={70}
    />
  );
}
