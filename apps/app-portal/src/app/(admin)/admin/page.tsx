import React from "react";
import Link from "next/link";

const tiles = [
  {
    title: "Config Portal Settings",
    description:
      "Manage site configuration, application preferences, and administrative options.",
    link: "/admin/settings",
  },
  {
    title: "Applicants",
    description:
      "Review applicant information, track application status, and manage submissions.",
    link: "/admin/applicants",
  },
  {
    title: "Stats",
    description:
      "View platform metrics, application trends, and key performance statistics.",
    link: "/admin/stats",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-gray-500 mt-1">Welcome to the admin portal.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {tiles.map((t) => (
          <div
            key={t.title}
            className="flex-1 rounded-2xl border bg-white p-8 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{t.title}</h2>
            <p className="text-sm">{t.description}</p>

            <Link
              href={t.link}
              className="mt-4 inline-block rounded border bg-blue-400 px-3 py-1 text-white"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
