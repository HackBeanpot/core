# HackBeanpot 2027 Mainsite — Roadmap v2

**Figma:** [[Design] Mainsite](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite)
**Goal:** Ship the new museum-themed mainsite (LG, MD, SM) by the **last week of November 2026**.
**Team (8):** Aditya (lead), Michael, Rosyln, Phaedra, Mehana, Yurika, Shreeya, Andre
**App:** `apps/main` (Next 14, Tailwind, shared config in `packages/config-tailwind`)

> **What changed from v1:** over the first two weeks, Aditya builds the **navbar, footer, the whole hero section (all breakpoints) and the animation structure** (engine + orchestrator). Everyone else builds shared components and section assets in S1, then static sections in S2. **Nobody is asked to write markdown files.** Decisions and specs live in **code** (typed constants, JSDoc), in **GitHub issues/PR descriptions**, or in **#mainsite on Slack**. This roadmap is read-only for the team; Aditya maintains it.

---

## 1. Timeline at a glance

Sprints are one week, **Thursday → Wednesday** (planning Thursday, demo + review Wednesday).

| Sprint | Dates | Theme | Outcome |
|---|---|---|---|
| **S1** | Sep 24 – Sep 30 | Foundations | Navbar + footer, animation engine, hero assets, tokens, shared UI primitives, content data, all section assets exported |
| **S2** | Oct 1 – Oct 7 | Hero + orchestrator + static sections | **Hero done (LG/MD/SM, animated)**, scroll orchestrator done, 7 sections built statically (LG/MD) |
| **S3** | Oct 8 – Oct 14 | Page assembly + section animations | Full LG/MD page assembled and wired to the nav; FAQ static; 6 sections animated |
| **S4** | Oct 15 – Oct 21 | Last animations + SM sections | Sponsors and FAQ animated; scroll hardening; all SM sections except the hero (already done) |
| **S5** | Oct 22 – Oct 28 | Hardening | SM page assembled; a11y/reduced motion; perf; real content; SEO; MD QA; loading screen |
| **S6** | Oct 29 – Nov 4 | Design-review fixes · 🎯 **feature-complete (all breakpoints)** | LG/MD/SM review fixes; visual tests + CI; release process |
| **S7** | Nov 5 – Nov 11 | Bug bash fixes | Bug fixes by area; 404 page; cross-device matrix |
| **S8** | Nov 12 – Nov 18 | Release candidate | Content lock, final audits, RC on staging (feature freeze Mon Nov 16) |
| **S9** | Nov 19 – Nov 25 | Launch 🚀 | Prod deploy by **Tue Nov 24**, on-call, retro |

**Rules for every sprint**
- Tickets owned by **different people** in the same sprint have **no dependencies on each other**. A ticket only depends on work merged in **earlier** sprints. (Aditya's S1/S2 tickets depend on each other in places, but he's the only one doing them, so nobody is blocked.)
- When two tickets in one sprint touch neighboring code, the boundary is set by a **contract in §3**.
- Everything merges into `dev` by the **Wednesday demo**. Anything unfinished gets carried over explicitly at planning.
- **Where information goes:** decisions go in the ticket/GitHub issue or #mainsite; specs go in **typed code constants**; how-to notes go in **JSDoc/comments** next to the code; screenshots and QA results go in **PR descriptions and GitHub issues**. No new `.md` files.

---

## 2. What's in the Figma file

### Pages
| Page | Node | Contents |
|---|---|---|
| 🖥️ LG | `0:1` | 9 sections, 1512×982 artboards |
| 💻 MD | `1:3` | Same 9 sections, 1000×982 artboards |
| 📱 SM | `1:2` | Same 9 sections plus Mobile Menu, 402×874 artboards (**separate, static design**) |
| ✏️ Components | `1:5` | Header `5388:302`, Footer `5388:305`, Other `5539:741` |
| ✏️ Design Documentation | `1:4` | Color Palette `31:751`, Typography `31:793` |
| ✏️ Prototype/Animations | `405:3324` | **Empty.** No motion spec exists yet (see §3.5 / MS-102) |

Figma link format: `https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=<id with - instead of :>`

### Section order and frame IDs

| # | Section (design owner) | LG frames | MD frames | SM frames |
|---|---|---|---|---|
| 1 | Hero (Cole) | `5615:70522` day → `5597:839` dusk → `5597:5431` night → `5597:8846` title → `5597:12280` zoom | `5691:35814`, `5691:42665` | `5615:22626` |
| 2 | About us (Cole) | `5597:15707` | `5690:653` | `5615:26129` |
| 3 | Our values (Cole) | `5690:2639` | `5690:2283` | `5615:74674` (402×1244) |
| 4 | Speakers (Lucy) | `5624:1085`, `5597:16197` | `5687:2142` (+ stray? `5701:2351`) | `5615:26316` |
| 5 | Hacker Testimonials (Lucy) | `5597:16837` | `5687:1662` | `5687:1172` |
| 6 | Past Projects (Lucy) | `5597:21587` | `5687:2813` | `5615:26385` |
| 7 | Sponsors (Lucy) | `5597:19671` | `5687:3854` | `5615:28693` |
| 8 | Meet the Team (Cole) | `5597:20455` + dept rows: Directors `5694:46984`, Design `5694:46923`, Tech `5694:46739`, Sponsorship `5694:46933`, Ops `5694:47071`, Marketing `5694:47132` | `5690:3059` | `5681:1281`, `5685:18775` |
| 9 | FAQs + Sock + Footer (Cole) | `5597:20877` (1512×2029) | `5690:4737` (1000×2050) | `5615:30055` (402×1943) |
| — | Mobile Menu | — | — | `5694:48024` |

### Scene-by-scene description (LG)
1. **Hero, 5 states.** The museum exterior (columns, "HBP"/"2027" banners, grand staircase, bushes, skyline) stays fixed while the sky moves from **day** (light blue, sun, blue skyline) to **dusk** (grey-blue, first stars, shooting star, sun becomes moon) to **night** (indigo, purple skyline, **MLH "Official 2025 Season" badge** drops in, unlit spotlights in the bushes) to **full night** (near-black sky, **"HACKBEANPOT" / "Brought to you by amazon Maven"** title, moon becomes the HBP logo, spotlights switch on with beams, statue silhouette in the right window). The last state **zooms into the front door**. There is **no navbar** in any hero state.
2. **About us.** Dark navy interior, cream-to-lavender **fog waves** at top-left and bottom-right, ochre **plaque** with 4 screws ("ABOUT US" + paragraph), team photo in a **copper frame**, two **candles** with a glow.
3. **Our values.** Teal gradient, **spotlight** from top-left, three staggered **pillars** each topped by a terracotta **icon stone** (compass / sprout / people), title + body, **vases** along the bottom.
4. **Speakers.** Orange gradient, red **theatre curtain** on the right, golden **gazebo arch** framing the photo, **balustrade**, name / role / bio, arrows. Two frames: title in column vs. centered. To be confirmed.
5. **Hacker Testimonials.** Deep purple **arched corridor** in perspective, fog, **sparkles**, gold **medallion** portrait, quote / name / school, arrows, **footprints**.
6. **Past Projects.** Lavender gallery, arches with a **dinosaur skeleton**, velvet **ropes**, sparkles, **wood frame** with project media, title + link icon, members, description, arrows.
7. **Sponsors.** Navy hall, pillars, **statue silhouettes** in arched windows, **gold tier** (3 large) + **silver tier** (3 smaller) logo frames, CTA + **View Sponsorship Packet** button + email.
8. **Meet the Team.** Teal, two staggered rows of portraits in **varied frames**, name + role, large **side arrows** scrolling horizontally, **benches** + floor strip.
9. **FAQs + Sock + Footer (2 viewports tall).** FAQ accordion (General, Application, Event Logistics), then **pterodactyl/dino skeletons** with spotlight beams and a fog ribbon with sparkles, then the footer (Back to top, IG / LinkedIn / TikTok, 501(c)(3) line, mailing list).

MD keeps the same scenes on a 1000px artboard and collapses the nav to **logo + Sponsor Us + Apply + hamburger**. SM is a separate, vertical, **fully static** design.

### Design system facts
- **Fonts actually used in frames** (the Figma *text styles* are stale; they still say Sancreek/Neulis/DM Sans):
  - **Amarante Regular**: section titles (50px LG), hero title (64px), banners
  - **Special Gothic Condensed One**: nav (20), card titles (24–30), speaker name (40), team names (~20), mailing-list heading (28)
  - **Merriweather** Light / Regular / SemiBold: body (Light 18), roles (Light 14–20), FAQ questions (Regular 18, SemiBold when open), inputs (Regular 16)
- **Color variables:** **Museum** collection (13 colors × Primary/Dark/Light, listed in MS-104) plus legacy **Carnival**.

### Current repo state
- **Everything in `apps/main` is last year's (2026 carnival) design and gets replaced, not reused.** The only exceptions are Aditya's new `lib/Components/Header.tsx`, `Footer.tsx`, `public/header/`, `public/footer/` and the Special Gothic font. **Don't copy components, styles, content or images from the old code.**
- Old code is deleted in two steps: **MS-101** removes the old routes and their assets, and **MS-301** removes the old landing page and everything left over.
- **`packages/ui` and `packages/util` are shared** with `apps/live` and `apps/app-portal` (they import `Button`, `Footer`, `RibbonTitle`, `Section`, `NavBarBase`, `useIsMobile`, `useDevice`, `isValidEmail`, …). **Don't delete or restyle them**; the new mainsite just doesn't use their old design components. Design-free utilities (`isValidEmail`, `useWindowSize`) are fine.
- Keep the **backend** route `api/joinMailingList` (no UI). MS-101 verifies it still points to the current list.
- There's **no animation library** installed. Breakpoints (`packages/config-tailwind/theme-tokens/screens.ts`): `tablet` 640–1279, `mobile-xl` 482–639, `mobile` ≤481. The shared Tailwind config serves other apps: **add** tokens only, don't change existing ones.

---

## 3. Architecture & contracts (read before picking up any ticket)

### 3.1 Breakpoints → designs
| Design | Viewport | Tailwind | Motion |
|---|---|---|---|
| LG | ≥ 1280px | default (no prefix) | Scroll-driven scenes + transitions |
| MD | 640–1279px | `tablet:` | Scroll-driven scenes + transitions |
| SM | < 640px | `mobile-xl:` and `mobile:` | **None.** Fully static, including the hero |

LG/MD render `<ScrollStage/>` (the scene experience). SM renders a separate `<MobileLanding/>` tree (switched with CSS `hidden`/`block`, not JS). On SM, normal scrolling moves you from section to section, with **no pinning, scrubbing, reveal effects, load-in or idle loops**. Carousels, the accordion and the mobile menu still work, but content swaps instantly.

