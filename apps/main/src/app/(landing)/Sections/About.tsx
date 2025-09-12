"use client";

import Button from "@repo/ui/Button";
import React from "react";
import SponsorTicketComp from "../../lib/Components/SponsorComponents/SponsorTicketComp";
// import Button from "@repo/ui/Button";
// import Footer from "../../lib/Components/Footer";

// import clsx from "clsx";
// import useDevice from "@repo/util/hooks/useDevice";

export default function About(): React.ReactNode {
  // example for buttons, remove whenever
  return (
    <div>
      <Button
        text="Back to top"
        color="firecrackerRedLight"
        textColor="white"
        // icon={<FaArrowUp />}
      />
      <Button text="Submit" color="marigoldYellow" />
      <SponsorTicketComp 
        isUsSponsor={false} 
        logoPath={"/footer-logos/insta-logo.svg"} 
      />
      <SponsorTicketComp isUsSponsor={true} logoPath={"/footer-logos/insta-logo.svg"} />
    </div>
  );
}
