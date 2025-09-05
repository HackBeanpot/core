"use client"

import React from "react";
import Circle from "./Circle";
import WideStamp from "../lib/Assets/SVG/SponsorAssets/WideStamp";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";
import BubbleStats from "../lib/Assets/SVG/SponsorAssets/BubbleStats";
import StatsCarousel from "./StatsCarousel";

export default function RecruitmentStats(): React.ReactNode {
    const { isMobile, isTablet, isDesktop } = useDevice();

    const stampTitleStyles = clsx(
        "flex items-center justify-center",
        isMobile && "mb-6",
    );

    const stampStyles = clsx(
        "scale-75 z-0 drop-shadow-[0_6px_0px_rgba(0,0,0,.1)]",
        isMobile && "scale-[.6]",
        isTablet && "top-10",
    );

    type CircleInfo = {
        title: string;
        subtitle: string;
    };

    const defaultOrder: CircleInfo[] = [
        {
            title: "18",
            subtitle: "workshops and activities"
        },
        {
            title: "41",
            subtitle: "different tech tools used across different projects"
        },
        {
            title: "33",
            subtitle: "project submissions"
        },
        {
            title: "36",
            subtitle: "total hours of hacking"
        },
        {
            title: "780",
            subtitle: "applicants"
        },
        {
            title: "159",
            subtitle: "hackers"
        },
        {
            title: "45%",
            subtitle: "female/non-binary hackers"
        },
    ]

    return (
        <div className="relative bg-eggshell w-full min-h-[400px] flex flex-col items-center justify-center">
            <div className={stampTitleStyles}>
                <WideStamp className={stampStyles}></WideStamp>
                <h1 className="absolute z-10 text-3xl font-GT-Walsheim-Bold text-teal">HBP 2024 Stats</h1>
            </div>
            {isDesktop &&
            <div className="relative w-[50%] h-[400px] -top-4">
                <Circle title={"18"} subtitle={"workshops and activities"} className="absolute top-8 right-12 scale-90"/>
                <Circle title={"41"} subtitle={"different tech tools used across different projects"} className="absolute top-28 right-64" circleScaling="scale-150"/>
                <Circle title={"33"} subtitle={"project submissions"} className="absolute bottom-8 right-12 scale-90"/>
                <Circle title={"36"} subtitle={"total hours of hacking"} className="absolute top-16 left-64" />
                <Circle title={"780"} subtitle={"applicants"} className="absolute bottom-14 left-64 scale-90" />
                <Circle title={"159"} subtitle={"hackers"} className="absolute top-10 left-28" circleScaling="scale-75" />
                <Circle title={"45%"} subtitle={"female/non-binary hackers"} className="absolute bottom-20 left-16" />
            </div>}
            {isTablet &&
                <BubbleStats className="relative scale-[.6] -top-32"></BubbleStats>
            }
            {isMobile &&
                <StatsCarousel items={defaultOrder.slice(0,3)}></StatsCarousel>
            }
        </div>
    );
}