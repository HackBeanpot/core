import React from "react";

type StreetSignProps = {
  streetName: string;
  suffix: string;
};

export default function StreetSign({
  streetName,
  suffix,
}: StreetSignProps): React.ReactNode {
  return (
    <div
      className={
        "relative inline-flex items-center bg-[#02877F] text-white border-4 border-white rounded-3xl px-8 transform -rotate-3 shadow-lg"
      }
    >
      <p className="text-[71.27px] font-Big-Shoulders-Display">{streetName}</p>
      <p className="text-[30.33px] font-Big-Shoulders-Display ml-3 mb-8">
        {suffix}
      </p>
    </div>
  );
}
