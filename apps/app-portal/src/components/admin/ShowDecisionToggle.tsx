"use client";

import { useState } from "react";
import React from "react";

export default function ShowDecisionToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold mb-2">Show Decision</h3>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        <span>{enabled ? "Enabled" : "Disabled"}</span>
      </label>
    </div>
  );
}
