import React from "react";
import { Section, StreetSign } from "@repo/ui";
import KeynotePhoto from "../../lib/Assets/SVG/KeynotePhoto";

const background = <div className="w-full h-full bg-cream" />;

const content = (
  <div className="flex h-full items-center">
    <div className="max-w-[83vw] mx-auto my-auto flex gap-10">
      <div className="w-[40vw]">
        <SpeakerPhoto />
        <SpeakerDetails />
      </div>

      <div className="w-[60vw]">
        <StreetSign streetName="KEYNOTE" suffix="SPEAKER" />
        <SpeakerAbout />
      </div>
    </div>
  </div>
);

function SpeakerPhoto(): JSX.Element {
  return (
    <div className="bg-white rounded-md inline-block p-4">
      <KeynotePhoto className="w-40 h-auto mb-" />
    </div>
  );
}

function SpeakerDetails(): JSX.Element {
  return (
    <div className="mt-4 font-GT-Walsheim-Regular">
      <h2 className="text-xl font-bold mb-2">Rati Thanawala</h2>
      <p className="text-sm text-gray-700">
        2018 Advanced Leadership Fellow, Harvard University | Founder,
        Leadership Academy for Women of Color in Tech
      </p>
    </div>
  );
}

function SpeakerAbout(): JSX.Element {
  return (
    <p className="text-sm font-GT-Walsheim-Regular mt-8">
      <strong>Dr. Thanawala </strong>is a 2018 Advanced Leadership Fellow at
      Harvard and holds a Ph.D. in Computer Science from Yale. With 39 years in
      the tech industry, including 17 as Vice President at Bell Labs, she
      pioneered new communications technologies and founded Bell Labs
      Consulting. She also held executive roles in software development and
      product management at AT&T and Nokia.
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
      height={70}
    />
  );
}
