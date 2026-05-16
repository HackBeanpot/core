import type { DecisionDates } from "./types";

export const decisionDates: DecisionDates = {
  showDecision: new Date(Date.now() - 24 * 60 * 60 * 1000),
  confirmBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
};
