import {
  ApplicationStatus,
  Checkboxes,
  Dropdown,
  Education,
  Gender,
  LongText,
  QuestionDefinition,
  QuestionType,
  Race,
  RegistrationApiRequest,
  RSVPStatus,
  ShirtSize,
  ShortText,
  User,
} from "./types";

export const RESPONSE_BY_DATE = new Date("02/01/2023"); // TODO: MAKE SINGLETON IN DB

export const EXAMPLE_GENDER = Gender.Female;
export const EXAMPLE_EDUCATION = Education.UndergraduateUniversity2;
export const EXAMPLE_ETHNICITIES = [Race.Asian];
export const EXAMPLE_SHIRTSIZE = ShirtSize.Small;
export const EXAMPLE_APPLICATION_STATUS = ApplicationStatus.Submitted;

export const WELCOME_MESSAGE = "Welcome to the Application Portal!";
export const REJECTION_MESSAGE =
  "Unfortunately, we were not able to accept your application" +
  "for the 2023 HackBeanpot Hackathon.";
/**
 * example json User to use for now
 */
export const EXAMPLE_USER_ID = "user12231";
export const EXAMPLE_USER: User = {
  email: "judysu@gmail.com",
  applicationStatus: EXAMPLE_APPLICATION_STATUS,
  isAdmin: true,
  rsvpStatus: RSVPStatus.Unconfirmed,
  applicationResponses: {},
};
export const EXAMPLE_RESPONSE: RegistrationApiRequest = {
  fields: ["firstName", "races"],
  responses: ["Judy Su", EXAMPLE_ETHNICITIES],
};
export const EXAMPLE_CHECKBOX_1: Checkboxes = {
  field: "mlhCodeOfConduct",
  id: "1",
  content: "Who is the sassiest?",
  required: true,
  type: QuestionType.Checkboxes,
  options: [
    { name: "Alex" },
    { name: "Jess" },
    { name: "Jamie" },
    { name: "Karen" },
  ],
  maxNumber: 1,
  minNumber: 1,
};
export const EXAMPLE_SHORT_TEXT_1: ShortText = {
  field: "tedTalkTopic",
  id: "2",
  content: "What's your favorite food?",
  required: false,
  type: QuestionType.ShortText,
  minLength: 3,
  maxLength: 5,
};

// with arrays, dropdown, has to be one of 5 choices, ORMAP over options to see if
// at least one of the options is equal to the response
// make function that validates a function
export const EXAMPLE_DROPDOWN_1: Dropdown = {
  field: "school",
  id: "3",
  content: "What's your favorite color?",
  required: true,
  type: QuestionType.Dropdown,
  options: [
    { name: "blue" },
    { name: "green" },
    { name: "purple" },
    { name: "orange" },
    { name: "pink" },
  ],
};
export const EXAMPLE_LONG_TEXT_1: LongText = {
  field: "hackBeanGoals",
  id: "4",
  content: "Why do you want to participate in Hackbeanpot?",
  required: true,
  type: QuestionType.LongText,
  minLength: 2,
  maxLength: 4,
};

// switch case where you check the type, then you can check it's required (same for all qs)
// if required == true, and response is null -> return 404
// if response valid, keep going, then check if answer type matches expected answer type
// response is string? -> good then keep going, if length of string in boundaries

export const EXAMPLE_QUESTIONS: Array<QuestionDefinition> = [
  EXAMPLE_CHECKBOX_1,
  EXAMPLE_SHORT_TEXT_1,
  EXAMPLE_DROPDOWN_1,
  EXAMPLE_LONG_TEXT_1,
];

export const ADMIN_TABS = {
  VIEW_STATS: "View Stats",
  CONFIGURE_PORTAL_SETTINGS: "Configure Portal Settings",
  VIEW_AND_MODIFY_APPLICANTS: "View / Modify Applicants",
};
