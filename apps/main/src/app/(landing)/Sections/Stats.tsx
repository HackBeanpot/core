import React from "react";
import Box from "@repo/ui/Box";

export default function Stats(): React.ReactNode {
  return (
    <div className="w-full -mt-64">
      <div className="w-full bg-[#BEACD0] p-16 flex flex-row gap-16 justify-center content-center text-xl tablet:text-3xl">
      <Box>
        <p className="text-4xl tablet:text-8xl font-medium mb-2">{"10+"}</p>
        <p>{"years of HackBeanpot"}</p>
      </Box>
      <Box>
        <p className="text-4xl tablet:text-8xl font-medium mb-2">{"10+"}</p>
        <p>{"sponsors each year"}</p>
      </Box>
      <Box>
        <p className="text-4xl tablet:text-8xl font-medium mb-2">{"800+"}</p>
        <p>{"beans and counting"}</p>
      </Box>
    </div>
  </div>
    
  );
}
