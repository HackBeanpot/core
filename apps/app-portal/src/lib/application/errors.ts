import type { z } from "zod";

export interface FieldError {
  path: string;
  message: string;
}

export class ValidationError extends Error {
  readonly issues: FieldError[];

  constructor(zodError: z.ZodError) {
    super("Validation failed");
    this.name = "ValidationError";
    this.issues = zodError.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }
}

export class RegistrationNotOpenError extends Error {
  constructor() {
    super("Registration is not open yet.");
    this.name = "RegistrationNotOpenError";
  }
}

export class RegistrationClosedError extends Error {
  constructor() {
    super("Registration is closed.");
    this.name = "RegistrationClosedError";
  }
}

export class AlreadySubmittedError extends Error {
  constructor() {
    super("This application has already been submitted.");
    this.name = "AlreadySubmittedError";
  }
}
