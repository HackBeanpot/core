import React from "react";
import LinkedInIcon from "../../lib/Assets/SVG/LinkedinLogo.svg";
import Image from "next/image";

type IconProps = {
  imageLocation: string;
  name: string;
  size?: number;
  url?: string;
};

const Icon: React.FC<IconProps> = ({ imageLocation, name, size, url }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative inline-block rounded-full overflow-hidden group
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
            "
        style={{ width: size, height: size }}
      >
        <Image
          src={imageLocation}
          alt="icon"
          fill
          className="object-cover rounded-full border-4"
          style={{ borderColor: "#CC322D" }}
        />

        <div
          className="
            pointer-events-none absolute inset-0 rounded-full
            opacity-0 group-hover:opacity-70
            transition-opacity duration-300
            bg-firecrackerRed
        "
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="
          absolute inset-0 flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300F
        "
        >
          <Image
            src={LinkedInIcon}
            alt="linkedin"
            fill
            className="
    absolute inset-0 
    scale-[25%]
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300
    object-contain
  "
          />
        </a>
      </div>
      <p className="mt-2 font-NeulisNeue-Bold text-charcoalFog">{name}</p>
    </div>
  );
};

export default Icon;
