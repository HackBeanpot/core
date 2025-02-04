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
    <div className="p-4 bg-white h-[12rem] w-[18rem] rounded-md">
      <p className="text-black text-2xl mb-1 font-Wilden-Regular">{title}</p>
      <p className=" text-[#4D4D4D] text-md font-semibold font-GT-Walsheim-Regular">
        {subtitle}
      </p>
      <p className="text-[#4D4D4D] text-sm">{deadline}</p>
      <p>{description}</p>
    </div>
  );
};

export default ComingUpEvent;
