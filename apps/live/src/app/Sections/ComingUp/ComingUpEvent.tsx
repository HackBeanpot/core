import React from "react";

type ComingUpEventProps = {
  title: string;
  subtitle: string;
  deadline: string;
  description: string;
};

const ComingUpEvent = ({
  title,
  subtitle,
  deadline,
  description,
}: ComingUpEventProps) => {
  return (
    <div className="p-4 bg-white h-[12rem] w-[18rem] rounded-lg drop-shadow-lg">
      <p
        className={`${title === "NOW!" ? "text-[#0F786E]" : "text-[#F5AE55]"} text-2xl mb-1 font-Wilden-Regular`}
      >
        {title}
      </p>
      <p className=" text-[#4D4D4D] text-md font-semibold font-GT-Walsheim-Regular pb-1">
        {subtitle}
      </p>
      <p className="text-[#4D4D4D] text-sm pb-1">{deadline}</p>
      <p className="text-[#878787] text-xs">{description}</p>
    </div>
  );
};

export default ComingUpEvent;
