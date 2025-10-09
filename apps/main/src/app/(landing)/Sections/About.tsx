"use client";

import React from "react";
// import Button from "@repo/ui/Button";
// import Footer from "../../lib/Components/Footer";

// import clsx from "clsx";
// import useDevice from "@repo/util/hooks/useDevice";
import TestimonialTrain from "../../../../../../packages/ui/src/TestimonialTrain";

export default function About(): React.ReactNode {
  // example for buttons, remove whenever
  return (
    <div>
      {/* <Button
        text="Back to top"
        color="firecrackerRedLight"
        textColor="white"
        // icon={<FaArrowUp />}
      /> */}
      {/* <Button text="Submit" color="marigoldYellow" /> */}
      <TestimonialTrain />
    </div>
  );
}
