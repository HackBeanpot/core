import React from "react";
import Button from "./Button.tsx";
import ExternalLink from "main/src/app/lib/Components/ExternalLink.tsx";
import Image from "next/image";

const imageInfo = [
  {
    icon: "/footer-logos/insta-logo.svg",
    alt: "Instagram",
    href: "https://www.instagram.com/hackbeanpot/?hl=en",
  },
  {
    icon: "/footer-logos/linkedin-logo.svg",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/company/hackbeanpot-inc",
  },
  {
    icon: "/footer-logos/tiktok-logo.svg",
    alt: "TikTok",
    href: "https://www.tiktok.com/@hackbeanpot",
  },
];

const SocialIconButton = ({
  icon,
  alt,
  href,
}: {
  icon: string;
  alt: string;
  href: string;
}) => {
  return (
    <Button
      icon={
        <ExternalLink href={href}>
          <Image alt={"HackBeanpot " + alt} src={icon} width={25} height={25} />
        </ExternalLink>
      }
    />
  );
};

const SocialsButtonsRow = () => {
  return (
    <div className="flex flex-row gap-2 w-auto h-auto">
      {imageInfo.map((socialIcon, index) => {
        return (
          <SocialIconButton
            icon={socialIcon.icon}
            alt={socialIcon.alt}
            href={socialIcon.href}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default SocialsButtonsRow;
