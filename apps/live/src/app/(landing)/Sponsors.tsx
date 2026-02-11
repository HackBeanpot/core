"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import useDevice from "@util/hooks/useDevice";
import RibbonTitle from "@repo/ui/RibbonTitle";
import { SponsorTicketComp } from "../../../../main/src/app/lib/Components/index.ts";

import AWSLogo from "@repo/ui/Logos/AWSLogo.svg";
import MavenAGILogo from "@repo/ui/Logos/MavenAGILogo.svg";
import KlaviyoLogo from "@repo/ui/Logos/KlaviyoLogo.svg";
import RGLogo from "@repo/ui/Logos/RGLogo.svg";
import WhoopLogo from "@repo/ui/Logos/WhoopLogo.svg";
import CodeCraftersLogo from "@repo/ui/Logos/CodeCraftersLogo.svg";
import appWizzyLogo from "@repo/ui/Logos/Appwizzy_logo.svg";
import PureButton from "@repo/ui/Logos/PureButton.svg";

import EventScheduleSquiggle from "../lib/Assets/SVG/EventSchedule/EventScheduleSquiggle.tsx";

const LOGOS = {
  aws: AWSLogo,
  mavenAgi: MavenAGILogo,
  klaviyo: KlaviyoLogo,
  whoop: WhoopLogo,
  rg: RGLogo,
  codecrafters: CodeCraftersLogo,
  flagLogic: appWizzyLogo,
  pureButtons: PureButton,
} as const;

type SponsorItem = {
  logoPath: string;
  logoWidth: number;
  href?: string;
};

function SponsorRow({
  ticketSizes,
  items,
}: {
  ticketSizes: number[];
  items: SponsorItem[];
}) {
  return (
    <div
      className="flex justify-center"
      style={{ gap: ticketSizes.length > 1 ? "2vw" : "4vw" }}
    >
      {ticketSizes.map((width, i) => {
        const item = items[i];
        if (!item) return null;

        const ticket = (
          <SponsorTicketComp
            isSponsorUs={false}
            logoPath={item.logoPath}
            ticketWidthVW={width}
            logoWidth={item.logoWidth}
          />
        );

        return item.href ? (
          <Link
            key={i}
            href={item.href}
            target="_blank"
            className="relative z-10"
          >
            {ticket}
          </Link>
        ) : (
          <div key={i} className="relative z-10">
            {ticket}
          </div>
        );
      })}
    </div>
  );
}

export default function Sponsors(): JSX.Element {
  const { isDesktop, isTablet, isMobile } = useDevice();

  const innerStyles = clsx(
    "font-NeulisNeue-Regular flex flex-col items-center justify-center gap-12",
    isDesktop && "py-16 desktop:px-44 desktop-xl:px-80",
    isTablet && "px-28",
  );

  const ribbonStyles = clsx(
    isDesktop && "scale-100",
    isTablet && "scale-75",
    isMobile && "scale-[60%]",
  );

  const desktopRows = [
    {
      ticketSizes: [22, 22],
      items: [
        { logoPath: LOGOS.aws, logoWidth: 170 },
        { logoPath: LOGOS.mavenAgi, logoWidth: 170 },
      ],
    },
    {
      ticketSizes: [18],
      items: [{ logoPath: LOGOS.klaviyo, logoWidth: 130 }],
    },
    {
      ticketSizes: [16, 16],
      items: [
        { logoPath: LOGOS.whoop, logoWidth: 140 },
        { logoPath: LOGOS.rg, logoWidth: 90 },
      ],
    },
    {
      ticketSizes: [14, 14, 14],
      items: [
        { logoPath: LOGOS.codecrafters, logoWidth: 140 },
        { logoPath: LOGOS.flagLogic, logoWidth: 140 },
        {
          logoPath: LOGOS.pureButtons,
          logoWidth: 140,
          href: "https://mlh.link/MLH-PureButtons-hackathons",
        },
      ],
    },
  ];

  const tabletRows = desktopRows.map((row) => ({
    ticketSizes: row.ticketSizes.map((s) => s * 1.1),
    items: row.items.map((i) => ({
      ...i,
      logoWidth: Math.round(i.logoWidth * 0.85),
    })),
  }));

  const mobileRows = desktopRows.map((row) => ({
    ticketSizes: row.ticketSizes.map((s) => s * 1.6),
    items: row.items.map((i) => ({
      ...i,
      logoWidth: Math.round(i.logoWidth * 0.6),
    })),
  }));

  const rows = isMobile ? mobileRows : isTablet ? tabletRows : desktopRows;

  return (
    <div className="relative bg-mossGreen w-full py-20" id="sponsors">
      <EventScheduleSquiggle className={`absolute top-0 w-full -mt-[15vh]`} />
      <div className={innerStyles}>
        {/* Ribbon */}
        <div className={ribbonStyles}>
          <RibbonTitle text="SPONSORS" />
        </div>

        {/* Tickets */}
        <div className="flex flex-col items-center gap-8 w-full">
          {rows.map((row, idx) => (
            <SponsorRow
              key={idx}
              ticketSizes={row.ticketSizes}
              items={row.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
