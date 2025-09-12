import React from "react";
import Image from "next/image";
import clsx from "clsx";
import useDevice from "@repo/util/hooks/useDevice";
export type PassportCardProps = {
  isSponsor: boolean;
  passportNumber: string;
  id: number;
  firstName: string;
  lastName: string;
  year: string;
  major: string;
  quote: string;
  company?: string;
  role?: string;
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
  company,
  role,
  image,
  isActive,
}: PassportCardProps): React.ReactNode {
  const positionClass = isActive ? "top-[20%]" : "top-[22%]";
  const scaleClass = isActive ? "scale-100" : "scale-[75%]";
  const { isMobile, isTablet, isDesktop } = useDevice();
  const valuesStyles = clsx(
    "",
    isDesktop && "desktopxl:text-2xl",
    isTablet && "",
    isMobile && "text-xs",
  );
  const sponsorTestimonialStyles = clsx(
    `bg-eggshell h-auto rounded-[2rem] absolute top-[22%] shadow-[0_12px_0px_-5px_rgba(221,198,168,1),0_20px_0px_-5px_rgba(0,0,0,0.25)] flex flex-col desktopxl:-space-y-8 py-10 px-10 ${scaleClass} ${positionClass}`,
    isDesktop && "w-1/3 -space-y-3",
    isTablet && "w-1/3 -space-y-3 px-8",
    isMobile && "w-5/6 -space-y-12",
  );
  const sponsorRepBoxStyles = clsx(
    "mt-4 grid grid-rows-2 -space-y-1",
    isMobile && "mt-2",
  );
  const sponsorRepStyles = clsx(
    "text-lg text-center text-[#A98F6C]",
    isTablet && "-mt-3",
  );
  const sponsorRepPositionStyles = clsx(
    "text-xs text-center tablet:-mt-24 tablet:-mx-4 mobile:-mt-32 font-medium",
    isTablet && "-mx-4 -mt-24",
    isMobile && "-mt-32",
  );
  const sponsorBlurbStyles = clsx(
    "text-center font-medium -mt-16",
    isTablet && "-mt-14 text-sm",
    isMobile && "-mt-6 text-xs",
  );
  return (
    <div className="flex justify-center items-center w-full font-GT-Walsheim-Pro-Regular font-bold">
      {!isSponsor && (
        <div
          className={`bg-white desktop:h-5/6 mobile:h-5/6 rounded-[2rem] desktop:w-1/3 mobile:w-5/6 ${scaleClass} absolute ${positionClass} shadow-[0_15px_0px_-5px_rgba(221,198,168,1)] grid grid-rows-[49.5%_1%_49.5%]`}
        >
          {/* top half of card */}
          <div className="py-4 desktop:px-10 mobile:px-5 grid grid-rows-[30%_70%]">
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
            <div className="grid grid-cols-[35%_65%] desktop:gap-2">
              <Image
                alt={firstName + lastName + id}
                src={image}
                width={135}
                height={175}
                className="desktop:w-[10vw] desktopxl:w-[10vw] desktopxl:h-[20vh] desktop:h-[20vh] mobile:h-[145px] object-cover rounded-2xl mt-2"
              />
              <div className="flex flex-shrink w-3/5 justify-between">
                <div className="flex flex-col mobile:mx-4">
                  <p className="text-xs text-[#B1B1B2] mt-[5%]">First name</p>
                  <h2 className={valuesStyles}>{firstName.toUpperCase()}</h2>
                  <p className="text-xs text-[#B1B1B2] mt-[5%]">Last name</p>
                  <h2 className={valuesStyles}>{lastName.toUpperCase()}</h2>
                  <p className="text-xs text-[#B1B1B2] mt-[5%]">Year</p>
                  <h2 className={valuesStyles}>{year}</h2>
                </div>
                <div className="flex flex-col desktop:ml-12 mobile:ml-2">
                  <p className="text-xs text-[#B1B1B2] mt-[5%]">Passport No.</p>
                  <h2 className={valuesStyles}>{passportNumber}</h2>
                  <p className="text-xs text-[#B1B1B2] mt-[5%]">Major</p>
                  <h2 className={valuesStyles}>{major}</h2>
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
            <p className="font-GT-Walsheim-Regular font-normal desktop:text-base mobile:text-xs pt-4 desktopxl:leading-[2rem] desktopxl:text-xl">
              {quote}
            </p>
          </div>
        </div>
      )}
      {isSponsor && (
        <div className={sponsorTestimonialStyles}>
          <div className="grid grid-rows-3 items-center justify-center">
            <Image
              src={image}
              alt={company ?? "company" + " Logo"}
              width={200}
              height={200}
              className="mt-2"
            />
            <div className={sponsorRepBoxStyles}>
              <h1 className={sponsorRepStyles}>{firstName + " " + lastName}</h1>
              <h2 className={sponsorRepPositionStyles}>
                {role + ", " + company}
              </h2>
            </div>
          </div>
          <div>
            <p className={sponsorBlurbStyles}>{quote}</p>
          </div>
        </div>
      )}
    </div>
  );
}