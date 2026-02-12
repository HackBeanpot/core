"use client";
import KeynoteSpeakerSection from "@repo/ui/KeynoteSpeakerSection";

import React from "react";

export default function Keynote(): React.ReactNode {
  return (
    <div className="overflow-x-hidden w-full">
      <KeynoteSpeakerSection isLive={true} />
    </div>
  );
}
