import React from "react";
// import NavBar from "../lib/Components/NavBar";
// import { Footer } from "../lib/Components";
import TicketBooth from "../lib/Assets/SVG/TicketBooth";
import Button from "@repo/ui/Button";

const SponsorUsPage = () => {
  return (
    <div className="relative z-10 w-full flex flex-col items-center">
      <div className="relative w-full flex flex-col items-center">
        <div className="w-full flex justify-center items-center">
          <TicketBooth />
        </div>
        <div className="absolute top-96 left-36 w-full flex flex-col items-center ">
          <h1 className="text-4xl mt-8 mb-2 bg-opacity-80 px-4 py-2 rounded text-charcoalFog font-NeulisNeue-Bold">
            Interested in sponsoring us?
          </h1>
          <p className="text-xl text-charcoalFog mb-2 bg-opacity-80 px-4 py-2 font-NeulisNeue-Regular">
            Reach out to us at team@hackbeanpot.com<br /> or check out our sponsorship package!
          </p>
          {/* TODO: add link to sponsorship packet */}
          <div className="pointer-events-auto">
            <Button text="View Sponsorship Package" color="starlightBlue" textColor="white"/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SponsorUsPage;
