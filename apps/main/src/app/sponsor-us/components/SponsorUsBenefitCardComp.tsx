"use client";

import React from "react";
import SponsorUsBenefitCard from "../../lib/Assets/SVG/SponsorUsAssets/SponsorsUsBenefitCard";
import clsx from "clsx";

export type SponsorUsBenefitCardProps = {
  title: string;
  content: React.ReactNode;
};

export default function SponsorUsBenefitCardComp({
  title,
  content,
}: SponsorUsBenefitCardProps) {
  return (
    <div
      className={clsx(
        "relative flex justify-center items-center mx-auto",
        "w-full max-w-[640px] h-[420px]",
        "sm:w-[40vw] sm:h-[50vh]",
        "mb-10",
      )}
    >
      <SponsorUsBenefitCard className="w-full h-full" />

      <div
        className={clsx(
          "absolute z-10 flex flex-col items-start text-left",
          "top-20 left-32 sm:left-10 md:left-20",
        )}
      >
        <h1 className="font-NeulisNeue-Bold text-white text-xl max-w-[260px]">
          {title}
        </h1>

        <p className="font-NeulisNeue-Regular text-white text-base mt-4 max-w-[300px]">
          {content}
        </p>
      </div>
    </div>
  );
}
