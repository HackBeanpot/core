"use client";

import React from "react";
import Button from "@repo/ui/Button";
// import clsx from "clsx";
// import useDevice from "@repo/util/hooks/useDevice";

export default function Apply(): React.ReactNode {
  return (
    <div className="flex flex-col justify-center items-center bg-canopyGreen h-[30vh] gap-2 overflow-hidden">
      <h3 className="font-NeulisNeue-Bold text-center text-3xl text-black">
        Applications are now live!
      </h3>
      <p className="font-DMSans-Regular text-charcoalFog mb-1">
        Apply by January 10th, 2026.
      </p>
      <Button
        text="Apply Now"
        size="medium"
        color="mossGreen"
        textColor="white"
        onClick={() => window.open("https://apply.hackbeanpot.com/")}
      />
    </div>
  );
}
