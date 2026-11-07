"use client";

import Image from "next/image";
import React, { useId, useState } from "react";
import { faqAssets } from "../../../../../public/faq/positions";
import type { FaqItem } from "../../../lib/content";
import { Typography } from "../../../lib/Components/museum/Typography";

const ICON = 20;

/**
 * One FAQ category's questions. At most one answer is open at a time; opening
 * another closes it, and clicking the open one closes it.
 */
export function FaqAccordion({
  items,
  animated = true,
}: {
  items: FaqItem[];
  animated?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();

  return (
    <ul className="flex flex-col gap-5 sm:gap-[calc(20*var(--u))]">
      {items.map((item, i) => {
        const open = i === openIndex;
        const buttonId = `${id}-q${i}`;
        const panelId = `${id}-a${i}`;
        return (
          <li key={item.question}>
            <h4>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className={`flex w-full items-center justify-between gap-4 rounded-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold sm:gap-[calc(16*var(--u))] ${open ? "[&>span]:font-semibold" : "[&>span]:font-normal"}`}
              >
                <Typography variant="faqQuestion" as="span">
                  {item.question}
                </Typography>
                <Image
                  src={open ? faqAssets.icons.minus : faqAssets.icons.plus}
                  alt=""
                  width={ICON}
                  height={ICON}
                  unoptimized
                  className="size-5 shrink-0 sm:size-[calc(20*var(--u))]"
                />
              </button>
            </h4>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid ${open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"} ${animated ? "transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none" : ""}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pt-1 sm:pt-[calc(4*var(--u))]">
                  <Typography variant="faqQuestionOpen">
                    {item.answer}
                  </Typography>
                </div>
                <div className="mt-4 h-px bg-white/10 sm:mt-[calc(16*var(--u))]" />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
