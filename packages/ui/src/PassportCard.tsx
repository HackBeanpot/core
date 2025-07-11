import React from "react";
import Image from "next/image";
import clsx from "clsx";


export type PassportCardProps = {
  isSponsor?: boolean;
  passportNumber: string;
  id: number;
  firstName: string;
  lastName: string;
  year: string;
  major: string;
  quote: string;
  company?: string;
  image: string;
  isActive?: boolean;
};

export default function PassportCard({
  isSponsor,
  id,
  passportNumber,
  firstName,
  lastName,
  major,
  year,
  quote,
  image,
  isActive,
}: PassportCardProps): React.ReactNode {
  const positionClass = isActive ? "top-[20%]" : "top-[22%]";

  const scaleClass = isActive ? "scale-100" : "scale-[75%]";

  const valuesStyles = clsx(

  );

  return (
    <div className="flex justify-center items-center w-full font-GT-Walsheim-Pro-Regular font-bold">
      <div
        className={`bg-white desktop:h-4/6 mobile:h-5/6 rounded-[2rem] desktop:w-1/3 mobile:w-5/6 ${scaleClass} absolute ${positionClass} shadow-[0_15px_0px_-5px_rgba(221,198,168,1)] grid grid-rows-[49.5%_1%_49.5%]`}
      >
        {/* top half of card */}
        <div className="py-4 px-10 grid grid-rows-[30%_70%]">
          <div className="flex items-center space-x-2">
            <Image
              alt="passport icon"
              src={"/passport_icon.svg"}
              width={50}
              height={100}
              className="rounded-md"
            />
            <h1 className="text-xl">PASSPORT</h1>
          </div>
          <div className="grid grid-cols-[40%_60%]">
            <Image
              alt={firstName + lastName + id}
              src={image}
              width={135}
              height={225}
              className="max-w-full object-contain rounded-2xl mt-2"
            />
            <div className="flex flex-shrink w-3/5 justify-between">
              <div className="flex flex-col">
                <p className="text-xs text-[#B1B1B2] mt-[5%]">First name</p>
                <h2>{firstName.toUpperCase()}</h2>
                <p className="text-xs text-[#B1B1B2] mt-[5%]">Last name</p>
                <h2>{lastName.toUpperCase()}</h2>
                <p className="text-xs text-[#B1B1B2] mt-[5%]">Year</p>
                <h2>{year}</h2>
              </div>
              <div className="flex flex-col desktop:ml-12">
                <p className="text-xs text-[#B1B1B2] mt-[5%]">Passport No.</p>
                <h2>{passportNumber}</h2>
                <p className="text-xs text-[#B1B1B2] mt-[5%]">Major</p>
                <h2>{major}</h2>
              </div>
            </div>
          
          </div>
        </div>

        {/* divider if not sponsor */}
        <div>
          {!isSponsor && <div className="w-full h-0.5 bg-[#DDC6A8]"></div>}
        </div>

        {/* bottom half */}
        <div className="p-8">
          <p className="desktopxl:text-2xl">Testimony</p>
          <p className="font-GT-Walsheim-Regular font-normal desktop:text-base mobile:text-xs pt-4 desktopxl:leading-[2rem] desktopxl:text-xl">{quote}</p>
        </div>
      </div>
    </div>
  );
}
