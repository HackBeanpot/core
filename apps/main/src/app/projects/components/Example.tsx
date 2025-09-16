"use client";

import Image from "next/image";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice";
import Button from "@repo/ui/Button";
import { ProjectStarIcon } from "../../lib/Assets/SVG";

interface ProjectProps {
  projectImage: string;
  projectName: string;
  url: string;
  members: string;
  description: string;
}

function Example({
  projectImage,
  projectName,
  url,
  members,
  description,
}: ProjectProps) {

    const { isDesktop, isTablet, isMobile } = useDevice();

    return (
        <div className={`flex relative 
        {isDesktop && ""}
        {isTablet}
        {}`}>
            {/* Content */}
            <div className={``}></div>

            {/* Background */}
            <div className={``}></div>
            <div className={``}></div>

        </div>
    );
}

export default Example;