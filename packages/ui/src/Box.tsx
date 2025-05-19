import React from "react";

type BoxProps = {
  children: React.ReactNode;
};

export default function Box({ children }: BoxProps) {
  return (
    <div className="py-[4%] p-[2%] rounded-lg w-full max-w-[25vw] max-h-[28vh] text-center text-[#474747] flex flex-col justify-center bg-[#FBFBFB] shadow-lg">
      {children}
    </div>
  );
}
