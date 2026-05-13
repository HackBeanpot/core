import React from "react";

export default function DateControls() {
  return (
    <div className="border p-4 rounded-lg space-y-4">
      <h2 className="text-lg font-semibold">Application Deadline</h2>

      <input type="datetime-local" className="border p-2 rounded w-full" />

      <button>Save</button>
    </div>
  );
}
