import type { FormSection } from "./types";

export const APPLICATION_SECTIONS: readonly FormSection[] = [
  {
    id: "personal",
    title: "Personal information",
    description: "Tell us a bit about yourself.",
    questions: [
      {
        id: "legal_name",
        label: "Full legal name",
        type: "short_text",
        required: true,
      },
      {
        id: "preferred_name",
        label: "Preferred name (optional)",
        type: "short_text",
        required: false,
      },
      {
        id: "email",
        label: "Email address",
        type: "short_text",
        required: true,
        description: "Use the same email you sign in with.",
      },
    ],
  },
  {
    id: "school",
    title: "Education",
    questions: [
      {
        id: "university",
        label: "University",
        type: "short_text",
        required: true,
      },
      {
        id: "year_of_study",
        label: "Year of study",
        type: "select",
        required: true,
        options: [
          { value: "first", label: "First year" },
          { value: "second", label: "Second year" },
          { value: "third", label: "Third year" },
          { value: "fourth", label: "Fourth year" },
          { value: "graduate", label: "Graduate student" },
        ],
      },
    ],
  },
  {
    id: "experience",
    title: "Experience & interests",
    questions: [
      {
        id: "hackathon_experience",
        label: "How many hackathons have you attended?",
        type: "select",
        required: true,
        options: [
          { value: "0", label: "None" },
          { value: "1-2", label: "1–2" },
          { value: "3-5", label: "3–5" },
          { value: "6+", label: "6 or more" },
        ],
      },
      {
        id: "interests",
        label: "What are you interested in building or learning about?",
        type: "multi_select",
        required: true,
        options: [
          { value: "web", label: "Web development" },
          { value: "mobile", label: "Mobile" },
          { value: "ai", label: "AI / ML" },
          { value: "hardware", label: "Hardware / IoT" },
          { value: "design", label: "Design" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "why_attend",
        label: "Why do you want to attend HackBeanpot?",
        type: "long_text",
        required: true,
      },
    ],
  },
  {
    id: "documents",
    title: "Documents",
    questions: [
      {
        id: "resume",
        label: "Resume (PDF)",
        type: "file_upload",
        required: false,
        description: "Optional. Upload will be enabled in a future release.",
      },
    ],
  },
] as const;
