"use client";

import React, { ChangeEvent, useState } from "react";
import Button from "@repo/ui/Button";
import isValidEmail from "@repo/util/functions/isValidEmail";
import { FaArrowUp } from "react-icons/fa";
import clsx from "clsx";
import useDevice from "@repo/util/hooks/useDevice";
import SocialsButtonsRow from "@repo/ui/SocialsButtonsRow";

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
    "font-DMSans-Regular mt-2 flex flex-row gap-3 w-full justify-between",
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
          size="medium"
          icon={<FaArrowUp />}
        />
        <SocialsButtonsRow></SocialsButtonsRow>
      </div>
      <div className={mailListSectionStyles}>
        <h3 className="font-NeulisNeue-Bold font-medium text-white text-2xl">
          Join our mailing list
        </h3>
        <p className="font-DMSans-Regular font-medium text-white text-xl">
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
              size="medium"
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
