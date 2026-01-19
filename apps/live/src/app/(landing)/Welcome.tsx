"use client";

import React from "react";
import RibbonTitle from "@repo/ui/RibbonTitle";
import TextBackgroundSign from "../lib/Assets/SVG/WelcomeLanding/TextBackgroundSign";
import FrontBush from "../lib/Assets/SVG/WelcomeLanding/FrontBush";
import WelcomeDirectionSign from "../lib/Assets/SVG/WelcomeLanding/WelcomeDirectionSign";
import useDevice from "@util/hooks/useDevice";
import Button from "@repo/ui/Button";

export default function Welcome(): React.ReactNode {
  const { isMobile } = useDevice();
  return (
    <div className="w-full h-800px min-h-screen bg-mossGreen py-8 px-8 md:px-16 flex items-center justify-center relative overflow-visible">
      <div
        className="absolute mobile:hidden mobile-xl:hidden tablet:hidden" // hide on small screens
        style={{
          width: "350px",
          left: "8%",
          top: "20%",
          zIndex: 10,
        }}
      >
        <WelcomeDirectionSign />
      </div>

      <div
        className="max-w-5xl w-full mx-auto relative"
        style={{ marginBottom: "70px" }}
      >
        <div className={`${isMobile ? "transform scale-[0.85]" : ""}`}>
          <RibbonTitle text="WELCOME!" />
        </div>

        <div
          className={"absolute" + (isMobile ? " transform scale-[0.85]" : "")}
          style={{
            marginTop: "350px",
            paddingLeft: "70px",
            width: isMobile ? "8vw" : "35vw",
            left: isMobile ? "15%" : "60%",
            top: isMobile ? "4vw" : "10vh",
            zIndex: 5,
          }}
        >
          <FrontBush />
        </div>

        <div className="relative mt-8">
          <div
            className="absolute inset-0"
            style={{
              marginLeft: isMobile ? "2vw" : "22vw",
              zIndex: 1,
            }}
          >
            <TextBackgroundSign
              style={{
                transform: isMobile
                  ? "scaleX(0.8) scaleY(1.2)"
                  : "scaleX(0.98) scaleY(1.1)",
                transformOrigin: "left center",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <div
            className="relative px-12 py-10 md:px-16 md:py-12 lg:px-20 lg:py-14"
            style={{ zIndex: 2 }}
          >
            <p
              className="md:text-lg text-charcoalFogDark font-DMSans-Regular leading-relaxed max-w-3xl"
              style={{ paddingLeft: isMobile ? "3vw" : "23vw", paddingTop: 25 }}
            >
              At <b>HackBeanpot 2026</b>, we&apos;re hitting the road with a
              community of explorers driven by creativity, learning, and
              meaningful connections.
              <br />
              <br />
              Get ready to put your resourcefulness to the test on this journey.
              Whether you&apos;re a seasoned hackathon traveler, a
              &quot;never-written-a-line-of-code&quot; beginner, or somewhere in
              between, we&apos;re thrilled to have you join this adventure!
              <br />
              <br />
              Learn more at{" "}
              <a
                href="https://www.hackbeanpot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-charcoalFogDark hover:text-charcoalFogDark/80"
              >
                www.hackbeanpot.com
              </a>
            </p>

            <div
              style={{
                marginLeft: isMobile ? "3vw" : "23vw",
                marginTop: 30,
                zIndex: 2000,
              }}
            >
              <Button
                text="Join our Discord"
                size="medium"
                color="cottonCandyCoral"
                textColor="white"
                onClick={() => window.open("https://discord.gg/Xdp8K9xa7M")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
