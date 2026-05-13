import { SingletonKey } from "./singleton-keys";

type SingletonMap = {
  "registration-open": string;
  "registration-closed": string;
  "confirm-by": string;
  "show-decision": boolean;
};

const mockSingletonData: SingletonMap = {
  "registration-open": "2026-01-01T00:00:00.000Z",
  "registration-closed": "2026-02-01T00:00:00.000Z",
  "confirm-by": "2026-02-15T00:00:00.000Z",
  "show-decision": false,
};

export async function getSingleton<K extends SingletonKey>(
  key: K,
): Promise<SingletonMap[K]> {
  return mockSingletonData[key];
}

export async function setSingleton<K extends SingletonKey>(
  key: K,
  value: SingletonMap[K],
): Promise<void> {
  mockSingletonData[key] = value;
}
