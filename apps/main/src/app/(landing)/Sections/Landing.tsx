import React from "react";
import Image from "next/image";
import ExternalLink from "../../lib/Components/ExternalLink";
import LandingBackground from "../../lib/Assets/SVG/LandingBackground";
import Guardrail from "../../lib/Assets/SVG/RoadAssets/Guardrail";
import Road from "../../lib/Assets/SVG/RoadAssets/Road";
import Bus from "../../lib/Assets/SVG/RoadAssets/Bus";

export default function Landing(): JSX.Element {
  return (
    <div className="w-full h-[60vh] relative">
      <LandingBackground />
      <div className="absolute top-[85%] w-full  z-1">
        <Guardrail />
      </div>
      <div className="absolute top-[110%] w-full">
        <Road />
      </div>
      <div className="absolute w-[40vw] left-1/2 top-[90%] transform -translate-x-1/2 -translate-y-1/2">
        <Bus />
      </div>
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-[30%]">
        <Image
          alt="LicensePlate"
          src="/license_plate.png"
          width={400}
          height={200}
          className="w-[30vw] h-auto max-w-[700px] min-w-[300px]"
        />
      </div>
      <div className="absolute top-5 right-10 flex gap-2">
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
