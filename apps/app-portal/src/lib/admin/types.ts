import { SingletonKey } from "../types/singleton";
import type { FormSection, Question } from "../application/types";

export type DateSingletonValue = string | null;
export type BooleanSingletonValue = boolean;

export type SingletonValue<K extends SingletonKey> = K extends "show-decision"
  ? BooleanSingletonValue
  : K extends "form-config"
    ? FormConfig
    : DateSingletonValue;

// The admin-editable form config and the live applicant-facing application form (schema
// generation, rendering, autosave/submit validation — see lib/application/*) share this exact
// same shape. They used to diverge (a leaner "text"/"textarea"/"select"/"checkbox" shape here
// vs. the richer Question/FormSection used everywhere else), which meant editing the form in
// /admin/settings had no effect on what applicants actually saw. Aliasing them here keeps that
// from happening again.
export type FormConfigQuestion = Question;
export type FormConfigSection = FormSection;

export interface FormConfig {
  sections: FormConfigSection[];
}
