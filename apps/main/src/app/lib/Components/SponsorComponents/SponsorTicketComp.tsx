"use client";

import React from "react";
import SponsorTicket from "../../Assets/SVG/SponsorAssets/SponsorTicket";
import SponsorUsTicket from "../../Assets/SVG/SponsorAssets/SponsorUsTicket";
import Image from "next/image";

export type SponsorTicketProps = {
  isSponsorUs?: boolean;
  logoPath?: string;
  ticketWidthVw?: number;
  logoScale?: number;
};

/**
 * To be used in SponsorUs page AND Sponsors page
 * @param isSponsorUs is a boolean that tells which page it is
 * @param logoPath is the path of the sponsor's logo
 * @param ticketWidthVW scale ticket size
 */
export default function SponsorTicketComp({
  isSponsorUs = false,
  logoPath,
  ticketWidthVW = 20,
  logoScale = 1,
}: SponsorTicketProps & { ticketWidthVW?: number }): JSX.Element {
  return (
    <div
      className="flex items-center justify-center relative"
      style={{ width: `${ticketWidthVW}vw`, height: "auto" }}
    >
      {logoPath && (
        <div
          className="absolute z-10 flex items-center justify-center overflow-hidden"
          style={{
            inset: 0,
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "60%",
              height: "45%",
              transform: `scale(${logoScale})`,
              transformOrigin: "center",
            }}
          >
            <Image
              fill
              alt="image of ticket sponsor"
              src={logoPath}
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 60vw, 20vw"
              priority={false}
            />
          </div>
        </div>
      )}

      {isSponsorUs ? (
        <SponsorUsTicket className="w-full h-auto relative z-0" />
      ) : (
        <SponsorTicket className="w-full h-auto relative z-0" />
      )}
    </div>
  );
}
