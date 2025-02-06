import React from "react";
import Image from "next/image";

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
}: PassportCardProps): React.ReactNode {
  return (
    <div className="flex justify-center items-center w-full font-GT-Walsheim-Pro-Regular font-bold">
      <div className="bg-white h-4/6 rounded-3xl w-1/4 absolute top-[16%] shadow-[0_15px_0px_-5px_rgba(221,198,168,1)] grid grid-rows-[49.5%_1%_49.5%] space-x-2">
        <div className="flex flex-shrink items-center w-full ml-[5%]">
          <div className="grid grid-rows-[30%_70%]">
            <div className="flex items-center space-x-2 mb-[10%]">
              <Image
                alt="passport icon"
                src={"/passport_icon.svg"}
                width={50}
                height={100}
              />
              <h1 className="text-xl ">PASSPORT</h1>
            </div>
            <Image
              alt={firstName + lastName + id}
              src={image}
              width={120}
              height={195}
              className="max-w-full h-auto object-contain"
            />
          </div>
          <div className="flex flex-shrink mr-[5%] mt-[10%] w-3/5 justify-between">
            <div className="flex flex-col">
              <p className="text-xs text-[#B1B1B2] mt-[5%]">First name</p>
              <h2>{firstName.toUpperCase()}</h2>
              <p className="text-xs text-[#B1B1B2] mt-[5%]">Last name</p>
              <h2>{lastName.toUpperCase()}</h2>
              <p className="text-xs text-[#B1B1B2] mt-[5%]">Year</p>
              <h2>{year}</h2>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-[#B1B1B2] mt-[5%]">Passport No.</p>
              <h2>{passportNumber}</h2>{" "}
              <p className="text-xs text-[#B1B1B2] mt-[5%]">Major</p>
              <h2>{major}</h2>
            </div>
          </div>
        </div>

        <div>
          {!isSponsor && (
            <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-[#DDC6A8]"></div>
          )}
        </div>

        <div className="p-[5%]">
          <h1 className="text-xl">Testimony</h1>
          <p className="font-GT-Walsheim-Regular font-normal pt-2">{quote}</p>
        </div>
      </div>
    </div>
  );
}
