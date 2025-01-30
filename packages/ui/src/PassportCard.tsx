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
      <div className="bg-[#DDC6A8] h-4/6 rounded-3xl w-2/5 drop-shadow-md absolute top-[18%]"></div>

      <div className="bg-white h-4/6 rounded-3xl w-2/5 absolute top-[16%] drop-shadow-md grid grid-rows-[49.5%_1%_49.5%] space-x-2">
        {/* top half of card*/}
        <div className="flex flex-shrink items-center w-full ml-[5%]">
          <div className="grid grid-rows-[30%_70%]">
            <div className="flex items-center space-x-2 mb-[10%]">
              <Image
                alt="passport icon"
                src={"/passport_icon.svg"}
                width={50}
                height={100}
                className=""
              />
              <h1 className="text-xl ">PASSPORT</h1>
            </div>

            <Image
              alt={firstName + lastName + id}
              src={image}
              width={100}
              height={175}
              className=""
            />
          </div>

          {/* the passport info */}

          <div className="flex flex-shrink mr-[5%] mt-[10%] w-3/5 grid grid-cols-2 ">
            <p className="text-xs text-[#B1B1B2] mt-[5%]">First name</p>
            <p className="text-xs text-[#B1B1B2] mt-[5%]">Passport No.</p>
            <h2>{firstName.toUpperCase()}</h2>
            <h2>{passportNumber}</h2> {/* change this to something else */}
            <p className="text-xs text-[#B1B1B2] mt-[5%]">Last name</p>
            <p className="text-xs text-[#B1B1B2] mt-[5%]">Major</p>
            <h2>{lastName.toUpperCase()}</h2>
            <h2>{major}</h2>
            <p className="text-xs text-[#B1B1B2] mt-[-10%]">Year</p>
            <p></p>
            <h2>{year}</h2>
          </div>
        </div>

        {/* middle separator  */}
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
