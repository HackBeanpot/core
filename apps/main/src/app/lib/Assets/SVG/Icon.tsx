import React from "react";

type IconProps = {
  image_location: string;
  size?: number;
  url?: string;
};

const Icon: React.FC<IconProps> = ({ image_location, size, url}) => {
  return (
    <div
      className="relative inline-block rounded-full overflow-hidden group
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
            "
      style={{ width: size, height: size }}
    >
      <img
        src={image_location}
        alt="icon"
        className="w-full h-full object-cover rounded-full border-4"
        style={{ borderColor: "#CC322D" }}
      />
      <div
        className="
            pointer-events-none absolute inset-0 rounded-full
            opacity-0 group-hover:opacity-70
            transition-opacity duration-300
            bg-[#CC322D]
        "
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          absolute inset-0 flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
      >
      <img
        src="/sponsor-logos/linkedin.png"
        alt="linkedin"
        className="
          absolute inset-0 m-auto
          w-1/3 h-1/3
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
       />
       </a>
    </div>
  );
};

export default Icon;
