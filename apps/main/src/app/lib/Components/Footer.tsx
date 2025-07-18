"use client";

import ExternalLink from "./ExternalLink";
import LocalLink from "./LocalLink";
import React, { ChangeEvent, useState } from "react";
import isValidEmail from "@util/functions/isValidEmail";

const Footer = () => {
  const [mailingEmail, setMailingEmail] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMailingEmail(e.target.value);
  };

  const FooterContent = (
    <div className="mb-16 bg-light-yellow w-full h-full">
      <div className="grid w-full h-full grid-cols-[1fr_1fr_1.1fr] px-[25vw] text-xl text-black font-GT-Walsheim-Regular">
        <div className="w-full flex flex-col pt-[7vh] gap-4">
          <div>SOCIALS</div>
          <ExternalLink href="https://www.instagram.com/hackbeanpot/?hl=en">
            Instagram
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/company/hackbeanpot-inc">
            LinkedIn
          </ExternalLink>
        </div>
        <div className="w-full flex flex-col pt-[7vh] gap-4">
          <div>ABOUT</div>
          <LocalLink href={"#about"}>About Hackbeanpot</LocalLink>
          <LocalLink href={"#projects"}>Projects</LocalLink>
          <LocalLink href={"#sponsors"}>Sponsors</LocalLink>
          <LocalLink href={"#team"}>Team</LocalLink>
        </div>
        <div className="flex flex-col w-full pt-[7vh] gap-4 items-start">
          <div className="text-3xl">Stay up-to-date with HBP!</div>
          <div className="text-base">
            Join our mailing list to receive updates about HBP events, news, and
            more!
          </div>
          <input
            type="email"
            placeholder="Enter your email address"
            value={mailingEmail}
            onChange={handleInputChange}
            className="w-full py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-400 focus:placeholder-transparent"
          />

          <button
            onClick={async () => {
              if (!mailingEmail || !isValidEmail(mailingEmail)) {
                alert("Please enter a valid email address");
                return;
              }
              const res = await fetch("/api/joinMailingList", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: mailingEmail,
                  reactivate_existing: false,
                  send_welcome_email: true,
                }),
              });
              if (res.ok) {
                setMailingEmail("");
              }
            }}
            className="p-3 px-8 bg-black text-text-light rounded-full"
          >
            Join mailing list
          </button>
        </div>
      </div>
    </div>
  );

  return FooterContent;
};

export default Footer;
