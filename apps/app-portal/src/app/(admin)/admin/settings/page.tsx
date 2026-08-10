import React from "react";
import { headers } from "next/headers";
import ShowDecisionToggle from "@/components/admin/ShowDecisionToggle";
import DateControls from "@/components/admin/DateControls";
import FormConfigEditor from "@/components/admin/FormConfigEditor";

async function fetchJson(url: string, cookie: string) {
  const res = await fetch(url, {
    cache: "no-store",
    headers: { cookie },
  });

  if (!res.ok) {
    return { value: null };
  }

  return res.json();
}

export default async function Page() {
  const cookie = headers().get("cookie") ?? "";

  const [openData, closeData, confirmData, showDecisionData] =
    await Promise.all([
      fetchJson("http://localhost:3000/api/v1/dates/registration-open", cookie),
      fetchJson("http://localhost:3000/api/v1/dates/registration-closed", cookie),
      fetchJson("http://localhost:3000/api/v1/dates/confirm-by", cookie),
      fetchJson("http://localhost:3000/api/v1/show-decision", cookie),
    ]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Configure Portal Settings</h1>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Dates</h2>
          <div className="flex flex-col gap-4">
            <DateControls
              label="Registration Opens:"
              endpoint="/api/v1/dates/registration-open"
              initialValue={openData.value}
            />

            <DateControls
              label="Registration Closes:"
              endpoint="/api/v1/dates/registration-closed"
              initialValue={closeData.value}
            />

            <DateControls
              label="Confirm By:"
              endpoint="/api/v1/dates/confirm-by"
              initialValue={confirmData.value}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Display</h2>
          <ShowDecisionToggle initialValue={showDecisionData.value} />
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Form Configuration</h2>
          <FormConfigEditor />
        </section>
      </div>
    </div>
  );
}
