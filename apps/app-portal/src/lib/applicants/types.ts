import type {
  ApplicationStatus,
  DecisionStatus,
  RsvpStatus,
} from "@/lib/types/user";
import type {
  ApplicationResponse,
  PostAcceptanceResponse,
} from "@/lib/types/application";

export interface ApplicantSummary {
  id: string;
  email: string;
  name?: string;
  applicationStatus: ApplicationStatus;
  decisionStatus?: DecisionStatus;
  rsvpStatus: RsvpStatus;
  appSubmissionTime?: string;
}

export interface ApplicantDetail extends ApplicantSummary {
  applicationResponses?: ApplicationResponse;
  postAcceptanceResponses?: PostAcceptanceResponse;
  rsvpSubmissionTime?: string;
}

export interface ApplicantFilters {
  search?: string;
  applicationStatus?: ApplicationStatus;
  decisionStatus?: DecisionStatus;
}

export interface ApplicantUpdate {
  decisionStatus?: DecisionStatus;
  rsvpStatus?: RsvpStatus;
}

export interface ApplicantListResult {
  rows: ApplicantSummary[];
  total: number;
  page: number;
  pageSize: number;
}
