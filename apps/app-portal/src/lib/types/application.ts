export type ApplicationResponse = Record<string, string | string[] | number | boolean | null>;

export type PostAcceptanceResponse = Record<string, string | string[] | number | boolean | null>;

export interface RegistrationPayload {
  responses: ApplicationResponse;
  isSubmit: boolean;
  resumeUrl?: string;
}

export interface RsvpPayload {
  responses: PostAcceptanceResponse;
  attending: boolean;
}
