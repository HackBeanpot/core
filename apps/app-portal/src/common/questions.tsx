/*
This file is a mapping from question id to QuestionResponses in the application
Serves as a single point of truth for what questions are displayed on application 
frontend & validated on backend
*/
import React, { ReactNode } from 'react';
import countryList from 'iso3166-2-db/countryList/en.json';


import {
  Checkboxes,
  Dropdown,
  Education,
  Familiarity,
  Gender,
  InterestLevel,
  FileUpload,
  LongText,
  NumberOf,
  QuestionDefinition,
  QuestionResponseField,
  QuestionSection,
  QuestionType,
  Race,
  Referrer,
  School,
  ShirtSize,
  ShortText,
  YearOfEducation,
  YesOrNo,
  Lgbtq,
  RadioGroup,
} from './types';

let questionCount = 0;
// constants for min/max length of q + others
const checkboxMinSelectedCount = 0;
const shortTextMinLength = 0;
const shortTextMaxLength = 500;
const longTextMinLength = 0;
const longTextMaxLength = 3000;

// convenience constructors for questions (constructors in java)
export function makeCheckbox(
  field: QuestionResponseField,
  content: ReactNode,
  options: Array<string>,
  required: boolean,
  checkboxMaxSelectedCount: number
): Checkboxes {
  questionCount++;
  return {
    field,
    type: QuestionType.Checkboxes,
    options: options.map((name) => ({ name })),
    maxNumber: checkboxMaxSelectedCount,
    minNumber: checkboxMinSelectedCount,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

export function makeShortText(
  field: QuestionResponseField,
  content: ReactNode,
  required: boolean,
  placeholder?: string
): ShortText {
  questionCount++;
  return {
    field,
    type: QuestionType.ShortText,
    maxLength: shortTextMaxLength,
    minLength: shortTextMinLength,
    placeholder,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

export function makeDropdown(
  field: QuestionResponseField,
  content: ReactNode,
  options: Array<string>,
  required: boolean,
  placeholder?: string
): Dropdown {
  questionCount++;
  return {
    field,
    type: QuestionType.Dropdown,
    options: options.map((name) => ({ name })),
    placeholder,
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

export function makeRadioGroup(
  field: QuestionResponseField,
  content: ReactNode,
  options: Array<string>,
  required: boolean
): RadioGroup {
  questionCount++;
  return {
    field,
    type: QuestionType.RadioGroup,
    options: options.map((name) => ({ name })),
    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

export function makeLongText(
  field: QuestionResponseField,
  content: ReactNode,
  required: boolean
): LongText {
  questionCount++;
  return {
    field,
    type: QuestionType.LongText,
    maxLength: longTextMaxLength,
    minLength: longTextMinLength,

    content: content,
    id: String(questionCount), // need to access questionID from questionidtoquestioncontent
    required: required,
  };
}

/**
 * @param accept file types to accept eg. '.pdf'
 * @param multiple whether or not we can upload multiple files at once
 * @param limit maximum # of files
 */
export function makeFileUpload(
  field: QuestionResponseField,
  content: ReactNode,
  required: boolean,
  accept: string,
  multiple: boolean,
  limit: number,
  submittedText: string
): FileUpload {
  questionCount++;
  return {
    field,
    type: QuestionType.FileUpload,
    content,
    id: String(questionCount),
    required,
    accept,
    multiple,
    limit,
    submittedText,
  };
}

let sectionCount = 0;

const characterRecommendationMessage = '(250 words maximum)';

export function makeSection(text: ReactNode, description?: ReactNode): QuestionSection {
  sectionCount++;
  return {
    id: `section-${sectionCount}`,
    text: <h2>{text}</h2>,
    type: 'SECTION',
    description: description ? description : '',
  };
}

// write questions for portal here
// when adding a new question add the question field to the User type in common/types.ts
export const Sections: Array<QuestionSection | QuestionDefinition> = [
  makeSection(<>Let{"'"}s Get to Know You!</>),
  makeShortText('firstName', 'First name', true, 'First name'),
  makeShortText('preferredName', 'Preferred name', false, 'Preferred name'),

  makeShortText('lastName', 'Last name', true, 'Last name'),
  makeShortText('age', 'Age', true, 'Age'),
  makeShortText('homeTown', 'Home Town', true, 'ex: Boston'),
  makeDropdown('countryOfResidence',
    'Country Of Residence', 
    Object.values(countryList).map(country => country.name).sort((a, b) => a.localeCompare(b)),
    true, 
    'Country of Residence'),
  makeShortText('phoneNumber', 'Phone Number', true, 'Phone Number'),

  makeSection(
    <>Demographics</>,
    <p>
      None of the information in your application will be publicly shared except for your resume (if
      you opt in to share that with us). Your application will only be used to track our diversity,
      equity and inclusion efforts.
    </p>
  ),
  makeShortText(
    'pronouns',
    <div>
      <p>
        <br />
        Pronouns
        <br />
        <i>Your pronouns will not be shared publicly or to companies.</i>
      </p>
    </div>,
    true,
    'Pronouns'
  ),
  makeDropdown(
    'gender',
    <div>
      <p>
        <br />
        What is your gender?
        <br />
        <i>Your gender identity will not be shared publicly or to companies.</i>
      </p>
    </div>,
    Object.values(Gender),
    true,
    'Gender'
  ),
  makeShortText('unlistedGender', "If your gender isn't listed above, list it here!", false),
  makeDropdown(
    'lgbtq',
    <div>
      <p>
        <br />
        Do you identify as part of the LGBTQIA+ community??
        <br />
        <i>Your orientation will not be shared publicly or to companies.</i>
      </p>
    </div>,
    Object.values(Lgbtq),
    true,
    'Identify'
  ),
  makeShortText('lgbtqIdentity', "If you said yes to the question above, how do you identify yourself?", false),
  makeCheckbox('races', 'What race(s) do you identify as?', Object.values(Race), true, 8),

  makeShortText('unlistedRace', "If your race(s) aren't listed above, list it here!", false),
  makeDropdown('school', 'What school do you attend?', Object.values(School), true, 'School'),
  makeShortText(
    'unlistedSchool',
    'If your school was not listed in the previous question, list it here! (Please input full name of university)',
    false
  ),
  makeDropdown(
    'education',
    'What level of education are you currently pursuing?',
    Object.values(Education),
    true,
    'Level'
  ),
  makeDropdown(
    'yearOfEducation',
    'What year in your current education are you?',
    Object.values(YearOfEducation),
    true,
    'Year'
  ),
  makeShortText(
    'majors',
    'What are your major / concentration(s)? (N/A if not applicable)',
    true,
    'Computer Science, etc.'
  ),
  makeShortText('minors', 'What are your minor(s)?', false, 'Interaction Design, etc.'),
  makeFileUpload(
    'resumeLink',
    <div>
      <p>
        Please upload your resume as a PDF! We do not read resumes as a part of the HBP application
        process. The resumes are shared with interested sponsors who may contact you about
        internship/job opportunities, and will only be read by them. Here is a Google doc template 
        to help you get started if you don't have a resume yet:{' '}
        <a 
          href="https://docs.google.com/document/d/1vOdGOeGk5XTKL4Zu-9lctJKbDfC1zIVSKO2xowXnC3Q/edit"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1890ff', textDecoration: 'underline' }}
        >
          Google Docs Resume Template
        </a>
      </p>
    </div>,
    true,
    '.pdf',
    false,
    1,
    "You've already submitted a resume, but feel free to upload another one! (This will replace the old resume you've submitted.)"
  ),

  makeShortText('github', 'Github Url', false, 'ex: github.com/HackBeanpot'),
  makeShortText('linkedIn', 'LinkedIn Url', false, 'ex: linkedin.com/company/hackbeanpot-inc'),
  makeShortText('personalWebsite', 'Personal Website / Portfolio Url', false),

  makeDropdown(
    'shirtSize',
    <div>
      What is your t-shirt size? (Note: All sizes are unisex, 
      and measurements are across the widest part of the chest!){' '}
    </div>,
    Object.values(ShirtSize),
    true,
    'Size'
  ),
  makeLongText(
    'accomodations',
    <div>
      <p>
        Do you require any special accommodations to fully participate in the event? If yes, please
        list your requested accomodations and the best form of contact so that we can reach out to
        you.
      </p>
      <i>
        Please fill out this question if you don’t have access to a laptop for the event so we can
        look for arrangements.
      </i>
    </div>,
    false
  ),
  makeSection(<>Interests and Experience</>),
  makeDropdown(
    'hackathonsAttended',
    'How many hackathons have you attended?',
    [NumberOf.Zero, NumberOf.OneToTwo, NumberOf.ThreeToFive, NumberOf.SixOrAbove],
    true,
    'Count'
  ),
  makeDropdown(
    'csClassesTaken',
    'How many CS classes have you taken or are currently taking?',
    [NumberOf.Zero, NumberOf.OneToTwo, NumberOf.ThreeToFive, NumberOf.SixOrAbove],
    true,
    'Count'
  ),
  makeSection(
    <></>,
    <i>
      For each of the following CS disciplines, please rate your familiarity from (completely
      unfamiliar, very basic knowledge, proficient, expert)
      <br/>
      Disclaimer: This is just for data collection and workshop ideation purposes and will 
      NOT impact your application (so be honest)!
    </i>
  ),
  makeRadioGroup(
    'mobileAppDevelopmentFamiliarity',
    'Mobile App Development',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'webDevelopmentFamiliarity',
    'Web Development',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'uiUxFamiliarity',
    'UI / UX',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'backendFamiliarity',
    'Backend',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'frontendFamiliarity',
    'Frontend',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'dataScienceFamiliarity',
    'Data Science',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'cybersecurityFamiliarity',
    'Cybersecurity',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'ai',
    'AI/Machine Learning',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'productManagement',
    'Product Management',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeRadioGroup(
    'entrepreneurship',
    'Entrepreneurship',
    [
      Familiarity.CompletelyUnfamiliar,
      Familiarity.VeryBasicKnowledge,
      Familiarity.Proficient,
      Familiarity.Expert,
    ],
    true
  ),
  makeSection(<></>, <i>Which CS disciplines are you interested in learning more about?</i>),
  makeRadioGroup(
    'mobileAppDevelopmentInterestLevel',
    'Mobile App Development',
    Object.values(InterestLevel),
    true
  ),
  makeRadioGroup(
    'webDevelopmentInterestLevel',
    'Web Development',
    Object.values(InterestLevel),
    true
  ),
  makeRadioGroup('uiUxInterestLevel', 'UI / UX', Object.values(InterestLevel), true),
  makeRadioGroup('backendInterestLevel', 'Backend', Object.values(InterestLevel), true),
  makeRadioGroup('frontendInterestLevel', 'Frontend', Object.values(InterestLevel), true),
  makeRadioGroup('dataScienceInterestLevel', 'Data Science', Object.values(InterestLevel), true),
  makeRadioGroup('cybersecurityInterestLevel', 'Cybersecurity', Object.values(InterestLevel), true),
  makeRadioGroup('aiInterestLevel', 'AI/Machine Learning', Object.values(InterestLevel), true),
  makeRadioGroup(
    'productManagementInterestLevel',
    'Product Management',
    Object.values(InterestLevel),
    true
  ),
  makeRadioGroup(
    'entrepreneurshipInterestLevel',
    'Entrepreneurship',
    Object.values(InterestLevel),
    true
  ),
  makeShortText(
    'unlistedWorkshops',
    'Were there any disciplines not listed that you’d be interested in?',
    false
  ),
  makeLongText(
    'hackBeanGoals',
    <div>
      <p>
        At HackBeanpot 2025, we aim to create a welcoming environment by focusing on exploration into the unknown, community, and growth! Heading out on a hike means embracing every climb, every twist in the trail, and all the unexpected moments that make the journey unforgettable.
      </p>
      <p>
      Whether you’re hiking solo or traveling with friends, each step brings you closer to new discoveries and deeper connections. What do you hope to get out of HackBeanpot? Do you have a specific project you’d like to pursue? What do you want to walk away having learned or experienced from this weekend?
      </p>
      {characterRecommendationMessage}
    </div>,
    true
  ),
  makeLongText(
    'tedTalkTopic',
    <div>
      <p>
       Where people see problems, hackers/entrepreneurs see solutions! Is there an issue you’ve been itching to resolve? If you had to give a thirty minute TED talk on any subject to solve a world problem, what would it be and why?
      </p>
      {characterRecommendationMessage}
    </div>,
    true
  ),
  makeLongText(
    'prevHackathonFeedback',
    `Have you attended HackBeanpot previously? If you’ve attended a hackathon previously, what did you like or dislike about it? If this is your first hackathon, what would you like to see at HackBeanpot? `,
    false
  ),
  makeSection(
    <>Team Formation</>,
    <i>
      *Note: This question does not get factored into how your application is read! This question is
      for us to plan ahead for team formation; applicants are accepted on an individual basis, and
      it is not guaranteed that everyone in a premade team will be accepted. <br></br>
      To connect with your fellow prospective hackers, please join the{' '}
      <a 
        href="https://discord.gg/QypjXeYb" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: '#1890ff', textDecoration: 'underline' }}
      >
        Discord! 
      </a>
    </i>
  ),
  makeLongText(
    'premadeTeam',
    <p>
      Do you plan on attending HackBeanpot with a premade team? If yes,
      <b> please list the first and last name and email of your team captain (captain is just for application purpose!). </b> 
      Please note, team formations will not be finalized until the day of the event!
    </p>,
    true
  ),
  makeLongText(
    'plannedProjectIdea',
    `What are you planning to work on?
  This doesn't have to be a final idea! We just want to know what you're thinking of working on. This can include a specific API you want to work with, an idea for a new app you want to build, or a general area of tech you're looking to learn more about.`,
    false
  ),
  makeDropdown(
    'interestedInTeamFormation',
    <p>
      If you don’t have a team or would like to add more members to your team, we will have a
      <b> project ideation session and team formation activity </b> we’d love for you to attend. In
      the question below, if you express interest in finding a team at the event we will reach out
      closer to the event with more details.
      <br />
      Would you be interested in creating a team or finding more members for your current team at
      our team formation event?
    </p>,
    [YesOrNo.Yes, YesOrNo.No],
    true,
    'Interested'
  ),
  makeSection(<>Outreach</>),
  makeCheckbox(
    'referrers',
    'We want to know how best to reach talented students like you! How did you hear about HackBeanpot?',
    [
      Referrer.Facebook,
      Referrer.Instagram,
      Referrer.LinkedIn,
      Referrer.Twitter,
      Referrer.Medium,
      Referrer.EmailOrNewsletter,
      Referrer.WordOfMouth,
      Referrer.OutreachEvents,
      Referrer.SchoolCommunications,
      Referrer.Other,
    ],
    true,
    10
  ),

  makeSection(
    <>Core Feedback</>,
    <i>
      The HackBeanpot Core team is always looking to continue iterating and making this hackathon
      the best possible experience for everyone! We’d really appreciate it if you took a few minutes
      to leave some feedback for us :)
    </i>
  ),
  makeLongText(
    'questionsToAdd',
    'Are there any questions you think we should have asked in this application?',
    false
  ),
  makeLongText(
    'commentsQuestionsSuggestions',
    'Leave us any comments, questions, or suggestions on this application process!',
    false
  ),
  makeLongText(
    'howCanCoreTeamHelp',
    'What can the Core team do to help you have the best experience at HackBeanpot 2024?',
    false
  ),
  makeSection(<>Code of Conduct and Policy</>),
  makeDropdown(
    'mlhCodeOfConduct',
    <p>
      I have read and agree to the{' '}
      <a 
        href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: '#1890ff', textDecoration: 'underline' }}
      >
        MLH Code of Conduct
      </a>
    </p>,
    [YesOrNo.Yes, YesOrNo.No],
    true
  ),
  makeDropdown(
    'mlhApplicationSharingAuthorization',
   <p>
      I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the{' '}
      <a 
        href="https://mlh.io/privacy" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: '#1890ff', textDecoration: 'underline' }}
      >
        MLH Privacy Policy
      </a>

      . I further agree to the terms of both the{' '}
      <a 
        href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: '#1890ff', textDecoration: 'underline' }}
      >
        MLH Contest Terms and Conditions
      </a>
      
      {' '}and the{' '}
      <a 
        href="https://mlh.io/privacy" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: '#1890ff', textDecoration: 'underline' }}
      >
        MLH Privacy Policy
      </a>
    </p>
   , 
   [YesOrNo.Yes, YesOrNo.No],
    true
  ),
  makeDropdown(
    'mlhMarketingAuthorization',
    'I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.',
    Object.values(YesOrNo),
    false
  ),
];

