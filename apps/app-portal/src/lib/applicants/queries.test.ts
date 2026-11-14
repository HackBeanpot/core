import { buildApplicantQuery } from "./queries";
import { CURRENT_SEASON_START } from "./season";

const currentSeason = {
  $or: [
    { lastSavedAt: { $gte: CURRENT_SEASON_START } },
    {
      lastSavedAt: {
        $type: "string",
        $gte: CURRENT_SEASON_START.toISOString(),
      },
    },
    { appSubmissionTime: { $gte: CURRENT_SEASON_START } },
    {
      appSubmissionTime: {
        $type: "string",
        $gte: CURRENT_SEASON_START.toISOString(),
      },
    },
  ],
};

describe("buildApplicantQuery season", () => {
  it("defaults to the current season", () => {
    expect(buildApplicantQuery({})).toEqual({ $and: [currentSeason] });
  });

  it("excludes the current season for past", () => {
    expect(buildApplicantQuery({ season: "past" })).toEqual({
      $and: [{ $nor: [currentSeason] }],
    });
  });

  it("adds no season clause for all", () => {
    expect(buildApplicantQuery({ season: "all" })).toEqual({});
  });

  it("keeps search's $or alongside the season clause", () => {
    const query = buildApplicantQuery({ search: "ada" });
    expect(query.$or).toHaveLength(3);
    expect(query.$and).toEqual([currentSeason]);
  });
});
