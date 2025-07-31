import React from "react";
import Box from "@repo/ui/Box";

export default function Stats(): React.ReactNode {
 return (
   <div className="w-full">
     <div className="w-full bg-[#BEACD0] p-4 desktop:p-16 flex flex-row gap-4 desktop:gap-16 justify-center content-center text-xl desktop:text-3xl">
       <Box>
        <p className="mobile:text-xl desktop:text-4xl font-medium mb-2">{"10+"}</p>
        <p className="mobile:text-sm desktop:text-xl">{"years of HBP"}</p>
       </Box>
       <Box>
         <p className="mobile:text-xl desktop:text-4xl font-medium mb-2">{"10+"}</p>
         <p className="mobile:text-sm desktop:text-xl">{"sponsors each year"}</p>
       </Box>
       <Box>
         <p className="mobile:text-xl desktop:text-4xl font-medium mb-2">{"800+"}</p>
         <p className="mobile:text-sm desktop:text-xl">{"beans and counting"}</p>
       </Box>
     </div>
   </div>
 );
}