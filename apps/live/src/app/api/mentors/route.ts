import { NextResponse } from "next/server";

const BASE_URL = "https://api.airtable.com/v0";
const TABLE_NAME = "mentors";

const USE_SAMPLE_DATA = false;

const test = {
  records: [
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Web"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["00:00-23:59"],
        IsVirtual: "True",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["ML", "Data"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["08:00-20:00"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Mobile"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["12:00-12:30"],
        IsVirtual: "True",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Design"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["09:30-10:30"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["DevOps"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["00:00-23:59"],
        IsVirtual: "True",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Security"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["22:00-02:00"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Product"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["07:00-09:00"],
        IsVirtual: "True",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Web", "Design"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["00:00-23:59"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["AI", "ML"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["16:00-18:00"],
        IsVirtual: "True",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Cloud"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["10:00-12:00"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["VR"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["00:00-23:59"],
        IsVirtual: "True",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Frontend", "Accessibility"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["13:00-15:00"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Frontend", "Accessibility"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["13:00-15:00"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Frontend", "Accessibility"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["13:00-15:00"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Frontend", "Accessibility"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["13:00-15:00"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Frontend", "Accessibility"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["13:00-15:00"],
        IsVirtual: "False",
      },
    },
    {
      fields: {
        Name: "Emma",
        Image: [{ url: "/headshots/directors/Emma.jpg" }],
        Expertise: ["Frontend", "Accessibility"],
        LinkedIn: "https://www.linkedin.com/in/emma-von/",
        "Time Slots": ["13:00-15:00"],
        IsVirtual: "False",
      },
    },
  ],
};

export async function GET() {
  if (USE_SAMPLE_DATA) {
    return NextResponse.json(test);
  }

  const MENTOR_BASE_ID = process.env.MENTOR_BASE_ID;
  const airtableUrl = `${BASE_URL}/${MENTOR_BASE_ID}/${TABLE_NAME}`;

  try {
    const response = await fetch(`${airtableUrl}`, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN_ID}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return NextResponse.json(
        { error: body?.error?.message || "Airtable API request failed" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Mentors API error:", err);
    return NextResponse.json(
      { error: `Request to get airtable data failed ${err}` },
      { status: 500 },
    );
  }
}
