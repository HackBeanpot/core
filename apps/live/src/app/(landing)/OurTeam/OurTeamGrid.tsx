"use client";

import React, { useState } from "react";
import Image from "next/image";

const TeamTable = () => {
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
  };
  type teamKey = keyof typeof teams;
  const [currTeam, setCurrTeam] = useState<teamKey>("Tech");

  const changeTeam = (team: teamKey) => {
    setCurrTeam(team);
  };

  return (
    <div className="py-4">
      <div className="flex flex-row gap-4">
        {Object.entries(teams).map(([teamName, team]) => (
          <button
            key={team.toString()}
            onClick={() => changeTeam(teamName as keyof typeof teams)}
            className={`py-4 px-2 transition-transform duration-300 transform scale-100 hover:scale-[102%] ${
              currTeam === teamName ? "font-bold" : "font-normal"
            }`}
          >
            {teamName.toString()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-2 md:grid-cols-2 md:grid-rows-5">
        {teams[currTeam].map((member, index) => (
          <a
            key={index}
            href={member.url}
            className="transition-transform scale-100 hover:scale-105"
          >
            <div className="items-center p-2 rounded-lg ">
              <div className="w-full pb-[100%] relative overflow-hidden rounded-lg">
                <Image
                  src={member.src}
                  alt={member.src}
                  fill
                  className="absolute w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-[20%_80%] items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 30 30"
                  className="h-8 pr-[5rem]"
                >
                  <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                </svg>
                <p className="text-sm font-medium truncate w-full place-self-start mt-1 ">
                  {member.name}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamTable;
