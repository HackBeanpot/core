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
      className="flex flex-row pt-[3rem] pr-[7rem] mb-[2rem] bg-no-repeat justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/stamp.svg')",
      }}
    >
      <div className="mr-10">
        <h2 className="text-2xl text-right -rotate-90 font-bold origin-right">
          {projectName}
        </h2>
      </div>
      <div className="max-w-40 mb-5">
        <Image alt="" src={projectImage} width={200} height={200} />
        <h2 className="font-semibold text-xl text-[#5D5D5D] mb-5 mt-5">
          {award}
        </h2>
        <p className="text-[#918E89] mb-5 mt-5">{members}</p>
        <p className="text-[#333333]">{description}</p>
      </div>
    </div>
  );
}

// const Project: React.FC<ProjectProps> = ({
//   projectImage,
//   projectName,
//   award,
//   members,
//   description,
// }) => {
//   return (
//     <div
//       className="flex flex-row pt-[3rem] pr-[7rem] mb-[2rem] bg-no-repeat justify-center bg-cover bg-center"
//       style={{
//         backgroundImage: "url('/stamp.svg')",
//       }}
//     >
//       <div className="mr-10">
//         <h2 className="text-2xl text-right -rotate-90 font-bold origin-right">
//           {projectName}
//         </h2>
//       </div>
//       <div className="max-w-40 mb-5">
//         <Image alt="" src={projectImage} width={200} height={200} />
//         <h2 className="font-semibold text-xl text-[#5D5D5D] mb-5 mt-5">
//           {award}
//         </h2>
//         <p className="text-[#918E89] mb-5 mt-5">{members}</p>
//         <p className="text-[#333333]">{description}</p>
//       </div>
//     </div>
//   );
// };

export default Project;
