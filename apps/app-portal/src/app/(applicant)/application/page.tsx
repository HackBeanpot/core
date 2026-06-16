import React from "react";

import { ApplicationForm } from "@/components/application/ApplicationForm";

export default function ApplicationPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          HackBeanpot application
        </h1>
        <p className="mt-2 text-black/60">
          Complete the form below to apply. You can edit your answers until
          registration closes.
        </p>
      </header>
      <ApplicationForm />
    </div>
  );
}
