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
  isSponsor = false,
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
        className={`bg-white rounded-3xl shadow-[0_15px_0px_-5px_rgba(221,198,168,1)]
                    ${scaleClass} absolute ${positionClass} transition-all duration-300
                    w-[85%] max-w-[320px] sm:max-w-[360px] sm:w-[60%] md:w-[45%] lg:w-[30%]`}
      >
        {/* ─── TOP SECTION ─────────────────────────────────────────────── */}
        <div
          className={`p-4 md:p-6 lg:p-8 ${!isSponsor ? "border-b border-[#DDC6A8]" : ""}`}
        >
          {" "}
          {/* mobile = stacked | >=sm = side-by-side */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
            {/* photo + header */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  alt="passport icon"
                  src="/passport_icon.svg"
                  width={24}
                  height={24}
                />
                <h1 className="text-lg md:text-xl">PASSPORT</h1>
              </div>
              <Image
                alt={`${firstName}${lastName}${id}`}
                src={image}
                width={120}
                height={120}
                className="rounded-md object-cover w-[120px] h-[120px]"
              />
            </div>

            {/* personal info */}
            <div className="mt-4 sm:mt-0 flex-grow grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
              <div>
                <p className="text-xs text-[#B1B1B2]">First name</p>
                <h2>{firstName.toUpperCase()}</h2>
              </div>
              <div>
                <p className="text-xs text-[#B1B1B2]">Passport&nbsp;No.</p>
                <h2>{passportNumber}</h2>
              </div>
              <div>
                <p className="text-xs text-[#B1B1B2]">Last name</p>
                <h2>{lastName.toUpperCase()}</h2>
              </div>
              <div>
                <p className="text-xs text-[#B1B1B2]">Major</p>
                <h2>{major}</h2>
              </div>
              <div>
                <p className="text-xs text-[#B1B1B2]">Year</p>
                <h2>{year}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM SECTION ──────────────────────────────────────────── */}
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
