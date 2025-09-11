"use client";

import React from "react";
import StatsPage from "../../lib/Assets/SVG/StatsPage";
// import clsx from "clsx";
// import useDevice from "@repo/util/hooks/useDevice";

export default function Stats(): React.ReactNode {
  return (
      <div className="w-screen h-screen overflow-hidden">
        <StatsPage className="w-full h-auto"/>
      </div>
  );
}