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

  return {
    ok: true,
    value: normalized,
  };
}

/**
 * Cross-checks a proposed date singleton against the other two (registrationOpen ≤
 * registrationClosed ≤ confirmBy) so an admin can't independently set one date route
 * into an order that breaks downstream eligibility-window logic (e.g. closing
 * registration before it opens, or confirm-by before registration even closes).
 */
export async function validateDateOrdering(
  key: SingletonKey,
  newValue: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const [registrationOpen, registrationClosed, confirmBy] = await Promise.all([
    key === SingletonKey.RegistrationOpen
      ? newValue
      : getSingleton(SingletonKey.RegistrationOpen),
    key === SingletonKey.RegistrationClosed
      ? newValue
      : getSingleton(SingletonKey.RegistrationClosed),
    key === SingletonKey.ConfirmBy
      ? newValue
      : getSingleton(SingletonKey.ConfirmBy),
  ]);

  if (
    registrationOpen &&
    registrationClosed &&
    new Date(registrationOpen) > new Date(registrationClosed)
  ) {
    return {
      ok: false,
      error: "Registration cannot close before it opens.",
    };
  }

  if (
    registrationClosed &&
    confirmBy &&
    new Date(registrationClosed) > new Date(confirmBy)
  ) {
    return {
      ok: false,
      error: "The confirm-by deadline cannot be before registration closes.",
    };
  }

  if (
    registrationOpen &&
    confirmBy &&
    new Date(registrationOpen) > new Date(confirmBy)
  ) {
    return {
      ok: false,
      error: "The confirm-by deadline cannot be before registration opens.",
    };
  }

  return { ok: true };
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
