
import React from "react";
import decor from "../../../../public/about/sm/decor.svg";
import { about } from "../../lib/content/about";
import PictureFrame from "../../lib/Components/museum/PictureFrame";
import { Typography } from "../../lib/Components/museum/Typography";

const BACKGROUND =
  "linear-gradient(180deg, #15173b 0%, #060825 100%)";

export function MobileAboutUS() {
  return (
    <section
      className="relative w-full max-w-[402px] aspect-[402/874] overflow-hidden mx-auto"
      style={{ background: BACKGROUND }}
    >
      <img
        src={decor.src}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center px-4 pt-4">

        <div
          data-anim="about-frame"
          className="relative z-10 w-full"
        >
          <PictureFrame
            variant="copperRect"
            width="370px"
            src={about.photo.src}
            alt={about.photo.alt}
          />
        </div>

        <div className="mt-6 flex w-full flex-col gap-4">
          <Typography variant="sectionTitle" as="h2">
            {about.title}
          </Typography>

          <Typography variant="body" as="p">
            {about.body}
          </Typography>
        </div>
      </div>
    </section>
  );
}
