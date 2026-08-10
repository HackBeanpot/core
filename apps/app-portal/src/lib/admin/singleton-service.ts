import { getDb } from "@/lib/db";
import { SingletonKey, SingletonRecord } from "@/lib/types/singleton";
import { FormConfig, SingletonValue } from "./types";

type SingletonMap = {
  "registration-open": string;
  "registration-closed": string;
  "confirm-by": string;
  "show-decision": boolean;
  "form-config": FormConfig;
};

export async function getSingleton<K extends SingletonKey>(
  key: K,
): Promise<SingletonMap[K] | null> {
  const db = await getDb();
  const collection = db.collection<SingletonRecord>("singleton_data");

  const doc = await collection.findOne({
    _id: key,
  });

  if (!doc) {
    return null;
  }

  return doc.value as SingletonMap[K];
}

export async function setSingleton<K extends SingletonKey>(
  key: K,
  value: SingletonValue<K>,
  updatedBy: string,
): Promise<void> {
  const db = await getDb();
  const collection = db.collection<SingletonRecord>("singleton_data");

  await collection.updateOne(
    { _id: key },
    {
      $set: {
        key,
        value,
        updatedAt: new Date(),
        updatedBy,
      },
    },
    {
      upsert: true,
    },
  );
}

export function validateDateSingleton(
  value: unknown,
): { ok: true; value: string } | { ok: false; error: string } {
  if (typeof value !== "string") {
    return {
      ok: false,
      error: "Value must be a string.",
    };
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return {
      ok: false,
      error: "Value is not a valid date.",
    };
  }

  const normalized = date.toISOString();

  // if (value !== normalized) {
  //   return {
  //     ok: false,
  //     error: "Value must be an ISO 8601 date string.",
  //   };
  // }

  return {
    ok: true,
    value: normalized,
  };
}

export function validateBooleanSingleton(
  value: unknown,
): { ok: true; value: boolean } | { ok: false; error: string } {
  if (typeof value !== "boolean") {
    return {
      ok: false,
      error: "Value must be a boolean.",
    };
  }

  return {
    ok: true,
    value,
  };
}
