import Image from "next/image";
import React from "react";

interface ProjectProps {
  projectImage: string;
  projectName: string;
  award: string;
  members: string;
  description: string;
}

function Project({
  projectImage,
  projectName,
  award,
  members,
  description,
}: ProjectProps) {
  return (
    <div
      className="flex flex-row pt-[3rem] pb-[3rem] pr-[7rem] bg-no-repeat justify-center  bg-center max-h-[540.75px] overflow-hidden"
      style={{
        backgroundImage: "url('/stamp.svg')",
      }}
    >
      <div className="">
        <h2 className="text-2xl text-right font-bold -rotate-90 origin-right font-Wilden-Regular">
          {projectName}
        </h2>
      </div>
      <div className="max-w-40 mb-5 ml-10">
        <Image alt="" src={projectImage} width={200} height={200} />
        <h2 className="font-semibold text-xl text-[#5D5D5D] mt-5 font-GT-Walsheim-Regular">
          {award}
        </h2>
        <p className="text-[#918E89] mb-2 mt-5 text-l font-GT-Walsheim-Regular">
          {members}
        </p>
        <p className="text-[#333333] text-l font-GT-Walsheim-Regular hyphens-auto overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Project;
