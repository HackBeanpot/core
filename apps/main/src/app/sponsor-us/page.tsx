"use client";

import React from "react";
import SponsorUsBenefitCardComp from "../lib/Components/SponsorUsComponents/SponsorUsBenefitCardComp";
import SponsorTicketBoothComp from "../lib/Components/SponsorComponents/SponsorTicketBoothComp.tsx";
import SponsorUsStatsComp from "../lib/Components/SponsorComponents/SponsorUsStatsComp";

const SponsorUsPage = () => {
  return (
    <div className="relative z-10 w-full">
      <SponsorTicketBoothComp />
      <SponsorUsBenefitCardComp
        title="Market your company and product"
        content="Market your product and receive feedback by sponsoring a company-specific prize, hosting a workshop, giving a product demo, or mentoring hackers that are eager to hear your advice and implement your technologies for their projects."
      /> 
      <SponsorUsStatsComp />
    </div>
  );
};

export default SponsorUsPage;
