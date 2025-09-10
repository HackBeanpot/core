"use client";

import React from "react";
// absolute or next path (has to define in tsconfig)
import Tent from "../../lib/Assets/SVG/tent.tsx";
// import clsx from "clsx";
// import useDevice from "@repo/util/hooks/useDevice";

export default function Keynote(): React.ReactNode {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Keynote</h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
        <Tent />
      </div>
    </>
  );
  // TODO: update content
  // TODO: update title
  //
}
