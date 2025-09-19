"use client"

import React from "react";
import Train from "./Train";
import Button from "./Button";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function TestimonialTrain() {

    return (
        <div className="flex relative w-full h-[400px]">
            <div className="relative overflow-hidden z-0 ml-20">
                <Train className="w-auto h-full -translate-x-[800px]" />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10">
                <div className="flex flex-row items-center justify-center gap-[550px]">
                    <Button 
                        color="ribbonBlue"
                        textColor="starlightBlue"
                        icon={<IoIosArrowBack size={28} />} 
                        removePadding={true}   
                    />
                    <Button 
                        color="ribbonBlue"
                        textColor="starlightBlue"
                        icon={<IoIosArrowForward size={28} />}    
                        removePadding={true}
                    />
                </div>
            </div>
        </div>
    );
}