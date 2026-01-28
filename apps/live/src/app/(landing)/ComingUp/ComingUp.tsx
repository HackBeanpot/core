"use client";

import React from "react";
import Section from "@repo/ui/Section";
import CarnivalScene from "../CarnivalLanding/CarnivalScene";

const ComingUp = () => {
  const background = null; // CarnivalScene includes its own background

  const content = (
    <div className="relative w-full h-full">
      <CarnivalScene />
    </div>
  );

  return (
    <Section
      name={"Coming Up"}
      background={background}
      content={content}
      height={70}
    />
  );
};

export default ComingUp;
