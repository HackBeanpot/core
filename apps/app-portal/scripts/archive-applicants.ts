/* eslint-disable no-console -- CLI script; console output is intentional. */
/**
 * Move last season's applicants out of applicant_data into an archive collection,
 * so the admin list, detail pages, stats and CSV export only see this season, and a
 * returning applicant doesn't sign in to last year's status.
 *
 * A record counts as last season's when none of its activity timestamps
 * (lastSavedAt, appSubmissionTime, updatedAt) is on or after --before.
 *
 * Usage (from apps/app-portal):
 *   yarn archive-applicants --before=2026-09-01 --archive=applicant_data_2026
 *   yarn archive-applicants --before=2026-09-01 --archive=applicant_data_2026 --apply
 *
 * Without --apply it's a dry run that only prints counts. With --apply it copies the
 * matching records to the archive (upserting by _id, so re-running is safe), checks
 * they all landed, then deletes them from applicant_data. Back up the collection first.
 *
 * Like the other scripts, this targets applicant_data_test unless NODE_ENV=production.
 */
import type { Filter } from "mongodb";

import { getDb, resolveCollectionName } from "@/lib/db";

const APPLICANT_COLLECTION = resolveCollectionName("applicant_data");
const ACTIVITY_FIELDS = ["lastSavedAt", "appSubmissionTime", "updatedAt"];

function parseArgs(): { before: Date; archive: string; apply: boolean } {
  const args = Object.fromEntries(
    process.argv.slice(2).map((arg) => {
      const [key, value] = arg.replace(/^--/, "").split("=");
      return [key, value ?? "true"];
    }),
  );
  const before = new Date(args.before ?? "");
  if (Number.isNaN(before.getTime())) {
    throw new Error("Pass --before=<date>, e.g. --before=2026-09-01");
  }
  if (!args.archive) {
    throw new Error(
      "Pass --archive=<collection>, e.g. --archive=applicant_data_2026",
    );
  }
  if (args.archive === APPLICANT_COLLECTION) {
    throw new Error("--archive must differ from the live collection");
  }
  return { before, archive: args.archive, apply: args.apply === "true" };
}

// Timestamps are stored as Dates by this portal but may be ISO strings on older
// records, and Mongo never compares a string with a Date, so check both forms.
function recentActivityFilter(before: Date): Filter<Record<string, unknown>> {
  return {
    $or: ACTIVITY_FIELDS.flatMap((field) => [
      { [field]: { $gte: before } },
      { [field]: { $type: "string", $gte: before.toISOString() } },
    ]),
  };
}

async function main() {
  const { before, archive, apply } = parseArgs();
  const db = await getDb();
  const live = db.collection(APPLICANT_COLLECTION);
  const filter = { $nor: [recentActivityFilter(before)] };

  const [total, toArchive] = await Promise.all([
    live.countDocuments({}),
    live.countDocuments(filter),
  ]);
  console.log(`${APPLICANT_COLLECTION}: ${total} records`);
  console.log(
    `  ${toArchive} with no activity since ${before.toISOString()} → ${archive}`,
  );
  console.log(`  ${total - toArchive} stay`);

  if (!apply) {
    console.log("Dry run; pass --apply to move them.");
    process.exit(0);
  }
  if (toArchive === 0) {
    console.log("Nothing to archive.");
    process.exit(0);
  }

  const ids = (
    await live.find(filter, { projection: { _id: 1 } }).toArray()
  ).map((doc) => doc._id);

  await live
    .aggregate([
      { $match: { _id: { $in: ids } } },
      { $merge: { into: archive, on: "_id", whenMatched: "replace" } },
    ])
    .toArray();

  const archived = await db
    .collection(archive)
    .countDocuments({ _id: { $in: ids } });
  if (archived !== ids.length) {
    throw new Error(
      `Only ${archived}/${ids.length} records reached ${archive}; nothing was deleted.`,
    );
  }

  const { deletedCount } = await live.deleteMany({ _id: { $in: ids } });
  console.log(
    `Archived ${archived} and removed ${deletedCount} from ${APPLICANT_COLLECTION}.`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
