"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { MobileContext } from "../providers";

const ProjectsBackground = () => {
  const { isMobile } = useContext(MobileContext);

  return (
    <div className="w-full h-full overflow-hidden">
      <Image
        alt="ProjectsBackground"
        src={
          isMobile
            ? "/projects_background.svg"
            : "/projects_background_mobile.svg"
        }
        fill
        className="object-cover"
      />
      <Image
        alt="ProjectsForeground"
        src="/projects_sock.png"
        width={1600}
        height={1069}
        className="absolute bottom-0 min-w-full"
      />
    </div>
  );
};

export default ProjectsBackground;
