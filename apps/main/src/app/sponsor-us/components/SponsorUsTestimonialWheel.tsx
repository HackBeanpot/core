"use client";

import React from "react";

export type FerrisWheelProps = {
  classname: string;
  transformStyle: string;
};

export default function SponsorUsTestimonialsWheel({
  classname,
  transformStyle,
}: FerrisWheelProps): React.ReactNode {
  return (
    <div className={classname} style={{ transform: transformStyle }}>
      <div className="relative flex size-full">
        <img
          src="/sponsor-testimonials/ferriswheel.svg"
          className={`size-full`}
          alt="Ferris Wheel"
        />
      </div>
    </div>
  );
}
