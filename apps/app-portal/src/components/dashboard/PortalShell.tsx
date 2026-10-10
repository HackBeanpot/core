import React from "react";
import type { ReactNode } from "react";

// Class strings are written out in full (not built from pieces) so Tailwind picks them up.
const TONES = {
  default: {
    background:
      "bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.18),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.12),_transparent_30%),linear-gradient(180deg,_#fff8ef_0%,_#fffdf8_54%,_#ffffff_100%)]",
    eyebrow: "border-amber-200 text-amber-900",
  },
  // Used once an applicant is accepted.
  success: {
    background:
      "bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.2),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(180deg,_#effbf3_0%,_#f7fdf9_54%,_#ffffff_100%)]",
    eyebrow: "border-green-200 text-green-900",
  },
} as const;

type PortalShellProps = {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  tone?: keyof typeof TONES;
};

export default function PortalShell({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  aside,
  children,
  tone = "default",
}: PortalShellProps): JSX.Element {
  const { background, eyebrow: eyebrowColors } = TONES[tone];

  return (
    <section
      className={`min-h-screen ${background} px-4 py-8 text-slate-900 sm:px-6 lg:px-10`}
    >
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8">
        <div className="max-w-3xl space-y-4">
          <div
            className={`inline-flex w-fit rounded-full border ${eyebrowColors} bg-white/75 px-4 py-1 text-sm font-medium tracking-wide shadow-sm backdrop-blur`}
          >
            {eyebrow}
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              {description}
            </p>
          </div>
        </div>

        <div className={`grid gap-6 ${aside ? "lg:grid-cols-2" : ""}`}>
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_28px_80px_rgba(148,163,184,0.24)] backdrop-blur sm:p-8">
            <div className="space-y-8">{children}</div>
            {(primaryAction || secondaryAction) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {primaryAction}
                {secondaryAction}
              </div>
            )}
          </div>

          {aside && (
            <aside className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-slate-100 shadow-[0_28px_80px_rgba(15,23,42,0.2)] sm:p-8">
              {aside}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
