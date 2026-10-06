/**
 * One id per landing scene, in scroll order. Each non-hero id is also the
 * section's DOM id, so header tabs link to `#${id}`.
 *
 * MS-102 adds `SceneAnimation` here.
 */
export type SceneId =
  | "hero"
  | "about"
  | "values"
  | "speakers"
  | "testimonials"
  | "projects"
  | "sponsors"
  | "team"
  | "faq";
