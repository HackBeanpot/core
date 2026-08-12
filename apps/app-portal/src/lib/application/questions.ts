import { FormConfig } from "../admin/types";
import type { FormSection, QuestionOption } from "./types";

const CABIN_IMPORTANCE_OPTIONS: readonly QuestionOption[] = [
  { value: "very_important", label: "That's very important to me" },
  { value: "somewhat_important", label: "That's somewhat important to me" },
  { value: "not_important", label: "That's not important to me" },
  {
    value: "dont_want_to",
    label: "I don't want to do that at HackBeanpot",
  },
];

// HackBeanpot 2026 registration questions. This is the code-level default — the
// admin-editable config in Mongo (see lib/admin/form-config-service.ts) starts out
// as a copy of this and can diverge once an admin saves changes in /admin/settings.
//
// Note on scope: a few source questions are conditionally visible in the original spec
// (e.g. "if your gender isn't listed above, list it here") — this form doesn't yet support
// show/hide-on-condition, so those are rendered as always-visible optional fields instead.
export const APPLICATION_SECTIONS: readonly FormSection[] = [
  {
    id: "personal",
    title: "Let's Get to Know You!",
    description:
      "All questions are optional unless otherwise stated. We will not use/disclose your personal info for outside purposes.",
    questions: [
      {
        id: "first_name",
        label: "First Name",
        type: "short_text",
        required: true,
        maxLength: 200,
      },
      {
        id: "preferred_name",
        label: "Preferred Name",
        type: "short_text",
        required: false,
        maxLength: 200,
      },
      {
        id: "last_name",
        label: "Last Name",
        type: "short_text",
        required: true,
        maxLength: 200,
      },
      {
        id: "hometown",
        label: "Hometown",
        type: "short_text",
        required: true,
        maxLength: 200,
      },
      {
        id: "pronouns",
        label: "Pronouns",
        type: "short_text",
        required: true,
        maxLength: 100,
      },
      {
        id: "gender",
        label: "Gender",
        type: "select",
        required: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "non_binary", label: "Non-binary" },
          { value: "genderqueer", label: "Genderqueer" },
          { value: "unlisted", label: "Unlisted" },
          { value: "prefer_not_to_say", label: "Prefer not to say" },
        ],
      },
      {
        id: "gender_other",
        label: "If your gender isn't listed above, list it here!",
        type: "short_text",
        required: false,
        maxLength: 200,
      },
      {
        id: "race",
        label: "What race(s) do you identify as?",
        type: "multi_select",
        required: true,
        options: [
          {
            value: "indigenous_american_or_alaska_native",
            label: "Indigenous American or Alaska Native",
          },
          {
            value: "asian",
            label: "Asian (East, Southeast, South)",
          },
          {
            value: "black_or_african_american",
            label: "Black or African American",
          },
          { value: "hispanic_or_latinx", label: "Hispanic or Latinx" },
          {
            value: "native_hawaiian_or_pacific_islander",
            label: "Native Hawaiian or Other Pacific Islander",
          },
          { value: "white", label: "White" },
          { value: "unlisted", label: "Unlisted" },
          { value: "prefer_not_to_say", label: "Prefer not to say" },
        ],
      },
      {
        id: "race_other",
        label: "If your race isn't listed above, list it here!",
        type: "short_text",
        required: false,
        maxLength: 200,
      },
      {
        id: "lgbtq",
        label: "Do you identify as part of the LGBTQIA+ community?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "unsure", label: "Unsure" },
          { value: "prefer_not_to_say", label: "Prefer not to say" },
        ],
      },
      {
        id: "lgbtq_identity",
        label:
          "If you said yes to the question above, how do you identify yourself?",
        type: "short_text",
        required: false,
        maxLength: 200,
      },
    ],
  },
  {
    id: "school",
    title: "Education",
    questions: [
      {
        id: "school",
        label: "What school do you attend?",
        type: "select",
        required: true,
        options: [
          {
            value: "northeastern_university",
            label: "Northeastern University",
          },
          { value: "boston_university", label: "Boston University" },
          { value: "mit", label: "MIT" },
          { value: "harvard_university", label: "Harvard University" },
          { value: "tufts_university", label: "Tufts University" },
          {
            value: "umass_amherst",
            label: "University of Massachusetts Amherst",
          },
          { value: "boston_college", label: "Boston College" },
          { value: "emerson_college", label: "Emerson College" },
          { value: "suffolk_university", label: "Suffolk University" },
          { value: "brandeis_university", label: "Brandeis University" },
          { value: "wellesley_college", label: "Wellesley College" },
          {
            value: "wentworth_institute_of_technology",
            label: "Wentworth Institute of Technology",
          },
          {
            value: "olin_college_of_engineering",
            label: "Olin College of Engineering",
          },
          { value: "simmons_university", label: "Simmons University" },
          {
            value: "benjamin_franklin_institute_of_technology",
            label: "Benjamin Franklin Institute of Technology",
          },
          {
            value: "umass_boston",
            label: "University of Massachusetts Boston",
          },
          {
            value: "bunker_hill_community_college",
            label: "Bunker Hill Community College",
          },
          {
            value: "bristol_community_college",
            label: "Bristol Community College",
          },
          {
            value: "worcester_polytechnic_institute",
            label: "Worcester Polytechnic Institute",
          },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "school_other",
        label:
          "If your school was not listed in the previous question, list it here!",
        type: "short_text",
        required: false,
        maxLength: 200,
      },
      {
        id: "education_level",
        label: "What level of education are you currently pursuing?",
        type: "select",
        required: true,
        options: [
          { value: "undergraduate", label: "Undergraduate" },
          { value: "graduate", label: "Graduate" },
        ],
      },
      {
        id: "education_year",
        label: "What year in your current education are you?",
        type: "select",
        required: true,
        options: [
          { value: "1st_year", label: "1st year" },
          { value: "2nd_year", label: "2nd year" },
          { value: "3rd_year", label: "3rd year" },
          { value: "4th_year", label: "4th year" },
          { value: "5th_year_plus", label: "5th year +" },
        ],
      },
      {
        id: "major",
        label: "What are your major/concentration(s)? (N/A if not applicable)",
        type: "short_text",
        required: true,
        maxLength: 300,
      },
      {
        id: "minor",
        label: "What are your minor(s)? (N/A if not applicable)",
        type: "short_text",
        required: false,
        maxLength: 300,
      },
    ],
  },
  {
    id: "documents",
    title: "Documents",
    questions: [
      {
        id: "resume",
        label: "Resume",
        type: "file_upload",
        required: false,
        description:
          "Please upload your resume as a PDF! We do not read resumes as a part of the HBP application process. If you choose to upload your resume, it will be shared with select sponsors who may contact you about internship/job opportunities, and will only be read by them.",
        accept: ["application/pdf"],
      },
      {
        id: "github_url",
        label: "Github URL",
        type: "short_text",
        required: false,
        maxLength: 300,
      },
      {
        id: "linkedin_url",
        label: "LinkedIn URL",
        type: "short_text",
        required: false,
        maxLength: 300,
      },
      {
        id: "portfolio_url",
        label: "Personal website/portfolio URL",
        type: "short_text",
        required: false,
        maxLength: 300,
      },
      {
        id: "tshirt_size",
        label: "What is your t-shirt size?",
        type: "select",
        required: true,
        description:
          "Note: All sizes are unisex, and measurements are across the widest part of the chest!",
        options: [
          { value: "xs", label: "XS" },
          { value: "s", label: "S" },
          { value: "m", label: "M" },
          { value: "l", label: "L" },
          { value: "xl", label: "XL" },
          { value: "2xl", label: "2XL" },
        ],
      },
      {
        id: "accommodations",
        label:
          "Do you require any special accommodations to fully participate in the event? If yes, please list your requested accommodations and the best form of contact so that we can reach out to you. Please fill out this question if you don't have access to a laptop for the event so we can look for arrangements.",
        type: "long_text",
        required: false,
        maxLength: 2000,
      },
      {
        id: "vaccination_card",
        label:
          "Since our hackathon will be in-person, we want to ensure the safety and health of all of our attendees. Please upload a picture or screenshot of your vaccination card.",
        type: "file_upload",
        required: true,
        accept: ["image/png", "image/jpeg"],
      },
    ],
  },
  {
    id: "experience",
    title: "Interests & Experience",
    questions: [
      {
        id: "hackathon_experience",
        label: "How many hackathons have you attended?",
        type: "select",
        required: true,
        options: [
          { value: "0", label: "0" },
          { value: "1-2", label: "1–2" },
          { value: "3-5", label: "3–5" },
          { value: "6+", label: "6+" },
        ],
      },
      {
        id: "cs_classes",
        label: "How many CS classes have you taken or are currently taking?",
        type: "select",
        required: true,
        options: [
          { value: "0", label: "0" },
          { value: "1-2", label: "1–2" },
          { value: "3-5", label: "3–5" },
          { value: "6+", label: "6+" },
        ],
      },
      {
        id: "workshop_interests",
        label:
          "Please indicate which of the following topics you would be interested in attending a workshop about!",
        type: "multi_select",
        required: true,
        description:
          "Disclaimer: This is just for data collection and planning purposes and will NOT impact your application!",
        options: [
          { value: "mobile", label: "Mobile App Development" },
          { value: "web", label: "Web Development" },
          { value: "design", label: "UI/UX" },
          { value: "backend", label: "Backend" },
          { value: "frontend", label: "Frontend" },
          { value: "data_science", label: "Data Science" },
          { value: "cybersecurity", label: "Cybersecurity" },
          { value: "ai_ml", label: "AI/Machine Learning" },
          { value: "product_management", label: "Product Management" },
          { value: "entrepreneurship", label: "Entrepreneurship" },
        ],
      },
      {
        id: "other_disciplines",
        label:
          "Were there any disciplines not listed that you'd be interested in?",
        type: "short_text",
        required: false,
        maxLength: 300,
      },
    ],
  },
  {
    id: "personality",
    title: "Personality Questions",
    questions: [
      {
        id: "goals_long_answer",
        label:
          "At HackBeanpot 2026, we aim to create a welcoming environment where you can meet new friends, learn something new, and ultimately, pursue your goals. In the long term, what are you trying to learn or achieve? Think about personal or career goals, or something else entirely. What steps have you taken in the past to reach those goals, and how will participating in HackBeanpot help?",
        type: "long_text",
        required: true,
        maxWords: 275,
      },
      {
        id: "passion_long_answer",
        label:
          "What's a topic you're really passionate about? It can be anything — your favorite book, a world problem, the color purple, a project idea, or something else. Why should someone else care about it as much as you do?",
        type: "long_text",
        required: true,
        maxWords: 250,
      },
      {
        id: "hackathon_reflection",
        label:
          "Have you attended HackBeanpot previously? If you've attended a hackathon previously, what did you like or dislike about it? If this is your first hackathon, what would you like to see at HackBeanpot?",
        type: "long_text",
        required: true,
        maxWords: 250,
      },
    ],
  },
  {
    id: "team",
    title: "Team Formation",
    description:
      "This question does not get factored into how your application is read! It's for us to plan ahead for team formation; applicants are accepted on an individual basis, and it is not guaranteed that everyone in a premade team will be accepted.",
    questions: [
      {
        id: "premade_team",
        label: "Do you plan on attending HackBeanpot with a premade team?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "team_captain_info",
        label:
          "If yes, please list the first and last name and email of your team captain (captain is just for application purposes!). There is a limit of 5 members per team.",
        type: "short_text",
        required: false,
        maxLength: 300,
      },
    ],
  },
  {
    id: "outreach",
    title: "Outreach",
    questions: [
      {
        id: "referral_source",
        label: "How did you hear about HackBeanpot?",
        type: "multi_select",
        required: true,
        options: [
          { value: "facebook", label: "Facebook" },
          { value: "instagram", label: "Instagram" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "twitter", label: "Twitter" },
          { value: "tiktok", label: "Tiktok" },
          { value: "hbp_email_newsletter", label: "HBP Email/Newsletter" },
          { value: "word_of_mouth", label: "Word of mouth/friends" },
          { value: "hbp_outreach_events", label: "HBP Outreach events" },
          {
            value: "school_communications",
            label: "School communications/newsletter features",
          },
          { value: "other_organization", label: "Other organization" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "referral_other",
        label:
          'If you selected "Other organization" or "Other" above, please specify.',
        type: "short_text",
        required: false,
        maxLength: 300,
      },
    ],
  },
  {
    id: "cabin",
    title: "Cabin Grouping",
    description:
      "Hackers come to HackBeanpot for many reasons. For each of the reasons listed, indicate how important it is to you!",
    questions: [
      {
        id: "cabin_new_friends",
        label: "Making new friends outside of your team",
        type: "select",
        required: true,
        options: CABIN_IMPORTANCE_OPTIONS,
      },
      {
        id: "cabin_workshops",
        label: "Attending technical workshops",
        type: "select",
        required: true,
        options: CABIN_IMPORTANCE_OPTIONS,
      },
      {
        id: "cabin_fun",
        label: "Having fun",
        type: "select",
        required: true,
        options: CABIN_IMPORTANCE_OPTIONS,
      },
      {
        id: "cabin_networking",
        label: "Engaging in professional networking opportunities",
        type: "select",
        required: true,
        options: CABIN_IMPORTANCE_OPTIONS,
      },
      {
        id: "cabin_knowledge_exchange",
        label: "Exchanging technical knowledge with others",
        type: "select",
        required: true,
        options: CABIN_IMPORTANCE_OPTIONS,
      },
      {
        id: "cabin_job_prep",
        label: "Preparing for co-op/internship/job search",
        type: "select",
        required: true,
        options: CABIN_IMPORTANCE_OPTIONS,
      },
    ],
  },
  {
    id: "feedback",
    title: "Core Feedback",
    description:
      "The HackBeanpot Core team is always looking to continue iterating and making this hackathon the best possible experience for everyone! We'd really appreciate it if you took a few minutes to leave some feedback for us :)",
    questions: [
      {
        id: "feedback_comments",
        label:
          "Leave us any comments, questions, or suggestions on this application process!",
        type: "long_text",
        required: false,
        maxLength: 2000,
      },
      {
        id: "feedback_experience",
        label:
          "What can the Core team do to help you have the best experience at HackBeanpot 2026?",
        type: "long_text",
        required: false,
        maxLength: 2000,
      },
    ],
  },
] as const;

export const DEFAULT_FORM_CONFIG: FormConfig = {
  sections: APPLICATION_SECTIONS as unknown as FormConfig["sections"],
};
