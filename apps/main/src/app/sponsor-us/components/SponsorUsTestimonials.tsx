"use client";

import React from "react";
import SponsorUsTestimonialsBackground from "../../lib/Assets/SVG/SponsorUsPageAssets/SponsorUsTestimonialsBackground";
import RibbonTitle from "@repo/ui/RibbonTitle";
import clsx from "clsx";

export default function SponsorUsTestimonials() {
    const outerDivStyles = clsx(
        "relative flex flex-col items-center justify-center overflow-hidden"
    );

    const outerRibbonStyles = clsx(
        "absolute z-10 top-[20%] w-full"
    );

    const ribbonScaling = clsx(
        "scale-50"
    );

    const backgroundStyles = clsx(
        "relative z-0 w-[165vw] h-full bg-green -ml-10"
    );

    return (
        <div className={outerDivStyles}>
            <div className={outerRibbonStyles}>
                <div className={ribbonScaling}>
                    <RibbonTitle text={"TESTIMONIALS"} />
                </div>
            </div>
            <SponsorUsTestimonialsBackground className={backgroundStyles} />
        </div>
    )
}