import { NextResponse } from "next/server";

type QuestionType = "text" | "textarea";

type Question = {
  id: string;
  label: string;
  type: QuestionType;
};

type Section = {
  id: string;
  title: string;
  questions: Question[];
};

type FormConfig = {
  sections: Section[];
};

const mockFormConfig: FormConfig = {
  sections: [
    {
      id: "basic",
      title: "Basic Info",
      questions: [
        {
          id: "name",
          label: "Full Name",
          type: "text",
        },
        {
          id: "reason",
          label: "Why are you applying?",
          type: "textarea",
        },
      ],
    },
    {
      id: "experience",
      title: "Experience",
      questions: [
        {
          id: "background",
          label: "Tell us about your background",
          type: "textarea",
        },
      ],
    },
  ],
};

export async function GET() {
  return NextResponse.json(mockFormConfig);
}

export async function POST() {
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
