"use client";

import React from "react";
import SponsorTicket from "../../Assets/SponsorAssets/SponsorTicket";
import SponsorUsTicket from "../../Assets/SponsorAssets/SponsorUsTicket";
import Image from "next/image";

export type SponsorTicketProps = {
    isSponsorUs: boolean;
    logoPath: string;
    scaleFactor?: string;
};

export default function SponsorTicketComp ({
    isSponsorUs, 
    logoPath,
    scaleFactor
}: SponsorTicketProps): React.ReactNode {
    return (
        <div className={`flex items-center justify-center ${scaleFactor} w-full h-full`}>
            <Image 
                width={50} 
                height={50} 
                alt={"image of ticket sponsor"} 
                src={logoPath} 
                className="absolute z-10"
            />
            { isSponsorUs && <SponsorUsTicket className="relative z-0" /> }
            {!isSponsorUs && <SponsorTicket className="relative z-0" /> }
        </div>
    )
};