### 3.2 Artboard units (pixel-faithful scaling)
Every LG/MD scene is one viewport designed on a fixed artboard (1512×982 LG, 1000×982 MD). MS-102 adds:
```css
/* set on each scene root */
--ab-w: 1512; --ab-h: 982;          /* tablet: --ab-w: 1000 */
--u: min(calc(100vw / var(--ab-w)), calc(100vh / var(--ab-h)));
```
Usage: `w-[calc(var(--u)*163)]`, or the `u(163)` helper for inline styles. Backgrounds **bleed** to the viewport, and content is centered. **Take numbers straight from Figma Dev Mode × `--u`.**

### 3.3 Folder structure
```
apps/main/src/app/(landing)/
  page.tsx                       # LG/MD <ScrollStage/> + SM <MobileLanding/>
  scenes/
    types.ts                     # SceneId, SceneAnimation            (MS-102)
    motionSpec.ts                # confirmed motion spec as constants (MS-102)
    gsap.ts                      # GSAP + ScrollTrigger registration  (MS-102)
    SceneFrame.tsx               # artboard wrapper                   (MS-102)
    registry.ts  ScrollStage.tsx  transitions.ts                     (MS-201)
    hero/      HeroScene.tsx  hero.animation.ts  manifest.ts         (Aditya)
    about/     AboutScene.tsx about.animation.ts
    values/ speakers/ testimonials/ projects/ sponsors/ team/ faq/
  mobile/
    MobileLanding.tsx  MobileHero.tsx  MobileAbout.tsx … MobileFaq.tsx
apps/main/src/app/dev/           # dev-only harness pages (404 in prod)
apps/main/src/app/lib/Components/
  Header.tsx Footer.tsx          # Aditya
  museum/                        # shared primitives (S1)
apps/main/src/app/lib/content/   # typed data (MS-108)
apps/main/public/<section>/{lg,md,sm}/   # exported assets (MS-103, MS-109, MS-110)
```

### 3.4 Scene file ownership (static vs. animation tickets)
- **`<Name>Scene.tsx`** is owned by the *static* ticket. It renders the **final resting state** with no scroll logic. Every layer that will move gets a stable hook: `data-anim="about-plaque"`.
- **`<name>.animation.ts`** is owned by the *animation* ticket and exports:
  ```ts
  export const aboutAnimation: SceneAnimation = {
    id: "about",
    enter: (root, tl) => { /* transition in from the previous scene */ },
    build: (root, tl) => { /* in-scene scroll animation */ },
  };
  ```
  Scroll length and exit color come from `motionSpec.ts` (not hard-coded). Animation tickets **may add `data-anim` attributes** to the Scene TSX, but they don't restructure the markup.
- **The incoming scene owns the transition** (its `enter`). It always starts from the previous scene's **exit color** in `motionSpec.ts`, so neighbors never coordinate.
- Each scene is registered in `registry.ts` with a one-line entry. The static ticket adds `{ id, Component }`, and the animation ticket adds `animation`.

### 3.5 Motion spec (PROPOSED)
Figma has no prototype, so this is inferred from the frames. In MS-102, Aditya confirms it with Cole and Lucy (in a Slack thread or on a call) and encodes the result in **`scenes/motionSpec.ts`**. **After that, `motionSpec.ts` is the source of truth, not this table.**

| Scene | Enter transition (owned by this scene) | In-scene scroll animation | Exit color | Scroll length |
|---|---|---|---|---|
| Hero | Page load: day state, subtle sun/bush idle | Day → dusk → night → title → zoom through door (the 5 Figma states) | door interior (sample from `5597:12280`) | 4.0 vh |
| About | Fade up from door color; fog slides in from corners | Plaque drops with swing; frame slides in; candle glow ramps | `#15173b` | 1.5 vh |
| Values | Fog wipe up, navy → teal | Spotlight on; pillars rise in stagger; stones pop; text fades | `#024354` | 1.5 vh |
| Speakers | Red curtain sweeps in from the right, revealing orange | Arch scales in; balustrade rises; text staggers in | `#71120f` | 1.2 vh |
| Testimonials | "Walk in": depth layers scale 1.25 → 1 with crossfade | Fog drifts; footprints appear; medallion swings down | `#1d032c` | 1.2 vh |
| Projects | Horizontal pan to the next room | Dino/arches parallax; ropes slide in; card fades up | `#5f2666` | 1.2 vh |
| Sponsors | Crossfade + zoom out (1.08 → 1) | Gold frames drop in, then silver; CTA fades up | `#060825` | 1.2 vh |
| Team | Fog wipe, navy → teal | Rows slide in from the right; portraits settle; benches rise | `#024354` | 1.2 vh |
| FAQ + Footer | Fade to near-black, title drops | **Unpinned** normal scroll; skeleton parallax, beam sweep, fog drift | — | natural |

Global: `prefers-reduced-motion: reduce` means no pinning/scrubbing; scenes stack in their final state with simple fades (MS-503).

### 3.6 Tech choices (MS-102)
- **GSAP 3 + ScrollTrigger + `@gsap/react` (`useGSAP`)** for pinned, scrubbed timelines (GSAP is free for commercial use, plugins included).
- **Lenis** smooth scroll synced to ScrollTrigger (LG/MD only).
- **CSS keyframes** for idle loops (candle flicker, sparkle twinkle), turned off on SM and under reduced motion.
- **SVG** for vector art (inline for animated layers, `next/image` for static), **WebP @2x** for raster.

### 3.7 Conventions
- Branch `main/feature/MS-XXX-short-name` → PR into `dev` with the ticket ID in the title, using `pull_request_template.md`.
- Every UI PR includes **screenshots at 1512 and 1000 (and 402 for SM)** next to the Figma frame, in the **PR description**.
- `yarn lint && yarn type-check` before opening a PR.
- Dev harness (from MS-102): `/dev/scenes?scene=about&progress=0.5` renders one scene at any scroll progress.
- Put notes on how to use a component in **JSDoc on the export**, not in separate docs.

---

## 4. Tickets

Size: **S** ≈ 1 day, **M** ≈ 2–3 days, **L** ≈ 4–5 days of part-time work.

---

### Sprint 1 — Foundations (Sep 24 – Sep 30)

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-101 | Header/NavBar + Footer (all screens) + remove old routes | **Aditya** | L |
| MS-102 | Animation foundation: engine, artboard units, `SceneFrame`, dev harness, motion spec | **Aditya** | L |
| MS-103 | Hero asset export (LG 5 states, MD, SM) + `manifest.ts` | **Aditya** | M |
| MS-104 | Design tokens: colors, fonts, typography | Rosyln | M |
| MS-105 | `PictureFrame` component family | Phaedra | M |
| MS-106 | Carousel primitives (`CarouselArrow`, `useCarousel`, `CarouselSwap`, gallery) | Mehana | M |
| MS-107 | Decorative primitives (Fog, Sparkle, Candle, Spotlight, Starfield) | Shreeya | M |
| MS-108 | Content data layer (typed data for all sections) | Andre | M |
| MS-109 | Section asset export A: About, Values, Speakers, Testimonials | Michael | M |
| MS-110 | Section asset export B: Projects, Sponsors, Team, FAQ + Sock | Yurika | M |

