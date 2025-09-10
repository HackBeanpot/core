"use client";

// import ExternalLink from "./ExternalLink";
// import LocalLink from "./LocalLink";
// import React, { ChangeEvent, useState } from "react";
import React from "react";
import Button from "@repo/ui/Button";
// import isValidEmail from "@util/functions/isValidEmail";
// import HomeIcon from "@repo/ui/Icons/HomeIcon";
// import Image from "next/image";

const Footer = () => {
  // const [mailingEmail, setMailingEmail] = useState<string>("");

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setMailingEmail(e.target.value);
  // };

  const FooterContent = (
    <div className="flex flex-row bg-starlightBlue w-full py-[70px] px-[50px]">
      <div className="flex flex-col items-start gap-5">
        <Button
          text="Back to top"
          color="cottonCandyCoral"
          textColor="white"
          // icon={<FaArrowUp />}
        />
        
        <div className="flex flex-row gap-2">
          <div className="w-16 h-16 rounded-full bg-mossGreen"></div>
        </div>
      </div>
    </div>
  );
  
  return FooterContent;
};

export default Footer;
