import React from "react";
import { Section, StreetSign } from "@repo/ui";
import KeynotePhoto from "../../lib/Assets/SVG/KeynotePhoto";

const background = <div className="w-full h-full bg-cream" />;

const content = (
  <div className="h-full items-center max-w-[80vw] mx-auto my-auto flex gap-5">
    <div className="w-[45vw]">
      <SpeakerPhoto />
      <SpeakerDetails />
    </div>

    <div className="w-[55vw]">
      <StreetSign streetName="KEYNOTE" suffix="SPEAKER" />
      <SpeakerAbout />
    </div>
  </div>
);

function SpeakerPhoto(): JSX.Element {
  return (
    <div className="bg-white rounded-md inline-block p-4 pb-20 shadow-lg mb-5">
      <KeynotePhoto className="w-70 h-auto" />
    </div>
  );
}

function SpeakerDetails(): JSX.Element {
  return (
    <div className="mt-4 font-GT-Walsheim-Regular">
      <p className="text-[33.6px] font-bold mb-2">Rati Thanawala</p>
      <p className="text-[26.25px] text-lightBrown">
        2018 Advanced Leadership Fellow, Harvard University | Founder,
        Leadership Academy for Women of Color in Tech
      </p>
    </div>
  );
}

function SpeakerAbout(): JSX.Element {
  return (
    <p className="text-[26.25px] font-GT-Walsheim-Regular mt-8">
      <span className="font-GT-Walsheim-Bold">Dr. Thanawala </span>is a 2018
      Advanced Leadership Fellow at Harvard and holds a Ph.D. in Computer
      Science from Yale. With 39 years in the tech industry, including 17 as
      Vice President at Bell Labs, she pioneered new communications technologies
      and founded Bell Labs Consulting. She also held executive roles in
      software development and product management at AT&T and Nokia.
      <br />
      <br />
      She received a grant from the Women of Color in Computing Collaborative,
      funded by a Melinda Gates company. Her research led to the development of
      &quot;19 Levers&quot; to help college students thrive in tech internships
      and early careers, and she established a curriculum for a Leadership
      Academy.
    </p>
  );
}

export default function Keynote(): React.ReactNode {
  return (
    <Section
      name={"keynote"}
      background={background}
      content={content}
      height={100}
    />
  );
}
