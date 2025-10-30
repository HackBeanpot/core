"use client";

import React from "react";
import Project from "./components/Project";
import ProjectBackground from "./components/background";
import useDevice from "@util/hooks/useDevice";
import PinkFirework from "./components/pinkFirework";
import OrangeFirework from "./components/orangeFirework";
import YellowFirework from "./components/yellowFirework";
import Button from "@repo/ui/Button";
import { Footer, NavBar } from "../lib/Components";
import ProjectName from "./components/ProjectName";

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
    <div className="flex flex-col items-center min-h-screen relative overflow-x-hidden overflow-y-hidden">
      <NavBar />

      {/* Background */}
      <div
        className={`absolute inset-0 -z-10 ${
          isMobile || isTablet || isDesktop ? "scale-125" : ""
        }`}
      >
        <ProjectBackground className={`${isMobile ? "w-full h-full" : ""}`} />
      </div>

      {/* Projects Section */}
      <div className="relative z-10 max-w-screen-lg w-full flex flex-col items-center pt-14">
        <div
          className="self-stretch text-center justify-center text-firecrackerRedDark 
          font-Sancreek-Regular text-heading leading-[96px] 
          text-shadow [text-stroke:2px_#F2E06F] [-webkit-text-stroke:2px_#F2E06F]"
        >
          2025 PROJECTS
        </div>

        {projectData.map((project, index) => (
          <div
            key={index}
            className={`${isMobile ? "pt-2 mb-2" : "pt-10"} w-full flex flex-col items-center`}
          >
            <div
              className={`${isMobile ? "scale-[0.85]" : ""} w-full flex justify-center`}
            >
              <ProjectName projectName={project.award.toUpperCase()} />
            </div>
            <div className={`${isMobile ? "mb-2" : ""} w-full scale-[0.85]`}>
              <Project
                projectImage={project.projectImage}
                projectName={project.projectName}
                url={project.link}
                members={project.members}
                description={project.description}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Fireworks + Archive Section */}
      <div className="relative flex flex-col items-center w-full mt-[39rem] mb-20 overflow-visible">
        {/* Fireworks Layer */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="absolute left-[10%] -top-[395%] scale-100">
            <PinkFirework />
          </div>
          <div className="absolute right-[60%] -top-[315%] scale-90">
            <YellowFirework />
          </div>
          <div className="absolute right-[15%] -top-[440%] scale-100">
            <OrangeFirework />
          </div>
        </div>

        {/* Archive CTA */}
        <div className="flex flex-col items-center text-center z-10 px-4">
          <div className="text-carouselCreamLight text-3xl font-['NeulisNeue-Regular'] leading-10 mb-5">
            Interested in seeing more past hacker projects?
          </div>
          <div className="text-carouselCreamLight text-md font-['NeulisNeue-Regular'] leading-tight mb-5">
            Check out the HackBeanpot Archive!
          </div>

          <Button
            text="View Archive"
            textColor="white"
            color="starlightBlue"
            size="medium"
            onClick={() =>
              window.open("https://archive.hackbeanpot.com/", "_blank")
            }
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
