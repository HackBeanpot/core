"use client";

// TODO(MS-401): delete once the scroll orchestrator drives the header.
import React, { useState } from "react";
import { Footer, Header } from "../lib/Components";
import { headerTabs } from "../lib/Components/navigation";
import { TeamScene } from "./scenes/team/TeamScene";
import type { SceneId } from "./scenes/types";

const sceneIds: SceneId[] = ["hero", ...headerTabs.map(({ id }) => id)];

/** Temporary landing page: header/footer with a dev-only control panel. */
const HeaderDemo = () => {
  const [activeSection, setActiveSection] = useState<SceneId>("about");
  const [visible, setVisible] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#15173b] to-[#060825]">
      <Header activeSection={activeSection} visible={visible} />

      {process.env.NODE_ENV !== "production" && (
        <div className="fixed bottom-4 right-4 z-[60] flex items-center gap-3 rounded-lg bg-black/70 p-3 text-sm text-white">
          <label className="flex items-center gap-2">
            activeSection
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value as SceneId)}
              className="rounded bg-white/90 px-1 text-black"
            >
              {sceneIds.map((id) => (
                <option key={id}>{id}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
            visible
          </label>
        </div>
      )}

      <main>
        {headerTabs.map(({ id, label }) =>
          id === "team" ? (
            <TeamScene key={id} />
          ) : (
            <section
              key={id}
              id={id}
              className="flex h-screen items-center justify-center font-SpecialGothicCondensedOne-Regular text-5xl uppercase text-white/20"
            >
              {label}
            </section>
          ),
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HeaderDemo;
