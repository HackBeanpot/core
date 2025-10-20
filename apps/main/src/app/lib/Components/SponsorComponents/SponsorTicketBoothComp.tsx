import useDevice from "@util/hooks/useDevice.ts";
import Ticket from "../../Assets/SVG/SponsorUsAssets/Ticket.tsx";
import TicketBooth from "../../Assets/SVG/SponsorUsAssets/TicketBooth.tsx";
import Button from "@repo/ui/Button";
import React from "react";

type SponsorTicketBoothCompProps = {
  widthVW?: number;
};

const SponsorTicketBoothComp = ({
  widthVW = 80,
}: SponsorTicketBoothCompProps) => {
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <div
      className="relative mx-auto max-w-[1200px]"
      style={{ width: `${widthVW}vw` }}
    >
      <div className="w-full flex justify-center">
        {isMobile ? <Ticket /> : <TicketBooth />}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={`text-left space-y-5 max-w-2xl
              ${isTablet ? "ml-[25%]" : ""}
              ${isDesktop ? "ml-[30%]" : ""}
              `}
        >
          <h1
            className={`font-NeulisNeue-Bold mb-3 text-charcoalFog
              ${isMobile ? "text-xl" : ""}
              ${isTablet ? "text-2xl" : ""}
              ${isDesktop ? "text-4xl" : ""}
            `}
          >
            Interested in sponsoring us?
          </h1>

          <p
            className={`font-NeulisNeue-Regular text-charcoalFog leading-relaxed mb-6
              ${isMobile ? "text-sm" : ""}
              ${isTablet ? "text-lg" : ""}
              ${isDesktop ? "text-2xl" : ""}
              `}
          >
            Reach out to us at team@hackbeanpot.com
            <br /> or check out our sponsorship package!
          </p>

          <Button
            text="View Sponsorship Package"
            color="starlightBlue"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
};

export default SponsorTicketBoothComp;
