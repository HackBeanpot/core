"use client";

import React from "react";
import type { FormSection } from "@/lib/application/types";
import QuestionsList from "./QuestionsList";

export default function FormConfigEditor() {
  const [sections, setSections] = React.useState<FormSection[]>([
    {
      id: "section-1",
      title: "General Info",
      questions: [
        {
          id: "q1",
          label: "Full Name",
          type: "short_text",
          required: true,
        },
        {
          id: "q2",
          label: "Why join?",
          type: "long_text",
          required: true,
        },
      ],
    },
  ]);

  async function handleSave() {
    await fetch("/api/v1/form-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections }),
    });
  }

  return (
    <div className="border p-4 rounded-lg space-y-4">
      <QuestionsList sections={sections} setSections={setSections} />

      <div className="flex items-center gap-4">
        <button
          style={{ backgroundColor: "#1890ff" }}
          onClick={handleSave}
          className="border text-white px-3 py-2 rounded"
        >
          Save Form Configuration
        </button>
        <button className="border px-3 py-2 rounded">Add Section</button>
      </div>
    </div>
  );
}
