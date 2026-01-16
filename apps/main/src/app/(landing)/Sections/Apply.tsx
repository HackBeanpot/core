"use client";

import React from "react";
// import Button from "@repo/ui/Button";

export default function Apply(): React.ReactNode {
  return (
    <div className="flex flex-col justify-center items-center bg-canopyGreen h-[30vh] gap-2 overflow-hidden">
      <h3 className="font-NeulisNeue-Bold text-center text-3xl text-charcoalFogDark">
        Applications are now closed.
      </h3>
      <p className="font-DMSans-Regular text-charcoalFog mb-1 w-2/3 text-center">
        Unfortunately, HackBeanpot 2026 is no longer accepting hacker
        applicants. Follow us at @HackBeanpot on Instagram for more updates. We
        hope to see you next year!
      </p>
      {/* <Button
        text="Apply Now"
        size="medium"
        color="mossGreen"
        textColor="white"
        onClick={() => window.open("https://apply.hackbeanpot.com/")}
      /> */}
    </div>
  );
}
