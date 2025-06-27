"use client";

import React from "react";
import StreetSign from "@repo/ui/StreetSign";
import Image from "next/image";
import useIsLargeMobile from "@repo/util/hooks/useIsMobileLgScreen";
import Typography from "@repo/ui/Typography";

interface AdditionalClassesProps {
  additionalClasses?: string;
}

interface SpeakerPhotoProps {
  newWidth?: number;
  newHeight?: number;
  newPadding?: string;
  newMinWidth?: string;
  newClasses?: string;
}

interface SpeakerDetailsProps {
  textAlign?: string;
  scaleFactor?: string;
  bottomMargin?: string;
}

function SpeakerPhoto({
  newWidth,
  newHeight,
  newPadding,
  newMinWidth,
  newClasses,
}: SpeakerPhotoProps): JSX.Element {
  const padding = newPadding ?? "p-4";
  const width = newWidth ?? 400;
  const height = newHeight ?? 500;
  const minWidth = newMinWidth ?? "min-w-200px";

  return (
    <div
      className={`bg-white rounded-sm inline-block pb-[4vw] shadow-lg ${padding} ${newClasses}`}
    >
      <Image
        alt="Aidan"
        src="/aidan.png"
        width={width}
        height={height}
        className={minWidth}
      />
    </div>
  );
}

function SpeakerDetails({
  textAlign,
  scaleFactor,
  bottomMargin,
}: SpeakerDetailsProps): JSX.Element {
  return (
    <div className={`mt-[15%] font-GT-Walsheim-Regular ${textAlign}`}>
      <p
        className={`text-[1.75vw] scale-[${scaleFactor}] font-bold ${bottomMargin}`}
      >
        Aidan Ouckama
      </p>
      <p className={`text-[1.5vw] scale-[${scaleFactor}] text-lightBrown`}>
        3rd year Computer Science student, Stevens Institute of Technology |
        Tech Content Creator
      </p>
    </div>
  );
}

function SpeakerAbout({
  additionalClasses,
}: AdditionalClassesProps): JSX.Element {
  return (
    <Typography.Body
      className={`font-GT-Walsheim-Regular mt-8 ${additionalClasses ?? ""}`}
    >
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
    </Typography.Body>
  );
}

export default function Keynote(): React.ReactNode {
  const isMobile = useIsLargeMobile();

  const conditionalAlignment = `h-full mx-auto my-auto gap-5 ${
    isMobile
      ? "flex flex-col items-center justify-center min-h-screen text-center"
      : "flex items-center"
  }`;

  return (
    <div className={`w-full bg-cream ${isMobile ? "h-auto" : "h-[120vh]"}`}>
      <div className={conditionalAlignment}>
        <div className={`${isMobile ? "w-[80vw]" : "w-[55vw]"}`}>
          {isMobile && (
            <div
              className={`relative ${isMobile ? "mb-[5%] mt-10 justify-self-center scale-[0.7]" : "mb-[10%]"}`}
            >
              <StreetSign streetName="KEYNOTE" suffix="SPEAKER" />
            </div>
          )}

          <div
            className={`${isMobile ? "flex flex-row gap-x-12 mb-[-5%]" : "flex flex-col items-center"}`}
          >
            <SpeakerPhoto
              newClasses={`${isMobile ? "left-[-10%]" : "mt-[30%] mb-[-35%]"}`}
              newPadding={`${isMobile ? "p-2" : "p-4"}`}
            />
            <SpeakerDetails
              textAlign={`${isMobile ? "text-left text-wrap p-[5%]" : "text-wrap p-[25%]"}`}
              scaleFactor={`${isMobile ? "2" : "1"}`}
              bottomMargin={`${isMobile ? " mb-[30%]" : ""}`}
            />
          </div>
        </div>

        <div className={`${isMobile ? "w-[80vw]" : "w-[55vw] mr-[5%] sm:scale-[0.5]"}`}>
          {!isMobile && <StreetSign streetName="KEYNOTE" suffix="SPEAKER" />}
          <SpeakerAbout additionalClasses={`${isMobile ? "text-left" : ""}`} />
        </div>
      </div>
    </div>
  );
}
