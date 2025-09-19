import React from "react";
import clsx from "clsx";

const cardStylesBorder = clsx(
  "relative w-[50vw] aspect-[815.74/360.2] outline outline-[15px] outline-firecrackerRedLight rounded-xl drop-shadow-[8px_8px_0_#CC322D] flex items-center justify-center",
);

const cardStylesBG = clsx(
  "absolute inset-0 bg-[#CC322D] rounded-xl shadow-[inset_-10px_10px_0_rgba(0,0,0,0.25)]",
);

const Card = () => {
  return (
    <div className={cardStylesBorder}>
      <div className={cardStylesBG} />
      <div className="relative flex flex-col items-center justify-center h-full">
        <span className="font-['NeulisNeue-Bold'] font-semibold text-[2vw] text-white">
          Interested in joining core?
        </span>
        <span className="font-['NeulisNeue-Regular'] font-normal text-[1.3vw] text-white">
          Applications open in February!
        </span>
      </div>
    </div>
  );
};

export default Card;
