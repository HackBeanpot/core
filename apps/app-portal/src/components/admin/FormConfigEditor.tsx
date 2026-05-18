import React from "react";

export default function FormConfigEditor() {
  return (
    <div className="border p-4 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Form Questions</h2>

        <button className="border px-3 py-1 rounded">Add Question</button>
      </div>

      <div>
        Add Question here
        <button className="border px-3 py-1 rounded">Edit</button>
      </div>
    </div>
  );
}
