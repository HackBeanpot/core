"use client"

import React from "react";
import SponsorCircle from "../lib/Assets/SVG/SponsorAssets/StatsCircle";

export type CircleProps = {
    title: string;
    subtitle: string;
    titleStyling?: string;
    subtitleStyling?: string;
    circleScaling?: string;
    className?: string;
};

export default function Circle({ title, titleStyling, subtitle, subtitleStyling, circleScaling, className }: CircleProps): React.ReactNode {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="flex flex-col gap-1 items-center justify-center">
                <h1 className={`z-10 text-5xl font-GT-Walsheim-Regular font-bold text-white ${titleStyling}`}>{title}</h1>
                <h4 className={`z-10 max-w-28 text-md desktop:text-xl text-center font-GT-Walsheim-Regular text-white ${subtitleStyling}`}>{subtitle}</h4>
            </div>
            <SponsorCircle className={`absolute z-0 ${circleScaling}`}/>
        </div>
    )
}