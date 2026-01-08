"use client";

import React from "react";
import Icon from "@repo/ui/Icons/MemberIcon";
import RibbonTitle from "@repo/ui/RibbonTitle";
import useDevice from "@util/hooks/useDevice";
import clsx from "clsx";

const teams = {
  Directors: [
    {
      name: "Emma Vonbuelow",
      src: "/headshots/directors/Emma.jpg",
      url: "https://www.linkedin.com/in/emma-von/",
    },
    {
      name: "Rachel Pao",
      src: "/headshots/directors/Rachel.png",
      url: "https://www.linkedin.com/in/rachelpaocyber/",
    },
  ],
  Tech: [
    {
      name: "Alina Gonzalez",
      src: "/headshots/tech/Alina.png",
      url: "www.linkedin.com/in/agonzalez26",
    },
    {
      name: "Alexander Chen",
      src: "/headshots/tech/Alex.png",
      url: "https://www.linkedin.com/in/alexchen04/",
    },
    {
      name: "Yumiko Chow",
      src: "/headshots/tech/Yumi.png",
      url: "https://www.linkedin.com/in/yumiko-chow/",
    },
    {
      name: "Alexandra Hu",
      src: "/headshots/tech/Ally.png",
      url: "https://www.linkedin.com/in/alexandra-hu",
    },
    {
      name: "Khushi Khan",
      src: "/headshots/tech/Khushi.png",
      url: "https://www.linkedin.com/in/khushi-khan",
    },
    {
      name: "Aditya Pathak",
      src: "/headshots/tech/Aditya.png",
      url: "https://www.linkedin.com/in/aditya-pathak-499962279/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "Sophia Yang",
      src: "/headshots/tech/Sophia.png",
      url: "https://www.linkedin.com/in/sophia-yang-nu/",
    },
    {
      name: "Angie Che",
      src: "/headshots/tech/Angie.png",
      url: "https://www.linkedin.com/in/angie-che-b2398529a/",
    },
    {
      name: "Veronica Song",
      src: "/headshots/tech/Veronica.png",
      url: "https://www.linkedin.com/in/veronica-song/",
    },
    {
      name: "Roslyn Maloney",
      src: "/headshots/tech/Roslyn.png",
      url: "https://www.linkedin.com/in/roslyn-maloney-nustudent/",
    },
  ],
  Design: [
    {
      name: "Zahra Wibisana",
      src: "/headshots/design/Zahra.png",
      url: "https://www.linkedin.com/in/zahra-wibisana-0b0bb2222/",
    },
    {
      name: "Isabella Borda",
      src: "/headshots/design/Isabella.png",
      url: "https://www.linkedin.com/in/isabella-borda-03537b306/",
    },
    {
      name: "Annabelle Chung",
      src: "/headshots/design/Annabelle.png",
      url: "https://www.linkedin.com/in/annabelle-chung-/",
    },
    {
      name: "Cole Abrams",
      src: "/headshots/design/Cole.png",
      url: "https://www.linkedin.com/in/coleabrams/",
    },
    {
      name: "Lucy Liu",
      src: "/headshots/design/Lucy.png",
      url: "https://www.linkedin.com/in/xinninglucyliu/",
    },
    {
      name: "Yurika Kan",
      src: "/headshots/design/Yurika.png",
      url: "https://www.linkedin.com/in/yurika-kan/",
    },
  ],
  "Socials&Outreach": [
    {
      name: "Megan Lai",
      src: "/headshots/socials/Megan.png",
      url: "https://www.linkedin.com/in/meganplai/",
    },
    {
      name: "Nidhi Bendre",
      src: "/headshots/socials/Nidhi.png",
      url: "https://www.linkedin.com/in/nidhi-bendre-928423218/",
    },
    {
      name: "Dalton Burkhart",
      src: "/headshots/socials/Dalton.png",
      url: "http://www.linkedin.com/in/dalton-burkhart",
    },
    {
      name: "Katya Luch",
      src: "/headshots/socials/Katya.png",
      url: "https://www.linkedin.com/in/katya-luch/",
    },
    {
      name: "Rai Makaraju",
      src: "/headshots/socials/Rai.png",
      url: "https://www.linkedin.com/in/ria-makaraju-57b64b343/",
    },
    {
      name: "Sukira Harris",
      src: "/headshots/socials/Sukira.png",
      url: "http://www.linkedin.com/in/sukira-harris-9aba9b2a1",
    },
    {
      name: "Susan Chen",
      src: "/headshots/socials/Susan.png",
      url: "http://www.linkedin.com/in/susan-42-chen",
    },
  ],
  Sponsorship: [
    {
      name: "Jesse James",
      src: "/headshots/sponsorship/Jesse.png",
      url: "https://www.linkedin.com/in/jessejamescs/",
    },
    {
      name: "Sammi Chen",
      src: "/headshots/sponsorship/Sammi.png",
      url: "https://www.linkedin.com/in/chensammi/",
    },
    {
      name: "Aaryan Jain",
      src: "/headshots/sponsorship/Aaryan.png",
      url: "https://www.linkedin.com/aaryanja",
    },
    {
      name: "Johny Sargent",
      src: "/headshots/sponsorship/Johny.png",
      url: "https://www.linkedin.com/in/john--sargent/",
    },
    {
      name: "Jolin Yang",
      src: "/headshots/sponsorship/Jolin.png",
      url: "https://www.linkedin.com/in/jolin-yang-ba8241246/",
    },
    {
      name: "Livia Cutra",
      src: "/headshots/sponsorship/Livia.png",
      url: "http://www.linkedin.com/in/liviacutra",
    },
  ],
  Operations: [
    {
      name: "Amy Wang",
      src: "/headshots/operations/Amy.png",
      url: "https://www.linkedin.com/in/amy-wang-17b526248/",
    },
    {
      name: "Zoe Gao",
      src: "/headshots/operations/Zoe.png",
      url: "https://www.linkedin.com/in/zoe-gao-khoury",
    },
    {
      name: "Nicole Ni",
      src: "/headshots/operations/Nicole.png",
      url: "https://www.linkedin.com/in/nicoleni22",
    },
    {
      name: "Fanta Kébé",
      src: "/headshots/operations/Fanta.png",
      url: "https://www.linkedin.com/in/fantaa-kebe?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BSKzRhbsvTIaBt8MSstJu3w%3D%3D",
    },
    {
      name: "Nodoka Shibasaki",
      src: "/headshots/operations/Nodoka.png",
      url: "https://www.linkedin.com/in/nodoka2027/",
    },
  ],
} as const;

type TeamsType = typeof teams;
type TeamName = keyof TeamsType;
type TeamSectionsProps = {
  team: TeamName;
};

const TeamSections = ({ team }: TeamSectionsProps) => {
  const members = teams[team];
  const { isMobile, isTablet, isDesktop } = useDevice();
  const ribbonStyles = clsx(
    "",
    isMobile && "transform scale-[0.55]",
    isTablet && "scale-75",
    isDesktop && "scale-50",
  );
  return (
    <div className="w-full">
      <div className={ribbonStyles}>
        <RibbonTitle text={team.toUpperCase()} />
      </div>
      <div className="mb-8 mobile:mt-2 mobile-xl:mt-2 mobile:mb-4 mobile-xl:mb-4 w-1/2 mx-auto gap-6 flex flex-wrap justify-center items-center">
        {members.map((member) => (
          <Icon key={member.name} {...member} isLive={false} isActive={false} />
        ))}
      </div>
    </div>
  );
};

const Teams = () => {
  return (
    <div className="mb-12">
      {Object.entries(teams).map(([teamName]) => (
        <TeamSections key={teamName} team={teamName as TeamName} />
      ))}
    </div>
  );
};

export default Teams;
