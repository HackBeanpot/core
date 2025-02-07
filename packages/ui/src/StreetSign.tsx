import React from "react";
import { SignLarge, SignSmall } from "@repo/ui";

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
        "relative inline-flex items-center bg-[#02877F] text-white border-4 border-white rounded-2xl px-8 clip-path-inset-10 transform -rotate-3 shadow-lg"
      }
    >
      <SignLarge>{streetName}</SignLarge>
      <SignSmall className="ml-2 mb-5">{suffix}</SignSmall>
    </div>
  );
}
