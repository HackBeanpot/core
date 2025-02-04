import React from "react";
import Project from "./components/Project";

const ProjectsContent = () => {
  return (
    <div className="mt-[5%] mr-[5%] ml-[5%]">
      <div className="">
        <h1 className="font-bold text-5xl text-center">
          LAST YEAR&apos;S PROJECT
        </h1>
      </div>
      <section className="flex flex-wrap mt-[5%] justify-evenly">
        <Project
          projectImage="/poqua.png"
          projectName="POQUA"
          award="Best Overall Tech"
          members="Jalen Wu, Caleb Lee, Kyle Sung, Elaine Min, Dewi Kalis"
          description="Poqua is an aquarium tank monitor software app that gives users a platform to simulate their aquarium when away from home."
        />
        <Project
          projectImage="/discountbytes.png"
          projectName="POQUA"
          award="Most Creative"
          members="Shashwath Sunkum, B D S Aritra, Samuel Steinmetz, Sahil Shah"
          description="A web application designed specifically for restaurants, allowing them to dynamically adjust their menu pricing based on real-time customer traffic."
        />
        <Project
          projectImage="/lastminute.png"
          projectName="POQUA"
          award="Social Impact/Sustainability"
          members="Yujin Park, Justin Kim, Emily Ye, Oscar Fang"
          description="Last Minute allows users to upload pictures of their leftover food, which can then be picked up by anyone in the area who needs a meal at the very last minute."
        />
        <Project
          projectImage="/closet.png"
          projectName="POQUA"
          award="Best Beginner"
          members="Krystal Qiao"
          description="Effortlessly curate outfits from your wardrobe, tailored to your unique taste. Say goodbye to fashion dilemmas and hello to  digital fashion solutions."
        />
        <Project
          projectImage="/maritime.png"
          projectName="POQUA"
          award="Most Technically Challenging"
          members="Kaylee Wu, Mouad Tiahi, Kenneth Chap, Borui Chen"
          description="Maritime is an iOS, Android, and web application that promotes recycling and mitigating waste, specifically in the world's oceans."
        />
        <Project
          projectImage="/futura.png"
          projectName="FUTURA"
          award="Best UI/UX"
          members="Zahra Wibisana, Ange Najam, Sania Hasan, Saidah Ly, Tina Ni"
          description="Futura is dedicated to transforming urban planning by highlighting the gender-data gap and aims to promote gender equality in urban planning."
        />
        <Project
          projectImage="/letslink.png"
          projectName="POQUA"
          award="(MLH) Best Use of MongoDB Atlas"
          members="Russell Leung, Aahil Nishad, Michael Mehall, Donny Le, Andrew Zhu"
          description="Finding times to meet can be hard. With Let's Link, you can connect your Google Calendar and we'll provide the most optimal times."
        />
        <Project
          projectImage="/perfectpantry.png"
          projectName="POQUA"
          award="(MLH) Best Domain Name from GoDaddy Registry"
          members="Ayomide Addey, Arushi Aggarwal"
          description="Have you ever looked at an empty pantry and wondered what you could make with such few ingre-dients? The Perfect Pantry can help you find out!"
        />
        <Project
          projectImage="/findingfishe.png"
          projectName="POQUA"
          award="(MLH) Best DEI Hack sponsored by Fidelity"
          members="Alina Gonzalez, Alex Chen, Spring Yan, Dao Ho"
          description="A web app designed to help small business owners by providing them with the ability to determine if receipts represent suspicious."
        />
      </section>
    </div>
  );
};

export default ProjectsContent;
