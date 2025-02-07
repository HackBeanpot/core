"use client";

import React from "react";
import { Section, StreetSign } from "@repo/ui";
import Image from "next/image";
import useIsMobile from "@repo/util/hooks/useIsMobile";
import { Body } from "@repo/ui";

const background = <div className="w-full h-full bg-cream" />;

function SpeakerPhoto(): JSX.Element {
  return (
    <div className="bg-white rounded-md inline-block p-4 pb-[5vw] shadow-lg">
      <Image
        alt="Aidan"
        src="/aidan.png"
        width={400}
        height={500}
        className="min-w-[200px]"
      />
    </div>
  );
}

function SpeakerDetails(): JSX.Element {
  return (
    <div className="mt-4 font-GT-Walsheim-Regular">
      <p className="text-[1.75vw] font-bold mb-2">Aidan Ouckama</p>
      <p className="text-[1.5vw] text-lightBrown">
        3rd year Computer Science student, Stevens Institute of Technology |
        Tech Content Creator
      </p>
    </div>
  );
}

function SpeakerAbout(): JSX.Element {
  return (
    <Body className="font-GT-Walsheim-Regular mt-8">
      <span className="font-GT-Walsheim-Bold">Aidan Ouckama </span>is a a
      prominent tech content creator, known for engaging, informative, and
      humorous content across multiple social media platforms. By sharing
      instructional projects, vlogs, internship application tips, and even
      brainrot computer science memes, Aidan has amassed a substantial following
      of aspiring and early-career technologists.
      <br />
      <br />
      Aidan offers an authentic, behind-the-scenes look into the challenges and
      triumphs of navigating the tech industry as a student, making topics like
      leetcode, job interviews, and career growth more accessible and relatable.
      His blend of humor, insight, and industry experience has positioned him as
      one of the leading voices in a new wave of tech creators.
      <br />
      <br />
      Through his content, Aidan is redefining the way students and early
      professionals approach tech, fostering a welcoming space where curiosity,
      innovation, and creativity thrive.
    </Body>
  );
}

export default function Keynote(): React.ReactNode {
  const isMobile = useIsMobile();

  const content = (
    <div
      className={`h-full max-w-[80vw] mx-auto my-auto gap-5 ${
        isMobile
          ? "flex flex-col items-center justify-center min-h-screen text-center"
          : "flex items-center"
      }`}
    >
      <div className="w-[45vw]">
        {isMobile && <StreetSign streetName="KEYNOTE" suffix="SPEAKER" />}
        <SpeakerPhoto />
        <SpeakerDetails />
      </div>

      <div className="w-[55vw]">
        {!isMobile && <StreetSign streetName="KEYNOTE" suffix="SPEAKER" />}
        <SpeakerAbout />
      </div>
    </div>
  );

  return (
    <Section
      name={"keynote"}
      background={background}
      content={content}
      height={120}
    />
  );
}
