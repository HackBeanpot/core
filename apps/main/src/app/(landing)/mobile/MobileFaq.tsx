import Image from "next/image";
import React from "react";
import { faqAssets } from "../../../../public/faq/positions";
import { Footer } from "../../lib/Components";
import { typographyVariants } from "../../lib/Components/museum/Typography";
import { faq, faqCategories, faqSection } from "../../lib/content/faq";
import type { FaqCategory } from "../../lib/content/types";
import { FaqAccordion } from "../scenes/faq/FaqAccordion";

const { sock } = faqAssets.sm;

const SM_ORDER: FaqCategory[] = ["general", "logistics", "application"];

/** One SM artboard px (402px frame), scaled with the viewport width. */
const sm = (n: number) => `calc(${n} * 100vw / 402)`;

/** How far the sock art runs below the top of the footer's content (y 1654 in Figma). */
const SOCK_BELOW_FOOTER = sock.y + sock.h - 1654;
/** `Footer`'s SM top padding (`pt-5`). */
const FOOTER_PAD_TOP = 20;

/**
 * SM FAQ, static: categories in one column, then the sock art
 * with the footer over its lower half.
 */
export function MobileFaq() {
  return (
    // No `id="faq"`: the LG/MD SceneFrame owns that anchor and both are in the DOM.
    <section
      aria-labelledby="faq-title-sm"
      className="relative overflow-hidden bg-[#060825]"
    >
      {/* Ends on the art's top row so the two meet without a seam. */}
      <div className="relative flex flex-col items-center gap-10 bg-[linear-gradient(180deg,#00000b_0%,#000011_39%,#00000e_63%,#000020_87%,#000029_100%)] px-5 pb-2 pt-[39px]">
        <h2 id="faq-title-sm" className={typographyVariants.sectionTitle}>
          {faqSection.title}
        </h2>
        <div className="flex w-full flex-col gap-[60px]">
          {SM_ORDER.map((id) => {
            const category = faqCategories.find((c) => c.id === id)!;
            return (
              <div key={id} className="flex flex-col gap-4">
                <h3 className={typographyVariants.categoryTitle}>
                  {category.label}
                </h3>
                <FaqAccordion
                  items={faq.filter((item) => item.category === id)}
                  animated={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Image
        src={sock.src}
        alt=""
        width={sock.w}
        height={sock.h}
        unoptimized
        className="block h-auto w-full"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[662px] bg-gradient-to-b from-[rgba(6,8,37,0)] to-[#060825] to-[85.6%]"
      />
      <div
        className="relative"
        style={{
          marginTop: `calc(-1 * ${sm(SOCK_BELOW_FOOTER)} - ${FOOTER_PAD_TOP}px)`,
        }}
      >
        <Footer />
      </div>
    </section>
  );
}
