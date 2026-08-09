import { SingletonKey } from "../types/singleton";

export type DateSingletonValue = string | null;
export type BooleanSingletonValue = boolean;

export type SingletonValue<K extends SingletonKey> = K extends "show-decision"
  ? BooleanSingletonValue
  : K extends "form-config"
    ? FormConfig
    : DateSingletonValue;

export interface FormConfigQuestion {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: string[];
  order?: number;
}

export interface FormConfigSection {
  id: string;
  title: string;
  questions: FormConfigQuestion[];
}

export interface FormConfig {
  sections: FormConfigSection[];
}
