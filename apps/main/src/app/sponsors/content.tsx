import React, { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

const SponsorsContent = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="flex justify-center flex-col items-center" ref={ref}>
      <div>
        <h1 className="font-bold text-7xl mb-[5rem] mt-[7rem] text-center text-[#AD916C] font-Wilden-Regular drop-shadow-[0_8px_0px_rgba(0,0,0,.1)]">
          HBP 2025 SPONSORS
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-center space-x-2 items-center mb-[1rem]">
          <Image
            alt="HBP 2025 Sponsor Wood Mackenzie"
            src={"/wood.svg"}
            width={400}
            height={200}
            className="max-w-full h-auto"
          />
          <Image
            alt="HBP 2025 Sponsor Whoop"
            src={"/whoop.svg"}
            width={400}
            height={200}
            className="max-w-full h-auto"
          />
          <Image
            alt="HBP 2025 Sponsor UKG"
            src={"/ukg.svg"}
            width={400}
            height={200}
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex flex-wrap justify-center space-x-2 items-center mb-[1rem]">
          <Image
            alt="HBP 2025 Sponsor Northeastern"
            src={"/northeastern.svg"}
            width={400}
            height={200}
            className="max-w-full h-auto"
          />
          <Image
            alt="HBP 2025 Sponsor Vyper"
            src={"/vyper.svg"}
            width={400}
            height={200}
            className="max-w-full h-auto"
          />
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <Image
            alt="HBP 2025 Sponsor RedBull"
            src={"/redbull.svg"}
            width={400}
            height={200}
            className="max-w-full h-auto"
          />
        </div>
      </div>
      <div className="bg-[#C6E0D3] mobile:w-full desktop:w-[150%] flex justify-center items-center flex-col space-y-4 font-GT-Walsheim-Regular py-20 px-4 mt-20">
        <h1 className="text-2xl font-GT-Walsheim-Bold text-center">
          Interested in sponsoring HackBeanpot 2025?
        </h1>
        <h3 className="text-xl text-center">
          Reach out to us at team@hackbeanpot.com or check out our sponsorship
          packet!
        </h3>
        <div className="rounded-full bg-[#202020] text-xl p-3 px-8 text-[#FFFFFF]">
          <Link href="https://drive.google.com/file/d/17hO3lgm_XYCrxd066B-AXIfq8gBnu8aE/view">
            View packet
          </Link>
        </div>
      </div>
    </div>
  );
});

SponsorsContent.displayName = "SponsorsContent";

export default SponsorsContent;
