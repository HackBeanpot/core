import { getDb } from "../db";
import { SingletonKey } from "../types/singleton";
import { getSingleton, setSingleton } from "./singleton-service";
import { FormConfig } from "./types";
import { DEFAULT_FORM_CONFIG } from "../application/questions";

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

async function getUsedQuestionIds(): Promise<Set<string>> {
  const db = await getDb();

  const collection = db.collection("applicant_data");

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
