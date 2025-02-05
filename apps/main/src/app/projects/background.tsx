"use client";
import Image from "next/image";
import React from "react";

const ProjectsBackground = () => {
  return (
    <div className="w-full h-full overflow-hidden">
      <Image
        alt="ProjectsBackground"
        src={"/projects_background.svg"}
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
