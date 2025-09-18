"use client";

import React from "react";
import Project from "./components/Project";
import RibbonTitle from "@repo/ui/RibbonTitle";
import ProjectBackground from "./components/background";
import useDevice from "@util/hooks/useDevice";
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
  const { isMobile, } = useDevice();
  return (
    <main className="flex flex-col items-center min-h-screen relative overflow-auto">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <ProjectBackground
          className={`
          ${isMobile ? " w-full h-full" : ""}`}
        />
      </div>

      <div className="relative z-10 max-w-screen flex flex-col items-center pt-24">
        <div className="self-stretch text-center justify-center text-firecrackerRedDark font-Sancreek-Regular text-heading leading-[96px] text-shadow [text-stroke:2px_#F2E06F] [-webkit-text-stroke:2px_#F2E06F]">
          2025 PROJECTS
        </div>

        {projectData.map((project, index) => (
          <div key={index} className="pt-14">
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

        <div className="absolute top-[115%]">
          <div className="self-stretch text-center justify-center text-carouselCreamLight text-3xl font-['NeulisNeue-Regular'] leading-10 mb-10">
            Interested in seeing more past hacker projects?
          </div>
        </div>
      </div>
    </main>
  );
}
