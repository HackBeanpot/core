import { FormConfig } from "../admin/types";
import type { FormSection } from "./types";

// HackBeanpot 2027 registration questions. This is the code-level default — the
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
        label: "What is your race and/or ethnicity?",
        type: "multi_select",
        required: true,
        description: "Select all that apply.",
        options: [
          {
            value: "indigenous_american_or_alaska_native",
            label: "American Indian or Alaska Native",
          },
          { value: "asian", label: "Asian" },
          {
            value: "black_or_african_american",
            label: "Black or African American",
          },
          { value: "hispanic_or_latinx", label: "Hispanic or Latino" },
          {
            value: "middle_eastern_or_north_african",
            label: "Middle Eastern or North African",
          },
          {
            value: "native_hawaiian_or_pacific_islander",
            label: "Native Hawaiian or Pacific Islander",
          },
          { value: "white", label: "White" },
          {
            value: "unlisted",
            label: "Another race or ethnicity / Self-describe",
          },
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
        label:
          "What school do you attend? Input the full name (e.g. Massachusetts Institute of Technology, Boston University)",
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
        id: "is_undergraduate",
        label:
          "Are you an undergraduate student? You must be an undergraduate student to partake in HBP.",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
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
          "Please upload your resume as a PDF! We do not read resumes as a part of the HBP application process. If you choose to upload your resume, it will be shared with select sponsors who may contact you about internship/job opportunities, and will only be read by them. Here is a Google doc template to help you get started if you don't have a resume yet: Google Docs Resume Template",
        accept: ["application/pdf"],
      },
      {
        id: "github_url",
        label: "Github url",
        type: "short_text",
        required: false,
        maxLength: 300,
      },
      {
        id: "linkedin_url",
        label: "LinkedIn url",
        type: "short_text",
        required: false,
        maxLength: 300,
      },
      {
        id: "portfolio_url",
        label: "Personal website/portfolio url",
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
        type: "short_text",
        required: false,
        maxLength: 2000,
      },
      {
        id: "dietary_restrictions",
        label:
          "Our hackathon provides meals for all hackers throughout the weekend. Do you have any dietary restrictions or food allergies?",
        type: "multi_select",
        required: false,
        description: "Select all that apply.",
        options: [
          { value: "none", label: "No dietary restrictions" },
          { value: "vegetarian", label: "Vegetarian" },
          { value: "vegan", label: "Vegan" },
          { value: "pescatarian", label: "Pescatarian" },
          { value: "halal", label: "Halal" },
          { value: "kosher", label: "Kosher" },
          { value: "gluten_free", label: "Gluten-free / Celiac" },
          { value: "dairy_free", label: "Dairy-free / Lactose intolerant" },
          { value: "peanut_allergy", label: "Peanut allergy" },
          { value: "tree_nut_allergy", label: "Tree nut allergy" },
          { value: "shellfish_allergy", label: "Shellfish allergy" },
          { value: "prefer_not_to_say", label: "Prefer not to say" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "dietary_other",
        label: 'If you selected "Other" above, please specify.',
        type: "short_text",
        required: false,
        maxLength: 300,
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
        id: "workshop_interests",
        label:
          "Please indicate what topics you would be interested in attending a workshop about! This can be professional career related, technical workshops, etc.",
        type: "short_text",
        required: true,
        description:
          "Disclaimer: This is just for data collection and planning purposes and will NOT impact your application!",
        maxLength: 500,
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
          "Goals: At HackBeanpot 2027, we aim to create a welcoming environment where you can meet new friends, learn something new, and ultimately, pursue your goals. What is a goal you have and how would participating in HackBeanpot help with that?",
        type: "long_text",
        required: true,
        maxWords: 250,
      },
      {
        id: "passion_long_answer",
        label:
          "Passion: Tell us about a project, hobby, idea, or obsession you could talk about for hours.",
        type: "long_text",
        required: true,
        maxWords: 250,
      },
      {
        id: "vision_long_answer",
        label:
          "Vision: Describe a problem you'd want to solve with technology.",
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
      "Note: This question does not get factored into how your application is read! This question is for us to plan ahead for team formation; applicants are accepted on an individual basis, and it is not guaranteed that everyone in a premade team will be accepted.",
    questions: [
      {
        id: "premade_team",
        label: "Do you plan on attending HackBeanpot with a premade team?",
        type: "select",
        required: true,
        description:
          "If you don't have a team or would like to add more members to your team, we will have a team formation activity during the hackathon and a Discord channel that will open in advance!",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        id: "team_members",
        label:
          "If yes, please list their first and last names. Please note, there is no guarantee that all members of your team will be accepted. Also, there is a limit of 5 members per team.",
        type: "short_text",
        required: false,
        maxLength: 500,
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
          { value: "facebook", label: "HBP social media: Facebook" },
          { value: "instagram", label: "HBP social media: Instagram" },
          { value: "linkedin", label: "HBP social media: LinkedIn" },
          { value: "twitter", label: "HBP social media: Twitter" },
          { value: "tiktok", label: "HBP social media: Tiktok" },
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
          "What can the Core team do to help you have the best experience at HackBeanpot 2027?",
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
