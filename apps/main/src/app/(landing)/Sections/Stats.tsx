import React from "react";
import { Section } from "@repo/ui";
const background = <div className="w-full h-full bg-[#BEACD0]" />;

const content = (
  <div className="w-full h-full flex flex-row gap-1 justify-center content-center text-xl tablet:text-3xl">
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
);

export default function Stats(): React.ReactNode {
  return (
    <Section
      name={"stats"}
      background={background}
      content={content}
      height={40}
    />
  );
}

export function Box({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="my-[4%] m-[2%] rounded-lg w-full max-w-[25vw] max-h-[28vh] text-center text-[#474747] flex flex-col justify-center bg-[#FBFBFB] shadow-lg">
      {children}
    </div>
  );
}
