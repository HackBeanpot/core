import type { SceneId } from "../../(landing)/scenes/types";
import { APPLICATIONS_CLOSED_MESSAGE } from "../siteConfig";

export type HeaderTab = { label: string; id: Exclude<SceneId, "hero"> };

/** Header / mobile menu tabs, in page order. Each links to `#${id}`. */
export const headerTabs: HeaderTab[] = [
  { label: "About us", id: "about" },
  { label: "Our values", id: "values" },
  { label: "Speakers", id: "speakers" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Projects", id: "projects" },
  { label: "Sponsors", id: "sponsors" },
  { label: "Our team", id: "team" },
  { label: "FAQs", id: "faq" },
];

/** Apply fallback while `APPLICATION_URL` is unset. */
export const showApplicationsClosed = () => alert(APPLICATIONS_CLOSED_MESSAGE);
