"use client";

import React from "react";
import type { FormSection } from "@/lib/application/types";
import QuestionsList from "./QuestionsList";

export default function FormConfigEditor() {
  const [sections, setSections] = React.useState<FormSection[]>([]);
  const [loading, setLoading] = React.useState(true);

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
    const res = await fetch("/api/v1/admin/form-config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sections }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
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
    </div>
  );
}
