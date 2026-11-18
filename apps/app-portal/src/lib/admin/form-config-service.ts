import { SingletonKey } from "@/lib/types/singleton";
import { DEFAULT_FORM_CONFIG } from "@/lib/application/questions";
import { getSingleton, setSingleton } from "./singleton-service";
import { FormConfig } from "./types";

function validateUniqueQuestionIds(config: FormConfig): void {
  const ids = new Set<string>();

  for (const section of config.sections) {
    for (const question of section.questions) {
      if (ids.has(question.id)) {
        throw new Error(`Duplicate question ID: ${question.id}`);
      }

      ids.add(question.id);
    }
  }
}

// Without this, POSTing {"sections": []} (or sections that are all empty) passes the
// duplicate-ID check and silently wipes the live application form down to zero questions.
function validateNotEmpty(config: FormConfig): void {
  const totalQuestions = config.sections.reduce(
    (sum, section) => sum + section.questions.length,
    0,
  );
  if (config.sections.length === 0 || totalQuestions === 0) {
    throw new Error(
      "Form config must have at least one section with at least one question.",
    );
  }
}

// The admin editor blocks this too, but a select/multi_select with no options can't be
// answered — and if it's required, no applicant can submit — so reject it here as well.
function validateChoiceOptions(config: FormConfig): void {
  for (const section of config.sections) {
    for (const question of section.questions) {
      const isChoice =
        question.type === "select" || question.type === "multi_select";
      if (isChoice && !question.options?.length) {
        throw new Error(
          `Question "${question.label}" needs at least one option.`,
        );
      }
    }
  }
}

export async function getFormConfig(): Promise<FormConfig> {
  const config = await getSingleton(SingletonKey.FormConfig);

  if (config) {
    return config;
  }

  return DEFAULT_FORM_CONFIG;
}

export async function updateFormConfig(
  config: FormConfig,
  updatedBy: string,
): Promise<void> {
  validateNotEmpty(config);
  validateUniqueQuestionIds(config);
  validateChoiceOptions(config);

  await setSingleton(SingletonKey.FormConfig, config, updatedBy);
}
