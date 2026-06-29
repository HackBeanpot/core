import React from "react";
import ShowDecisionToggle from "@/components/admin/ShowDecisionToggle";
import DateControls from "@/components/admin/DateControls";
import FormConfigEditor from "@/components/admin/FormConfigEditor";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Configure Portal Settings</h1>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Dates</h2>
          <div className="flex flex-col gap-4">
            <DateControls
              label="Registration Opens:"
              endpoint="/api/v1/dates/open"
              initialValue="2026-06-01T00:00:00Z"
            />

            <DateControls
              label="Registration Closes:"
              endpoint="/api/v1/dates/close"
              initialValue="2026-06-10T00:00:00Z"
            />

            <DateControls
              label="Confirm By:"
              endpoint="/api/v1/dates/rsvp"
              initialValue="2026-06-15T00:00:00Z"
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Display</h2>
          <ShowDecisionToggle />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Form Configuration</h2>
          <FormConfigEditor />
        </section>
      </div>
    </div>
  );
}
