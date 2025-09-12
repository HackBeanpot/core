"use client";

import React, { useState, useRef } from "react";
import SponsorTicket from "../../Assets/SponsorAssets/SponsorTicket";
import SponsorUsTicket from "../../Assets/SponsorAssets/SponsorUsTicket";
import Image from "next/image";

export type SponsorTicketProps = {
    isUsSponsor: boolean;
    logoPath: string;
    scaleFactor?: string;
};

export default function SponsorTicketComp ({
    isUsSponsor, 
    logoPath,
    scaleFactor
}: SponsorTicketProps): React.ReactNode {
    return (
        <div className={`flex items-center justify-center ${scaleFactor}`}>
            <Image 
                width={50} 
                height={50} 
                alt={"image of ticket sponsor"} 
                src={logoPath} 
                className="absolute z-10"
            />
            { isUsSponsor && <SponsorUsTicket className="absolute z-0" /> }
            {!isUsSponsor && <SponsorTicket className="absolute z-0" /> }
        </div>
    )
};