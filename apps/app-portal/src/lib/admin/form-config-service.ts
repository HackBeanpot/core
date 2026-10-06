import { getDb, resolveCollectionName } from "@/lib/db";
import { SingletonKey } from "@/lib/types/singleton";
import { DEFAULT_FORM_CONFIG } from "@/lib/application/questions";
import { getSingleton, setSingleton } from "./singleton-service";
import { FormConfig } from "./types";

function getQuestionIds(config: FormConfig): Set<string> {
  const ids = new Set<string>();

  for (const section of config.sections) {
    for (const question of section.questions) {
      ids.add(question.id);
    }
  }

  return ids;
}

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

// Without this, POSTing {"sections": []} (or sections that are all empty) passes every
// other check — no duplicate IDs, no in-use IDs removed — and silently wipes the live
// application form down to zero questions.
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

async function getUsedQuestionIds(): Promise<Set<string>> {
  const db = await getDb();

  const collection = db.collection(resolveCollectionName("applicant_data"));

  const applicants = await collection
    .find({})
    .project({
      applicationResponses: 1,
    })
    .toArray();

  const usedIds = new Set<string>();

  for (const applicant of applicants) {
    const responses = applicant.applicationResponses ?? {};

    Object.keys(responses).forEach((id) => {
      usedIds.add(id);
    });
  }

  return usedIds;
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

  const newQuestionIds = getQuestionIds(config);

  const usedQuestionIds = await getUsedQuestionIds();

  for (const id of usedQuestionIds) {
    if (!newQuestionIds.has(id)) {
      throw new Error(
        `Cannot remove question "${id}" because applicants have responses for it.`,
      );
    }
  }

  await setSingleton(SingletonKey.FormConfig, config, updatedBy);
}
