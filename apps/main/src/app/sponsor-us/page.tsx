import React from "react";
// import NavBar from "../lib/Components/NavBar";
// import { Footer } from "../lib/Components";
import TicketBooth from "../lib/Assets/SVG/TicketBooth";
import Button from "@repo/ui/Button";

const SponsorUsPage = () => {
  return (
    <div className="relative z-10 w-full">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="w-full flex justify-center">
          <TicketBooth />
        </div>
        <div className="pointer-events-none absolute inset-0 flex">
          <div className="ml-4 w-[90%] self-center">
            <div className="flex flex-col items-start ml-[44%]">
              <h1 className="text-[clamp(1.25rem,2vw+1rem,2.5rem)] mb-3 text-charcoalFog font-NeulisNeue-Bold">
                Interested in sponsoring us?
              </h1>
              <p className="text-[clamp(1rem,1.5vw+0.5rem,1.5rem)] text-charcoalFog mb-6 font-NeulisNeue-Regular leading-relaxed">
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
      </div>
    </div>
  );
};

export default SponsorUsPage;
