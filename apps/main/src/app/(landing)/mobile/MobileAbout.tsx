import React from "react";
import decor from "../../../../public/about/sm/decor.svg";
import { about } from "../../lib/content/about";
import PictureFrame from "../../lib/Components/museum/PictureFrame";
import { Typography } from "../../lib/Components/museum/Typography";
import { sm, smUnitVar } from "./smUnits";

/** Room kept below the text for the candles and their glow (artboard px). */
const DECOR_CLEARANCE = 270;

const BACKGROUND = "linear-gradient(180deg, #15173b 0%, #060825 100%)";

export function MobileAboutUS() {
  return (
    // Fills the screen's width: the 402-wide Figma frame (5615:26129)
    // scales up, so its edge-to-edge decor never stops short of the edges.
    <section
      data-sm-scene="about"
      className="scroll-mt-20 relative w-full"
      style={{ background: BACKGROUND }}
    >
      {/* At least the frame's height; longer content grows it, with the decor pinned to the bottom. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ ...smUnitVar, minHeight: sm(874) }}
      >
        <img
          src={decor.src}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-auto w-full"
        />

        <div
          className="relative z-10 flex w-full flex-col items-center px-5 pt-[98px]"
          style={{ paddingBottom: sm(DECOR_CLEARANCE) }}
        >
          <div data-anim="about-frame" className="relative z-10 w-full">
            <PictureFrame
              variant="copperRect"
              width="100%"
              src={about.photo.src}
              alt={about.photo.alt}
            />
          </div>

          {/* Left-aligned, as in Figma (Typography centers by default). */}
          <div className="mt-6 flex w-full flex-col gap-4 [&>*]:!text-left">
            <Typography variant="sectionTitle" as="h2">
              {about.title}
            </Typography>

            <Typography variant="body" as="p">
              {about.body}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
