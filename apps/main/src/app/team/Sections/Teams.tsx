"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import LinkedInLogo from "@repo/ui/LinkedInLogo";
import useWindowSize from "@repo/util/hooks/useWindowSize";
import OurTeamDropdown from "../OurTeamDropdown";

type HeadshotProps = {
  name: string;
  src: string;
};

type TeamSectionsProps = {
  team: keyof typeof teams;
};

const TeamSections = ({ team }: TeamSectionsProps) => {
  return (
    <div className="mb-12 tablet:px-20">
      <h2 className="text-2xl tablet:text-4xl text-black font-semibold font-GT-Walsheim-Regular mb-6 tablet:mb-4">
        {team}
      </h2>
      <div className="grid grid-cols-2 tablet:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 tablet:gap-8 justify-items-center">
        {teams[team].map((member) => (
          <Headshot key={member.name} name={member.name} src={member.src} />
        ))}
      </div>
    </div>
  );
};

const Headshot = ({ name, src }: HeadshotProps) => {
  return (
    <div className="flex flex-col w-full max-w-[140px] tablet:max-w-[250px]">
      <Image
        alt={name}
        src={src}
        width={400}
        height={400}
        className="rounded w-full h-auto aspect-square object-cover"
      />
      <div className="flex items-center font-semibold mt-3 text-sm tablet:text-lg">
        <LinkedInLogo />
        <span className="ml-2">{name}</span>
      </div>
    </div>
  );
};

const teams = {
  Directors: [
    { name: "Mike Mundia", src: "/headshots/directors/mike.png" },
    { name: "Lisa Jiang", src: "/headshots/directors/lisa.png" },
  ],
  Tech: [
    { name: "John Sargent", src: "/headshots/tech/john.png" },
    { name: "Nelson Dong", src: "/headshots/tech/nelson.png" },
    { name: "Mandy Rodriques", src: "/headshots/tech/mandy.png" },
    { name: "Aaryan Jain", src: "/headshots/tech/aaryan.png" },
    { name: "Lucas Dunker", src: "/headshots/tech/lucas.png" },
    { name: "Crystal Zhang", src: "/headshots/tech/crystal.png" },
    { name: "Aretha Chen", src: "/headshots/tech/aretha.png" },
    { name: "Alina Gonzalez", src: "/headshots/tech/alina.png" },
    { name: "Alexander Chen", src: "/headshots/tech/alexander.png" },
    { name: "Yumiko Chow", src: "/headshots/tech/yumiko.png" },
  ],
  Design: [
    { name: "Audrey Wong", src: "/headshots/design/audrey.png" },
    { name: "Zahra Wibisana", src: "/headshots/design/zahra.png" },
    { name: "Trisha Garg", src: "/headshots/design/trisha.png" },
    { name: "Isabella Borda", src: "/headshots/design/isabella.png" },
    { name: "Annabelle Chung", src: "/headshots/design/annabelle.png" },
  ],
  Social: [
    { name: "Emma Vonuelow", src: "/headshots/social/emma.png" },
    { name: "Nidhi Bendre", src: "/headshots/social/nidhi.png" },
    { name: "Megan Lai", src: "/headshots/social/megan.png" },
    { name: "Nicole Ni", src: "/headshots/social/nicole.png" },
  ],
  Sponsorship: [
    { name: "Luke Steimel", src: "/headshots/sponsorship/luke.png" },
    { name: "Nidhi Pillai", src: "/headshots/sponsorship/nidhi.png" },
    { name: "Sammi Chen", src: "/headshots/sponsorship/sammi.png" },
    { name: "Harini Avula", src: "/headshots/sponsorship/harini.png" },
    { name: "Swar Kewalia", src: "/headshots/sponsorship/swar.png" },
    { name: "Tiffany Zheng", src: "/headshots/sponsorship/tiffany.png" },
  ],
  Operations: [
    { name: "Katherine Zeng", src: "/headshots/operations/katherine.png" },
    { name: "Alexandra Hu", src: "/headshots/operations/alexandra.png" },
    { name: "Amy Wang", src: "/headshots/operations/amy.png" },
    { name: "Zoe Gao", src: "/headshots/operations/zoe.png" },
    { name: "Rachel Pao", src: "/headshots/operations/rachel.png" },
    { name: "Tonatiuh Godinez", src: "/headshots/operations/tonatiuh.png" },
    { name: "Jalen Wu", src: "/headshots/operations/jalen.png" },
  ],
};

const Teams = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [selectedTeam, setSelectedTeam] =
    useState<keyof typeof teams>("Directors");

  if (!windowHeight || !windowWidth) return null;

  const handleTeamSelect = (team: keyof typeof teams) => {
    setSelectedTeam(team);
  };

  const getTeamsToDisplay = () => {
    return [[selectedTeam, teams[selectedTeam]]] as [
      keyof typeof teams,
      (typeof teams)[keyof typeof teams],
    ][];
  };

  const getAllTeams = () => {
    return Object.entries(teams) as [
      keyof typeof teams,
      (typeof teams)[keyof typeof teams],
    ][];
  };

  const TeamsContent = () => {
    return (
      <div ref={ref} className="p-4 sm:p-[6vw] lg:p-[8vw]">
        <div className="text-center mb-6 sm:mb-8 tablet:-mt-[10vh] -mt-[75vh] tablet:hidden">
          <OurTeamDropdown
            onTeamSelect={handleTeamSelect}
            selectedTeam={selectedTeam}
          />
        </div>

        <div className="tablet:hidden">
          {getTeamsToDisplay().map(([teamName]) => (
            <TeamSections key={teamName} team={teamName} />
          ))}
        </div>

        <div className="hidden tablet:block">
          {getAllTeams().map(([teamName]) => (
            <TeamSections key={teamName} team={teamName} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0"></div>

      <div className="relative z-10">
        <TeamsContent />
      </div>
    </div>
  );
};

export default Teams;
