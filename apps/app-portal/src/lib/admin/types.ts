import { SingletonKey } from "./singleton-keys";

export type DateSingletonValue = string | null;
export type BooleanSingletonValue = boolean;

export type SingletonValue<K extends SingletonKey> = K extends "show-decision"
  ? BooleanSingletonValue
  : DateSingletonValue;

export interface FormConfigQuestion {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "checkbox";
  required?: boolean;
}

export interface FormConfigSection {
  id: string;
  title: string;
  questions: FormConfigQuestion[];
}

export interface FormConfig {
  sections: FormConfigSection[];
}
