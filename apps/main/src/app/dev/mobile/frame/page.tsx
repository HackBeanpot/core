"use client";

import { notFound, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { MOBILE_SECTIONS } from "../sections";

/** What `/dev/mobile`'s iframe loads: one SM section on its own. */
function MobileFrame() {
  const params = useSearchParams();
  const id = params.get("section") ?? "";
  const Section = MOBILE_SECTIONS[id];
  if (!Section) {
    return <p className="p-6 text-white">No SM section &quot;{id}&quot;.</p>;
  }
  return <Section params={new URLSearchParams(params.toString())} />;
}

export default function MobileFramePage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <Suspense>
      <MobileFrame />
    </Suspense>
  );
}
