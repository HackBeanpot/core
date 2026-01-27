import React from "react";
import LinkedinLogo from "../LinkedInLogo";
import ActiveIcon from "../ActiveIcon";
import InactiveIcon from "../InactiveIcon";
import ExpandIcon from "./Expand";
import Image from "next/image";

type IconProps = {
  src: string;
  name: string;
  url?: string;
  isLive: boolean;
  isActive: boolean;
};

const Icon: React.FC<IconProps> = ({
  src,
  name,
  url,
  isLive = false,
  isActive = false,
}) => {
  return (
    <div className="flex flex-col items-center relative">
      <div className="relative inline-block rounded-full overflow-hidden group w-40 h-40 hover:scale-105 transition-transform duration-200 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover rounded-full border-6 border-firecrackerRed"
        />

        <div
          className="
              pointer-events-none absolute inset-0 rounded-full
              opacity-0 group-hover:opacity-70
              transition-opacity duration-300
              bg-firecrackerRed"
        />

        <a
          href={url}
          className="
              absolute inset-0 flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300F"
        >
          {isLive ? <ExpandIcon /> : <LinkedinLogo />}
        </a>
      </div>

      {isLive && (
        <div className="absolute bottom-0 right-0 sm:w-4 sm:h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 -translate-y-10 -translate-x-4">
          {isActive ? <ActiveIcon /> : <InactiveIcon />}
        </div>
      )}
      <p className="mt-2 font-NeulisNeue-Bold text-charcoalFog">{name}</p>
    </div>
  );
};

export default Icon;
