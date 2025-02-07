import React, { forwardRef } from "react";
import Project from "./components/Project";

const ProjectsContent = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="mt-[5%] mr-[5%] ml-[5%]" ref={ref}>
      <div className="">
        <h1 className="font-bold text-7xl mb-[5rem] mt-[7rem] text-center text-[#FFFFFF] font-Wilden-Regular drop-shadow-[0_8px_0px_rgba(0,0,0,.1)]">
          LAST YEAR&apos;S PROJECTS
        </h1>
      </div>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 mb-[5rem] max-w-[1200px] mx-auto">
        <a
          href="https://devpost.com/software/poqua"
          className="flex justify-center items-center"
        >
          <Project
            projectImage="/poqua.png"
            projectName="POQUA"
            award="Best Overall Tech"
            members="Jalen Wu, Caleb Lee, Kyle Sung, Elaine Min, Dewi Kalis"
            description="Poqua is an aquarium tank monitor software app that gives users a platform to simulate their aquarium when away from home."
          />
        </a>
        <a href="https://devpost.com/software/discountbytes">
          <Project
            projectImage="/discountbytes.png"
            projectName="DISCOUNT BYTES"
            award="Most Creative"
            members="Shashwath Sunkum, B D S Aritra, Samuel Steinmetz, Sahil Shah"
            description="A web application designed specifically for restaurants, allowing them to dynamically adjust their menu pricing based on real-time customer traffic."
          />
        </a>
        <a href="https://devpost.com/software/last-minute-1midqp">
          <Project
            projectImage="/lastminute.png"
            projectName="LAST MINUTE"
            award="Social Impact/Sustainability"
            members="Yujin Park, Justin Kim, Emily Ye, Oscar Fang"
            description="Last Minute allows users to upload pictures of their leftover food, which can then be picked up by anyone in the area who needs a meal at the very last minute."
          />
        </a>
        <a href="https://devpost.com/software/closet-companion">
          <Project
            projectImage="/closet.png"
            projectName="CLOSET COMPANION"
            award="Best Beginner"
            members="Krystal Qiao"
            description="Effortlessly curate outfits from your wardrobe, tailored to your unique taste. Say goodbye to fashion dilemmas and hello to  digital fashion solutions."
          />
        </a>
        <a href="https://devpost.com/software/maritime">
          <Project
            projectImage="/maritime.png"
            projectName="MARITIME"
            award="Most Technically Challenging"
            members="Kaylee Wu, Mouad Tiahi, Kenneth Chap, Borui Chen"
            description="Maritime is an iOS, Android, and web application that promotes recycling and mitigating waste, specifically in the world's oceans."
          />
        </a>
        <a href="https://devpost.com/software/futura-5rx8so">
          <Project
            projectImage="/futura.png"
            projectName="FUTURA"
            award="Best UI/UX"
            members="Zahra Wibisana, Ange Najam, Sania Hasan, Saidah Ly, Tina Ni"
            description="Futura is dedicated to transforming urban planning by highlighting the gender-data gap and aims to promote gender equality in urban planning."
          />
        </a>
        <a href="https://devpost.com/software/let-s-link">
          <Project
            projectImage="/letslink.png"
            projectName="LET'S LINK"
            award="(MLH) Best Use of MongoDB Atlas"
            members="Russell Leung, Aahil Nishad, Michael Mehall, Donny Le, Andrew Zhu"
            description="Finding times to meet can be hard. With Let's Link, you can connect your Google Calendar and we'll provide the most optimal times."
          />
        </a>
        <a href="https://devpost.com/software/the-perfect-pantry">
          <Project
            projectImage="/perfectpantry.png"
            projectName="PERFECT PANTRY"
            award="(MLH) Best Domain Name from GoDaddy Registry"
            members="Ayomide Addey, Arushi Aggarwal"
            description="Have you ever looked at an empty pantry and wondered what you could make with such few ingre-dients? The Perfect Pantry can help you find out!"
          />
        </a>
        <a href="https://devpost.com/software/finding-fishe">
          <Project
            projectImage="/findingfishe.png"
            projectName="FINDING FISHE"
            award="(MLH) Best DEI Hack sponsored by Fidelity"
            members="Alina Gonzalez, Alex Chen, Spring Yan, Dao Ho"
            description="A web app designed to help small business owners by providing them with the ability to determine if receipts represent suspicious."
          />
        </a>
      </section>
      <div className="flex justify-center items-center flex-col font-GT-Walsheim-Regular bg-[#FFF8EF] p-10 rounded-3xl mr-[2rem] ml-[2rem] drop-shadow-[0_8px_0px_rgba(0,0,0,.1)]">
        <div className="flex justify-center items-center flex-col">
          <h3 className="text-center text-3xl mb-[1rem] font-bold">
            Interested in seeing more Past Hacker Projects?
          </h3>
          <p className="text-center text-2xl mb-[1.75rem]">
            Check out the HackBeanpot Archive!
          </p>
        </div>
        <a
          href=""
          className="text-center text-2xl text-[#FFFFFF] bg-[#00877F] p-5 pr-10 pl-10 rounded-full hover:scale-90 duration-1000"
        >
          <p>View Archive</p>
        </a>
      </div>
    </div>
  );
});

ProjectsContent.displayName = "ProjectsContent";

export default ProjectsContent;
