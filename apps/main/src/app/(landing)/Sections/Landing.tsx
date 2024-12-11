import React from "react";
import { Section } from "@repo/ui";
import Image from "next/image";
import ExternalLink from "../../lib/Components/ExternalLink";

export default function Landing(): JSX.Element {
  const background = (
    <div className="w-full h-full overflow-hidden pointer-events-none">
      <Image alt="ProjectsBackground" src="/landing_background.png" fill />
    </div>
  );

  const content = (
    <div className="relative w-full h-full flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col items-center">
        <Image
          alt="LisencePlate"
          src="/lisence_plate.png"
          width={400}
          height={200}
          className="w-[35vw] h-auto max-w-[600px] min-w-[150px]"
        />
        <Image
          alt="Bus"
          src="/bus.png"
          width={400}
          height={200}
          className="w-[35vw] h-auto max-w-[600px] min-w-[200px] mt-20"
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
        <ExternalLink href="">
          <Image alt="EmailLogo" src="/email_logo.png" width={40} height={40} />
        </ExternalLink>
      </div>
    </div>
  );

  return (
    <Section
      name={"Landing"}
      background={background}
      content={content}
      height={70}
    />
  );
}