const filterQuestion = (q: QuestionSection | QuestionDefinition): q is QuestionDefinition => {
  return q.type !== 'SECTION';
};

export const Questions: Array<QuestionDefinition> = Sections.filter(filterQuestion);

// when adding a new question add the question field to the User type in common/types.ts
// TODO: CHANGE OUT CABIN SORTING - not doing that this year
export const PostAcceptanceFormSections: Array<QuestionSection | QuestionDefinition> = [
  makeSection(
    <>Post-Acceptance Form</>,
    <div>
      <p>
        Congrats on being accepted to HackBeanpot! We{"'"}re so excited to see you soon. Please
        answer the following questions to help us finalize logistics of making the event as great as
        it can be for our attendees!
      </p>
    </div>
  ),
  makeShortText('firstName', 'First name', true, 'First name'),
  makeShortText('lastName', 'Last name', true, 'Last name'),
  makeDropdown('adult', 'Are you 18 years of age or older?', ['Yes', 'No'], true, 'Yes'),
  makeSection(
    <>Above 18 Signature</>,
    'Complete this section only if you are above 18 years of age. If you are not, type in "N/A" and complete the following section accompanied by a parent or guardian.'
  ),
  makeShortText(
    'adultSignature',
    <div>
      <p>
        By typing my full legal name below, I acknowledge that this represents my legal signature
        and that I have read and agreed to the terms and conditions stated in the Participant
        Waiver.
      </p>
      PARTICIPANT WAIVER:{' '}
      <a href="http://bit.ly/3XjlJEz" target="_blank" rel="noreferrer">
        bit.ly/3XjlJEz
      </a>
    </div>,
    true,
    'First Last'
  ),
  makeSection(
    <>Under 18 Signature</>,
    'Complete this section only if you are under 18 years of age. If you are 18 years of age or over, mark "N/A" for both fields.'
  ),
  makeShortText(
    'minorSignature',
    <div>
      <p>
        Attendee: I acknowledge that I am above 13 and that I have read and agreed to the terms and
        conditions stated in the Participant Waiver.
      </p>
      PARTICIPANT WAIVER:{' '}
      <a href="http://bit.ly/3XjlJEz" target="_blank" rel="noreferrer">
        bit.ly/3XjlJEz
      </a>
    </div>,
    true,
    'First Last'
  ),
  makeShortText(
    'guardianSignature',
    'Guardian: I acknowledge that I am above 18 years of age. I have read and agreed to the terms and conditions stated in the Participant Waiver and will make sure the attendee follows the platform usage defined in the Media & Platform Release.',
    true,
    'First Last'
  ),
];

export const PostAcceptanceFormQuestions = PostAcceptanceFormSections.filter(filterQuestion);
