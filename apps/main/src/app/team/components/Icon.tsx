import React from "react";
import LinkedInIcon from "../../lib/Assets/SVG/LinkedinLogo.svg";
import Image from "next/image";

type IconProps = {
  src: string;
  name: string;
  url?: string;
};

const Icon: React.FC<IconProps> = ({ src, name, url }) => {
  return (
    <div className="flex flex-col items-center ">
      <div
        className="relative inline-block rounded-full overflow-hidden group
          w-40 h-40 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded-full border-6 border-firecrackerRed"
      >
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover rounded-full group-hover:scale-[105%] transition-transform duration-300"
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
          <Image
            src={LinkedInIcon}
            alt="linkedin"
            fill
            className="
          absolute inset-0 
          scale-[25%]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          object-contain"
          />
        </a>
      </div>
      <p className="mt-2 font-NeulisNeue-Bold text-charcoalFog">{name}</p>
    </div>
  );
};

export default Icon;
