"use client";

import React from "react";
import Project from "./components/Project";
import RibbonTitle from "@repo/ui/RibbonTitle";
import ProjectBackground from "./components/background";
import useDevice from "@util/hooks/useDevice";
import PinkFirework from "./components/pinkFirework";
import OrangeFirework from "./components/orangeFirework";
import YellowFirework from "./components/yellowFirework";
const projectData = [
  {
    projectImage: "/projects/memora.png",
    projectName: "Memora",
    award: "Best Social Impact",
    members: "Kaleb Cole, Yaroslav Petrashko, Shrey Agarwal, Aditya",
    description:
      "Memora is a mobile app that acts as a personalized road map through memories, designed for individuals in the early to moderate stages of dementia and their families. Using personal family photos – snapshots from life's journey – Memora stimulates memory recall through engaging quizzes and a user-friendly interface.",
    link: "https://devpost.com/software/memora-bmi4zw",
  },
  {
    projectImage: "/projects/CapyCrew.png",
    projectName: "CapyCrew",
    award: "Most Creative",
    members: "Sophia Tang, Olivia Jonathan, Alyssa Jane Najera",
    description:
      "CapyCrew is an interactive web experience where users can engage with a digital capybara in a variety of fun ways. By using different key inputs, users can unlock surprises and trigger exciting animations, making every interaction a little adventure.",
    link: "https://devpost.com/software/memora-bmi4zw",
  },
  {
    projectImage: "/projects/Fridge.png",
    projectName: "Fridge",
    award: "Best UI/UX",
    members: "Troy Gunawardene, Thanin Kongkiatsophon, Olivia Li, Jolin Huang",
    description:
      "Fridge gamifies the experience of discovering and enjoying local restaurants. When you eat local, you have a chance of unlocking a new item for your fridge in our webapp. Your fridge is like your profile - stock up on cool finds and show off to your friends!",
    link: "https://devpost.com/software/memora-bmi4zw",
  },
  {
    projectImage: "/projects/NUGuessr.png",
    projectName: "NUGuessr",
    award: "Best Beginner",
    members: "Philip Elbert, Joshua Chan, Oscar Ji, Alan Tai",
    description:
      "NUGuessr is an interactive web game where players are tasked with guessing the locations of Northeastern campus landmarks. In each round, players are given a photo of certain locations on campus, whether it be a whole building or a specific statue/point of interest. Players must then search the implemented map and pinpoint the location of which they think the picture was taken at, all within a time limit.",
    link: "https://devpost.com/software/memora-bmi4zw",
  },
  {
    projectImage: "/projects/DevSpace.png",
    projectName: "DevSpace",
    award: "Most Challenging",
    members: "Tilak Patel, Shreyaan Pathak",
    description:
      "DevSpace is a real-time, multi-file collaborative coding platform that integrates: ✅ AI-assisted debugging to catch errors faster ✅ Cloud-accelerated execution for high-performance computing ✅ Jetson-powered Docker runtime for seamless GPU-accelerated workloads",
    link: "https://devpost.com/software/memora-bmi4zw",
  },
  {
    projectImage: "/projects/EarthBeats.png",
    projectName: "EarthBeats",
    award: "Best Overall",
    members: "Harry Duong, Jonathan Tobias Sudarpo, Son Nguyen, Trang Do",
    description:
      "EarthBeats is an AI-powered road trip planner that optimizes routes to minimize carbon emissions. Users input their start and end points, vehicle type, and travel preferences. The app suggests the most carbon-efficient route, considering factors like elevation changes and road smoothness.",
    link: "https://devpost.com/software/memora-bmi4zw",
  },
];

export default function Page() {
  const { isMobile, isTablet, isDesktop } = useDevice();
  return (
    <div className="flex flex-col items-center min-h-screen relative overflow-x-hidden overflow-y-visible">
      <div
        className={`absolute inset-0 -z-10 ${isMobile ? "scale-125" : ""} ${isTablet ? "scale-125" : ""} ${isDesktop ? "scale-125" : ""}`}
      >
        <ProjectBackground className={`${isMobile ? "w-full h-full" : ""}`} />
      </div>

      <div className="relative z-10 max-w-screen flex flex-col items-center pt-14">
        <div
          className="self-stretch text-center justify-center text-firecrackerRedDark 
        font-Sancreek-Regular text-heading leading-[96px] 
        text-shadow [text-stroke:2px_#F2E06F] [-webkit-text-stroke:2px_#F2E06F]"
        >
          2025 PROJECTS
        </div>

        {projectData.map((project, index) => (
          <div key={index} className="pt-10">
            <RibbonTitle text={project.award.toUpperCase()} />
            <Project
              projectImage={project.projectImage}
              projectName={project.projectName}
              url={project.link}
              members={project.members}
              description={project.description}
            />
          </div>
        ))}

        <div
          className={`
        ${isMobile ? "scale-[0.3] top-[98.5%] -left-[125px]" : ""}
        ${isTablet ? "scale-[0.7] top-[101%] -left-[150px]" : ""}
        ${isDesktop ? "top-[100%] -left-[200px]" : ""}
        absolute`}
        >
          <PinkFirework />
        </div>
        <div
          className={`
      ${isMobile ? "scale-[0.3] top-[98.5%] -left-[120px]" : ""}
      ${isTablet ? "scale-[0.7] top-[103%] -left-[60px]" : ""}
      ${isDesktop ? "top-[104%] -left-[85px]" : ""}
      absolute`}
        >
          <YellowFirework />
        </div>
        <div
          className={`
    ${isMobile ? "scale-[0.3] top-[96%] -left-[30px]" : ""}
    ${isTablet ? "scale-[0.65] top-[100%] left-[200px]" : ""}
    ${isDesktop ? "top-[101%] left-[485px]" : ""}
    absolute
  `}
        >
          <OrangeFirework />
        </div>

        <div
          className={`absolute flex flex-col items-center ${isMobile ? "top-[106.5%]" : ""} ${isTablet ? "top-[112%]" : ""} ${isDesktop ? "top-[115%]" : ""}`}
        >
          <div className="self-stretch text-center justify-center text-carouselCreamLight text-3xl font-['NeulisNeue-Regular'] leading-10 mb-5">
            Interested in seeing more past hacker projects?
          </div>
          <div className="self-stretch text-center justify-center text-carouselCreamLight text-md font-normal font-['NeulisNeue-Regular'] leading-tight mb-5">
            Check out the HackBeanpot Archive!
          </div>
          <div className="px-5 py-2.5 bg-starlightBlue rounded-[30px] shadow-[inset_3.2307441234588623px_4.307659149169922px_0px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center gap-2.5">
            <div className="text-center justify-center text-white text-xl font-bold font-['DM_Sans']">
              View Archive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
