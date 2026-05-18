import { FormConfig } from "./types";

let mockFormConfig: FormConfig = {
  sections: [
    {
      id: "personal-info",
      title: "Personal Information",
      questions: [
        {
          id: "first-name",
          label: "First Name",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export async function getFormConfig(): Promise<FormConfig> {
  return mockFormConfig;
}

export async function updateFormConfig(config: FormConfig): Promise<void> {
  mockFormConfig = config;
}
