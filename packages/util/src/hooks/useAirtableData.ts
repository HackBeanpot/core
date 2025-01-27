import { AirtableData } from "../types";

export default async function useAirtableData(
  baseID: string,
  tableName: string,
  isDev = true,
): Promise<AirtableData> {
  const BASEURL = "https://api.airtable.com/v0";
  const airtableUrl = `${BASEURL}/${baseID}/${tableName}${isDev ? "?isDev=true" : ""}`;

  const res = await fetch(airtableUrl, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_TOKEN_ID}`,
    },
  });

  return await res.json();
}
