"use client";

import React from "react";
import SponsorUsBenefitCard from "../../lib/Assets/SVG/SponsorUsAssets/SponsorsUsBenefitCard";

export type SponsorUsBenefitCardProps = {
  title: string;
  content: React.ReactNode;
};

export default function SponsorUsBenefitCardComp({
  title,
  content,
}: SponsorUsBenefitCardProps) {
  return (
    <div className="relative w-96 h-[302px] flex items-center justify-center">
      <SponsorUsBenefitCard className="absolute w-full h-full" />

      <div className="relative flex flex-col justify-center text-left left-7 bottom-5 mx-auto px-4">
        <h3 className="text-lg text-white font-NeulisNeue-Bold max-w-72">
          {title}
        </h3>
        <p className="mt-2 text-sm text-white font-NeulisNeue-Regular max-w-72">
          {content}
        </p>
      </div>
    </div>
  );
}
