"use client";

// import ExternalLink from "./ExternalLink";
// import LocalLink from "./LocalLink";
// import React, { ChangeEvent, useState } from "react";
import React, { ChangeEvent, useState } from "react";
import Button from "@repo/ui/Button";
// import isValidEmail from "@util/functions/isValidEmail";
// import HomeIcon from "@repo/ui/Icons/HomeIcon";
// import Image from "next/image";

const SocialIconButton = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="w-16 h-16 rounded-full bg-mossGreen shadow-[inset_2px_3px_0_rgba(0,0,0,0.10)] items-center justify-center">
      {icon}
    </div>
  );
};

const TextField = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="email"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-4 py-2 rounded-full bg-cream w-full"
    />
  );
};

const Footer = () => {
  const [mailingEmail, setMailingEmail] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMailingEmail(e.target.value);
  };

  // To do
  const handleBackToTop = () => {};

  // To do
  const handleSubmit = () => {};

  const FooterContent = (
    <div className="flex flex-row tablet:flex-col tablet:gap-y-16 bg-starlightBlue w-full justify-between py-16 px-12 mobile-xl:px-5 gap-x-10">
      <div className="flex flex-col items-start gap-5">
        <Button
          text="Back to top"
          color="cottonCandyCoral"
          textColor="white"
          onClick={handleBackToTop}
          // icon={<FaArrowUp />}
        />

        <div className="flex flex-row gap-2">
          {/* To do: add icons */}
          <SocialIconButton icon={<></>} />
          <SocialIconButton icon={<></>} />
          <SocialIconButton icon={<></>} />
        </div>
      </div>
      <div className="flex flex-col gap-2 tablet:gap-y-8 max-w-[540px] mobile-xl:w-full justify-between">
        <p className="font-medium text-white text-xl">
          Stay up to date with HackBeanpot by signing up for our mailing list!
        </p>
        <div className="flex flex-row mobile-xl:flex-col gap-3 w-full justify-between">
          <TextField
            placeholder={"example@email.com"}
            value={mailingEmail}
            onChange={handleInputChange}
          />
          <div className="w-fit">
            <Button
              text="Submit"
              color="marigoldYellow"
              textColor="charcoalFog"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return FooterContent;
};

export default Footer;
