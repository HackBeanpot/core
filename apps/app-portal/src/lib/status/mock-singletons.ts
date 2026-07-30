import type { ApplicantStatus, DecisionDates } from "./types";

// Pre registration
// export const mockApplicantStatus: ApplicantStatus = {
//   userId: "mock-user",
//   applicationStatus: "in-progress",
//   decisionStatus: "pending",
//   rsvpStatus: "not-submitted",
// };

// export const decisionDates = {
//   registrationOpen: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // opens in 7 days
//   showDecision: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//   confirmBy: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
// };

// In progress
// export const mockApplicantStatus = {
//   userId: "mock-user",
//   applicationStatus: "in-progress",
//   decisionStatus: "pending",
//   rsvpStatus: "not-submitted",
// };

// export const decisionDates = {
//   registrationOpen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//   showDecision: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
//   confirmBy: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
// };

// Submitted
// export const mockApplicantStatus = {
//   userId: "mock-user",
//   applicationStatus: "submitted",
//   decisionStatus: "pending",
//   rsvpStatus: "not-submitted",
// };

// export const decisionDates = {
//   registrationOpen: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
//   showDecision: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//   confirmBy: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
// };

//Admiited

// export const mockApplicantStatus = {
//   userId: "mock-user",
//   applicationStatus: "submitted",
//   decisionStatus: "admitted",
//   rsvpStatus: "not-submitted",
// };

// export const decisionDates = {
//   registrationOpen: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
//   showDecision: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//   confirmBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // RSVP open
// };

// Waitlisted
// export const mockApplicantStatus = {
//   userId: "mock-user",
//   applicationStatus: "submitted",
//   decisionStatus: "waitlisted",
//   rsvpStatus: "not-submitted",
// };

// export const decisionDates = {
//   registrationOpen: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
//   showDecision: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
//   confirmBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
// };

//Declined
// Admitted (mock)
export const mockApplicantStatus: ApplicantStatus = {
  userId: "mock-user",
  applicationStatus: "submitted",
  decisionStatus: "admitted",
  rsvpStatus: "unconfirmed",
};

export const decisionDates: DecisionDates = {
  // registration opened in the past
  registrationOpen: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
  // showDecision happened recently
  showDecision: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  // confirmBy is in the future so RSVP is open
  confirmBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
};
