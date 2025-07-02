// import React from "react";
// import Image from "next/image";
// import ExternalLink from "../../lib/Components/ExternalLink";
// import LandingBackground from "../../lib/Assets/SVG/LandingBackground";
// import Guardrail from "../../lib/Assets/SVG/RoadAssets/Guardrail";
// import Road from "../../lib/Assets/SVG/RoadAssets/Road";
// import Bus from "../../lib/Assets/SVG/RoadAssets/Bus";

// export default function Landing(): React.ReactNode {
//   return (
//     <div className="w-full mobile:h-[50vh] desktop:h-auto relative overflow-hidden">
//       <div className="w-[230%] tablet:w-auto -translate-x-1/3 tablet:-translate-x-0">
//         <LandingBackground />
//       </div>
//       <div className="absolute -mt-[9vh] tablet:-mt-[20vh] w-[200%] tablet:w-full z-1">
//         <Guardrail />
//       </div>
//       <div className="absolute -mt-[2vh] tablet:-mt-[5vh] w-[300%] tablet:w-full">
//         <Road />
//       </div>
//       <div
//         className="absolute -mt-[10vh] tablet:-mt-[18vh] w-[70vw] tablet:w-[40vw] left-1/2 top-[90%] 
//                       transform -translate-x-1/2 -translate-y-1/2 scale-125 tablet:scale-100"
//       >
//         <Bus />
//       </div>
//       <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 scale-110 tablet:scale-100 top-[30%]">
//         <Image
//           alt="LicensePlate"
//           src="/license_plate.png"
//           width={400}
//           height={200}
//           className="w-[30vw] h-auto max-w-[700px] min-w-[300px]"
//         />
//       </div>
//       <div className="absolute top-5 right-10 flex gap-2">
//         <ExternalLink href="https://www.instagram.com/hackbeanpot/?hl=en">
//           <Image
//             alt="InstagramLogo"
//             src="/instagram_logo.png"
//             width={40}
//             height={40}
//           />
//         </ExternalLink>
//         <ExternalLink href="https://www.linkedin.com/company/hackbeanpot-inc/posts/?feedView=all">
//           <Image
//             alt="LinkedinLogo"
//             src="/linkedin_logo.png"
//             width={40}
//             height={40}
//           />
//         </ExternalLink>
//         <ExternalLink href="mailto:team@hackbeanpot.com">
//           <Image alt="EmailLogo" src="/email_logo.png" width={40} height={40} />
//         </ExternalLink>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import Image from "next/image";
import ExternalLink from "../../lib/Components/ExternalLink";
import LandingBackground from "../../lib/Assets/SVG/LandingBackground";
import Guardrail from "../../lib/Assets/SVG/RoadAssets/Guardrail";
import Road from "../../lib/Assets/SVG/RoadAssets/Road";
import Bus from "../../lib/Assets/SVG/RoadAssets/Bus";

export default function Landing(): React.ReactNode {
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <div></div>
  );
}