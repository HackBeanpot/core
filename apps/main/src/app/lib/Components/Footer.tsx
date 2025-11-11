"use client";

import React, { ChangeEvent, useState } from "react";
import Button from "@repo/ui/Button";
import isValidEmail from "@util/functions/isValidEmail.ts";
import { FaArrowUp } from "react-icons/fa";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice.ts";
import SocialsButtonsRow from "../../../../../../packages/ui/src/SocialsButtonsRow.tsx";

const InputField = ({
  placeholder,
  value,
  onChange,
  onKeyDown,
}: {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) => {
  return (
    <input
      type="email"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="px-4 py-2 rounded-full bg-cream w-full"
    />
  );
};

const Footer = () => {
  const [mailingEmail, setMailingEmail] = useState<string>("");
  const { isMobile, isTablet } = useDevice();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMailingEmail(e.target.value);
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!mailingEmail || !isValidEmail(mailingEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    const res = await fetch("/api/joinMailingList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: mailingEmail,
        reactivate_existing: false,
        send_welcome_email: true,
      }),
    });
    if (res.ok) {
      setMailingEmail("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const outerDivStyles = clsx(
    "flex flex-row bg-starlightBlue w-full justify-between py-16 px-12 gap-x-10",
    isTablet && "flex-col gap-y-16",
    isMobile && "px-5",
  );

  const mailListSectionStyles = clsx(
    "flex flex-col gap-2 max-w-[540px] justify-between",
    isTablet && "gap-y-8",
    isMobile && "w-full",
  );

  const mailListInputStyles = clsx(
    "flex flex-row gap-3 w-full justify-between",
    isMobile && "flex-col",
  );

  const FooterContent = (
    <div className={outerDivStyles}>
      <div className="flex flex-col items-start gap-5">
        <Button
          text="Back to top"
          color="cottonCandyCoral"
          textColor="white"
          onClick={handleBackToTop}
          icon={<FaArrowUp />}
        />
        <SocialsButtonsRow></SocialsButtonsRow>
      </div>
      <div className={mailListSectionStyles}>
        <p className="font-medium text-white text-xl">
          Stay up to date with HackBeanpot by signing up for our mailing list!
        </p>
        <div className={mailListInputStyles}>
          <InputField
            placeholder={"example@email.com"}
            value={mailingEmail}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
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
