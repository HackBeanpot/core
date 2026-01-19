"use client";
import React, { useRef } from "react";
import Section from "@repo/ui/Section";
import OurTeamGrid from "./OurTeamGrid";
import useContentHeight from "@util/hooks/useContentHeight";
import useWindowSize from "@util/hooks/useWindowSize";

const OurTeam = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [contentHeight] = useContentHeight(ref);

  if (!windowHeight || !windowWidth) return;

  const OurTeamBackground = () => {
    return <div className="bg-granolaLite h-full"></div>;
  };

  const OurTeamContent = React.forwardRef<HTMLDivElement>((_, ref) => {
    return (
      <div ref={ref} className="py-24 px-48 font-GT-Walsheim-Regular">
        <p className="text-[clamp(3rem,7vw,7rem)] text-seaFoam font-bold font-Wilden drop-shadow-lg">
          Our Team
        </p>
        <p className="px-2">
          Need a hand? Our team is here to support you throughout the hackathon!
          If you have questions, need guidance, or just want to brainstorm,
          don’t hesitate to reach out. We’re just a ping away and ready to help
          make your hackathon experience as smooth and successful as possible!
        </p>
        <OurTeamGrid />
      </div>
    );
  });

  OurTeamContent.displayName = "OurTeamContent";

  return (
    <Section
      name="team"
      background={<OurTeamBackground />}
      content={<OurTeamContent ref={ref} />}
      height={(contentHeight / windowHeight) * 90}
    />
  );
};

export default OurTeam;