> Aditya has 3 tickets this sprint. MS-101 is already in progress. If MS-103 slips, it moves to the start of S2 with MS-202 (both are Aditya's, so no one else is blocked). Michael is the backup on MS-103.

---

#### MS-101 · Header/NavBar + Footer (all screens) + remove old routes
**Owner:** Aditya · **Size:** L · **Depends on:** none (in progress)
**Figma:** Components → [Header `5388:302`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5388-302), [Footer `5388:305`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5388-305), [Other `5539:741`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5539-741); in context on LG [About `5597:15707`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-15707), MD [Team `5690:3059`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-3059), SM [Mobile Menu `5694:48024`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-48024), footer at the bottom of [LG FAQ `5597:20877`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20877)

**Steps**
1. **Header, LG (≥1280):** logo left; 8 tabs (About us, Our values, Speakers, Testimonials, Projects, Sponsors, Our team, FAQs) in Special Gothic Condensed One 20; **Sponsor Us** (translucent) + **Apply** (gold gradient) buttons.
2. **Tab hrefs are in-page anchors** `#about`, `#values`, `#speakers`, `#testimonials`, `#projects`, `#sponsors`, `#team`, `#faq` (they match `SceneId`s).
3. **Controlled header:** `activeSection?: SceneId` (white underline + `aria-current`) and `visible?: boolean`. With `visible=false` it fades out (opacity + translateY, 300ms) and turns off pointer events. That's used during the hero, which has no navbar. The wiring to scroll happens in MS-301.
4. **Header, MD (640–1279):** logo + Sponsor Us + Apply + hamburger.
5. **Mobile menu, SM (<640)** from `5694:48024`: a full-screen overlay (no open/close animation on SM, since SM is static) that locks body scroll, closes on link click and Esc, and traps focus.
6. **Extract `Button`** to `lib/Components/museum/Button.tsx`: variants `gold` (Apply, Submit, View Sponsorship Packet) and `ghost` (Sponsor Us, Back to top), sizes `md`/`sm`. Other tickets import it from S2.
7. **Footer, all sizes:** Back to top (`window.scrollTo` for now; MS-301 swaps in Lenis), IG / LinkedIn / TikTok buttons (`public/footer`), the 501(c)(3) line, and the **mailing list** form wired to `api/joinMailingList` (loading, success, error, invalid-email; input ≥ 16px so iOS doesn't zoom). Confirm with the directors that the route's list/API key is current and fix the env vars if not.
8. The footer renders **transparent over its parent background** (the FAQ scene owns the art behind it).
9. Apply links to the 2027 application URL from `lib/content/site.ts` (MS-108), with a local constant until that merges.
10. **Remove the old routes:** delete `app/projects/`, `sponsors/`, `team/`, `sponsor-us/`, `placeholder/` (with their `Sections/` and `components/`), the old `NavBar.tsx`, `VolunteeringInfoCard`, `SponsorTicket*` and their `index.ts` exports, the `lib/Assets/SVG/*` folders and `public/*` folders those routes used (`headshots/`, `sponsor-logos/`, `sponsor-stats/`, `sponsor-testimonials/`, `projects/`, `team.png`, `footer-logos/`, …). If an old landing section still imports something, leave it for MS-301. Don't touch `packages/ui` or `packages/util`.
11. Add permanent redirects in `next.config.js`: `/projects` → `/#projects`, `/sponsors` → `/#sponsors`, `/team` → `/#team`, `/sponsor-us` → `/#sponsors`. Point the Sponsor Us button to `/#sponsors` (or the packet, if Cole/Lucy prefer).
12. Accessibility: `<header>`/`<nav>`/`<footer>` landmarks, focus rings, `aria-expanded` on the hamburger.

**Acceptance criteria**
- [ ] Header, mobile menu and footer match Figma at 1512, 1000 and 402 (screenshots in the PR)
- [ ] `activeSection`/`visible` work in a demo
- [ ] Mailing list works end to end against the real API
- [ ] Old routes redirect correctly; `/placeholder` 404s; old files deleted; `yarn build`, `lint`, `type-check` pass
- [ ] `apps/live` and `apps/app-portal` still build

---

#### MS-102 · Animation foundation: engine, artboard units, `SceneFrame`, dev harness, motion spec
**Owner:** Aditya · **Size:** L · **Depends on:** none

This is everything the S2 static-section tickets need. The multi-scene orchestrator comes in MS-201.

**Steps**
1. **Motion spec (by Sat Sep 26):** a 30-minute call or Slack thread with Cole and Lucy to walk through §3.5. Confirm or change each row, and decide the Speakers two-frame question (final layout vs. animation pair). Record the answers **in the Slack thread**; step 5 turns them into code.
2. Install `gsap`, `@gsap/react`, `lenis` in `apps/main`. Register ScrollTrigger once in `scenes/gsap.ts` (client-only).
3. **Smooth scroll provider** `lib/scroll/SmoothScroll.tsx`: Lenis driven by the GSAP ticker (`gsap.ticker.add(t => lenis.raf(t*1000))`, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.lagSmoothing(0)`). Export `useLenis()`. Only active at ≥ 640px and without reduced motion.
4. **`scenes/types.ts`:** `SceneId` (`hero|about|values|speakers|testimonials|projects|sponsors|team|faq`) and `SceneAnimation` (§3.4).
5. **`scenes/motionSpec.ts`:** a typed constant per scene with `scrollLength` (vh), `exitColor`, `pinned` and a short `enter`/`build` description as a JSDoc comment. This is the confirmed spec from step 1.
6. **Artboard units:** `--ab-w`/`--ab-h`/`--u` in `globals.css` (with tablet overrides) and the `u(n)` helper in `lib/scroll/units.ts`, with a JSDoc example.
7. **`scenes/SceneFrame.tsx`:** full-viewport root (`h-[100svh] w-full overflow-hidden relative`), a `background` slot that bleeds to the edges and a centered `content` slot sized to the artboard. It also sets `id={sceneId}` for anchors.
8. **Dev harness** `app/dev/scenes/page.tsx` (calls `notFound()` in production):
   - `?scene=<id>` renders one scene in a `SceneFrame`
   - `?progress=0..1` builds that scene's `build` timeline paused and seeks it; `?enter=1` previews the `enter` transition from the previous scene's exit color
   - a progress slider + a width toggle (1512 / 1000)
   - a scene map `dev/scenes/sceneMap.ts` that each scene ticket adds one line to
9. **Proof of concept:** one placeholder scene pinned with ScrollTrigger on Lenis, scrubbing a box, to prove the stack works in Chrome, Safari and Firefox.
10. Put the "how to write a scene" rules in the **JSDoc on `SceneAnimation`** and at the top of `SceneFrame.tsx`: use `data-anim` hooks, animate only transform/opacity, read lengths and colors from `motionSpec.ts`, use the harness.

**Acceptance criteria**
- [ ] `motionSpec.ts` reflects what Cole and Lucy agreed (link the Slack thread in the PR)
- [ ] `/dev/scenes?scene=placeholder&progress=0.3` shows a paused, scrubbable scene
- [ ] `SceneFrame` scales a 1512×982 test grid correctly at 1512×982, 1920×1080, 1280×720 and 1000×982 (screenshots in the PR)
- [ ] Lenis + ScrollTrigger proof of concept is smooth in Chrome, Safari and Firefox

---

#### MS-103 · Hero asset export (LG 5 states, MD, SM) + `manifest.ts`
**Owner:** Aditya (backup: Michael) · **Size:** M · **Depends on:** none
**Figma:** LG [Day `5615:70522`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-70522), [Dusk `5597:839`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-839), [Night `5597:5431`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-5431), [Title `5597:8846`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-8846), [Zoom `5597:12280`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-12280); MD `5691:35814`, `5691:42665`; SM `5615:22626`

**Steps**
1. Compare the 5 LG frames layer by layer. Expected layers: `sky` (a color per state, animated as a CSS color, not an image), `stars`, `shootingStar`, `sun`, `moon`, `hbpMoon`, `skyline` (blue → purple), `museum` (check whether its tint changes per state), `bannerHBP`/`banner2027` (live Amarante text if possible), `statueSilhouette`, `lawn`, `bushes`, `stairs`, `spotlightLeft/Right` (fixtures) + `beamLeft/Right`, `mlhBadge`, `heroTitle` (live text) + amazon/Maven logos, `door`.
2. Export each layer as an **SVG on a full 1512×982 transparent canvas, in position**, so stacking them with `absolute inset-0` reproduces the frame. (Figma trick: duplicate the frame, hide everything except one layer, export the frame.)
3. SVGO everything (`--multipass`), keep each file < 150KB, and flag raster blobs to Cole. Static layers go in `public/hero/lg/`; animated layers become React SVG components in `scenes/hero/assets/`.
4. **`scenes/hero/manifest.ts`:** a typed constant listing each layer with its visibility, opacity, color and transform **per state** (`day|dusk|night|title|zoom`), the sky colors per state, and the **door zoom origin + scale** measured from `5597:12280` vs. `5597:8846`. Add MD overrides (if MD is a crop of LG, store the crop rectangle instead of re-exporting).
5. **SM:** export the SM hero (`5615:22626`) **flattened** into as few images as possible (it's static), into `public/hero/sm/`.

**Acceptance criteria**
- [ ] `manifest.ts` covers every layer and state (it's typed, so a missing state is a TS error)
- [ ] Total LG hero payload < 1.2MB after SVGO; SM hero < 400KB
- [ ] A quick stack in the harness reproduces each LG state within ~2px

---

#### MS-104 · Design tokens: colors, fonts, typography
**Owner:** Rosyln · **Size:** M · **Depends on:** none
**Figma:** [Color Palette `31:751`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=31-751), [Typography `31:793`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=31-793), plus the actual text nodes in LG/MD/SM frames

**Steps**
1. **Colors:** add a `museum` palette to `packages/config-tailwind/theme-tokens/colors.ts` (add only; don't change carnival). Names: `museum-<color>`, `museum-<color>-dark`, `museum-<color>-light`.

   | Color | Primary | Dark | Light |
   |---|---|---|---|
   | Black | `#090912` | `#090912` | `#24253b` |
   | Dark Blue | `#15173b` | `#060825` | `#33357d` |
   | Purple | `#310d46` | `#1d032c` | `#5f2666` |
   | Indigo | `#3842b1` | `#070f68` | `#5d68e6` |
   | Teal | `#017b9d` | `#024354` | `#37a9c9` |
   | Green | `#0f7c1e` | `#094600` | `#68bf5b` |
   | Light Indigo | `#9aadd8` | `#637bb2` | `#cedcfc` |
   | Ivory | `#dddddd` | `#cabfbf` | `#fdfbfb` |
   | Yellow | `#ffd391` | `#ffb647` | `#fdebcc` |
   | Gold | `#e9ac1d` | `#d08000` | `#ffd268` |
   | Terracotta | `#ca6330` | `#833711` | `#f08854` |
   | Red | `#a52c28` | `#71120f` | `#e65752` |
   | Brown | `#512309` | `#2c1304` | `#894a3c` |

2. **Fonts:** frames use **Amarante**, **Special Gothic Condensed One** (already added) and **Merriweather** 300/400/600. Confirm with Cole that the frames (not the stale text styles) are right. Load Amarante and Merriweather via `next/font/google` in `app/layout.tsx` as CSS vars, add Tailwind families `font-amarante`, `font-gothic`, `font-merriweather`, remove the unused `Inter`, and make Merriweather the `apps/main` body font.
3. **`lib/Components/museum/Typography.tsx`:** `<Typography variant="sectionTitle" as="h2">`. Measure every variant in Figma Dev Mode for LG, MD and SM, and put the values **in the variant map in code** (with a comment naming the Figma node you measured). Variants: `heroTitle`, `sectionTitle`, `displayName`, `cardTitle`, `label`, `body`, `bodySmall`, `role`, `faqQuestion` (+ open state). LG/MD sizes use artboard units (`calc(var(--u)*50)`), or px with a `TODO` until MS-102 merges; the variant API stays stable.
4. Tell Cole (Slack) that the Figma text styles are stale.
5. `/dev/typography` page showing every variant at each breakpoint.

**Acceptance criteria**
- [ ] `bg-museum-teal-dark`, `text-museum-gold` etc. work
- [ ] All three font families render with no fallback flash
- [ ] Every variant has LG/MD/SM values in code
- [ ] `apps/live` and `apps/app-portal` still build

---

#### MS-105 · `PictureFrame` component family
**Owner:** Phaedra · **Size:** M · **Depends on:** none
**Figma:** frames in [About `5597:15707`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-15707), [Projects `5597:21587`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-21587), [Sponsors `5597:19671`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-19671), [Testimonials `5597:16837`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16837), [Team `5597:20455`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20455) + dept rows `5694:46984`, `5694:46923`, `5694:46739`, `5694:46933`, `5694:47071`, `5694:47132`

**Steps**
1. Inventory every frame style (list them in the PR description). Expected: `copper`, `wood`, `goldBevel`, `silverBevel`, `goldMedallion`, `blueMedallion`, `greenArch`, `navyShield`, `copperRect`, `placeholderOval`.
2. Export each frame's **border art only** as SVG (SVGO) into `public/frames/`, or inline it as a component when it needs to stretch.
3. `lib/Components/museum/PictureFrame.tsx`: `variant`, `width` (a CSS length string, so callers can pass `u(163)`), `aspect`, `src`/`alt` via `next/image` **or** `children` (logo on white, video/iframe). The photo is clipped to the inner shape (SVG `clipPath` for medallion, shield, arch and oval). Borders scale with the size (viewBox-based). Drop shadow as in Figma.
4. Export `PictureFrameVariant` as a type (MS-108 uses it).
5. `/dev/frames` page showing every variant with a sample photo exported from Figma into `public/dev/`.

**Acceptance criteria**
- [ ] All variants match Figma at 1x and 2x
- [ ] Non-rectangular clips crop correctly; `children` mode works
- [ ] Frames scale from 80px to 500px wide without distortion

---

#### MS-106 · Carousel primitives
**Owner:** Mehana · **Size:** M · **Depends on:** none
**Figma:** arrows in [Speakers `5624:1085`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5624-1085), [Testimonials `5597:16837`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16837), [Projects `5597:21587`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-21587), [Team `5597:20455`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20455)

**Steps**
1. Build everything fresh in `lib/Components/museum/`. Don't import or change the old `packages/ui` carousel pieces.
2. **`CarouselArrow`:** gold gradient circle + brown arrow. Props `direction`, `size: "sm" | "lg"`, `disabled` (dimmed), `aria-label`. Hover, active and focus states.
3. **`useCarousel<T>(items, { loop })`** returns `{ index, item, next, prev, goTo, canPrev, canNext, direction }`.
4. **`<CarouselSwap animated={boolean}>`:** crossfade + small slide in `direction` when `animated`, an instant swap when not (SM passes `animated={false}`). Reduced motion falls back to fade only.
5. **`useSwipe(ref, { onLeft, onRight })`:** a pointer-event swipe with a ~40px threshold that doesn't block vertical scrolling (for SM).
6. **`useHorizontalGallery(ref)`** for Team: one page per arrow click (`scrollBy`), `canPrev`/`canNext` from scroll position, `scroll-snap`, hidden scrollbar, native trackpad/touch.
7. Keyboard ←/→ inside the carousel region (`role="region"`, `aria-roledescription="carousel"`, `aria-live="polite"`).
8. `/dev/carousel` demo with 0, 1 and many items.

**Acceptance criteria**
- [ ] Arrow matches Figma in both sizes and states
- [ ] Loop and no-loop, first/last disabled, 0/1/many items all handled
- [ ] Swipe works on touch without blocking page scroll
- [ ] Gallery works with arrows, trackpad and touch

---

#### MS-107 · Decorative primitives (Fog, Sparkle, Candle, Spotlight, Starfield)
**Owner:** Shreeya · **Size:** M · **Depends on:** none
**Figma:** fog in [About `5597:15707`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-15707), [Testimonials `5597:16837`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16837) and the [FAQ `5597:20877`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20877) ribbon; sparkles in Testimonials, Projects and FAQ; candles in About; beams in Values, Hero and FAQ; stars in Hero

**Steps**
1. **`<Fog variant="cornerTopLeft"|"cornerBottomRight"|"sideLeft"|"sideRight"|"ribbon" animate>`:** wave SVGs with the cream `#f7dfbc` → lavender → transparent gradient; optional slow drift (CSS, 12–20s).
2. **`<Sparkle size color twinkle delay>`** + `<SparkleCluster>` (the 3-star groups).
3. **`<Candle height flame animate>`:** indigo candlestick, cream candle, flame flicker and a pulsing glow.
4. **`<Spotlight angle length color origin fixture>`:** a translucent beam with soft edges, plus the optional black lamp head (hero bushes).
5. **`<Starfield density seed>`:** a deterministic seeded star field in one SVG, with `density` 0–1 (the hero fades it by progress).
6. Every component accepts `className`/`style`, forwards `ref`, and puts `data-anim` on the root. **An `animate={false}` prop turns off all idle motion** (SM uses it); reduced motion also turns it off.
7. `/dev/decor` demo page.

**Acceptance criteria**
- [ ] Each primitive matches its Figma source
- [ ] Idle animations only use transform/opacity
- [ ] `animate={false}` and reduced motion both give a fully static render
- [ ] Starfield renders the same on server and client (no hydration mismatch)

---

#### MS-108 · Content data layer
**Owner:** Andre · **Size:** M · **Depends on:** none
**Figma:** text and images in all LG frames; team dept rows

**Steps**
1. `lib/content/` with `types.ts` + one file per section: `about.ts`, `values.ts`, `speakers.ts`, `testimonials.ts`, `projects.ts` (media: image/video/embed), `sponsors.ts` (tier gold/silver), `team.ts` (department + `frame` variant per person, from the Figma dept rows; type the frame as a string union until MS-105 exports `PictureFrameVariant`), `faq.ts` (category general/application/logistics), `site.ts` (application URL, sponsorship packet URL, `core@hackbeanpot.com`, socials).
2. Take the text **from Figma**. **Nothing from the old codebase.** Export the placeholder photos and logos shown in the Figma frames into `public/<section>/` so every section renders.
3. Tag each placeholder with `// TODO(content): …` in the data files.
4. **Open one GitHub issue, "Mainsite 2027 content needed"**, with a checklist of every gap (speakers + photos, testimonials + photos + consent, projects + media, the confirmed sponsor list + logos + tiers, full team list + headshots + roles, FAQ answers, the application URL, the sponsorship packet URL, the 2027 event dates; the FAQ currently says "Friday, February 11th"). Assign it to Aditya to forward to the directors.
5. A small test that checks every image path in `lib/content` exists.

**Acceptance criteria**
- [ ] All content typed, with no `any`
- [ ] The image path test passes
- [ ] Content issue opened and assigned

---

#### MS-109 · Section asset export A: About, Values, Speakers, Testimonials
**Owner:** Michael · **Size:** M · **Depends on:** none
**Figma:** About LG `5597:15707` / MD `5690:653` / SM `5615:26129`; Values LG `5690:2639` / MD `5690:2283` / SM `5615:74674`; Speakers LG `5624:1085`, `5597:16197` / MD `5687:2142` / SM `5615:26316`; Testimonials LG `5597:16837` / MD `5687:1662` / SM `5687:1172`

This does all the Figma exporting ahead of time, so the S2 builders can focus on layout.

**Steps**
1. Export these **as separate files** (so they can animate independently on LG/MD):
   - **About:** background texture/gradient, plaque (if it's not simple CSS; note it in the PR), candlesticks (if MS-107's `Candle` doesn't cover them exactly)
   - **Values:** the 3 pillars (they differ), the 3 icon stones, 6 vases individually
   - **Speakers:** the curtain, the gazebo arch (plus its inner opening as a separate `clipPath` SVG), the balustrade, the background gradient stops
   - **Testimonials:** the corridor as **3 depth layers** (far arches / mid / near pillars + floor), one footprint pair
2. Format: SVG, each on its **artboard-sized canvas in position** where that's practical, otherwise tightly cropped with its x/y/w/h noted in the file name or a tiny `positions.ts` next to the assets. Run SVGO on everything.
3. Folders: `public/about/{lg,md,sm}/`, `public/values/…`, `public/speakers/…`, `public/testimonials/…`. For **SM, flatten** anything that doesn't need to be separate (SM is static).
4. Sample and list every gradient stop and hex in the PR description for the S2 builders.

**Acceptance criteria**
- [ ] Every listed asset exported for LG, MD and SM, with SVGO applied, each < 150KB
- [ ] PR description lists the files, positions and gradient values per section

---

#### MS-110 · Section asset export B: Projects, Sponsors, Team, FAQ + Sock
**Owner:** Yurika · **Size:** M · **Depends on:** none
**Figma:** Projects LG `5597:21587` / MD `5687:2813` / SM `5615:26385`; Sponsors LG `5597:19671` / MD `5687:3854` / SM `5615:28693`; Team LG `5597:20455` / MD `5690:3059` / SM `5681:1281`, `5685:18775`; FAQ LG `5597:20877` / MD `5690:4737` / SM `5615:30055`

**Steps**
1. Export **as separate files**:
   - **Projects:** gallery wall + ceiling strip, the arches, the **dinosaur skeleton**, the rope stanchions strip, the external-link icon
   - **Sponsors:** hall background, windows + statue silhouettes (separate), pillars
   - **Team:** background, floor strip, the 2 benches
   - **FAQ + Sock:** the pterodactyl skeleton, the dino skeleton, the +/− icons; background gradient stops
2. Same format, SVGO and folder rules as MS-109 (`public/projects/{lg,md,sm}/`, …). Flatten on SM.
3. List every gradient stop and hex in the PR description.

**Acceptance criteria**
- [ ] Every listed asset exported for LG, MD and SM, with SVGO applied, each < 150KB
- [ ] PR description lists the files, positions and gradient values

---

### Sprint 2 — Hero + orchestrator + static sections (Oct 1 – Oct 7)

Section tickets build the **final resting state** (no scroll animation) for **LG and MD** inside `SceneFrame` (MS-102), using the S1 primitives and the assets from MS-109/MS-110. Each layer that will move later gets a `data-anim` hook. Each ticket adds its scene to `dev/scenes/sceneMap.ts` and `{ id, Component }` to `registry.ts`, **which is created by MS-201 this sprint**. If it isn't merged yet, add the registry line in a follow-up commit once it is (a one-liner, not a blocker).

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-201 | Scroll orchestrator `ScrollStage` + registry + transition helpers | **Aditya** | L |
| MS-202 | Hero section complete: static LG/MD/SM + LG/MD scroll animation | **Aditya** | L |
| MS-203 | Sponsors scene: static LG/MD | Michael | M |
| MS-204 | About Us scene: static LG/MD | Rosyln | M |
| MS-205 | Our Values scene: static LG/MD | Phaedra | M |
| MS-206 | Speakers scene: static LG/MD + carousel | Mehana | M |
| MS-207 | Hacker Testimonials scene: static LG/MD + carousel | Shreeya | M |
| MS-208 | Past Projects scene: static LG/MD + carousel | Andre | M |
| MS-209 | Meet the Team scene: static LG/MD + gallery | Yurika | L |

---

#### MS-201 · Scroll orchestrator `ScrollStage` + registry + transition helpers
**Owner:** Aditya · **Size:** L · **Depends on:** MS-102

**Steps**
1. `scenes/registry.ts`: an ordered array of `{ id, Component, animation?: SceneAnimation }`, starting with 9 colored placeholders. Section tickets swap in their real component with a one-line change.
2. `scenes/ScrollStage.tsx` (client):
   - Recommended approach: one master ScrollTrigger over a tall spacer, with every scene stacked in a fixed viewport stage. Each scene gets a `[start, end]` range from `motionSpec.ts` `scrollLength`, and its `enter` overlaps the previous scene's tail. Scenes outside their range are `visibility: hidden`.
   - The master GSAP timeline runs `enter` then `build` for each scene, in order.
   - The last scene (FAQ) is **unpinned**: after the stage, normal document flow continues.
   - `useActiveScene()` context (the Header gets wired to it in MS-301).
   - `scrollToScene(id, { immediate })`: scrolls to a scene's resting point via `lenis.scrollTo`. Deep links on load use `immediate`.
   - Rebuilds on breakpoint change and debounced resize; kills its triggers on unmount; doesn't initialize below 640px.
   - Uses `svh` units and `ScrollTrigger.config({ ignoreMobileResize: true })` for tablets.
3. **`scenes/transitions.ts`:** `fogWipe`, `crossfade`, `zoomThrough`, `curtain`, `pan`. Each takes `(tl, prevRoot, root, opts)` and starts from the previous scene's `exitColor`. Each has a harness demo (`/dev/scenes?transition=fogWipe`) and JSDoc explaining its options.
4. `(landing)/page.tsx` renders `ScrollStage` behind `?stage=1` until MS-301 switches it on.

**Acceptance criteria**
- [ ] 9 placeholder scenes play in order through all 5 transition types, forward and back
- [ ] `useActiveScene()` is correct in both directions
- [ ] `scrollToScene` and deep links land on the exact resting state
- [ ] Rebuilds cleanly between 1512 and 1000; 60fps with placeholders

---

#### MS-202 · Hero section complete: static LG/MD/SM + LG/MD scroll animation
**Owner:** Aditya · **Size:** L · **Depends on:** MS-102, MS-103, MS-104, MS-107 (and MS-201, same owner, same sprint)
**Figma:** 5 LG hero states, MD `5691:35814`, `5691:42665`, SM `5615:22626`

**Steps**
1. **Static LG/MD** `scenes/hero/HeroScene.tsx` in `SceneFrame`: stack every layer from `manifest.ts` in z-order. The sky color is the CSS var `--hero-sky`; stars use `<Starfield>` with a density var. Each layer gets a `data-anim` that matches its manifest name.
2. **Harness state preview:** `/dev/scenes?scene=hero&state=<day|dusk|night|title|zoom>` applies that state from the manifest statically, so each Figma state can be checked before animating.
3. Title block: `heroTitle` "HACKBEANPOT" + "Brought to you by" + amazon/Maven logos. The MLH badge links out (`target="_blank"`, alt text, per MLH's badge rules).
4. **Scroll animation** `hero.animation.ts` (pinned, `scrollLength` from `motionSpec.ts`), in 4 segments driven by the manifest:
   - 0 → 0.25 **day → dusk**: sky color, stars fade in, sun sinks and crossfades to the moon, a shooting star streaks once
   - 0.25 → 0.5 **dusk → night**: sky to indigo, skyline blue → purple, more stars, **MLH badge drops** (`back.out`), spotlight fixtures fade in
   - 0.5 → 0.75 **night → title**: near-black sky, **title staggers up**, moon → HBP moon, **beams switch on** (scaleY from the fixture + flicker), statue appears
   - 0.75 → 1 **zoom**: title and badge fade early; the building group scales around the manifest's door origin until the door interior fills the screen, ending on a solid **hero `exitColor`** (the handoff to About)
5. Before any scroll: an idle day state (sun glow pulse, bushes sway 1–2°) + a **scroll hint** chevron that fades out once scrolling starts (ask Cole whether there's a design for it).
6. MD uses the same timeline with the manifest's MD overrides.
7. **SM static** `mobile/MobileHero.tsx`: the flattened SM export, full `100svh`, exactly the SM frame, no motion at all, room for the SM header.
8. Performance: static layers use `next/image priority`; `will-change: transform` only on the zoom group during the zoom; the starfield on its own layer.
9. Register the hero in `registry.ts` (component + animation) and `sceneMap.ts`.

**Acceptance criteria**
- [ ] Harness `state=` previews match all 5 LG states and the MD frames
- [ ] Scrubbing to progress 0, 0.25, 0.5 and 0.75 matches states 1–4, and the end shows the exit color; reverse scrolling is clean
- [ ] 60fps through the zoom in Chrome and Safari on a 2020-era laptop
- [ ] SM hero matches `5615:22626` from 320 to 639px with no animation; hero LCP < 2.5s on Fast 4G (LG and SM)

---

#### MS-203 · Sponsors scene: static LG/MD
**Owner:** Michael · **Size:** M · **Depends on:** MS-102, MS-104, MS-105, MS-108, MS-110, MS-101 (Button)
**Figma:** LG [`5597:19671`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-19671), MD [`5687:3854`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-3854)

**Steps**
1. `scenes/sponsors/SponsorsScene.tsx`: the hall background plus windows/statues as a separate layer (MS-110 assets).
2. `sectionTitle` "SPONSORS"; the **gold tier** row of `PictureFrame variant="goldBevel"` with logos on white; the **silver tier** row of `silverBevel` (smaller); "Interested in sponsoring us?"; `<Button variant="gold">View Sponsorship Packet</Button>` → `site.sponsorshipPacketUrl` (new tab); a `mailto:` line.
3. Render the tiers from `sponsors.ts`; rows wrap, and incomplete rows are centered. Logos link out with `aria-label`s.
4. `data-anim`: `sponsors-title`, `sponsor-gold-{i}`, `sponsor-silver-{i}`, `sponsors-cta`, `sponsors-windows`.
5. MD from `5687:3854` (ask Lucy about the stray `Vector 339`).

**Acceptance criteria**
- [ ] Matches LG and MD; handles 3–9 sponsors
- [ ] Works in the harness

---

#### MS-204 · About Us scene: static LG/MD
**Owner:** Rosyln · **Size:** M · **Depends on:** MS-102, MS-104, MS-105, MS-107, MS-108, MS-109
**Figma:** LG [`5597:15707`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-15707), MD [`5690:653`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-653)

**Steps**
1. `museum-dark-blue` background with the MS-109 texture.
2. `<Fog variant="cornerTopLeft">` + `<Fog variant="cornerBottomRight">`, bleeding off-canvas.
3. **Plaque** in HTML/CSS (ochre, sampled; 4 screws; shadow) with `sectionTitle` "ABOUT US" + `body` from `about.ts`. It grows with the text.
4. `<PictureFrame variant="copper">` team photo.
5. Two `<Candle>`s at bottom-left with glow.
6. Leave the top ~90 artboard px clear for the global header.
7. `data-anim`: `about-plaque`, `about-frame`, `about-candle-left`, `about-candle-right`, `about-fog-tl`, `about-fog-br`, `about-glow`.
8. MD from `5690:653`.

**Acceptance criteria**
- [ ] Matches LG and MD; text is live and selectable
- [ ] Works in the harness

---

#### MS-205 · Our Values scene: static LG/MD
**Owner:** Phaedra · **Size:** M · **Depends on:** MS-102, MS-104, MS-107, MS-108, MS-109
**Figma:** LG [`5690:2639`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-2639), MD [`5690:2283`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-2283)

**Steps**
1. Teal gradient (stops from MS-109) + `<Spotlight>` from top-left onto the first pillar.
2. `sectionTitle` "OUR VALUES". Three columns, each: icon stone → `label` title → `body`, sitting on its pillar with staggered heights (left highest, middle lowest, right middle).
3. The 6 vases along the bottom, individually positioned.
4. Text from `values.ts`.
5. `data-anim`: `values-spotlight`, `values-pillar-{0,1,2}`, `values-stone-{0,1,2}`, `values-text-{0,1,2}`, `values-vase-{i}`.
6. MD from `5690:2283`.

**Acceptance criteria**
- [ ] Matches LG and MD; pillars stay aligned when text wraps an extra line
- [ ] Works in the harness

---

#### MS-206 · Speakers scene: static LG/MD + carousel
**Owner:** Mehana · **Size:** M · **Depends on:** MS-102, MS-104, MS-106, MS-108, MS-109
**Figma:** LG [A `5624:1085`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5624-1085), [B `5597:16197`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16197), MD [`5687:2142`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-2142)

**Steps**
1. Use the layout chosen in `motionSpec.ts` (A or B).
2. Orange gradient + curtain (right) + balustrade (bottom) from MS-109.
3. Gazebo arch with the **speaker photo clipped to the arch opening** (the MS-109 clipPath).
4. Text column: `displayName`, `role`, `body` bio, `CarouselArrow` prev/next.
5. `useCarousel(speakers)` + `<CarouselSwap animated>`: the photo and text change together.
6. `data-anim`: `speakers-curtain`, `speakers-arch`, `speakers-balustrade`, `speakers-text`, `speakers-title`.
7. MD from `5687:2142`; ask Lucy whether the 1514-wide `5701:2351` is stray.

**Acceptance criteria**
- [ ] Matches LG and MD; the carousel cycles through all speakers
- [ ] Portrait and landscape photos both clip correctly
- [ ] Works in the harness

---

#### MS-207 · Hacker Testimonials scene: static LG/MD + carousel
**Owner:** Shreeya · **Size:** M · **Depends on:** MS-102, MS-104, MS-105, MS-106, MS-107, MS-108, MS-109
**Figma:** LG [`5597:16837`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16837), MD [`5687:1662`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-1662)

**Steps**
1. `museum-purple` + the 3 corridor depth layers (MS-109), stacked.
2. `<Fog variant="sideLeft">` / `sideRight`; `<SparkleCluster>`s as in Figma.
3. ~6 footprint instances along the floor path (`data-anim="testimonials-foot-{i}"`).
4. `sectionTitle` "HACKER TESTIMONIALS"; `<PictureFrame variant="goldMedallion">`; quote (`body`, curly quotes); name (`label`); school + year (`bodySmall`); arrows.
5. `useCarousel(testimonials)` + `<CarouselSwap animated>`.
6. `data-anim`: `testimonials-far`, `testimonials-mid`, `testimonials-near`, `testimonials-fog-l`, `testimonials-fog-r`, `testimonials-card`.
7. MD from `5687:1662`.

**Acceptance criteria**
- [ ] Matches LG and MD; a 400+ character quote doesn't overflow
- [ ] Works in the harness

---

#### MS-208 · Past Projects scene: static LG/MD + carousel
**Owner:** Andre · **Size:** M · **Depends on:** MS-102, MS-104, MS-105, MS-106, MS-107, MS-108, MS-110
**Figma:** LG [`5597:21587`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-21587), MD [`5687:2813`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-2813)

**Steps**
1. Gallery wall + ceiling strip; the exhibit (arches + dino as separate layers + ropes + sparkles) from MS-110.
2. `sectionTitle` "PAST PROJECTS" (left-aligned).
3. Right column: `<PictureFrame variant="wood">` with media by type (image / `<video muted loop playsInline>` / embed); `cardTitle` + external-link icon → `url`; members (`bodySmall`); description (`body`); arrows.
4. `useCarousel(projects)` + `<CarouselSwap animated>`; pause videos that aren't the current slide.
5. `data-anim`: `projects-arches`, `projects-dino`, `projects-ropes`, `projects-card`, `projects-title`.
6. MD from `5687:2813`.

**Acceptance criteria**
- [ ] Matches LG and MD; image, video and embed all render in the frame
- [ ] Works in the harness

---

#### MS-209 · Meet the Team scene: static LG/MD + gallery
**Owner:** Yurika · **Size:** L · **Depends on:** MS-102, MS-104, MS-105, MS-106, MS-108, MS-110
**Figma:** LG [`5597:20455`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20455) + dept rows ([Directors](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-46984), [Design](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-46923), [Tech](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-46739), [Sponsorship](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-46933), [Ops](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-47071), [Marketing](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-47132)), MD [`5690:3059`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-3059)

**Steps**
1. **Ask Cole first (Slack):** one continuous strip ordered by department, or a department filter? Write the answer in the PR description.
2. Teal background + floor strip + 2 benches (MS-110).
3. `sectionTitle` "MEET THE TEAM".
4. A 2-row horizontal strip (`useHorizontalGallery`), with items alternating rows at the staggered offsets from Figma. Each item: `<PictureFrame variant={member.frame}>` at that variant's Figma size + name (`label`) + role (`role`).
5. `CarouselArrow size="lg"` at the left/right edges; the strip bleeds off both sides (edge fade if Cole wants it).
6. Lazy-load images beyond the first visible page.
7. `data-anim`: `team-title`, `team-row-{0,1}`, `team-member-{i}`, `team-benches`. **Put the horizontal scroll container inside a wrapper** so the S3 animation can transform the wrapper without fighting `scrollLeft`.
8. MD from `5690:3059`.

**Acceptance criteria**
- [ ] Matches LG and MD; every member renders with the right frame
- [ ] Arrows page correctly and disable at the ends; trackpad and touch work
- [ ] Works in the harness

---

### Sprint 3 — Page assembly + section animations (Oct 8 – Oct 14)

Animation tickets own `<name>.animation.ts`, implement **`enter` + `build`** per §3.4 using `motionSpec.ts` and `transitions.ts`, add `animation` to their registry entry, and verify in the harness (`?scene=<id>&progress=` and `?enter=1`) **and** on the assembled page.

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-301 | Assemble the full landing page (LG/MD) + nav wiring + deep links + legacy cleanup | **Aditya** | L |
| MS-302 | FAQ + Sock scene: static LG/MD + `FaqAccordion` | Michael | M |
| MS-303 | About Us animation + entry from Hero | Rosyln | M |
| MS-304 | Our Values animation + entry | Phaedra | M |
| MS-305 | Speakers animation + entry | Mehana | M |
| MS-306 | Hacker Testimonials animation + entry | Shreeya | M |
| MS-307 | Past Projects animation + entry | Andre | M |
| MS-308 | Meet the Team animation + entry | Yurika | M |

---

#### MS-301 · Assemble the full landing page (LG/MD) + nav wiring + deep links + legacy cleanup
**Owner:** Aditya · **Size:** L · **Depends on:** MS-101, MS-201, MS-202, MS-203–MS-209

**Steps**
1. `registry.ts` lists all 9 real scenes in order. FAQ is built this sprint (MS-302), so keep its placeholder until it merges, then swap it in (one line). Animations from MS-303–MS-308 plug in through their own registry lines.
2. `(landing)/page.tsx`: `ScrollStage` for LG/MD (drop the `?stage=1` flag), and `MobileHero` for SM for now (MS-502 adds the rest of the SM page).
3. **Header wiring:** `activeSection = useActiveScene()`, `visible = active !== "hero"`. Tab clicks call `scrollToScene(id)` and set the hash with `history.replaceState`.
4. Footer Back to top uses `lenis.scrollTo(0)`.
5. **Deep links:** `/#values` etc. on first load jump straight to the resting state (no playing through the hero); `history.scrollRestoration = "manual"`.
6. Tune the total scroll length so the whole page takes ~18–22 wheel flicks. Change only `motionSpec.ts` values, and tell #mainsite what changed.
7. **Final legacy cleanup:** delete the old `(landing)/Sections/*`, everything left in `lib/Assets/`, old `lib/Components/*`, old `public/*`, and the old `not-found.tsx` styling (MS-703 builds the new 404). After this, `apps/main` holds only 2027 code (list `git ls-files apps/main` in the PR description). Don't touch `packages/ui`/`packages/util`.
8. `<html>` background: `bg-canopyGreen` → `bg-museum-black`.

**Acceptance criteria**
- [ ] `/` at 1512 and 1000 plays Hero → FAQ/Footer end to end, forward and back
- [ ] The nav highlights the right tab everywhere; every tab and deep link lands exactly
- [ ] No last-year files left in `apps/main`; `yarn build` passes; `apps/live` and `apps/app-portal` still build

---

#### MS-302 · FAQ + Sock scene: static LG/MD + `FaqAccordion`
**Owner:** Michael · **Size:** M · **Depends on:** MS-101, MS-102, MS-104, MS-107, MS-108, MS-110
**Figma:** LG [`5597:20877`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20877), MD [`5690:4737`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-4737)

**Steps**
1. `scenes/faq/FaqScene.tsx`: **not** a fixed viewport. It's the ~2-viewport, normal-flow ending. Widths use artboard units; the height flows.
2. Near-black → deep navy gradient background.
3. `sectionTitle` "FAQs"; left column General + Application, right column Event Logistics; `label` category headings.
4. **`scenes/faq/FaqAccordion.tsx`** (fresh; SM reuses it): question (`faqQuestion`) + +/− icon + answer (`bodySmall`) + dividers; one open item per category; the height animates with the `grid-template-rows: 0fr → 1fr` trick when `animated` (off on SM); Regular → SemiBold when open; `<button aria-expanded aria-controls>`.
5. **Sock art:** pterodactyl + dino skeletons (separate), 2–3 `<Spotlight>` beams, `<Fog variant="ribbon">` + sparkles.
6. `<Footer />` at the bottom, over the art.
7. `data-anim`: `faq-title`, `faq-col-{0,1}`, `faq-skeleton-ptero`, `faq-skeleton-dino`, `faq-beam-{i}`, `faq-ribbon`.
8. MD from `5690:4737`. Register in `registry.ts` (replacing the placeholder) and `sceneMap.ts`.

**Acceptance criteria**
- [ ] Matches LG and MD
- [ ] Accordion works by keyboard and with VoiceOver
- [ ] Opening a long answer doesn't make the skeleton art jump

---

#### MS-303 · About Us animation + entry from Hero
**Owner:** Rosyln · **Size:** M · **Depends on:** MS-201, MS-202, MS-204
1. `enter`: a full-screen overlay in the **hero `exitColor`** fades out while the About background brightens ("eyes adjusting"); the fog corners slide in from off-canvas.
2. `build`: the plaque drops from above with a pendulum settle (−3° → 2° → 0°), then the text fades up line by line; the frame slides in from the right with a tilt settle; the candle glow ramps up.
3. Idle: candle flicker and fog drift keep running (from MS-107).

**Acceptance criteria:** the Hero → About handoff is seamless on `/`; the end of `build` matches the Figma frame; reverse scrolling is clean.

#### MS-304 · Our Values animation + entry
**Owner:** Phaedra · **Size:** M · **Depends on:** MS-201, MS-205
1. `enter`: `fogWipe` from About's `exitColor` to teal, moving upward.
2. `build`: the spotlight switches on (scaleY + flicker); pillars rise from below in stagger (left, middle, right); each stone pops (`back.out`) as its pillar lands; text fades up; vases slide up in stagger.
3. Optional (ask Cole): the spotlight sweeps across the three values while scrolling, then settles in the Figma position.

**Acceptance criteria:** the end state matches Figma; forward and reverse are smooth with no flicker.

#### MS-305 · Speakers animation + entry
**Owner:** Mehana · **Size:** M · **Depends on:** MS-201, MS-206
1. `enter`: the `curtain` sweeps in from the right over Values' `exitColor`, revealing the orange stage, then settles in place.
2. `build`: the arch rises and scales from 0.9; the balustrade slides up; the text staggers in (title, name, role, bio, arrows). If `motionSpec.ts` says frames B → A, the title moves from center into the column.
3. The carousel stays click-driven at any progress once visible.

**Acceptance criteria:** the end state matches the chosen frame; arrows work throughout.

#### MS-306 · Hacker Testimonials animation + entry
**Owner:** Shreeya · **Size:** M · **Depends on:** MS-201, MS-207
1. `enter`: the "walk in". Crossfade from Speakers' `exitColor` while the depth layers go from 1.25 / 1.15 / 1.08 scale to 1.
2. `build`: fog drifts inward; footprints appear one by one toward the viewer; the medallion swings down; the card fades up; sparkles twinkle.

**Acceptance criteria:** the end state matches Figma; no gaps at layer edges at 1920×1080 or 1280×720.

#### MS-307 · Past Projects animation + entry
**Owner:** Andre · **Size:** M · **Depends on:** MS-201, MS-208
1. `enter`: a `pan`. The previous scene slides out left while the gallery comes in from the right, and the color tweens from Testimonials' `exitColor` to lavender.
2. `build`: arches and dino parallax at different speeds; ropes slide in from the left; the card fades up; sparkles twinkle.

**Acceptance criteria:** the end state matches Figma; no blank gap at any point during the pan.

#### MS-308 · Meet the Team animation + entry
**Owner:** Yurika · **Size:** M · **Depends on:** MS-201, MS-209
1. `enter`: `fogWipe` from Sponsors' `exitColor` (navy) to teal.
2. `build`: the title drops; the top row slides in from the right, then the bottom row; portraits settle (±2° → 0); benches rise.
3. Animate the **wrapper** (MS-209), never the scroll container, so the arrows and horizontal scroll keep working.

**Acceptance criteria:** the end state matches Figma; the gallery works during and after the animation.

---

### Sprint 4 — Last animations + SM sections (Oct 15 – Oct 21)

**SM rules (MS-404 to MS-408):** SM is a **separate, fully static design** at 402px. Build `mobile/Mobile<Name>.tsx` as normal vertical flow sections. **No animation of any kind**: pass `animate={false}` to decor primitives, `animated={false}` to `CarouselSwap`/`FaqAccordion`, no pinning, no reveal, no load-in. Use `useSwipe` + arrows for carousels. Use the SM assets from MS-109/MS-110. Fluid from 320 to 639px. Add each section to `/dev/mobile?section=<id>` (the first ticket to merge creates the page) and set the section's `id` (`about` etc.). Assembly is MS-502.

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-401 | Scroll hardening: browsers, devices, edge cases (LG/MD) | **Aditya** | L |
| MS-402 | Sponsors animation + entry | Michael | M |
| MS-403 | FAQ + Sock scroll animation + entry | Phaedra | M |
| MS-404 | SM: About Us + Our Values | Rosyln | M |
| MS-405 | SM: Speakers + Hacker Testimonials | Mehana | M |
| MS-406 | SM: Past Projects + Sponsors | Shreeya | M |
| MS-407 | SM: Meet the Team | Andre | M |
| MS-408 | SM: FAQ + Sock (above footer) | Yurika | M |

---

#### MS-401 · Scroll hardening: browsers, devices, edge cases (LG/MD)
**Owner:** Aditya · **Size:** L · **Depends on:** MS-301
1. Matrix: Chrome, Safari, Firefox and Edge (macOS + Windows); iPad Safari 1000–1180px (MD **with touch**); stepped mouse wheel vs. inertial trackpad; keyboard scrolling (Space, PgDn, arrows).
2. Fix: refresh mid-page (restore from the hash); resizing across LG↔MD mid-scroll; iPad address-bar resize; very fast flicks skipping `enter`s (`fastScrollEnd`, `preventOverlaps`, end states always reached); browser zoom at 125/150%; 2560×1080 and 1280×650 viewports.
3. Record known limitations as **JSDoc on `ScrollStage`** and file anything unresolved as GitHub issues.

**Acceptance criteria:** the whole matrix passes or has filed issues; no broken state after flicking to the bottom and back.

#### MS-402 · Sponsors animation + entry
**Owner:** Michael · **Size:** M · **Depends on:** MS-201, MS-203
1. `enter`: crossfade from Projects' `exitColor` with a zoom out (1.08 → 1).
2. `build`: windows/statues parallax; the title fades down; gold frames drop in one by one (y −40 → 0, rotate settle), then silver; the CTA fades up. The stagger adapts to the sponsor count.
3. Hover lift on the logo frames (CSS only).

**Acceptance criteria:** the end state matches Figma with 3, 6 and 9 sponsors.

#### MS-403 · FAQ + Sock scroll animation + entry
**Owner:** Phaedra · **Size:** M · **Depends on:** MS-201, MS-302
1. **Unpinned**: ScrollTrigger `scrub` on normal scroll.
2. `enter`: fade from Team's `exitColor` to near-black while the title drops.
3. While scrolling: the columns fade up; the skeletons parallax slower than the scroll; beams sweep a few degrees; the fog ribbon drifts; sparkles twinkle; the footer fades in.
4. Accordion height changes call `ScrollTrigger.refresh()` (debounced).

**Acceptance criteria:** smooth all the way to the footer; accordion toggles don't break the parallax.

#### MS-404 · SM: About Us + Our Values
**Owner:** Rosyln · **Size:** M · **Depends on:** MS-104, MS-105, MS-107, MS-108, MS-109
**Figma:** SM [About `5615:26129`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-26129), [Values `5615:74674`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-74674) (402×1244)
1. `mobile/MobileAbout.tsx`: the plaque and framed photo stacked per the SM frame; static candles and fog.
2. `mobile/MobileValues.tsx`: values and pillars stacked vertically per the taller SM frame.

**Acceptance criteria:** matches the SM frames at 402px, fluid from 320 to 639px, no animation.

#### MS-405 · SM: Speakers + Hacker Testimonials
**Owner:** Mehana · **Size:** M · **Depends on:** MS-104, MS-105, MS-106, MS-107, MS-108, MS-109
**Figma:** SM [Speakers `5615:26316`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-26316), [Testimonials `5687:1172`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-1172)
1. `mobile/MobileSpeakers.tsx` and `mobile/MobileTestimonials.tsx` from the SM frames.
2. Carousels: `useCarousel` + `useSwipe` + arrows; instant swap.

**Acceptance criteria:** matches SM; swipe and arrows work without blocking vertical scroll.

#### MS-406 · SM: Past Projects + Sponsors
**Owner:** Shreeya · **Size:** M · **Depends on:** MS-101 (Button), MS-104, MS-105, MS-106, MS-107, MS-108, MS-110
**Figma:** SM [Projects `5615:26385`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-26385), [Sponsors `5615:28693`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-28693)
1. `mobile/MobileProjects.tsx`: a swipe carousel with media in the wood frame.
2. `mobile/MobileSponsors.tsx`: tiers stacked per Figma, plus the CTA.

**Acceptance criteria:** matches SM; the sponsor tiers wrap cleanly with 3–9 sponsors.

#### MS-407 · SM: Meet the Team
**Owner:** Andre · **Size:** M · **Depends on:** MS-104, MS-105, MS-106, MS-108, MS-110
**Figma:** SM [`5681:1281`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5681-1281), [`5685:18775`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5685-18775)
1. Ask Cole what the two SM frames represent (pages of one carousel, or a department switcher).
2. `mobile/MobileTeam.tsx`: a swipeable, snapping gallery with `PictureFrame` variants from `team.ts`.

**Acceptance criteria:** matches both SM frames; every member reachable by swipe and arrows.

#### MS-408 · SM: FAQ + Sock (above footer)
**Owner:** Yurika · **Size:** M · **Depends on:** MS-101, MS-107, MS-108, MS-110, MS-302
**Figma:** SM [`5615:30055`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-30055)
1. `mobile/MobileFaq.tsx`: categories in one column using `FaqAccordion animated={false}`.
2. The SM sock art (static), then `<Footer />`.

**Acceptance criteria:** matches SM at 402px; the accordion is accessible; the mailing list works on iOS Safari.

---

### Sprint 5 — Hardening (Oct 22 – Oct 28)

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-501 | Loading experience: preloader, font & hero asset loading (LG/MD) | **Aditya** | M |
| MS-502 | SM page assembly + mobile menu wiring | Michael | M |
| MS-503 | Accessibility + reduced-motion mode (LG/MD) | Mehana | L |
| MS-504 | Performance & asset optimization (all breakpoints) | Shreeya | M |
| MS-505 | Real content integration (all sections) | Andre | M |
| MS-506 | SEO, metadata, social cards, analytics | Rosyln | M |
| MS-507 | MD visual QA: Hero → Testimonials | Phaedra | M |
| MS-508 | MD visual QA: Projects → FAQ | Yurika | M |

**End of S5 (Wed Oct 28):** a 1-hour **design review** with Cole and Lucy on staging (LG, MD and SM). Aditya files the feedback as **GitHub issues** labelled by section and breakpoint for S6.

#### MS-501 · Loading experience (LG/MD)
**Owner:** Aditya · **Depends on:** MS-301
1. Decide with Cole: a short branded preloader (HBP moon + progress) **or** a progressive hero reveal.
2. Preload the hero-critical layers and fonts; hold `ScrollStage` until they're decoded (`img.decode()`), with a 3s max timeout.
3. No CLS from font swaps (`next/font` fallback metrics). SM loads straight into its static page.

**Acceptance:** first visit on Fast 4G never shows a half-drawn hero; CLS < 0.05.

#### MS-502 · SM page assembly + mobile menu wiring
**Owner:** Michael · **Depends on:** MS-202 (MobileHero), MS-404–MS-408, MS-101, MS-301
1. `mobile/MobileLanding.tsx`: all the SM sections in order, then the footer, in plain document flow with native scrolling.
2. `page.tsx`: `ScrollStage` hidden below 640px, `MobileLanding` hidden at 640px and up (CSS). Confirm GSAP and Lenis don't initialize on SM.
3. Mobile menu links jump to the section ids (`scroll-margin-top` for the header) and close the menu; Back to top works.

**Acceptance:** at 402px, Hero → Footer scrolls natively; every menu link works; no GSAP, Lenis or running animations on SM (Performance panel); no hydration warnings.

#### MS-503 · Accessibility + reduced-motion mode (LG/MD)
**Owner:** Mehana · **Depends on:** MS-301
1. **Reduced motion:** `ScrollStage` doesn't pin or scrub; scenes render in normal flow in their final state with a 200ms fade on enter; the hero shows the **title** state. Implement it as a `reducedMotion` branch in `ScrollStage` that skips each animation's `build`.
2. Semantics: one `<h1>` (the hero title), an `<h2>` per section, `<section aria-labelledby>` on each scene root, and `aria-hidden` + `focusable="false"` on decorative SVGs.
3. Keyboard: tab order follows the visual order; focusing inside an off-screen scene scrolls to it (`focusin` → `scrollToScene`); a skip-to-content link.
4. Contrast checks (especially the light-lavender roles on orange and the grey roles on teal). File failures as GitHub issues for Cole; don't change colors unilaterally.
5. axe DevTools at 1512 and 1000; fix critical/serious issues; VoiceOver smoke test (nav, carousels, accordion, form).

**Acceptance:** fully usable with OS reduce-motion on; axe shows 0 critical/serious on `/`; a keyboard-only walkthrough reaches everything in order.

#### MS-504 · Performance & asset optimization (all breakpoints)
**Owner:** Shreeya · **Depends on:** MS-301
1. Baseline Lighthouse (desktop + mobile) and WebPageTest on staging; put the numbers in the PR description.
2. SVGO/WebP pass on every asset; remove unused files.
3. Lazy-load the heavy art of scenes more than 2 away from the active one, via a `lazy: true` flag in the registry that `ScrollStage` reads.
4. Preload only the hero-critical assets and fonts; check for long tasks during scroll; make sure no animation touches layout properties; check GSAP/Lenis stay out of the SM bundle path where possible.

**Acceptance:** Lighthouse desktop ≥ 90, mobile ≥ 75; first load < 2.5MB; no frames > 50ms during a full scroll.

#### MS-505 · Real content integration
**Owner:** Andre · **Depends on:** MS-108
1. Work through the "Mainsite 2027 content needed" issue with Aditya and the directors.
2. Update only `lib/content/*` and the assets: headshots as 800×800 WebP, logos as SVG, all < 200KB.
3. Remove every `TODO(content)`; anything still missing gets an approved "coming soon" fallback.
4. Proofread all copy against Figma.

**Acceptance:** no placeholders left unless a director approved them; the content issue is closed.

#### MS-506 · SEO, metadata, social cards, analytics
**Owner:** Rosyln
1. `metadata`: title, description ("501(c)(3)", not "5013c"), canonical URL, `themeColor`.
2. OG/Twitter image (ask Cole for a 1200×630 night-hero image) and favicons from the HBP moon.
3. JSON-LD `Event` for HackBeanpot 2027; `robots.ts` + `sitemap.ts` metadata routes.
4. Analytics (confirm the tool with Aditya): page view, Apply, Sponsor Us, packet clicks, mailing list signups.

**Acceptance:** previews render in Slack and iMessage; Lighthouse SEO = 100; events show up in the dashboard.

#### MS-507 / MS-508 · MD visual QA
**Owners:** Phaedra (Hero, About, Values, Speakers, Testimonials) · Yurika (Projects, Sponsors, Team, FAQ + Footer) · **Depends on:** MS-301
1. At 1000×982 (spot checks at 768, 900, 1024, 1279), overlay-compare each scene's MD resting state with the Figma PNG (e.g. the PerfectPixel extension).
2. Fix deviations with `tablet:` overrides only; check the MD animation end states and the hamburger header over each scene.
3. **Hero fixes (Phaedra):** open a GitHub issue for Aditya instead of editing hero files. The hero is his.

**Acceptance:** each scene within ~4px at 1000px (overlays in the PR); LG screenshots attached to show no regressions.

---

### Sprint 6 — Design-review fixes · 🎯 feature-complete (Oct 29 – Nov 4)

All fixes come from the S5 design-review GitHub issues. **End of S6 (Wed Nov 4):** a 1-hour **team bug bash** on staging (all breakpoints). Bugs are filed as GitHub issues labelled `scroll`, `hero`, `lg-visual`, `md-visual`, `sm`, `a11y`.

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-601 | Design fixes: Hero (all sizes) + motion/scroll-length polish | **Aditya** | M |
| MS-602 | Staging, release process, bug triage board | Michael | S |
| MS-603 | LG/MD design fixes: About, Values, Speakers | Rosyln | M |
| MS-604 | LG/MD design fixes: Testimonials, Projects, Sponsors | Phaedra | M |
| MS-605 | LG/MD design fixes: Team, FAQ + Sock | Yurika | M |
| MS-606 | SM design fixes: About, Values, Speakers, Testimonials | Mehana | M |
| MS-607 | SM design fixes: Projects, Sponsors, Team, FAQ | Shreeya | M |
| MS-608 | Automated visual smoke tests + CI | Andre | M |

- **MS-601 (Aditya):** fix every hero review item at LG/MD/SM; apply any global timing changes (in `motionSpec.ts`) the designers asked for. *Acceptance:* all hero and motion review issues closed or deferred by design.
- **MS-602 (Michael):** a stable staging URL (Vercel preview of `dev`); a **GitHub Project board** for bugs with columns and labels; a release checklist as a **GitHub issue** (freeze dates, approver, rollback steps). Triage daily. *Acceptance:* the board is live; every bug has an owner and priority within 24h.
- **MS-603 / MS-604 / MS-605 (Rosyln / Phaedra / Yurika):** close the review issues for your sections at LG/MD (visual + motion; motion edits stay inside your `*.animation.ts`). *Acceptance:* all your issues closed or deferred by design, with before/after screenshots in the PR.
- **MS-606 / MS-607 (Mehana / Shreeya):** close the SM review issues for your sections in `mobile/*`, and spot-check on a real iPhone and Android. *Acceptance:* the same as above, at 402px and fluid from 320 to 639px.
- **MS-608 (Andre):** Playwright in `apps/main`. Screenshot each scene via hash at 1512×982 and 1000×982 with reduced-motion emulation, plus full-page at 402×874. Smoke assertions: nav links, accordion, carousel arrows, form validation. A GitHub Action on PRs touching `apps/main/**`: lint, type-check, build, Playwright (screenshots as artifacts; visual diffs advisory). *Acceptance:* CI green on a PR; artifacts downloadable.

---

### Sprint 7 — Bug bash fixes (Nov 5 – Nov 11)

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-701 | Bug fixes: `scroll` + `hero` | **Aditya** | M |
| MS-702 | Launch prep: env, domain, redirects, analytics prod keys | Michael | S |
| MS-703 | Museum-themed 404 page | Rosyln | S |
| MS-704 | Bug fixes: `lg-visual` | Phaedra | M |
| MS-705 | Bug fixes: `md-visual` | Yurika | M |
| MS-706 | Bug fixes: `sm` | Shreeya | M |
| MS-707 | Accessibility round 2 (all breakpoints) | Mehana | M |
| MS-708 | Cross-device test matrix | Andre | M |

- **MS-701 (Aditya):** close every P0/P1 `scroll` and `hero` bug and re-run the MS-401 matrix. *Acceptance:* zero open P0/P1 in those labels.
- **MS-702 (Michael):** prod env vars (mailing list key), domain/DNS plan, verify the MS-101 redirects on a prod-like build, analytics prod key. Track it in the release-checklist issue. *Acceptance:* every checklist item done or scheduled for launch day.
- **MS-703 (Rosyln):** replace `app/not-found.tsx` with a museum-themed 404 (e.g. an empty exhibit + "This exhibit has moved" + a Back to home button). Ask Cole for a quick design, or compose one from existing assets. Static on SM. *Acceptance:* matches the design at all breakpoints.
- **MS-704 / MS-705 / MS-706 (Phaedra / Yurika / Shreeya):** close the P0/P1 bugs in your label. *Acceptance:* zero open P0/P1; before/after screenshots.
- **MS-707 (Mehana):** redo the MS-503 checks at SM too (axe, VoiceOver iOS, TalkBack Android); mobile menu focus trap; touch targets ≥ 44px. *Acceptance:* 0 critical/serious axe issues at all breakpoints.
- **MS-708 (Andre):** on staging, test Chrome, Safari, Firefox and Edge on desktop (1280, 1512, 1920), iPad portrait and landscape, iPhone SE/15/15 Pro Max, and a mid-range Android. Checks: loads, full scroll, nav, carousels, accordion, form. **File each problem as a GitHub issue** (device + repro + screenshot) and post a pass/fail summary in #mainsite. *Acceptance:* every device checked; issues filed.

---

### Sprint 8 — Release candidate (Nov 12 – Nov 18)

**Feature freeze: Mon Nov 16.** Only bug fixes after that.

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-801 | Cut RC + go/no-go | Michael | S |
| MS-802 | Final performance audit & fixes | **Aditya** | M |
| MS-803 | Content lock + final proofread | Rosyln | S |
| MS-804 | Bug fixes: LG (from MS-708) | Phaedra | M |
| MS-805 | Bug fixes: MD + tablet touch (from MS-708) | Yurika | M |
| MS-806 | Bug fixes: SM (from MS-708) | Shreeya | M |
| MS-807 | Final a11y + reduced-motion verification | Mehana | S |
| MS-808 | Regression run + update visual baselines | Andre | S |

- **MS-801 (Michael):** cut the RC from `dev` onto staging, walk through the release-checklist issue, and get a go/no-go from Aditya and the directors. *Acceptance:* RC tagged; go/no-go recorded in the issue.
- **MS-802 (Aditya):** re-run the MS-504 audits on the RC at all breakpoints; fix regressions. *Acceptance:* Lighthouse desktop ≥ 90, mobile ≥ 80.
- **MS-803 (Rosyln):** get written director sign-off (in the content issue) on all copy; proofread every section at every breakpoint; freeze `lib/content`. *Acceptance:* sign-off recorded.
- **MS-804 / MS-805 / MS-806:** close the QA bugs for your breakpoint. *Acceptance:* zero P0/P1 open.
- **MS-807 (Mehana):** final axe, keyboard and reduced-motion pass on the RC. *Acceptance:* results posted in the release-checklist issue, all clean.
- **MS-808 (Andre):** the Playwright suite + a manual smoke on the RC; update the screenshot baselines. *Acceptance:* green run on the RC commit.

---

### Sprint 9 — Launch 🚀 (Nov 19 – Nov 25)

**Launch target: Tuesday Nov 24.**

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-901 | Production deploy + announcement + retro | Michael | S |
| MS-902 | Launch on-call: scroll, hero, animation | **Aditya** | S |
| MS-903 | Post-launch cleanup: dev routes, unused deps, lint warnings | Rosyln | S |
| MS-904 | Production smoke test: LG | Phaedra | S |
| MS-905 | Production smoke test: MD + tablets | Yurika | S |
| MS-906 | Production smoke test: SM | Shreeya | S |
| MS-907 | Analytics & SEO verification in production | Mehana | S |
| MS-908 | Launch on-call: content, forms, redirects | Andre | S |

- **MS-901 (Michael):** after Aditya's sign-off, merge the RC to prod, deploy, verify the domain; coordinate the social announcement with marketing; run the retro on Wed Nov 25 (notes in Slack).
- **MS-902 / MS-908 (Aditya / Andre):** 48h on call in your area; hotfixes via PR with one review.
- **MS-903 (Rosyln):** confirm `/dev/*` 404s in prod; remove unused dependencies and dead code; get lint to zero warnings in `apps/main`; delete merged branches.
- **MS-904 / MS-905 / MS-906 (Phaedra / Yurika / Shreeya):** within 2h of the deploy, run the smoke checklist on **production** on real devices for your breakpoint; file anything critical as a GitHub issue and ping the on-call.
- **MS-907 (Mehana):** confirm the prod analytics events arrive; submit the sitemap to Google Search Console; check OG previews on the live domain.

---

## 5. Ownership summary

| Person | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 |
|---|---|---|---|---|---|---|---|---|---|
| **Aditya** | Navbar + footer + remove routes · **Animation foundation** · **Hero assets** | **Orchestrator** · **Hero complete (LG/MD/SM + anim)** | Full page assembly | Scroll hardening | Loading exp. | Hero + motion fixes | Scroll/hero bugs | Perf audit | On-call |
| **Michael** | Asset export A | Sponsors static | FAQ static + accordion | Sponsors anim | SM assembly | Staging + triage | Launch prep | Cut RC | Prod deploy |
| **Rosyln** | Tokens + type | About static | About anim | SM About + Values | SEO + analytics | LG/MD fixes A | 404 page | Content lock | Cleanup |
| **Phaedra** | PictureFrame | Values static | Values anim | FAQ anim | MD QA A | LG/MD fixes B | LG bugs | LG bugs | Smoke LG |
| **Mehana** | Carousel prims | Speakers static | Speakers anim | SM Spk + Test | A11y + reduced motion | SM fixes A | A11y round 2 | A11y final | Analytics verify |
| **Yurika** | Asset export B | Team static | Team anim | SM FAQ | MD QA B | LG/MD fixes C | MD bugs | MD bugs | Smoke MD |
| **Shreeya** | Decor prims | Testimonials static | Testimonials anim | SM Proj + Spons | Perf | SM fixes B | SM bugs | SM bugs | Smoke SM |
| **Andre** | Content data | Projects static | Projects anim | SM Team | Real content | Visual tests + CI | Device matrix | Regression | On-call |

**In the first two weeks, Aditya delivers the navbar, footer, the entire hero (assets, LG/MD static + animation, SM static) and the full animation structure** (engine, `SceneFrame`, units, harness, `motionSpec.ts`, `ScrollStage`, transitions). After that he stays on the hardest track: page assembly, then scroll hardening, then loading, then scroll bugs and perf. Everyone else builds a section statically in S2 and animates it in S3, keeping context.

## 6. Risks & open questions

| # | Risk / question | Owner | Resolve by |
|---|---|---|---|
| 1 | **Aditya's load in S1–S2 is heavy** (5 tickets, 3 of them L). If S1 slips, MS-103 (hero assets) goes to Michael, whose asset-export ticket is the lightest. | Aditya | Mon Sep 28 check-in |
| 2 | **No motion spec in Figma.** §3.5 is inferred; it gets confirmed into `motionSpec.ts`. | Aditya + Cole/Lucy | Sat Sep 26 (MS-102) |
| 3 | **Figma text styles are stale** (the frames use Amarante/Special Gothic/Merriweather). | Rosyln + Cole | Sep 30 (MS-104) |
| 4 | Speakers: two LG frames. Final layout or an animation pair? | Aditya + Lucy | Sep 26 (MS-102) |
| 5 | Team gallery grouping (continuous vs. per department), and what the 2 SM frames mean. | Yurika / Andre + Cole | Oct 1 / Oct 15 |
| 6 | Content gaps (speakers, testimonials, team, sponsors, FAQ answers, 2027 dates). | Aditya + directors | Oct 28 (MS-505) |
| 7 | The hero is the riskiest piece (asset size + zoom performance). If the zoom isn't smooth by Oct 7, ship a crossfade-only hero and add the zoom in S4. | Aditya | Oct 7 |
| 8 | Sponsor Us button target (`/#sponsors` vs. the packet) after removing `/sponsor-us`. | Aditya + Cole/Lucy | Sep 30 (MS-101) |
| 9 | Components → "Other" (`5539:741`) hasn't been reviewed. | Aditya | Sep 30 (MS-101) |
