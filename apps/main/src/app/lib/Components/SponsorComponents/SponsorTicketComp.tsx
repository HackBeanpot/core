"use client";

import React from "react";
import SponsorTicket from "../../Assets/SVG/SponsorAssets/SponsorTicket";
import SponsorUsTicket from "../../Assets/SVG/SponsorAssets/SponsorUsTicket";
import Image from "next/image";

export type SponsorTicketProps = {
  isSponsorUs: boolean;
  logoPath?: string;
  scaleFactor?: string;
};

/**
 * To be used in SponsorUs page AND Sponsors page
 * @param isSponsorUs is a boolean that tells which page it is
 * @param logoPath is the path of the sponsor's logo
 * @param scaleFactor ?
 */
export default function SponsorTicketComp({
  isSponsorUs,
  logoPath,
  scaleFactor,
}: SponsorTicketProps): React.ReactNode {
  return (
    <div
      className={`flex items-center justify-center ${scaleFactor ?? ""} w-full h-full`}
    >
      {logoPath && (
        <Image
          width={50}
          height={50}
          alt={"image of ticket sponsor"}
          src={logoPath}
          className="absolute z-10"
        />
      )}
      {isSponsorUs && <SponsorUsTicket className="relative z-0" />}
      {!isSponsorUs && <SponsorTicket className="relative z-0" />}
    </div>
  );
}
