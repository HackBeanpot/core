"use client";

import React from "react";
import Button from "@repo/ui/Button";
// import clsx from "clsx";
// import useDevice from "@repo/util/hooks/useDevice";

export default function About(): React.ReactNode {
  // example for buttons, remove whenever
  return (
    <>
      <Button
        text="Back to top"
        color="firecrackerRedLight"
        textColor="white"
        // icon={<FaArrowUp />}
      />
      <Button text="Submit" color="marigoldYellow" />
    </>
  );
}
