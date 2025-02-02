"use client";

import React, { useState } from "react";
import { Section, ForegroundItems, Coordinate } from "@repo/ui";
import Image from "next/image";
import { useIsMobile } from "@repo/util";

export default function GuestSpeaker(): React.ReactNode {
  const [currIndex, setCurrIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const speakers = [
    {
      name: "Rati Thanawala",
      role: "Keynote Speaker",
      time: "Sunday @ 3:00 PM",
      image: "/rati.png",
      bio: "Dr. Thanawala is a 2018 Advanced Leadership Fellow at Harvard and holds a Ph.D. in Computer Science from Yale. With 39 years in the tech industry, including 17 as Vice Presi-dent at Bell Labs, she pioneered new communications technologies and founded Bell Labs Consulting. She also held executive roles in software development and product mana-gement at AT&T and Nokia.",
    },
    {
      name: "Trisha Garg",
      role: "Tech Talk Speaker",
      time: "Friday @ 11:00 PM",
      image: "/rati.png",
      bio: "Dr. Thanawala is a 2018 Advanced Leadership Fellow at Harvard and holds a Ph.D. in Computer Science from Yale. With 39 years in the tech industry, including 17 as Vice Presi-dent at Bell Labs, she pioneered new communications technologies and founded Bell Labs Consulting. She also held executive roles in software development and product mana-gement at AT&T and Nokia.",
    },
    {
      name: "Zahra Wibisana",
      role: "DE&I Speaker",
      time: "Saturday @ 2:00 PM",
      image: "/rati.png",
      bio: "Dr. Thanawala is a 2018 Advanced Leadership Fellow at Harvard and holds a Ph.D. in Computer Science from Yale. With 39 years in the tech industry, including 17 as Vice Presi-dent at Bell Labs, she pioneered new communications technologies and founded Bell Labs Consulting. She also held executive roles in software development and product mana-gement at AT&T and Nokia.",
    },
  ];

  const background = (
    <div className="w-full h-full overflow-hidden pointer-events-none relative bg-green"></div>
  );

  const content = (
    <div className="relative w-full h-full flex flex-col">
      <h1
        className={`${isMobile ? "text-6xl mt-16" : "text-[clamp(3rem,7vw,7rem)] mt-14"} text-granolaLite font-bold font-Wilden ${isMobile ? "text-center" : "ml-16"}`}
      >
        Guest Speakers
      </h1>
      {isMobile ? (
        <div className="font-GT-Walsheim-Regular flex flex-col items-center justify-center h-full mt-8">
          <div>
            <div
              className="bg-offWhite rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.1)] p-4 w-full max-w-sm cursor-pointer"
              //   start of AI generated
              onClick={() =>
                setCurrIndex(currentSlide === currIndex ? null : currentSlide)
              }
              onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchStartX !== null) {
                  const diff = e.changedTouches[0].clientX - touchStartX;
                  if (diff > 50) {
                    setCurrentSlide(
                      currentSlide === 0
                        ? speakers.length - 1
                        : currentSlide - 1,
                    );
                  } else if (diff < -50) {
                    setCurrentSlide(
                      currentSlide === speakers.length - 1
                        ? 0
                        : currentSlide + 1,
                    );
                  }
                  setTouchStartX(null);
                }
              }}
              //   end of AI generated
            >
              {currentSlide === currIndex ? (
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-brown">
                    Biography
                  </h2>
                  <p className="text-sm text-brown">
                    {speakers[currentSlide].bio}
                  </p>
                </div>
              ) : (
                <Image
                  alt={speakers[currentSlide].name}
                  src={speakers[currentSlide].image}
                  width={400}
                  height={200}
                  className="h-auto rounded-sm w-auto pb-11"
                />
              )}
            </div>
            <div className="text-center mt-8">
              <h2 className="text-3xl font-medium text-offWhite">
                {speakers[currentSlide].name}
              </h2>
              <h3 className="text-2xl text-offWhite mt-2 mb-4">
                {speakers[currentSlide].role}
              </h3>
              <div className="py-2.5 px-6 rounded-full bg-offWhite text-green font-normal inline-block">
                {speakers[currentSlide].time}
              </div>
            </div>
            <div className="flex gap-2 mt-8 justify-center">
              {speakers.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-offWhite" : "bg-offWhite/50"}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="font-GT-Walsheim-Regular grid grid-cols-3 gap-8 mx-16">
          {speakers.map((speaker, index) => (
            <div key={index} className="flex flex-col items-center gap-4 mt-7">
              <div
                className="flex flex-col items-center bg-offWhite rounded-md shadow-lg p-4 pb-14 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setCurrIndex(index === currIndex ? null : index)}
              >
                {index === currIndex ? (
                  <div className="h-full w-full px-3 py-1">
                    <h2 className="text-[clamp(1rem,2.5vw,2.5rem)] font-bold mb-2 text-brown">
                      Biography
                    </h2>
                    <p className="text-sm text-brown">{speaker.bio}</p>
                  </div>
                ) : (
                  <Image
                    alt={speaker.name}
                    src={speaker.image}
                    width={400}
                    height={200}
                    className="h-auto rounded-sm"
                  />
                )}
              </div>
              <div className="flex flex-col items-center mt-4 text-center">
                <h2 className="text-3xl font-medium text-offWhite mb-2">
                  {speaker.name}
                </h2>
                <h3 className="text-2xl font-normal text-offWhite mb-4">
                  {speaker.role}
                </h3>
                <div className="py-2.5 px-6 rounded-full bg-offWhite text-green font-normal text-center">
                  {speaker.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // const foreground: ForegroundItems = [
  // 	{
  // 		item: {
  // 			/* some component */
  // 		},
  // 		coordinate: {
  // 			x: {
  // 				/* some number % of the screen width to place the item */
  // 			},
  // 			y: {
  // 				/* some number % of the screen height to place the item */
  // 			},
  // 		},
  // 	},
  // ];

  return (
    <Section
      name={"Guest Speaker"}
      background={background}
      content={content}
      // foreground={foreground}
      height={100}
    />
  );
}
