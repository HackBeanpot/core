"use client";

import React from "react";
import { Section } from "@repo/ui";
import Hills from "../lib/Assets/SVG/OurTeam/Hills";

export default function OurTeamBackground(): JSX.Element {
  const background = <div className="w-full h-full bg-cream" />;

  const content = (
    <div className="w-full h-full flex flex-col justify-between p-20 items-center">
      <Hills />
    </div>
  );

  return (
    <Section
      name={"Our Teams Background"}
      background={background}
      content={content}
      height={100}
    />
  );
}
