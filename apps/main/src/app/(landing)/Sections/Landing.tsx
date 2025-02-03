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
    <div className="w-full h-full bg-cover bg-[#F9EAD1] overflow-hidden">
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

  const foreground = [
    {
      // GuardRail
      item: (
        <div className="w-[100vw]">
          <Guardrail />
        </div>
      ),
      coordinate: { x: 0, y: 62 },
    },
    {
      // Road
      item: (
        <div className="w-[100vw]">
          <Road />
        </div>
      ),
      coordinate: { x: 0, y: 80 },
    },
    {
      // Bus
      item: (
        <div className="w-[35vw]">
          <Bus />
        </div>
      ),
      coordinate: { x: 32, y: 46 },
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
