import React from "react";
const tiles = [
  {
    title: "Settings",
  },
  {
    title: "Applicants",
  },
  {
    title: "Stats",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-gray-500 mt-1">Welcome to the admin portal.</p>
      </div>

      <div className="grid gap-6 grid-cols-3 tablet:grid-cols-2 mobile-xl:grid-cols-1 mobile:grid-cols-1">
        {tiles.map((t) => (
          <div key={t.title} className="rounded-xl border p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{t.title}</h2>

            <div className="mt-4 text-sm font-medium text-blue-600">Open →</div>
          </div>
        ))}
      </div>
    </div>
  );
}
