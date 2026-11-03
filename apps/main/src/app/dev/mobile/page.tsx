"use client";

import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { Suspense } from "react";
import { MOBILE_SECTIONS } from "./sections";

const WIDTHS = [320, 402, 639] as const;
const COUNTS = Array.from({ length: 10 }, (_, i) => i);

/**
 * `/dev/mobile?section=<id>[&w=402][&gold=3&silver=3]`
 * Previews one SM section in an iframe of a phone width. The iframe is its own
 * viewport, so the `sm:` (640px+) styles stay off however wide the window is.
 * `gold` / `silver` (sponsors only) swap in that many test sponsors per tier.
 */
function MobilePreview() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const ids = Object.keys(MOBILE_SECTIONS);
  const section = params.get("section") ?? ids[0]!;
  const width = Number(params.get("w")) || 402;
  const gold = params.get("gold");
  const silver = params.get("silver");

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([k, v]) =>
      v === null ? next.delete(k) : next.set(k, v),
    );
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const frameParams = new URLSearchParams({ section });
  if (section === "sponsors") {
    if (gold !== null) frameParams.set("gold", gold);
    if (silver !== null) frameParams.set("silver", silver);
  }

  const countSelect = (tier: "gold" | "silver", value: string | null) => (
    <label className="flex items-center gap-2">
      {tier}
      <select
        className="rounded bg-white p-1 text-black"
        value={value ?? ""}
        onChange={(e) => update({ [tier]: e.target.value || null })}
      >
        <option value="">content</option>
        {COUNTS.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-4 bg-black/80 p-3 text-sm">
        <label className="flex items-center gap-2">
          section
          <select
            className="rounded bg-white p-1 text-black"
            value={section}
            onChange={(e) => update({ section: e.target.value })}
          >
            {ids.map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
        </label>
        {section === "sponsors" && (
          <>
            {countSelect("gold", gold)}
            {countSelect("silver", silver)}
          </>
        )}
        <div className="ml-auto flex gap-1">
          {WIDTHS.map((w) => (
            <button
              key={w}
              onClick={() => update({ w: String(w) })}
              className={`rounded px-2 py-1 ${w === width ? "bg-[#fbbf24] text-black" : "bg-[#404040]"}`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <iframe
        key={`${section}-${width}`}
        title={`SM ${section} preview`}
        src={`/dev/mobile/frame?${frameParams.toString()}`}
        className="mx-auto mt-4 block border-0 bg-black"
        style={{ width, height: "calc(100vh - 80px)" }}
      />
    </div>
  );
}

export default function MobilePreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <Suspense>
      <MobilePreview />
    </Suspense>
  );
}
