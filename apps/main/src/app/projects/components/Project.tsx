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
      className={`
    bg-no-repeat justify-center bg-contain bg-center 
    drop-shadow-[0_8px_0px_rgba(0,0,0,.1)] pb-[3rem] 
    hover:scale-90 duration-1000 mb-[.5rem]
  `}
      style={{
        backgroundImage: "url('/stamp.svg')",
      }}
    >
      <div className="flex flex-row justify-center max-h-[500px] max-w-[400px] pt-[3rem] pb-[3rem] pr-[5rem] overflow-hidden">
        <div className="">
          <h2 className=" [@media(max-width:640px)]:rotate-90text-[1.75rem] leading-7 text-right font-bold -rotate-90 origin-right font-Wilden-Regular text-[#00877F]">
            {projectName}
          </h2>
        </div>
        <div className="max-w-40 mb-5 ml-10">
          <Image
            alt=""
            src={projectImage}
            width={200}
            height={200}
            className="max-w-full h-auto"
          />
          <h2 className="font-semibold text-xl text-[#5D5D5D] mt-5 font-GT-Walsheim-Regular">
            {award}
          </h2>
          <p className="text-[#918E89] mb-2 mt-5 text-l font-GT-Walsheim-Regular">
            {members}
          </p>
          <p className="inline-block w-full text-[#333333] text-sm font-GT-Walsheim-Regular hyphens-auto text-ellipsis">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Project;
