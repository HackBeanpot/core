import useDevice from "@util/hooks/useDevice.ts";
import Ticket from "../../lib/Assets/SVG/SponsorUsAssets/Ticket.tsx";
import TicketBooth from "../../lib/Assets/SVG/SponsorUsAssets/TicketBooth.tsx";
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
      className="relative mx-auto"
      style={{
        width: `${widthVW}vw`,
      }}
    >
      <div className="w-full flex justify-center">
        {isMobile ? <Ticket /> : <TicketBooth />}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="text-left space-y-[2vw]"
          style={{
            maxWidth: "60vw",
            marginLeft: isDesktop ? "30%" : isTablet ? "25%" : "0",
          }}
        >
          <h1
            className="font-NeulisNeue-Bold text-charcoalFog"
            style={{
              fontSize: isMobile ? "4vw" : isTablet ? "2.2vw" : "1.8vw",
              marginBottom: "1vw",
            }}
          >
            Interested in sponsoring us?
          </h1>

          <p
            className="font-NeulisNeue-Regular text-charcoalFog leading-relaxed"
            style={{
              fontSize: isMobile ? "3.2vw" : isTablet ? "1.6vw" : "1.3vw",
              marginBottom: "2vw",
            }}
          >
            Reach out to us at team@hackbeanpot.com
            <br /> or check out our sponsorship package!
          </p>

          <div style={{ transform: "translateY(1vw)" }}>
            <Button
              text="View Sponsorship Package"
              color="starlightBlue"
              textColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorTicketBoothComp;
