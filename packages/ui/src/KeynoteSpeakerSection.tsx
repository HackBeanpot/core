"use client";

import React from "react";
import useDevice from "@repo/util/hooks/useDevice";
import KeynoteCard from "./KeynoteSpeakerAssets/KeynoteCard";
import KeynoteCart from "./KeynoteSpeakerAssets/KeynoteCart";
import KeynoteSpeakerPhoto from "./KeynoteSpeakerAssets/KeynoteSpeakerPhoto";
import RibbonTitle from "@repo/ui/RibbonTitle";
import KeynoteTopSquiggle from "./KeynoteSpeakerAssets/KeynoteTopSquiggle";

export default function Keynote(): React.ReactNode {
  const { isMobile } = useDevice();
  const sueData = {
    header: "Sue Harnett",
    bio: "CEO of Rewriting the Code",
    text: "Sue Harnett is the Founder & CEO of Rewriting the Code, the nonprofit she launched in 2017 that has grown into a global community of 38,000+ university and early-career women in tech, offering mentorship, education, and career-readiness programs. She will be speaking about women in technology, and the value of community, teamwork, and thoughtful leadership!",
  };

  const jessicaData = {
    header: "Jessica Cao",
    bio: "Stanford CS '26 / Founder of World37",
    text: "Jessica Cao is an undergraduate studying Computer Science at Stanford University, and the founder of World37, an AI-powered storytelling platform where players can engage with, create, and share their own unique stories. She will be speaking about the art of pitching a technical project!",
  };

  return (
    <div className="h-[190vh] mobile:h-[170vh] w-full bg-mossGreen">
      <KeynoteTopSquiggle
        className="absolute z-10"
        style={{
          transform: isMobile
            ? "translate(-100vw, -10vh) scale(0.5)"
            : "translate(15vw, -15vh) scale(1.75)",
        }}
      />
      <div className="mt-[10vh]">
        <RibbonTitle text="GUEST SPEAKERS" />
      </div>

      {!isMobile && (
        <div className="absolute">
          <KeynoteCart />
        </div>
      )}

      {/* SUE */}
      <div className="">
        <KeynoteSpeakerPhoto
          imageURL="/guest-speakers/Sue.jpg"
          style={{
            transform: isMobile
              ? "translate(-14vw, -8vh) scale(0.6)"
              : "translate(28vw, 8vw)",
          }}
        />
        {/* The info card has to be its own div thats moved around.. the absolute style messes with the other stylings inside it.  */}

        <div
          className="absolute"
          style={{
            transform: isMobile
              ? "translate(7vw, -40vh) scale(0.7)"
              : "translate(50vw, -18vw)",
          }}
        >
          <KeynoteCard
            header={sueData.header}
            bio={sueData.bio}
            text={sueData.text}
          />
        </div>
      </div>

      {/* JESSICA */}
      <div>
        <KeynoteSpeakerPhoto
          imageURL="/guest-speakers/Jessica.jpg"
          style={{
            transform: isMobile
              ? "translate(-14vw, -8vh) scale(0.6)"
              : "translate(48vw, 14vw)",
          }}
        />
        {/* The info card has to be its own div thats moved around.. the absolute style messes with the other stylings inside it.  */}

        <div
          className="absolute"
          style={{
            transform: isMobile
              ? "translate(7vw, -40vh) scale(0.7)"
              : "translate(28vw, -12vw)",
          }}
        >
          <KeynoteCard
            header={jessicaData.header}
            bio={jessicaData.bio}
            text={jessicaData.text}
          />
        </div>
      </div>
    </div>
  );
}
