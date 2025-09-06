import React from "react";
import NavBar from "../lib/Components/NavBar";
import SponsorUsContent from "./content";
import { Footer } from "../lib/Components";
const SponsorUsPage = () => {
  return (
    <div className="relative z-10 w-full flex flex-col items-center">
      <NavBar />
      <SponsorUsContent />
      <div className="absolute mobile:top-[430vh] desktop:top-[650vh]"><Footer /></div>
      
    </div>
  );
};
export default SponsorUsPage;
