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
          <div className="ml-[40%] w-[min(40rem,45%)] self-center">
            <div className="pointer-events-auto flex flex-col items-start text-left">
              <h1 className="text-4xl md:text-3xl sm:text-2xl mb-3 text-charcoalFog font-NeulisNeue-Bold">
                Interested in sponsoring us?
              </h1>
              <p className="text-2xl md:text-lg sm:text-base text-charcoalFog mb-6 font-NeulisNeue-Regular leading-relaxed">
                Reach out to us at team@hackbeanpot.com
                <br /> or check out our sponsorship package!
                {/* TODO: add link to sponsorship packet */}
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