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

  return (
    <div className="flex justify-center items-center w-full font-GT-Walsheim-Pro-Regular font-bold">
      <div
        className={`bg-white rounded-3xl shadow-[0_15px_0px_-5px_rgba(221,198,168,1)] ${scaleClass} absolute ${positionClass} transition-all w-[30%] sm:w-[60%] md:w-[45%] lg:w-[30%]`}
      >
        {/* --- TOP SECTION --- */}
        <div className="p-4 md:p-6 lg:p-8 border-b border-[#DDC6A8]">
          <div className="flex items-start space-x-4">
            {/* Left side: photo and passport header */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  alt="passport icon"
                  src={"/passport_icon.svg"}
                  width={32}
                  height={32}
                />
                <h1 className="text-lg md:text-xl">PASSPORT</h1>
              </div>
              <Image
                alt={`${firstName}${lastName}${id}`}
                src={image}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
            </div>

            {/* Right side: personal info */}
            <div className="flex-grow flex flex-col sm:flex-row sm:justify-between w-full space-y-2 sm:space-y-0 sm:space-x-6">
              <div>
                <p className="text-xs text-[#B1B1B2]">First name</p>
                <h2>{firstName.toUpperCase()}</h2>
                <p className="text-xs text-[#B1B1B2] mt-2">Last name</p>
                <h2>{lastName.toUpperCase()}</h2>
                <p className="text-xs text-[#B1B1B2] mt-2">Year</p>
                <h2>{year}</h2>
              </div>
              <div>
                <p className="text-xs text-[#B1B1B2]">Passport No.</p>
                <h2>{passportNumber}</h2>
                <p className="text-xs text-[#B1B1B2] mt-2">Major</p>
                <h2>{major}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="p-4 md:p-6 lg:p-8">
          <h1 className="text-lg md:text-xl">Testimony</h1>
          <p className="font-GT-Walsheim-Regular font-normal pt-2 text-sm md:text-base leading-relaxed">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
}
