"use client";

import React from "react";
import type { FormSection } from "@/lib/application/types";
import QuestionsList from "./QuestionsList";

export default function FormConfigEditor() {
  const [sections, setSections] = React.useState<FormSection[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saveError, setSaveError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadConfig() {
      const res = await fetch("/api/v1/admin/form-config");

      const data = await res.json();

      setSections(data.sections);
      setLoading(false);
    }

    loadConfig();
  }, []);

  async function handleSave() {
    setSaveError(null);

    const res = await fetch("/api/v1/admin/form-config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sections }),
    });

    const data = await res.json();

    if (!res.ok) {
      setSaveError(data.error ?? "Failed to save form configuration.");
      return;
    }
  }

  if (loading) {
    return <p>Loading form configuration...</p>;
  }

  return (
    <div className="border p-4 rounded-lg space-y-4">
      <QuestionsList sections={sections} setSections={setSections} />

      <button
        style={{ backgroundColor: "#1890ff" }}
        onClick={handleSave}
        className="border text-white px-3 py-2 rounded"
      >
        Save Form Configuration
      </button>

      {saveError && <p className="text-sm text-firecrackerRed">{saveError}</p>}
    </div>
  );
}
