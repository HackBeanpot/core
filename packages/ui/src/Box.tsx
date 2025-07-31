import React from "react";

type BoxProps = {
  children: React.ReactNode;
};

export default function Box({ children }: BoxProps) {
  return (
    <div className="py-[4%] p-[2%] rounded-lg w-full text-center  tablet:max-w-[26vw] tablet:max-h-[13vw] text-[#474747] flex flex-col justify-center bg-[#FBFBFB] shadow-lg">
      {children}
    </div>
  );
}