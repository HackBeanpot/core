"use client";

import React from "react";
// import TicketBooth from "../lib/Assets/SVG/SponsorUsAssets/TicketBooth";
// import Ticket from "../lib/Assets/SVG/SponsorUsAssets/Ticket";
// import Button from "@repo/ui/Button";
// import useDevice from "@repo/util/hooks/useDevice";
import SponsorUsBenefitCardComp from "../lib/Components/SponsorUsComponents/SponsorUsBenefitCardComp";
import SponsorTop from "./components/SponsorTop.tsx";

const SponsorUsPage = () => {
  return (
    <div>
      <div className="relative z-10 w-full">
        <SponsorTop />
      </div>

      <div className="absolute top-[155%] z-10 w-full">
        <SponsorUsBenefitCardComp
          title="Market your company and product"
          content="Market your product and receive feedback by sponsoring a company-specific prize, hosting a workshop, giving a product demo, or mentoring hackers that are eager to hear your advice and implement your technologies for their projects."
        />
      </div>
    </div>
  );
};

export default SponsorUsPage;
