# HackBeanpot 2027 Mainsite — Roadmap & Sprint Tickets

**Figma:** [[Design] Mainsite](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite)
**Goal:** Ship the new museum-themed mainsite (LG, MD, SM) by the **last week of November 2026**.
**Team (8):** Aditya (lead), Michael, Rosyln, Phaedra, Mehana, Yurika, Shreeya, Andre
**App:** `apps/main` (Next 14, Tailwind, shared config in `packages/config-tailwind`)

---

## 1. Timeline at a glance

Sprints are one week, **Thursday → Wednesday** (planning Thursday, demo + review Wednesday). Shift the dates if you prefer Monday starts. The order of work doesn't change.

| Sprint | Dates | Theme | Outcome |
|---|---|---|---|
| **S1** | Sep 24 – Sep 30 | Foundations & shared components | Tokens, fonts, animation engine, shared UI primitives, content data, hero assets, Header/Footer |
| **S2** | Oct 1 – Oct 7 | Static sections, part 1 (LG + MD) | Hero, About, Values, Speakers, Testimonials, Projects, Sponsors built statically; scroll orchestrator |
| **S3** | Oct 8 – Oct 14 | Static sections, part 2 + first animations | Team and FAQ static; Hero, About, Values, Speakers, Testimonials, Projects animated |
| **S4** | Oct 15 – Oct 21 | Full LG/MD page + SM kickoff | Sponsors, Team, FAQ animated; whole LG/MD page assembled end to end; first SM sections |
| **S5** | Oct 22 – Oct 28 | LG/MD hardening + SM sections | MD QA, a11y/reduced motion, perf, real content; remaining SM sections |
| **S6** | Oct 29 – Nov 4 | LG/MD design fixes + SM assembly | **LG/MD feature-complete**; SM page assembled; SEO; visual tests |
| **S7** | Nov 5 – Nov 11 | SM design fixes + bug bash | **SM feature-complete**; cross-device matrix |
| **S8** | Nov 12 – Nov 18 | Release candidate | Content lock, final audits, RC on staging |
| **S9** | Nov 19 – Nov 25 | Launch 🚀 | Prod deploy by **Tue Nov 24** (before Thanksgiving), hotfix rotation, retro |

**Rules for every sprint**
- Tickets in the same sprint have **no dependencies on each other**. A ticket only depends on work merged in **earlier** sprints.
- When two tickets in one sprint touch neighboring code, the boundary is set by a **contract in §3** (file ownership, prop interfaces, handoff colors), so nobody waits on anyone else.
- Everything merges into `dev` by the **Wednesday demo**. Anything unfinished gets carried over explicitly at planning.

---

## 2. What's in the Figma file

### Pages
| Page | Node | Contents |
|---|---|---|
| 🖥️ LG | `0:1` | 9 sections, 1512×982 artboards |
| 💻 MD | `1:3` | Same 9 sections, 1000×982 artboards |
| 📱 SM | `1:2` | Same 9 sections plus Mobile Menu, 402×874 artboards (**separate design**) |
| ✏️ Components | `1:5` | Header `5388:302`, Footer `5388:305`, Other `5539:741` |
| ✏️ Design Documentation | `1:4` | Color Palette `31:751`, Typography `31:793` |
| ✏️ Prototype/Animations | `405:3324` | **Empty.** No motion spec exists yet (see MS-102) |

Figma link format: `https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=<id with - instead of :>`

### Section order and frame IDs

| # | Section (design owner) | LG frames | MD frames | SM frames |
|---|---|---|---|---|
| 1 | Hero (Cole) | `5615:70522` day → `5597:839` dusk → `5597:5431` night → `5597:8846` title → `5597:12280` zoom | `5691:35814`, `5691:42665` | `5615:22626` |
| 2 | About us (Cole) | `5597:15707` | `5690:653` | `5615:26129` |
| 3 | Our values (Cole) | `5690:2639` | `5690:2283` | `5615:74674` (402×1244) |
| 4 | Speakers (Lucy) | `5624:1085`, `5597:16197` | `5687:2142` | `5615:26316` |
| 5 | Hacker Testimonials (Lucy) | `5597:16837` | `5687:1662` | `5687:1172` |
| 6 | Past Projects (Lucy) | `5597:21587` | `5687:2813` | `5615:26385` |
| 7 | Sponsors (Lucy) | `5597:19671` | `5687:3854` | `5615:28693` |
| 8 | Meet the Team (Cole) | `5597:20455` + dept rows: Directors `5694:46984`, Design `5694:46923`, Tech `5694:46739`, Sponsorship `5694:46933`, Ops `5694:47071`, Marketing `5694:47132` | `5690:3059` | `5681:1281`, `5685:18775` |
| 9 | FAQs + Sock + Footer (Cole) | `5597:20877` (1512×2029) | `5690:4737` (1000×2050) | `5615:30055` (402×1943) |
| — | Mobile Menu | — | — | `5694:48024` |

### Scene-by-scene description (LG)
1. **Hero, 5 states.** The museum exterior (columns, "HBP"/"2027" banners, grand staircase, bushes, skyline) stays fixed while the sky moves from **day** (light blue, sun, blue skyline) to **dusk** (grey-blue, first stars, shooting star, sun becomes moon) to **night** (indigo sky, purple skyline, **MLH "Official 2025 Season" badge** drops in top right, unlit spotlights appear in the bushes) to **full night** (near-black sky, **"HACKBEANPOT" / "Brought to you by amazon Maven"** title fades in, moon becomes the HBP logo, spotlights switch on with beams, statue silhouette in the right window). The last state **zooms into the front door**. There is **no navbar** in any hero state.
2. **About us.** Dark navy interior. Cream-to-lavender **fog waves** at top-left and bottom-right, ochre **plaque** with 4 screws holding "ABOUT US" and a paragraph, team photo in a **copper frame**, two **candles** with a radial glow at bottom-left.
3. **Our values.** Teal gradient. **Spotlight beam** from top-left onto the first pillar. Three **pillars** at staggered heights, each topped by a terracotta **icon stone** (compass, sprout, people), a title (EXPLORATION / GROWTH / COMMUNITY) and body text. **Vases** along the bottom.
4. **Speakers.** Orange gradient, red **theatre curtain** on the right, golden **gazebo arch** framing the speaker photo, **balustrade**. Name, role, bio, prev/next arrows. There are 2 frames: title in the text column (`5624:1085`) and title centered (`5597:16197`). Confirm with Lucy which is final, or whether it's an animation start/end pair.
5. **Hacker Testimonials.** Deep purple, **arched corridor** in perspective, fog waves, **sparkles**, round gold **medallion** portrait frame, quote, name, school, arrows, **footprints** on the floor.
6. **Past Projects.** Lavender gallery, arches with a **dinosaur skeleton** exhibit, velvet **rope stanchions**, sparkles, **wood frame** holding the project media, title with external-link icon, members, description, arrows.
7. **Sponsors.** Navy hall with pillars and **statue silhouettes** in arched windows. **Gold tier** (3 large gold frames) and **silver tier** (3 smaller silver frames) of logos. "Interested in sponsoring us?", a **View Sponsorship Packet** button and the contact email.
8. **Meet the Team.** Teal. Two staggered rows of portraits in **varied frames** (gold square, wood landscape, blue medallion, green arch, navy shield, copper), name and role under each, **side arrows** that scroll the gallery horizontally, **benches** and a floor strip at the bottom.
9. **FAQs + Sock + Footer (2 viewports tall).** FAQ accordion in 3 groups (General, Application, Event Logistics) with +/−. Below it, **pterodactyl/dino skeleton** with spotlight beams, a fog ribbon with sparkles, then the footer: Back to top, socials (IG / LinkedIn / TikTok), 501(c)(3) line, mailing list form.

MD keeps the same scenes on a 1000px artboard and **collapses the nav to logo + Sponsor Us + Apply + hamburger**. SM is a separate, mostly vertical design.

### Design system facts
- **Fonts actually used in frames** (the Figma *text styles* are stale; they still say Sancreek/Neulis/DM Sans):
  - **Amarante Regular**: section titles (50px LG), hero title (64px), banners
  - **Special Gothic Condensed One**: nav (20), card titles (24–30), speaker name (40), team names (~20), mailing-list heading (28)
  - **Merriweather** Light / Regular / SemiBold: body (Light 18), roles (Light 14–20), FAQ questions (Regular 18, SemiBold 18 when open), inputs (Regular 16)
- **Color variables:** two collections, **Museum** (Black, Dark Blue, Purple, Indigo, Teal, Green, Light Indigo, Ivory, Yellow, Gold, Terracotta, Red, Brown; each with Primary/Dark/Light) and **Carnival** (legacy, still used in places). Full hex list in MS-103.

### Current repo state
- `apps/main/src/app/(landing)/page.tsx` renders only `<Header />` and `<Footer />` (Aditya, in progress).
- **Everything else in `apps/main` is last year's (2026 carnival) design and gets replaced, not reused.** That covers every route, `(landing)/Sections/*`, `lib/Components/*` (except Aditya's new `Header.tsx`/`Footer.tsx`), `lib/Assets/*`, and all of `public/*` (headshots, sponsor logos, guest speakers, projects, etc.; except Aditya's new `public/header` and `public/footer`). **Don't copy components, styles, content or images from the old code.** Build from the Figma file and the 2027 content from the directors.
- Old code is deleted in two steps: **MS-101** removes the old routes and their assets, and **MS-401** removes the old landing page and everything left over (§4).
- **`packages/ui` and `packages/util` are shared** with `apps/live` and `apps/app-portal` (which import `Button`, `Footer`, `RibbonTitle`, `Section`, `NavBarBase`, `useIsMobile`, `useDevice`, `isValidEmail`, …). **Don't delete or restyle them.** The new mainsite just doesn't import the old design components from them. Generic, design-free utilities (e.g. `isValidEmail`, `useWindowSize`) are fine to use.
- The one piece of old code worth keeping is the **backend** route `api/joinMailingList` (last changed Feb 2025). It has no UI. MS-101 checks that it still points to the current mailing list and works.
- There's **no animation library** installed. Tailwind breakpoints (`packages/config-tailwind/theme-tokens/screens.ts`) are max-width based: `tablet` 640–1279, `mobile-xl` 482–639, `mobile` ≤481. The shared Tailwind config also serves the other apps, so only **add** tokens; don't change or remove existing ones.

---

## 3. Architecture & contracts (read before picking up any ticket)

These contracts let tickets in the same sprint run in parallel.

### 3.1 Breakpoints → designs
| Design | Viewport | Tailwind |
|---|---|---|
| LG | ≥ 1280px | default (no prefix) |
| MD | 640–1279px | `tablet:` |
| SM | < 640px | `mobile-xl:` and `mobile:` |

LG/MD render the **scroll-animated scene experience**. SM renders a **separate `MobileLanding` tree** (switched with CSS `hidden`/`block` at the boundary, not JS, to avoid hydration flashes). **SM has no animations at all, the hero included.** It's a static page: normal scrolling moves you from section to section, with no pinning, scrubbing, reveal effects or load-in sequences. Interactive UI (carousels, accordion, mobile menu) still works, but content swaps without animated transitions.

### 3.2 Artboard units (pixel-faithful scaling)
Every LG/MD scene is one viewport, designed on a fixed artboard (1512×982 LG, 1000×982 MD). MS-102 adds a CSS var so Figma pixels map straight to code:
```css
/* set on each scene root */
--ab-w: 1512; --ab-h: 982;          /* tablet: --ab-w: 1000 */
--u: min(calc(100vw / var(--ab-w)), calc(100vh / var(--ab-h)));
```
Usage: `w-[calc(var(--u)*163)]`, or the `u(163)` helper for inline styles. Backgrounds **bleed** to the full viewport, and the content layer is centered. **Always copy numbers straight from Figma Dev Mode × `--u`**, never eyeballed rem values.

### 3.3 Folder structure
```
apps/main/src/app/(landing)/
  page.tsx                       # LG/MD <ScrollStage/> + SM <MobileLanding/>
  scenes/
    types.ts                     # SceneId, SceneAnimation (MS-102)
    registry.ts                  # ordered scene list (MS-202)
    ScrollStage.tsx              # orchestrator (MS-202)
    hero/      HeroScene.tsx   hero.animation.ts   assets/
    about/     AboutScene.tsx  about.animation.ts
    values/ speakers/ testimonials/ projects/ sponsors/ team/ faq/
  mobile/
    MobileLanding.tsx            # (MS-601)
    MobileHero.tsx ... MobileFaq.tsx
apps/main/src/app/lib/Components/
  Header.tsx Footer.tsx          # Aditya
  museum/                        # shared primitives (S1)
    PictureFrame.tsx CarouselArrow.tsx useCarousel.ts Fog.tsx Sparkle.tsx
    Candle.tsx Spotlight.tsx Starfield.tsx Button.tsx Typography.tsx
apps/main/src/app/lib/content/   # typed data (MS-108)
apps/main/public/<section>/      # exported assets, e.g. public/hero/, public/about/
```

### 3.4 Scene file ownership (static vs. animation tickets)
- **`<Name>Scene.tsx`** is owned by the *static* ticket. It renders the **final resting state** of the scene with no scroll logic. Every layer that will move gets a stable hook: `data-anim="candle-left"`.
- **`<name>.animation.ts`** is owned by the *animation* ticket. It exports:
  ```ts
  export const aboutAnimation: SceneAnimation = {
    id: "about",
    scrollLength: 1.5,                 // in viewport heights while pinned
    enter: (root, tl) => { /* entry transition from previous scene */ },
    build: (root, tl) => { /* in-scene scroll animation */ },
  };
  ```
  Animation tickets **may add `data-anim` attributes** to the Scene TSX, but they don't restructure the markup.
- **Transitions are owned by the *incoming* scene** (its `enter`). The outgoing scene never animates into the next one.
- **Handoff colors:** each scene's first frame of `enter` starts from the previous scene's **exit color** listed below, so neighboring tickets never need to coordinate.

### 3.5 Motion spec (PROPOSED — confirm in MS-102)
Figma has no prototype, so this is inferred from the frames. Michael confirms it with Cole and Lucy in S1 and updates this table. After that, this table is the source of truth.

| Scene | Enter transition (owned by this scene) | In-scene scroll animation | Exit color | Scroll length |
|---|---|---|---|---|
| Hero | Page load: day state, subtle cloud/sun drift | Day → dusk → night → title → zoom through door (5 keyframes = Figma states) | `#1d032c`-ish door interior (sample from `5597:12280`) | 4.0 vh |
| About | Fade up from door color; fog waves slide in from corners | Plaque + frame drop in with a small swing; candle flames flicker (idle loop); glow pulses | `#15173b` | 1.5 vh |
| Values | Fog wipe up, navy → teal | Spotlight sweeps on; pillars rise in stagger (left, middle, right); icon stones pop; text fades | teal dark `#024354` | 1.5 vh |
| Speakers | Curtain opens (red curtain slides right into place) over teal → orange | Gazebo arch scales in; text reveals; carousel is click-driven | `#71120f` | 1.2 vh |
| Testimonials | Camera "walks" into the corridor (scale 1.15 → 1) with fade from red | Fog drifts; sparkles twinkle; footprints appear one by one | `#1d032c` | 1.2 vh |
| Projects | Horizontal pan: the corridor slides left, gallery slides in | Dino exhibit parallax; rope stanchions slide in; sparkles | `#5f2666` | 1.2 vh |
| Sponsors | Crossfade + slight zoom out into the hall | Gold frames drop in (stagger), then silver; CTA fades up | `#060825` | 1.2 vh |
| Team | Fog wipe, navy → teal | Portrait rows slide in from the right in stagger; benches rise | `#024354` | 1.2 vh |
| FAQ + Footer | Fade to near-black, FAQ header drops | **Unpinned** normal scroll; skeleton parallax, spotlight sweep, fog ribbon drift, sparkles | — | natural |

Global: `prefers-reduced-motion: reduce` means **no pinning/scrubbing**. Scenes stack in their final static state with simple fades (MS-503).

### 3.6 Tech choices (made in MS-102; recommended defaults)
- **GSAP 3 + ScrollTrigger + `@gsap/react` (`useGSAP`)** for scroll-scrubbed, pinned timelines. GSAP and all its plugins are free for commercial use now.
- **Lenis** for smooth scrolling, synced to ScrollTrigger.
- **CSS keyframes** for idle loops (candle flicker, sparkle twinkle) so they don't cost JS.
- **SVG** for vector art (inline for layers that animate, `next/image` for static ones). **WebP @2x** for raster.

### 3.7 Conventions
- Branch: `main/feature/MS-XXX-short-name`, PR into `dev` using `pull_request_template.md`. Put the ticket ID in the PR title.
- Each PR includes **screenshots at 1512, 1000 (and 402 for SM)** next to the Figma frame.
- Run `yarn lint && yarn type-check` before opening a PR.
- Dev harness: `/dev/scenes?scene=about&progress=0.5` (MS-102) renders any scene alone at any scroll progress. Use it to build and review without the whole page.

---

## 4. Tickets

Size: **S** ≈ 1 day, **M** ≈ 2–3 days, **L** ≈ 4–5 days of part-time work.

---

### Sprint 1 — Foundations & shared components (Sep 24 – Sep 30)

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-101 | Header/NavBar + Footer for all screens | **Aditya** | L |
| MS-102 | Animation engine, artboard units, dev harness, motion spec | Michael | L |
| MS-103 | Design tokens: colors, fonts, typography | Rosyln | M |
| MS-104 | `PictureFrame` component family | Phaedra | M |
| MS-105 | Carousel primitives (`CarouselArrow`, `useCarousel`) | Mehana | M |
| MS-106 | Hero asset export (all 5 states, layered) | Yurika | L |
| MS-107 | Decorative primitives (Fog, Sparkle, Candle, Spotlight, Starfield) | Shreeya | M |
| MS-108 | Content data layer (typed data for all sections) | Andre | M |

---

#### MS-101 · Header/NavBar + Footer for all screens
**Owner:** Aditya · **Size:** L · **Depends on:** none (already in progress)
**Figma:** Components → [Header `5388:302`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5388-302), [Footer `5388:305`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5388-305), [Other `5539:741`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5539-741); in context on LG [About `5597:15707`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-15707), MD [Team `5690:3059`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-3059), SM [Mobile Menu `5694:48024`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-48024), footer at the bottom of [LG FAQ `5597:20877`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20877)

**Context:** `Header.tsx` and `Footer.tsx` already exist in `apps/main/src/app/lib/Components/` (uncommitted), along with the Special Gothic Condensed One font. This ticket finishes and hardens them, and **removes the old standalone routes** the new single-page design replaces.

**Steps**
1. **Header, LG (≥1280):** logo (HackBeanpot wordmark, left), 8 tabs (About us, Our values, Speakers, Testimonials, Projects, Sponsors, Our team, FAQs), **Sponsor Us** (translucent brown) and **Apply** (gold gradient) buttons. Match Figma spacing and the 20px Special Gothic Condensed One.
2. **Change the tab hrefs to in-page anchors.** The current code links `/projects`, `/sponsors`, `/team` to the *old* standalone pages, but the new design has them as landing sections. Use `#about`, `#values`, `#speakers`, `#testimonials`, `#projects`, `#sponsors`, `#team`, `#faq` (these match the `SceneId`s in §3.3).
3. **Active tab state:** a white underline under the active tab (see any LG section frame). Make the header **controlled**: `activeSection?: SceneId` and `visible?: boolean` props. The scroll wiring happens in MS-401, so for now add a local demo toggle.
4. **Hidden during the hero:** the hero frames show no navbar. With `visible=false` the header fades out (opacity + small translateY, 300ms) and stops taking pointer events.
5. **Header, MD (640–1279):** logo + Sponsor Us + Apply + hamburger (see MD Team frame).
6. **Mobile menu, SM (<640):** build from `5694:48024`. It's a full-screen overlay with the tab list and buttons, locks body scroll while open, closes on link click and Esc, and traps focus.
7. **Extract `Button`** into `lib/Components/museum/Button.tsx` with variants `gold` (Apply, Submit, View Sponsorship Packet) and `ghost` (Sponsor Us, Back to top), sizes `md`/`sm`. Other tickets will import it from S2 on.
8. **Footer (all sizes):** Back to top button (calls `window.scrollTo({top:0})` for now; MS-401 swaps in the Lenis version), IG / LinkedIn / TikTok icon buttons (assets in `public/footer`), "HackBeanpot is a 501(c)(3) non-profit organization.", **Join our mailing list** heading + copy + email input + Submit wired to the existing backend route `api/joinMailingList` (loading, success, error, invalid-email states). It's from Feb 2025, so first confirm with the directors that the list/API key it uses is still the current one, and fix the env vars if not.
9. The footer should render **transparent over its parent background**, because the FAQ scene (MS-302/MS-403) owns the skeleton/fog art behind it.
10. The Apply button should open the application portal URL from one config constant (ask the directors for the 2027 URL; keep the alert only as a fallback).
11. Accessibility: `<header>`/`<nav>`/`<footer>` landmarks, visible focus rings, `aria-current="true"` on the active tab, `aria-expanded` on the hamburger.
12. **Remove the old routes.** Delete `apps/main/src/app/projects/`, `sponsors/`, `team/`, `sponsor-us/` and `placeholder/` along with their `Sections/` and `components/` folders. Then:
    - Add permanent redirects in `apps/main/next.config.js` `redirects()`: `/projects` → `/#projects`, `/sponsors` → `/#sponsors`, `/team` → `/#team`, `/sponsor-us` → `/#sponsors`. External links and search results keep working.
    - Point the **Sponsor Us** button to `/#sponsors` (or to the sponsorship packet if Cole/Lucy prefer).
    - Delete the old `lib/Components/NavBar.tsx`, the old `VolunteeringInfoCard`/`SponsorTicket*` components and their exports in `lib/Components/index.ts`, the `lib/Assets/SVG/*` folders those routes used (`OurTeamAssets`, `OurTeamValuesAssets`, `SponsorUsAssets`, `SponsorUsPageAssets`, `SponsorAssets`, …), and the old `public/` folders they used (`headshots/`, `sponsor-logos/`, `sponsor-stats/`, `sponsor-testimonials/`, `projects/`, `team.png`, `footer-logos/`, …). **None of it is reused**: the 2027 headshots, logos and project media come from the directors (MS-108/MS-505).
    - If an old landing section (`(landing)/Sections/*`) still imports something you'd delete, leave that file for MS-401 rather than editing the old landing page.
    - Don't touch `packages/ui` or `packages/util`; `apps/live` and `apps/app-portal` use them.

**Acceptance criteria**
- [ ] Header matches Figma at 1512, 1000 and 402 widths (screenshots in the PR)
- [ ] `activeSection` and `visible` props work in the demo
- [ ] `Button` is exported from `lib/Components/museum` and used by Header and Footer
- [ ] Mailing list submit shows success and error states against the real API
- [ ] Keyboard-only navigation works, including the mobile menu focus trap
- [ ] `/projects`, `/sponsors`, `/team`, `/sponsor-us` redirect to the right landing anchors; `/placeholder` returns 404
- [ ] Old `NavBar.tsx` and the route-only components/assets are deleted; `yarn build`, `yarn lint` and `yarn type-check` pass with no dead imports

---

#### MS-102 · Animation engine, artboard units, dev harness, motion spec
**Owner:** Michael · **Size:** L · **Depends on:** none
**Figma:** all LG/MD pages; Hero states `5615:70522` → `5597:12280`

**Steps**
1. **Motion spec meeting (do this first, by Sat Sep 26):** 30 minutes with Cole and Lucy to walk through §3.5. Confirm or change each transition, the scroll length, and the Speakers two-frame question. Update §3.5 in this file in the same PR. If design wants a real Figma prototype, ask them to fill `✏️ Prototype/Animations`.
2. Install in `apps/main`: `gsap`, `@gsap/react`, `lenis`. Register ScrollTrigger once in a client-only module `scenes/gsap.ts`.
3. **Lenis provider:** `apps/main/src/app/lib/scroll/SmoothScroll.tsx`. Drive Lenis from GSAP's ticker (`gsap.ticker.add(t => lenis.raf(t*1000))`, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.lagSmoothing(0)`). Expose `useLenis()` so other code can call `scrollTo(target)`. Disable it when `prefers-reduced-motion` is set.
4. **`scenes/types.ts`**: export `SceneId` (`hero|about|values|speakers|testimonials|projects|sponsors|team|faq`) and the `SceneAnimation` interface from §3.4.
5. **Artboard units:** add `.scene-lg` / tablet overrides for `--ab-w`, `--ab-h`, `--u` (§3.2) to `globals.css`, and the `u(n: number): string` helper in `lib/scroll/units.ts`. Document it with one example in the file header.
6. **`<SceneFrame>` component:** full-viewport root (`h-[100svh] w-full overflow-hidden relative`) with a `background` slot (bleeds to the viewport edges) and a centered `content` slot sized to the artboard (`w-[calc(var(--u)*var(--ab-w))]` etc.). Every scene in S2 uses it.
7. **Dev harness page** `apps/main/src/app/dev/scenes/page.tsx` (block it in production: `notFound()` when `NODE_ENV==='production'`):
   - `?scene=<id>` renders one scene in a `SceneFrame`
   - `?progress=0..1` seeks that scene's timeline (paused) so animation tickets can scrub
   - a slider UI for progress, plus a breakpoint toggle (1512 / 1000 iframe widths)
   - For now it renders colored placeholder scenes. Scene tickets add themselves to a map in `dev/scenes/sceneMap.ts`.
8. **Proof of concept:** one placeholder scene pinned with ScrollTrigger, scrubbing a box across the screen, running on Lenis, so the stack is proven before S2.
9. Write `apps/main/src/app/(landing)/scenes/README.md`: how to write a scene, `data-anim` conventions, how to use the harness, and do/don't (animate `transform`/`opacity` only, no `top/left`, no layout thrash).

**Acceptance criteria**
- [ ] §3.5 motion spec updated and approved by Cole and Lucy (link the Slack thread in the PR)
- [ ] `yarn dev` → `/dev/scenes?scene=placeholder&progress=0.3` shows a paused, scrubbable scene
- [ ] Pinned proof-of-concept scrolls smoothly in Chrome, Safari and Firefox
- [ ] `SceneFrame` scales a 1512×982 test grid correctly at 1512×982, 1920×1080, 1280×720 and 1000×982 (screenshots)
- [ ] README written

---

#### MS-103 · Design tokens: colors, fonts, typography
**Owner:** Rosyln · **Size:** M · **Depends on:** none
**Figma:** [Color Palette `31:751`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=31-751), [Typography `31:793`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=31-793), plus the actual text nodes in LG/MD/SM frames

**Steps**
1. **Colors:** add a `museum` palette to `packages/config-tailwind/theme-tokens/colors.ts` (keep the existing carnival colors, since other apps use them). Naming: `museum-<color>` (Primary), `museum-<color>-dark`, `museum-<color>-light`. Values:

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

   Check that the Carnival values used in the frames (`#f7dfbc` Carousel Cream, `#173c62` Starlight Blue, etc.) already exist in the carnival tokens.
2. **Fonts:** the frames use **Amarante**, **Special Gothic Condensed One** (already added by Aditya) and **Merriweather** (Light 300, Regular 400, SemiBold 600). The Figma text styles still reference Sancreek/Neulis/DM Sans. **Confirm with Cole** that the frames are right, then:
   - Load Amarante and Merriweather with `next/font/google` in `apps/main/src/app/layout.tsx`, exposing CSS vars `--font-amarante` and `--font-merriweather` (`display: swap`, subsets `latin`)
   - Add Tailwind families `font-amarante`, `font-gothic` (alias for Special Gothic), `font-merriweather`
   - Remove the unused `Inter` body font from `layout.tsx` and make Merriweather the default body font for `apps/main` only
3. **Typography component** `lib/Components/museum/Typography.tsx` with variants taken from the *frames* (inspect each text node in Dev Mode and write down size/weight/line-height/letter-spacing for LG, MD, SM):

   | Variant | Font | LG | MD | SM |
   |---|---|---|---|---|
   | `heroTitle` | Amarante | 64 | measure | measure |
   | `sectionTitle` | Amarante | 50 | measure | measure |
   | `displayName` (speaker) | Gothic | 40 | measure | measure |
   | `cardTitle` (project) | Gothic | 30 | measure | measure |
   | `label` (EXPLORATION, nav) | Gothic, uppercase | 24 / 20 | measure | measure |
   | `body` | Merriweather Light | 18 / 140% | measure | measure |
   | `bodySmall` | Merriweather Light | 14–16 | measure | measure |
   | `role` | Merriweather Light | 20 (speaker) / 15 (team) | measure | measure |
   | `faqQuestion` | Merriweather Regular → SemiBold when open | 18 | measure | measure |

   Fill in every "measure" cell and paste the finished table into this roadmap. LG/MD sizes should be expressed in artboard units (`calc(var(--u)*50)`), or fixed px if MS-102 isn't merged yet. **Leave a TODO**: the variant API (`<Typography variant="sectionTitle" as="h2">`) stays stable, so switching units later won't break consumers.
4. Tell Cole the Figma text styles are stale and ask them to update the styles (non-blocking).

**Acceptance criteria**
- [ ] `bg-museum-teal-dark`, `text-museum-gold` etc. work in `apps/main`
- [ ] All three font families render (no fallback-font flash on reload in Chrome/Safari)
- [ ] Typography table complete for LG/MD/SM and committed to this file
- [ ] A test page at `/dev/typography` shows every variant at each breakpoint
- [ ] `apps/live` and `apps/app-portal` still build (shared tailwind config not broken)

---

#### MS-104 · `PictureFrame` component family
**Owner:** Phaedra · **Size:** M · **Depends on:** none
**Figma:** frames used in [About `5597:15707`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-15707) (copper), [Projects `5597:21587`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-21587) (wood with corner studs), [Sponsors `5597:19671`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-19671) (gold and silver bevel), [Testimonials `5597:16837`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16837) (gold medallion), [Team `5597:20455`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20455) + dept rows `5694:46984`, `5694:46923`, `5694:46739`, `5694:46933`, `5694:47071`, `5694:47132`

Frames appear in 5 sections, so they're built once here.

**Steps**
1. Inventory every distinct frame style in the linked nodes and list them in the PR description. Expected at least: `copper` (About), `wood` (Projects, Team landscape), `goldBevel` (Sponsors gold tier, Team square), `silverBevel` (Sponsors silver tier), `goldMedallion` (Testimonials, pointed top/bottom), `blueMedallion` (Team circle), `greenArch` (Team), `navyShield` (Team), `copperRect` (Team portrait), and `placeholderOval` (grey placeholder).
2. Export each frame's **border art only** as SVG (Figma: select the frame shape without the photo, Export → SVG, "Include id" off). Optimize with SVGO. Save to `apps/main/public/frames/<variant>.svg`, or inline as React components when the frame needs to stretch.
3. Build `lib/Components/museum/PictureFrame.tsx`:
   ```tsx
   <PictureFrame variant="goldBevel" width={…} aspect="4/3"
     src="/team/…" alt="…" fit="cover" | children />
   ```
   - The photo is clipped to the frame's inner shape (`clip-path` or SVG `<clipPath>` for medallion, shield and arch shapes)
   - Accepts `children` instead of `src` (Sponsors puts a logo on white; Projects puts a video/iframe)
   - `width` is a CSS length string, so callers can pass `u(163)` later
   - Border thickness scales with the size (use a viewBox-based SVG, not fixed px borders)
   - Drop shadow matches Figma
4. Use `next/image` for `src`, with `sizes` set sensibly.
5. Add a `/dev/frames` page showing every variant with a sample photo (export one of the photos from the Figma frames into `public/dev/`, since the old `public/headshots` are being deleted).

**Acceptance criteria**
- [ ] All variants in the inventory are implemented and match Figma side by side at 1x and 2x
- [ ] Non-rectangular clips (medallion, shield, arch, oval) crop photos correctly
- [ ] Works with `children` (logo, iframe) as well as `src`
- [ ] Frames scale from 80px to 500px wide without the border distorting

---

#### MS-105 · Carousel primitives (`CarouselArrow`, `useCarousel`)
**Owner:** Mehana · **Size:** M · **Depends on:** none
**Figma:** arrows in [Speakers `5624:1085`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5624-1085), [Testimonials `5597:16837`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16837), [Projects `5597:21587`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-21587), [Team `5597:20455`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20455) (large side arrows)

Four sections have prev/next carousels. Speakers, Testimonials and Projects swap one item at a time. Team scrolls a gallery horizontally.

**Steps**
1. Build everything fresh in `lib/Components/museum/`. The old `packages/ui` `ArrowButton`/`Carousel`/`PaginationDots` are last year's design and are still used by other apps, so don't import or modify them.
2. **`CarouselArrow`**: a gold gradient circle with a brown arrow. Props: `direction: "prev" | "next"`, `size: "sm" | "lg"` (lg = Team side arrows), `disabled` (dimmed, like the left arrow in Figma). It's a `<button>` with `aria-label` ("Previous speaker" etc., passed in), hover/active states and a focus ring.
3. **`useCarousel<T>(items, { loop?: boolean })`** returns `{ index, item, next, prev, goTo, canPrev, canNext, direction }`. `direction` tells the animation which way to slide.
4. **`<CarouselSwap>`** wrapper: crossfades plus a small horizontal slide between the old and new child, keyed by `index` (CSS transitions or GSAP; keep it independent from the scroll engine). Honors reduced motion (fade only).
5. **`useHorizontalGallery(ref)`** for Team: scrolls a horizontally overflowing container by one "page" per arrow click (smooth `scrollBy`), exposes `canPrev`/`canNext` from scroll position, and supports trackpad/touch swipe natively (`overflow-x: auto`, hidden scrollbar, `scroll-snap`).
6. Keyboard: ←/→ change the item when focus is inside the carousel region (`role="region"`, `aria-roledescription="carousel"`, `aria-live="polite"` on the content).
7. Demo at `/dev/carousel` with dummy cards.

**Acceptance criteria**
- [ ] Arrow matches Figma (both sizes, enabled and disabled)
- [ ] `useCarousel` handles loop and no-loop, and first/last disabled states
- [ ] `CarouselSwap` animates in the right direction; reduced motion gives a plain fade
- [ ] Horizontal gallery works with arrows, trackpad and touch
- [ ] Unit tests or story-style demo cases for edge cases (0, 1 and many items)

---

#### MS-106 · Hero asset export (all 5 states, layered)
**Owner:** Yurika · **Size:** L · **Depends on:** none
**Figma:** LG [Day `5615:70522`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-70522), [Dusk `5597:839`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-839), [Night `5597:5431`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-5431), [Title `5597:8846`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-8846), [Zoom `5597:12280`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-12280); MD `5691:35814`, `5691:42665`

The hero is the heaviest scene, so its assets get their own ticket. The goal is **separable layers**: the animation (MS-301) fades and moves each one independently.

**Steps**
1. Compare the 5 LG frames layer by layer and write a **layer manifest** (`scenes/hero/assets/MANIFEST.md`): for each layer, its name, which states it's visible in, and what changes between states (color, opacity, position). Expected layers:
   - `sky` (color per state: day light blue → dusk grey-blue → night indigo → full night near-black). **Record the exact hex/gradient per state.** It's animated as a color, not an image.
   - `stars` (absent in day, appears at dusk, denser at night)
   - `shootingStar` (dusk + night)
   - `sun` / `moon` / `hbpMoon` (logo moon in the title state)
   - `skyline` (blue in day → purple at night; export once, recolor via fill or two versions)
   - `museum` (building: columns, pediment, windows. Check whether the building tint changes between states; if it does, export per state or note the overlay color)
   - `bannerHBP`, `banner2027` (Amarante text: keep as **live text** or export as outlined SVG? Prefer live text if the font is loaded)
   - `statueSilhouette` (right window, title state only)
   - `grass`/`lawn` (bright → dark green)
   - `bushes` (front, several)
   - `stairs`
   - `spotlightLeft`, `spotlightRight` (fixtures; appear at night) + `spotlightBeamLeft/Right` (title state)
   - `mlhBadge` (night + title)
   - `heroTitle` "HACKBEANPOT" + "Brought to you by" + sponsor logos (amazon, Maven): **live text + SVG logos**
2. Export every layer as an **SVG at the full 1512×982 artboard size, in position** (a transparent canvas with the layer where it belongs). Stacking them with `position:absolute; inset:0` then reproduces the frame exactly. That's the easiest format for the scene build.
   - Figma trick: duplicate the frame, hide all layers but one, export the frame as SVG. Repeat per layer.
3. Run SVGO (`npx svgo -f scenes/hero/assets --multipass`) and make sure every file is < 150KB. Flag any big raster-in-SVG blobs to Cole.
4. Do the same for MD (`5691:35814`, `5691:42665`) where the composition differs (narrower crop, building scaled). If MD is just a crop of LG, document the crop rectangle instead of re-exporting.
5. Put the files in `apps/main/src/app/(landing)/scenes/hero/assets/` (inlined as React SVG components for animated layers) and `apps/main/public/hero/` for static ones. Mark which is which in the manifest.
6. For each state, record the **zoom target**: center point and scale of the door in `5597:12280` relative to `5597:8846` (for MS-301).

**Acceptance criteria**
- [ ] MANIFEST.md lists every layer, its per-state behavior and the sky colors per state
- [ ] Stacking all layers in the HTML test file `assets/_preview.html` reproduces each of the 5 states within ~2px of Figma
- [ ] All SVGs optimized, none > 150KB, total hero payload < 1.2MB
- [ ] MD differences documented

---

#### MS-107 · Decorative primitives (Fog, Sparkle, Candle, Spotlight, Starfield)
**Owner:** Shreeya · **Size:** M · **Depends on:** none
**Figma:** fog waves in [About `5597:15707`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-15707), [Testimonials `5597:16837`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16837), footer fog ribbon in [FAQ `5597:20877`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20877); sparkles in Testimonials, Projects and FAQ; candles in About; spotlight beams in Values, Hero title and FAQ; stars in Hero

These pieces repeat across scenes, so each is built once as a configurable component.

**Steps**
1. **`<Fog variant="cornerTopLeft" | "cornerBottomRight" | "sideLeft" | "sideRight" | "ribbon">`**: export each distinct wave shape as SVG with its cream `#f7dfbc` → lavender → transparent gradient intact. Add an optional idle drift (`animate` prop → CSS keyframes, slow 12–20s translate/scale loop).
2. **`<Sparkle size color twinkle delay>`**: the 4-point star (cream/gold `#ffd391`). CSS twinkle keyframes (scale + opacity), with randomizable `delay`. Also `<SparkleCluster>` for the 3-star groups seen in Testimonials.
3. **`<Candle height flame>`**: candlestick (indigo) + candle (cream) + flame with a **flicker** loop (CSS keyframes on the flame's scaleY/skew/opacity) and a radial **glow** halo that pulses gently.
4. **`<Spotlight angle length color origin>`**: a translucent beam (linear gradient fading along the length, soft edges via blur or gradient mask) for Values, Hero and FAQ. Also a `fixture` prop that renders the black lamp head seen in the hero bushes.
5. **`<Starfield density seed>`**: a deterministic (seeded) field of small 4-point stars and dots matching the hero night sky, rendered as one SVG. Density can go from 0 to 1 so MS-301 can fade stars in by progress.
6. Every component accepts `className` and `style`, forwards `ref`, and puts `data-anim` on the root (so animation tickets can grab it).
7. Respect `prefers-reduced-motion`: turn off idle loops.
8. `/dev/decor` page showing all primitives, each with its idle animation.

**Acceptance criteria**
- [ ] Each primitive visually matches its Figma source
- [ ] Idle animations only use `transform`/`opacity` (check with Chrome Performance: no layout/paint storms)
- [ ] Reduced motion disables the loops
- [ ] Starfield is deterministic (same seed gives the same stars on server and client, so no hydration mismatch)

---

#### MS-108 · Content data layer (typed data for all sections)
**Owner:** Andre · **Size:** M · **Depends on:** none
**Figma:** text content in all LG frames; team rows `5694:46984`, `5694:46923`, `5694:46739`, `5694:46933`, `5694:47071`, `5694:47132`

S2 section builders import from this instead of hard-coding copy.

**Steps**
1. Create `apps/main/src/app/lib/content/` with one file per section and a `types.ts`:
   - `about.ts`: title, paragraph, team photo path
   - `values.ts`: `{ id, title, body, icon: "compass"|"sprout"|"people" }[]`
   - `speakers.ts`: `{ name, role, bio, photo }[]`
   - `testimonials.ts`: `{ quote, name, school, gradYear, photo }[]`
   - `projects.ts`: `{ title, url, members: string[], description, media: { type: "image"|"video"|"embed", src } }[]`
   - `sponsors.ts`: `{ name, logo, tier: "gold"|"silver", url }[]`
   - `team.ts`: `{ name, role, department: "directors"|"design"|"tech"|"sponsorship"|"operations"|"marketing", photo, frame: PictureFrameVariant }[]`. The frame variant for each person comes from the Figma dept rows. Type it as a string union now; MS-104 exports the real type later.
   - `faq.ts`: `{ category: "general"|"application"|"logistics", question, answer }[]`
   - `site.ts`: application URL, sponsorship packet URL, contact email `core@hackbeanpot.com`, social links
2. Copy the **text from Figma** for now. **Don't pull content from the old codebase** (old team/projects/sponsors pages, `public/headshots`, `public/sponsor-logos`): it's last year's and is being deleted. Export the placeholder photos and logos shown in the Figma frames into `public/<section>/` so every section renders, and replace them with real 2027 assets in MS-505.
3. **Flag placeholder content** with `// TODO(content):` and list it in a `CONTENT_GAPS.md` for the directors. Known gaps: the speaker "Jessica Cao" uses Sue Harnett's bio, the speaker/testimonial photos are placeholders, the project frame is empty, Team has several "First Last / Role" entries, and FAQ answers other than "When is the hackathon?" are missing. The FAQ also says "Friday, February 11th"; confirm the 2027 dates.
4. Export the sponsor logos shown in Figma (Google, CarGurus, Meta, Datadog, SimpliSafe, Yelp) as SVGs into `public/sponsors/`. Mark the list `TODO(content)`: it's the design's placeholder, not the confirmed 2027 sponsor list.
5. Send `CONTENT_GAPS.md` to Aditya, who forwards it to the directors this week so real content lands by S5 (MS-505).

**Acceptance criteria**
- [ ] Every section's content is importable and typed, with no `any`
- [ ] All image paths resolve (a small script or test checks `fs.existsSync` for each path)
- [ ] `CONTENT_GAPS.md` sent to the directors
- [ ] Team data has a frame variant per person that matches the Figma rows

---

### Sprint 2 — Static sections, part 1: LG + MD (Oct 1 – Oct 7)

Every section ticket this sprint builds the **final resting state** (no scroll animation) for **LG and MD**, inside `SceneFrame` (MS-102), using the S1 primitives. Each layer that will animate later gets a `data-anim` hook (§3.4). Each ticket also exports that section's own background assets (the SVG/SVGO rules from MS-106), adds its scene to `dev/scenes/sceneMap.ts`, and sets the section's `id` (`#about` etc.).

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-201 | Sponsors scene: static LG/MD | Michael | M |
| MS-202 | Scroll orchestrator `ScrollStage` + transition helpers | **Aditya** | L |
| MS-203 | About Us scene: static LG/MD | Rosyln | M |
| MS-204 | Our Values scene: static LG/MD | Phaedra | M |
| MS-205 | Speakers scene: static LG/MD + carousel | Mehana | M |
| MS-206 | Hero scene: static LG/MD, layered with state props | Yurika | L |
| MS-207 | Hacker Testimonials scene: static LG/MD + carousel | Shreeya | M |
| MS-208 | Past Projects scene: static LG/MD + carousel | Andre | M |

---

#### MS-201 · Sponsors scene: static LG/MD
**Owner:** Michael · **Size:** M · **Depends on:** MS-102, MS-103, MS-104, MS-108, MS-101 (Button)
**Figma:** LG [Sponsors `5597:19671`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-19671), MD [`5687:3854`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-3854)

**Steps**
1. Export the background: navy hall, pillars at the edges, 3 arched windows with statue silhouettes, vignette. Split into `bg` (static, one `next/image`) and `windows`/`statues` (separate, for later parallax).
2. Build `scenes/sponsors/SponsorsScene.tsx` in `SceneFrame`: `sectionTitle` "SPONSORS" centered, **gold tier row** (3 × `PictureFrame variant="goldBevel"` with the logo on white as children), **silver tier row** (3 × `silverBevel`, smaller), "Interested in sponsoring us?" (Merriweather Light 20), `<Button variant="gold">View Sponsorship Packet</Button>` → `site.sponsorshipPacketUrl` (new tab), and "Reach out to core@hackbeanpot.com for more inquiries!" with a `mailto:`.
3. Render the tiers from `sponsors.ts`, so rows grow and wrap if there are more sponsors than 3 per tier. Center incomplete rows.
4. Logos are links to the sponsor URLs (`aria-label="Google (opens in new tab)"`).
5. `data-anim` hooks: `sponsor-gold-{i}`, `sponsor-silver-{i}`, `sponsors-cta`, `sponsors-title`, `sponsors-windows`.
6. MD: follow `5687:3854` (sizes and spacing change; check the stray `Vector 339` in the MD section, possibly a decorative line).

**Acceptance criteria**
- [ ] Matches LG and MD frames (side-by-side screenshots)
- [ ] Adding a 7th sponsor to the data renders correctly
- [ ] Works in `/dev/scenes?scene=sponsors`

---

#### MS-202 · Scroll orchestrator `ScrollStage` + transition helpers
**Owner:** Aditya · **Size:** L · **Depends on:** MS-102

This builds the machinery that plays scenes in sequence, using **placeholder scenes** only, so it's independent of this sprint's section tickets.

**Steps**
1. `scenes/registry.ts`: an ordered array of `{ id, Component, animation?: SceneAnimation }`. Fill it with 9 colored placeholder scenes for now. **Each scene's animation file is plugged in by its own animation ticket** (one-line change).
2. `scenes/ScrollStage.tsx` (client component):
   - Renders every scene stacked in a single fixed viewport ("stage"), or pinned in sequence. Pick the approach that makes cross-scene transitions easiest (recommended: one master ScrollTrigger over a tall spacer, with each scene given a `[start, end]` range from its `scrollLength`, and `enter` from the previous scene overlapping both).
   - Builds a master GSAP timeline: for each scene, add `enter` (overlapping the previous scene's tail) then `build`.
   - Exposes the **current scene** through React context (`useActiveScene()`). The Header gets wired to it in MS-401, so nothing here touches `Header.tsx`.
   - `scrollToScene(id)`: computes the scroll offset for a scene's resting point and calls `lenis.scrollTo`. Used by nav anchors and deep links (`/#speakers` on load jumps to that scene).
   - Rebuilds on resize/breakpoint change (debounced), and kills all triggers on unmount.
   - FAQ is the last scene and **unpinned**: after the stage ends, normal document flow continues.
3. **Transition helpers** in `scenes/transitions.ts`, reusable by scene `enter` functions:
   - `fogWipe(tl, { from, to, direction })`: fog layer sweeps across while the background color tweens
   - `crossfade(tl, prevRoot, root)`
   - `zoomThrough(tl, root, { originX, originY, scale })`
   - `curtain(tl, element, { from: "right" })`
   - `pan(tl, prevRoot, root, { direction: "left" })`
   Each gets a demo in the harness (`/dev/scenes?transition=fogWipe`).
4. Handle the address bar: use `svh` units and `ScrollTrigger.config({ ignoreMobileResize: true })` so MD tablets don't jump.
5. Update `(landing)/page.tsx` behind a flag: `?stage=1` renders `ScrollStage` with placeholders, and the default stays as is until MS-401.

**Acceptance criteria**
- [ ] 9 placeholder scenes play in order with the 5 transition types, all scrubbable forward and back
- [ ] `useActiveScene()` updates correctly while scrolling both directions
- [ ] `scrollToScene("team")` lands exactly at Team's resting state, and a deep link `/#team` works on first load
- [ ] Resizing between 1512 and 1000 widths rebuilds without breaking
- [ ] Steady 60fps with placeholders in the Chrome performance panel

---

#### MS-203 · About Us scene: static LG/MD
**Owner:** Rosyln · **Size:** M · **Depends on:** MS-102, MS-103, MS-104, MS-107, MS-108
**Figma:** LG [About `5597:15707`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-15707), MD [`5690:653`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-653)

**Steps**
1. Background: `museum-dark-blue` with the subtle vertical texture from Figma (export as a tiling SVG/PNG, or reproduce with a repeating CSS gradient).
2. `<Fog variant="cornerTopLeft">` and `<Fog variant="cornerBottomRight">` positioned as in Figma (both bleed off-canvas).
3. **Plaque:** ochre (`#b36b00`-ish; sample exactly) rectangle with 4 screw dots, drop shadow. Inside: `sectionTitle` "ABOUT US" + `body` paragraph from `about.ts`. Build it in HTML/CSS (not an image) so the text stays live.
4. **Team photo:** `<PictureFrame variant="copper">` with `about.ts` photo.
5. **Candles:** two `<Candle>`s (different heights) bottom-left with glow halos.
6. `data-anim` hooks: `about-plaque`, `about-frame`, `about-candle-left`, `about-candle-right`, `about-fog-tl`, `about-fog-br`, `about-glow`.
7. The header isn't part of the scene (it's global), but leave the top ~90 artboard px clear as in Figma.
8. MD from `5690:653`.

**Acceptance criteria**
- [ ] Matches LG and MD side by side
- [ ] Text is live and selectable, and the plaque grows correctly if the paragraph gets longer
- [ ] Works in the harness

---

#### MS-204 · Our Values scene: static LG/MD
**Owner:** Phaedra · **Size:** M · **Depends on:** MS-102, MS-103, MS-107, MS-108
**Figma:** LG [Our Values `5690:2639`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-2639), MD [`5690:2283`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-2283)

**Steps**
1. Background: teal vertical gradient (`museum-teal-light` → `museum-teal-dark`; sample the stops).
2. `<Spotlight>` from top-left onto the Exploration pillar (angle and width from Figma).
3. Export **3 pillars** separately (they differ: Ionic, Doric, plain; they're staggered in height) and the **3 icon stones** (terracotta blob + compass / sprout / people glyph) as SVGs.
4. Export the **vases** (6: coral, blue, tan, dark teal, pink, brown) as individual SVGs so they can animate separately later.
5. Layout: `sectionTitle` "OUR VALUES" centered top. Each value column is icon stone → `label` title (EXPLORATION etc.) → `body` text, sitting above its pillar. Heights are staggered: left highest, middle lowest, right middle.
6. Render the value text from `values.ts`.
7. `data-anim` hooks: `values-spotlight`, `values-pillar-{0,1,2}`, `values-stone-{0,1,2}`, `values-text-{0,1,2}`, `values-vase-{i}`.
8. MD from `5690:2283`.

**Acceptance criteria**
- [ ] Matches LG and MD
- [ ] The pillar tops and text columns stay aligned when the text wraps to one more line
- [ ] Works in the harness

---

#### MS-205 · Speakers scene: static LG/MD + carousel
**Owner:** Mehana · **Size:** M · **Depends on:** MS-102, MS-103, MS-105, MS-108
**Figma:** LG [Speakers A `5624:1085`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5624-1085), [Speakers B `5597:16197`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16197), MD [`5687:2142`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-2142)

**Steps**
1. Use the final layout decided in MS-102's motion spec: A (title in the text column) or B (title centered).
2. Background: orange radial/linear gradient (sample the stops) and the **red curtain** on the right (export as SVG with its two folds, separate from the background).
3. **Gazebo arch** (golden dome + drum + arch opening) as SVG, with the **speaker photo clipped to the arch opening** (SVG clipPath). This is a unique frame, so build it inside this scene rather than in `PictureFrame`.
4. **Balustrade** strip across the bottom (SVG, repeated or one piece).
5. Text column: `displayName` (name), `role` in the lighter tint, `body` bio, then `CarouselArrow` prev/next.
6. Wire `useCarousel(speakers)` + `<CarouselSwap>` so the photo, name, role and bio change together.
7. `data-anim` hooks: `speakers-curtain`, `speakers-arch`, `speakers-balustrade`, `speakers-text`, `speakers-title`.
8. MD from `5687:2142`. The MD section also has a 1514-wide frame `5701:2351`; ask Lucy whether it's stray.

**Acceptance criteria**
- [ ] Matches LG and MD
- [ ] Carousel cycles through all speakers from data, and the arrows disable or loop per the spec
- [ ] Photo stays clipped to the arch for portrait and landscape source images
- [ ] Works in the harness

---

#### MS-206 · Hero scene: static LG/MD, layered with state props
**Owner:** Yurika · **Size:** L · **Depends on:** MS-106, MS-102, MS-103, MS-107
**Figma:** the 5 LG hero states (see MS-106), MD `5691:35814`, `5691:42665`

**Steps**
1. Build `scenes/hero/HeroScene.tsx` in `SceneFrame`, stacking every layer from MS-106's manifest in the right z-order (`absolute inset-0`).
2. Build the **sky** as a CSS background whose color comes from a CSS var `--hero-sky`. Stars use `<Starfield>` (MS-107) with density from `--hero-stars`.
3. Add a **`state` prop (`"day"|"dusk"|"night"|"title"|"zoom"`)** used **only by the harness** to render each of the 5 Figma states statically (it sets the layer opacities/colors/transforms from the manifest). This lets reviewers check every state against Figma before animation starts. The production default is `day`.
4. Each state difference goes through a `data-anim` hook, matching the MANIFEST layer names (`hero-sky`, `hero-stars`, `hero-sun`, `hero-moon`, `hero-hbp-moon`, `hero-skyline`, `hero-mlh`, `hero-spot-left`, `hero-beam-left`, …, `hero-title`, `hero-museum`, `hero-door`).
5. Hero title block: `heroTitle` "HACKBEANPOT" + "Brought to you by" + amazon/Maven logos (from `site.ts` / sponsors data).
6. MLH badge links to the MLH site (their trust-badge requirement: `target="_blank"`, alt text).
7. Keep the **door** element separate and record its center in artboard coordinates as the zoom origin (`export const HERO_DOOR_ORIGIN`).
8. MD layout from the MD frames.
9. Performance: static layers (`museum`, `stairs`, `bushes`) use `next/image` with `priority`. Only the animated layers are inline SVG.

**Acceptance criteria**
- [ ] `/dev/scenes?scene=hero&state=<each>` matches each of the 5 LG frames and the MD frames
- [ ] LCP element (museum) loads with priority; the hero is fully painted in < 2.5s on "Fast 4G" throttling
- [ ] `HERO_DOOR_ORIGIN` is exported

---

#### MS-207 · Hacker Testimonials scene: static LG/MD + carousel
**Owner:** Shreeya · **Size:** M · **Depends on:** MS-102, MS-103, MS-104, MS-105, MS-107, MS-108
**Figma:** LG [`5597:16837`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-16837), MD [`5687:1662`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-1662)

**Steps**
1. Background: `museum-purple` and the **arched corridor** in perspective (outer arches, receding inner arches, brown floor, side pillars). Export as **3 depth layers** (far arches, mid, near pillars/floor) for a later parallax/walk-in.
2. `<Fog variant="sideLeft">` and `<Fog variant="sideRight">` as in Figma.
3. `<SparkleCluster>`s at the Figma positions.
4. **Footprints** trail on the floor: export one footprint pair and place ~6 instances along the path, each with `data-anim="testimonial-foot-{i}"`.
5. Content: `sectionTitle` "HACKER TESTIMONIALS", `<PictureFrame variant="goldMedallion">` photo, quote (`body`, curly quotes), name (`label`), school + year (`bodySmall`), arrows.
6. `useCarousel(testimonials)` + `<CarouselSwap>`.
7. `data-anim` hooks: `testimonials-far`, `testimonials-mid`, `testimonials-near`, `testimonials-fog-l/r`, `testimonials-card`.
8. MD from `5687:1662`.

**Acceptance criteria**
- [ ] Matches LG and MD
- [ ] Long quotes (≥ 400 chars) don't overflow into the floor; test with a long placeholder
- [ ] Works in the harness

---

#### MS-208 · Past Projects scene: static LG/MD + carousel
**Owner:** Andre · **Size:** M · **Depends on:** MS-102, MS-103, MS-104, MS-105, MS-107, MS-108
**Figma:** LG [`5597:21587`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-21587), MD [`5687:2813`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-2813)

**Steps**
1. Background: lavender/purple gallery wall with the paneled ceiling strip at the top (export).
2. **Exhibit:** two arches with a **dinosaur skeleton** (export skeleton separately from the arches), **rope stanchions** strip (export separately), sparkles.
3. Content column (right): `<PictureFrame variant="wood">` holding the project media (image, `<video muted loop playsInline>` or a YouTube/Devpost embed based on `media.type`), `cardTitle` title + external-link icon linking to `url`, members (`bodySmall`), description (`body`), arrows.
4. `sectionTitle` "PAST PROJECTS", left-aligned top.
5. `useCarousel(projects)` + `<CarouselSwap>`. Pause any video that isn't the current slide.
6. `data-anim` hooks: `projects-arches`, `projects-dino`, `projects-ropes`, `projects-card`, `projects-title`.
7. MD from `5687:2813`.

**Acceptance criteria**
- [ ] Matches LG and MD
- [ ] Image, video and embed media all render inside the frame at the correct aspect
- [ ] Works in the harness

---

### Sprint 3 — Static sections, part 2 + first animations (Oct 8 – Oct 14)

Animation tickets own `<name>.animation.ts` and implement **`enter` + `build`** per §3.4/§3.5. Each one plugs its animation into `registry.ts` (one line) and verifies it in the harness (`?scene=<id>&progress=`) **and** on `/?stage=1`.

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-301 | Hero scroll animation (5 states + zoom) | **Aditya** | L |
| MS-302 | FAQ + Sock scene: static LG/MD + accordion | Michael | M |
| MS-303 | Meet the Team scene: static LG/MD + gallery | Yurika | L |
| MS-304 | About Us animation + entry from Hero | Rosyln | M |
| MS-305 | Our Values animation + entry | Phaedra | M |
| MS-306 | Speakers animation + entry | Mehana | M |
| MS-307 | Hacker Testimonials animation + entry | Shreeya | M |
| MS-308 | Past Projects animation + entry | Andre | M |

---

#### MS-301 · Hero scroll animation (5 states + zoom)
**Owner:** Aditya · **Size:** L · **Depends on:** MS-202, MS-206, MS-106
**Figma:** 5 LG hero states; MD hero frames

**Steps**
1. Create `scenes/hero/hero.animation.ts`. Pinned, `scrollLength` from §3.5 (~4vh). Split progress into 4 segments, each tweening between two Figma states using MS-106's MANIFEST values:
   - 0 → 0.25 **day → dusk**: sky color tween, stars fade in at low density, sun sinks and cross-fades into the moon, shooting star streaks across once
   - 0.25 → 0.5 **dusk → night**: sky to indigo, skyline recolors blue → purple, star density up, **MLH badge drops** from above with a small bounce (`back.out`), spotlight fixtures fade in
   - 0.5 → 0.75 **night → title**: sky to near-black, **title fades up** ("HACKBEANPOT", then "Brought to you by", then logos, staggered), moon morphs to the HBP logo moon (crossfade + slight rotate), **spotlight beams switch on** (scaleY from 0 at the fixture, opacity flicker), statue appears in the window
   - 0.75 → 1 **zoom**: scale the whole building layer group around `HERO_DOOR_ORIGIN` (from ~1 → the scale measured in MS-106, then keep going until the door interior fills the viewport). Fade the title and badge out early in this segment. End on a **solid fill of the hero exit color** (§3.5) — that's the handoff to About.
2. Page-load intro (before any scroll): day state with a gentle idle loop (sun glow pulse, bushes sway 1–2°). Add a **"scroll" hint** (small chevron at the bottom center, fading out once scrolling starts) and ask Cole whether they have a design for it.
3. The hero has no `enter` (it's first).
4. Tune the easing per segment. Colors use `ease: "none"` so scrubbing feels linear; drops and beams use eased sub-tweens.
5. MD: the same timeline with MD origin/scales (read breakpoint-specific values from the manifest).
6. Performance: `will-change: transform` only on the zoom group, during the zoom segment. Promote the starfield to its own layer.

**Acceptance criteria**
- [ ] Scrubbing to 0, 0.25, 0.5, 0.75 in the harness visually matches Figma states 1–4, and the end of the zoom matches state 5 and then the exit color
- [ ] Scrolling back up reverses cleanly (no stuck badges or beams)
- [ ] 60fps during the zoom on a 2020 MacBook Air (or similar) in Chrome and Safari
- [ ] Works on `/?stage=1`

---

#### MS-302 · FAQ + Sock scene: static LG/MD + accordion
**Owner:** Michael · **Size:** M · **Depends on:** MS-101, MS-102, MS-103, MS-107, MS-108
**Figma:** LG [`5597:20877`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20877), MD [`5690:4737`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-4737)

**Steps**
1. `scenes/faq/FaqScene.tsx`. This one is **not a fixed viewport**: it's the final ~2-viewport tall, normal-flow section. Use artboard units for widths, but let the height flow.
2. Background: near-black `museum-black` → deep navy gradient toward the bottom.
3. **FAQ block:** `sectionTitle` "FAQs" centered. Two columns: left has **General** then **Application**, right has **Event Logistics**. Category headings in `label`.
4. **Accordion** (build it fresh as `scenes/faq/FaqAccordion.tsx`; don't reuse the old `(landing)/Sections/FAQ.tsx`): each item is a question (`faqQuestion`), a +/− icon and the answer (`bodySmall`), with dividers. Only one item open per category. Animate the height (`grid-template-rows: 0fr → 1fr` trick) and switch the question weight Regular → SemiBold when open. Use `<button aria-expanded aria-controls>` for accessibility.
5. **Sock art:** the pterodactyl + dino skeletons (export skeletons separately), 2–3 spotlight beams (`<Spotlight>`), `<Fog variant="ribbon">` with sparkles leading into the footer area.
6. Render `<Footer />` (MS-101) at the bottom, over the art.
7. `data-anim` hooks: `faq-title`, `faq-col-{0,1}`, `faq-skeleton-ptero`, `faq-skeleton-dino`, `faq-beam-{i}`, `faq-ribbon`.
8. MD from `5690:4737`.

**Acceptance criteria**
- [ ] Matches LG and MD
- [ ] Accordion is keyboard accessible and works with screen readers (VoiceOver announces expanded/collapsed)
- [ ] Opening a long answer pushes content down smoothly with no layout jump in the skeleton art

---

#### MS-303 · Meet the Team scene: static LG/MD + gallery
**Owner:** Yurika · **Size:** L · **Depends on:** MS-102, MS-103, MS-104, MS-105, MS-108
**Figma:** LG [`5597:20455`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5597-20455), dept rows ([Directors](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-46984), [Design](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-46923), [Tech](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-46739), [Sponsorship](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-46933), [Ops](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-47071), [Marketing](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5694-47132)), MD [`5690:3059`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5690-3059)

**Steps**
1. **Clarify with Cole first:** is the gallery ordered by department (Directors → Design → Tech → …) as one continuous 2-row strip, or is there a department filter? The dept rows suggest per-department groupings. Write the answer in the PR.
2. Background: teal gradient, wall-to-floor strip at the bottom (teal band + brown zig-zag floor), **2 benches** (export separately).
3. `sectionTitle` "MEET THE TEAM".
4. **Gallery:** a 2-row horizontally scrolling strip (`useHorizontalGallery`, MS-105). Items alternate between the rows with the staggered vertical offsets seen in Figma. Each item is a `<PictureFrame variant={member.frame}>` + name (`label`) + role (`role`). The frame sizes vary per variant, so match the Figma sizes per variant.
5. Large `CarouselArrow size="lg"` on the left and right edges, vertically centered.
6. The strip bleeds off both edges; add a soft fade at the edges if Cole wants it.
7. `data-anim` hooks: `team-row-{0,1}`, `team-benches`, `team-title`, `team-member-{i}`.
8. MD from `5690:3059`.

**Acceptance criteria**
- [ ] Matches LG and MD
- [ ] All team members from `team.ts` render with the correct frame variant
- [ ] Arrows scroll one page at a time, disable at the ends, and trackpad/touch scrolling works
- [ ] Images lazy-load outside the first visible page

---

#### MS-304 · About Us animation + entry from Hero
**Owner:** Rosyln · **Size:** M · **Depends on:** MS-202, MS-203

**Steps**
1. `scenes/about/about.animation.ts`.
2. `enter`: start from a full-screen overlay of the **hero exit color** (§3.5) and fade it out while the About background brightens, like eyes adjusting inside the museum. The fog corners slide in from off-canvas (top-left moves down-right, bottom-right moves up-left).
3. `build` (pinned, ~1.5vh): the plaque drops from above with a slight pendulum swing (rotate −3° → 2° → 0°) then the text fades up line by line; the team photo frame slides in from the right with a slight tilt settle; the candle glow ramps up.
4. Idle, not scroll-tied: candle flicker from `<Candle>` keeps running; fog drifts slowly.
5. Register in `registry.ts`.

**Acceptance criteria**
- [ ] The Hero → About handoff looks seamless on `/?stage=1` with MS-301 merged, or in the harness using a static exit-color overlay if MS-301 isn't merged yet
- [ ] Scrubbing to the end of `build` matches the Figma About frame exactly
- [ ] Reverse scroll is clean

---

#### MS-305 · Our Values animation + entry
**Owner:** Phaedra · **Size:** M · **Depends on:** MS-202, MS-204

**Steps**
1. `scenes/values/values.animation.ts`.
2. `enter`: `fogWipe` from the About exit color `#15173b` to teal, fog sweeping upward.
3. `build`: the spotlight turns on (beam `scaleY` 0 → 1 from the source, opacity flicker); pillars **rise from below** in stagger (left, middle, right, ~0.1 apart); each icon stone pops (scale 0.6 → 1, `back.out`) as its pillar lands; value text fades up; vases slide up from the bottom edge with a slight stagger.
4. Optional (confirm with Cole): the spotlight sweeps left → middle → right as you scroll, highlighting each value in turn, then returns to the Figma position at the end.
5. Register in `registry.ts`.

**Acceptance criteria**
- [ ] End state matches the Figma Values frame exactly
- [ ] Smooth forward and reverse, with no overlap flicker between pillars and text

---

#### MS-306 · Speakers animation + entry
**Owner:** Mehana · **Size:** M · **Depends on:** MS-202, MS-205

**Steps**
1. `scenes/speakers/speakers.animation.ts`.
2. `enter`: the red curtain sweeps in from the right edge (`curtain` helper) over the teal exit color and reveals the orange stage behind it, then settles into its Figma position.
3. `build`: the gazebo arch rises and scales in from 0.9; the balustrade slides up; the text column fades in with a stagger (title, name, role, bio, arrows). If the spec chose frame B then A, animate the title from center into the column.
4. The carousel stays click-driven and independent of scroll.
5. Register in `registry.ts`.

**Acceptance criteria**
- [ ] End state matches the chosen Speakers frame
- [ ] Carousel arrows work at any scroll progress after the text is visible

---

#### MS-307 · Hacker Testimonials animation + entry
**Owner:** Shreeya · **Size:** M · **Depends on:** MS-202, MS-207

**Steps**
1. `scenes/testimonials/testimonials.animation.ts`.
2. `enter`: "walk into the corridor": crossfade from the Speakers exit color, with the 3 depth layers starting at scale 1.25 / 1.15 / 1.08 and settling to 1 (parallax depth).
3. `build`: fog sides drift inward slightly; footprints appear one at a time toward the viewer; the medallion swings down from the top on a short chain-like ease; the quote card fades up; sparkles twinkle (idle).
4. Register in `registry.ts`.

**Acceptance criteria**
- [ ] End state matches Figma
- [ ] The parallax layers never show gaps or edges at 1920×1080 or 1280×720

---

#### MS-308 · Past Projects animation + entry
**Owner:** Andre · **Size:** M · **Depends on:** MS-202, MS-208

**Steps**
1. `scenes/projects/projects.animation.ts`.
2. `enter`: a horizontal `pan`. The previous scene slides out to the left while the gallery slides in from the right, as if walking to the next room. The background color tweens from `#1d032c` to lavender.
3. `build`: arches and the dino parallax at different speeds; rope stanchions slide in from the left; the project card fades up; sparkles around the dino twinkle.
4. Register in `registry.ts`.

**Acceptance criteria**
- [ ] End state matches Figma
- [ ] The pan doesn't expose a blank gap between scenes at any scroll position

---

### Sprint 4 — Full LG/MD page + SM kickoff (Oct 15 – Oct 21)

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-401 | Assemble the full landing page (LG/MD) + nav wiring + legacy cleanup | **Aditya** | L |
| MS-402 | Sponsors animation + entry | Michael | M |
| MS-403 | FAQ + Sock scroll animation + entry | Phaedra | M |
| MS-404 | Meet the Team animation + entry | Yurika | M |
| MS-405 | SM: Hero | Rosyln | M |
| MS-406 | SM: About Us + Our Values | Mehana | M |
| MS-407 | SM: Speakers + Hacker Testimonials | Shreeya | M |
| MS-408 | SM: Past Projects + Sponsors | Andre | M |

**SM ticket rules (MS-405 to MS-408, MS-501, MS-502):** SM is a **separate, fully static design** at 402px. Build the components in `(landing)/mobile/Mobile<Name>.tsx` as normal vertical flow sections. There are **no animations of any kind**: no scene engine, no pinning, no reveal-on-scroll, no load-in, no idle loops (render `Candle`, `Sparkle`, `Fog` etc. with their animation turned off). Carousels and the accordion swap content instantly. Reuse the S1 primitives and S2 assets wherever the art is the same, and export new art where SM differs. Use `mobile-xl:`/`mobile:` utilities and fluid sizing so layouts work from 320 to 639px. Add each section to `/dev/mobile?section=<id>` (create the page if it doesn't exist; each SM ticket adds its own entry). Assembly into one page happens in MS-601.

---

#### MS-401 · Assemble the full landing page (LG/MD) + nav wiring + legacy cleanup
**Owner:** Aditya · **Size:** L · **Depends on:** MS-101, MS-202, MS-301–MS-308, MS-201, MS-302, MS-303

**Steps**
1. Replace the placeholder entries in `registry.ts` with the real 9 scenes in order. (Sponsors/Team/FAQ animations are plugged in by MS-402–MS-404 this sprint. Until then those scenes run with no animation, which the registry already supports.)
2. Make `(landing)/page.tsx` render `<ScrollStage />` for LG/MD and remove the `?stage=1` flag.
3. Wire the Header: `activeSection = useActiveScene()`, `visible = active !== "hero"`. Tab clicks call `scrollToScene(id)` and update the URL hash with `history.replaceState` (no jump).
4. Wire the Footer "Back to top" to `lenis.scrollTo(0)`.
5. Deep links: `/#values` on load jumps straight to Values' resting state (no scroll animation through the hero).
6. Tune the total scroll length: the whole page should take ~18–22 wheel "flicks". Adjust the scene `scrollLength`s in the registry only.
7. **Final legacy cleanup:** delete the old landing `(landing)/Sections/*`, **everything left** in `lib/Assets/` (e.g. `Hero/LandingAssets`, `AboutLandingAssets`, `SVG/*`), any old `lib/Components/*` still around, and any old `public/*` files MS-101 had to leave. After this ticket, `apps/main` contains only 2027 code and assets. Check with `git ls-files apps/main` and list what's left in the PR. Don't touch `packages/ui`/`packages/util` (other apps use them). The old routes and `NavBar.tsx` were already removed in MS-101.
8. Remove the `bg-canopyGreen` from `<html>` in `layout.tsx`, set it to `museum-black`.

**Acceptance criteria**
- [ ] `/` at 1512 and 1000 plays Hero → FAQ/Footer end to end, forward and back
- [ ] Nav highlights the right tab throughout and clicking every tab lands correctly
- [ ] Deep links work for all 9 ids
- [ ] No files from last year's design left in `apps/main`; `yarn build` passes with no dead imports
- [ ] `apps/live` and `apps/app-portal` still build

---

#### MS-402 · Sponsors animation + entry
**Owner:** Michael · **Size:** M · **Depends on:** MS-202, MS-201

**Steps**
1. `scenes/sponsors/sponsors.animation.ts`.
2. `enter`: crossfade from the Projects exit color with a slight zoom *out* (1.08 → 1), like stepping back into the grand hall.
3. `build`: windows/statues parallax slightly; the title fades down; **gold frames drop in** one by one (y −40 → 0, small rotate settle); then the **silver frames**; then the CTA text + button fade up.
4. A hover micro-interaction on the logo frames (lift 4px + shadow): CSS only, not scroll-tied.
5. Register in `registry.ts`.

**Acceptance criteria**
- [ ] End state matches Figma
- [ ] Works with 3, 6 and 9 sponsors (the stagger adapts to the count)

---

#### MS-403 · FAQ + Sock scroll animation + entry
**Owner:** Phaedra · **Size:** M · **Depends on:** MS-202, MS-302

**Steps**
1. `scenes/faq/faq.animation.ts`. This scene is **unpinned**; use ScrollTrigger with `scrub` on normal scroll.
2. `enter`: fade from the Team exit color into near-black while the FAQ title drops in.
3. As the user scrolls down: the FAQ columns fade up; the skeletons move up at a slower speed than the scroll (parallax); spotlight beams sweep a few degrees; the fog ribbon drifts horizontally; sparkles twinkle; the footer fades in.
4. Make sure accordion open/close (which changes the page height) calls `ScrollTrigger.refresh()` (debounced) so the triggers below stay correct.
5. Register in `registry.ts`.

**Acceptance criteria**
- [ ] Smooth to the very bottom of the page, with the footer fully reachable
- [ ] Opening and closing FAQ items doesn't break the parallax positions

---

#### MS-404 · Meet the Team animation + entry
**Owner:** Yurika · **Size:** M · **Depends on:** MS-202, MS-303

**Steps**
1. `scenes/team/team.animation.ts`.
2. `enter`: `fogWipe` from the Sponsors navy to teal.
3. `build`: the title drops; the **top row slides in from the right**, then the bottom row (stagger); each portrait does a small "hang" settle (rotate ±2° → 0); the benches rise from the floor.
4. The gallery arrows and horizontal scroll must keep working after the entry. The scroll-driven `x` offset is applied to a **wrapper** so it doesn't fight `useHorizontalGallery`'s scrollLeft.
5. Register in `registry.ts`.

**Acceptance criteria**
- [ ] End state matches Figma
- [ ] Horizontal gallery still works during and after the animation

---

#### MS-405 · SM: Hero
**Owner:** Rosyln · **Size:** M · **Depends on:** MS-106, MS-103, MS-107
**Figma:** SM [Hero `5615:22626`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-22626)

**Steps**
1. Study the SM hero and list which MS-106 layers can be reused (recropped) and which need new exports.
2. Build `mobile/MobileHero.tsx` at full `100svh`, cropped/scaled for 402×874.
3. **Static only**: render exactly the state shown in the SM frame, with no load-in, state changes or idle motion. Flatten the layers you don't need separately into as few images as possible (fewer requests, since nothing animates).
4. Header over the hero on SM: follow Figma. If it's visible, leave room for it.

**Acceptance criteria**
- [ ] Matches Figma at 402px, looks right from 320 to 639px
- [ ] No animation or transition CSS/JS on the section
- [ ] Hero LCP < 2.5s on "Fast 4G" at 402px

---

#### MS-406 · SM: About Us + Our Values
**Owner:** Mehana · **Size:** M · **Depends on:** MS-103, MS-104, MS-107, MS-108
**Figma:** SM [About `5615:26129`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-26129), [Values `5615:74674`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-74674) (402×1244, taller than one screen)

**Steps**
1. `mobile/MobileAbout.tsx` and `mobile/MobileValues.tsx` following the SM frames (vertical stacking, SM type scale).
2. Values on SM is 1244 tall: the pillars stack vertically, so export any SM-specific pillar art.
3. Candles and fog render static (no flicker or drift).
4. `id="about"`, `id="values"` on the section roots.

**Acceptance criteria**
- [ ] Matches the SM frames at 402px, fluid from 320 to 639px
- [ ] No animations on either section

---

#### MS-407 · SM: Speakers + Hacker Testimonials
**Owner:** Shreeya · **Size:** M · **Depends on:** MS-103, MS-104, MS-105, MS-107, MS-108
**Figma:** SM [Speakers `5615:26316`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-26316), [Testimonials `5687:1172`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5687-1172)

**Steps**
1. `mobile/MobileSpeakers.tsx` and `mobile/MobileTestimonials.tsx` from the SM frames.
2. Carousels use `useCarousel` **plus swipe** (touch events, or pointer events with a threshold of ~40px). Content swaps instantly, without `CarouselSwap`.
3. Reuse the S2 curtain, arch and corridor assets where possible (recropped); export SM-specific art where needed.
4. Section ids `speakers` and `testimonials`.

**Acceptance criteria**
- [ ] Matches SM at 402px, fluid from 320 to 639px
- [ ] Swipe and arrows both work; vertical page scrolling isn't blocked by the swipe handler

---

#### MS-408 · SM: Past Projects + Sponsors
**Owner:** Andre · **Size:** M · **Depends on:** MS-103, MS-104, MS-105, MS-107, MS-108, MS-101 (Button)
**Figma:** SM [Projects `5615:26385`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-26385), [Sponsors `5615:28693`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-28693)

**Steps**
1. `mobile/MobileProjects.tsx` (carousel + swipe, media in the wood frame) and `mobile/MobileSponsors.tsx` (tiers stack into 2 columns or 1, per Figma).
2. Reuse the S2 dino/gallery and hall assets (recropped) where possible.
3. Section ids `projects` and `sponsors`.

**Acceptance criteria**
- [ ] Matches SM at 402px, fluid from 320 to 639px
- [ ] Sponsor tiers wrap cleanly with 3–9 sponsors

---

### Sprint 5 — LG/MD hardening + remaining SM sections (Oct 22 – Oct 28)

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-501 | SM: Meet the Team | Rosyln | M |
| MS-502 | SM: FAQ + Sock (above footer) | Andre | M |
| MS-503 | Accessibility + reduced-motion mode (LG/MD) | Mehana | L |
| MS-504 | Performance & asset optimization (LG/MD) | Shreeya | M |
| MS-505 | Real content integration (all sections) | Michael | M |
| MS-506 | Scroll hardening: browsers, devices, edge cases | **Aditya** | L |
| MS-507 | MD visual QA pass: Hero → Testimonials | Phaedra | M |
| MS-508 | MD visual QA pass: Projects → FAQ | Yurika | M |

**End of S5 (Wed Oct 28):** 1-hour **design review** with Cole and Lucy on LG/MD at `/` on staging. Record the feedback as a checklist per section; S6 fix tickets pick it up.

---

#### MS-501 · SM: Meet the Team
**Owner:** Rosyln · **Size:** M · **Depends on:** MS-104, MS-105, MS-108
**Figma:** SM [`5681:1281`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5681-1281), [`5685:18775`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5685-18775)

**Steps**
1. Figure out what the two SM frames represent (two carousel pages? a department switcher?) and confirm with Cole.
2. Build `mobile/MobileTeam.tsx` with swipeable pages or a horizontal snap gallery, using `PictureFrame` variants from `team.ts`.
3. Section id `team`. Static, no animations.

**Acceptance criteria**
- [ ] Matches both SM frames
- [ ] All members reachable by swipe and arrows

---

#### MS-502 · SM: FAQ + Sock (above footer)
**Owner:** Andre · **Size:** M · **Depends on:** MS-101, MS-107, MS-108, MS-302 (accordion)
**Figma:** SM [`5615:30055`](https://www.figma.com/design/L7vH8bprzaimoVmHMgIx7P/-Design--Mainsite?node-id=5615-30055)

**Steps**
1. `mobile/MobileFaq.tsx`: the categories stack in one column. Import the new `FaqAccordion` from MS-302 with its open/close animation turned off, since SM is static.
2. Sock art cropped for SM (skeleton, fog ribbon), then `<Footer />` (Aditya's SM layout).
3. Section id `faq`.

**Acceptance criteria**
- [ ] Matches SM at 402px
- [ ] Accordion is accessible, and the footer mailing list works on iOS Safari (no zoom-on-focus: input font-size ≥ 16px)

---

#### MS-503 · Accessibility + reduced-motion mode (LG/MD)
**Owner:** Mehana · **Size:** L · **Depends on:** MS-401

**Steps**
1. **Reduced motion:** when `prefers-reduced-motion: reduce`, `ScrollStage` doesn't pin or scrub. It renders every scene in normal flow at its **final static state**, with a 200ms opacity fade on enter (IntersectionObserver). The hero shows the **title state** (so the title and sponsors are visible). Implement this as a mode in `ScrollStage` (`reducedMotion` branch) plus each animation module's `build` being skipped.
2. **Semantic structure:** one `<h1>` (the hero title), each section has an `<h2>`, and each scene root is a `<section aria-labelledby>`. Decorative SVGs get `aria-hidden="true"` and `focusable="false"`.
3. **Keyboard:** Tab order follows the visual order. Tabbing into a scene that's off-screen scrolls to it (`focusin` → `scrollToScene`). Add a skip-to-content link.
4. **Contrast:** check all text on its backgrounds (especially the light-lavender role text on orange in Speakers, and the grey roles on teal in Team). Report failures to Cole with suggested fixes; don't change colors unilaterally.
5. Run **axe DevTools** at 1512 and 1000, fix everything critical or serious, and file anything design-dependent as S6 fixes.
6. Screen reader smoke test (VoiceOver + Safari): nav, carousels (announcements), accordion, mailing list form.

**Acceptance criteria**
- [ ] With the OS reduce-motion setting on, the page is fully usable and static
- [ ] axe: 0 critical/serious issues on `/` (LG and MD)
- [ ] Keyboard-only walkthrough reaches every interactive element in order

---

#### MS-504 · Performance & asset optimization (LG/MD)
**Owner:** Shreeya · **Size:** M · **Depends on:** MS-401

**Steps**
1. Baseline with Lighthouse (desktop and mobile emulation) and WebPageTest on the staging URL. Record the numbers in the PR.
2. Audit `public/` and the scene asset folders: SVGO on every SVG, convert large embedded rasters to WebP, remove unused files.
3. **Lazy-mount scenes:** scenes more than 2 away from the active one render their heavy art lazily (keep the DOM for layout, defer images). Don't break the timeline math: use a registry flag `lazy: true` that `ScrollStage` reads (reading the current code is enough; no sync with Aditya needed).
4. Preload only the hero-critical assets and fonts. Check for font CLS.
5. Check for long tasks during scroll (Chrome Performance). Ensure no animation touches layout properties.
6. Check the bundle: GSAP and Lenis are only in the client chunk, and there are no duplicate React SVG copies.

**Acceptance criteria**
- [ ] Lighthouse desktop Performance ≥ 90, mobile ≥ 75 on `/`
- [ ] Total transferred on first load < 2.5MB, with the rest lazy
- [ ] No frames > 50ms during a full scroll on the reference laptop

---

#### MS-505 · Real content integration (all sections)
**Owner:** Michael · **Size:** M · **Depends on:** MS-108

**Steps**
1. Collect the final 2027 content from the directors against `CONTENT_GAPS.md`: speakers (+ photos), testimonials (+ photos, consent), past projects (+ media), sponsors (+ SVG logos + tier), team (all members + headshots + roles + frame variant), FAQ answers, the application URL, the sponsorship packet PDF URL and the event dates.
2. Update only the `lib/content/*` files and assets. Normalize headshots to square 800×800 WebP, sponsor logos to SVG.
3. Remove every `TODO(content)`. Mark items still missing as "coming soon" with a sensible visual fallback rather than lorem ipsum.
4. Proofread all copy (quotes, apostrophes, capitalization consistent with Figma).

**Acceptance criteria**
- [ ] No placeholder names, photos or lorem left, or each one is explicitly approved by a director
- [ ] All images optimized and < 200KB each

---

#### MS-506 · Scroll hardening: browsers, devices, edge cases
**Owner:** Aditya · **Size:** L · **Depends on:** MS-401

**Steps**
1. Test matrix at LG/MD: Chrome, Safari, Firefox, Edge (macOS + Windows); iPad Safari at 1000–1180px wide (MD layout **with touch**); a Windows mouse wheel (stepped) vs. a Mac trackpad (inertial).
2. Fix: refreshing mid-page restores the right scene (`history.scrollRestoration = "manual"` + restore from hash); resizing across the LG↔MD boundary mid-scroll; iPad address-bar resize; very fast flicks skipping `enter` animations (make sure the end states are reached with `fastScrollEnd` / `preventOverlaps`); zoomed browsers (125%/150%); ultra-wide 2560×1080 and short 1280×650 viewports (artboard `min()` scaling + background bleed).
3. Keyboard scrolling (Space, PgDn, arrow keys) moves naturally through the scenes.
4. Write down the known limitations in `scenes/README.md`.

**Acceptance criteria**
- [ ] Everything in the matrix passes, or known issues are filed with priority
- [ ] No broken state after a fast flick to the bottom and back to the top

---

#### MS-507 · MD visual QA pass: Hero → Testimonials
**Owner:** Phaedra · **Size:** M · **Depends on:** MS-401
**Figma:** MD `5691:35814`, `5691:42665`, `5690:653`, `5690:2283`, `5687:2142`, `5687:1662`

**Steps**
1. At 1000×982 (and spot checks at 768, 900, 1024, 1279 widths), compare every MD scene's resting state to Figma using a pixel-overlay tool (e.g. PerfectPixel extension, or the harness with the Figma PNG as an overlay).
2. Fix spacing, sizes and type deviations in the scene files (`tablet:` overrides only; don't change LG).
3. Check each scene's MD animation end state = the MD Figma frame.
4. Check the MD header (hamburger menu) over each scene.

**Acceptance criteria**
- [ ] Each scene within ~4px of Figma at 1000px, with overlay screenshots in the PR
- [ ] No LG regressions (LG screenshots attached)

---

#### MS-508 · MD visual QA pass: Projects → FAQ
**Owner:** Yurika · **Size:** M · **Depends on:** MS-401
**Figma:** MD `5687:2813`, `5687:3854`, `5690:3059`, `5690:4737`

The same steps and acceptance criteria as MS-507, for Past Projects, Sponsors, Meet the Team and FAQ + Footer.

---

### Sprint 6 — LG/MD design fixes + SM assembly (Oct 29 – Nov 4) · 🎯 LG/MD feature-complete

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-601 | SM page assembly + mobile menu wiring | Michael | M |
| MS-602 | Loading experience: preloader, font & hero asset loading | **Aditya** | M |
| MS-603 | Design-review fixes: Hero, About, Values (LG/MD) | Rosyln | M |
| MS-604 | Design-review fixes: Speakers, Testimonials, Projects (LG/MD) | Phaedra | M |
| MS-605 | Design-review fixes: Sponsors, Team, FAQ/Footer (LG/MD) | Yurika | M |
| MS-606 | SEO, metadata, social cards, analytics | Mehana | M |
| MS-607 | SM visual QA pass (all SM sections in isolation) | Shreeya | M |
| MS-608 | Automated visual smoke tests + CI | Andre | M |

**End of S6 (Wed Nov 4):** **SM design review** with Cole and Lucy, plus a **1-hour team bug bash** on staging (everyone, all breakpoints). Bugs go on the board labelled `scroll`, `lg-visual`, `md-visual`, `sm` for S7.

---

#### MS-601 · SM page assembly + mobile menu wiring
**Owner:** Michael · **Depends on:** MS-405–MS-408, MS-501, MS-502, MS-101, MS-401
1. `mobile/MobileLanding.tsx` renders the SM sections in order and ends with the footer. It's plain document flow with native scrolling.
2. `page.tsx`: `<div className="mobile-xl:hidden mobile:hidden"><ScrollStage/></div>` + `<div className="hidden mobile-xl:block mobile:block"><MobileLanding/></div>`. **Make sure `ScrollStage` and Lenis don't initialize when hidden** (check `matchMedia('(min-width: 640px)')` before building), so SM uses native scroll.
3. Mobile menu links jump to the SM section ids (native anchor scrolling, `scroll-margin-top` for the header) and close the menu. Back to top works.
4. Check that nothing on SM animates: no GSAP, no CSS keyframes running.

**Acceptance:** at 402px the full page scrolls Hero → Footer with native scrolling; the menu links all work; no GSAP/Lenis and no running animations on SM (check the Performance panel); no hydration warnings.

#### MS-602 · Loading experience: preloader, font & hero asset loading
**Owner:** Aditya · **Depends on:** MS-401
1. Decide with Cole: a short branded preloader (HBP moon logo + progress) **or** progressive hero reveal. Implement one, **for LG/MD only**; SM loads straight into its static page.
2. Preload the hero-critical layers and fonts; hold the scroll stage until they're decoded (`img.decode()`), with a max 3s timeout.
3. No layout shift from font swap (`size-adjust` / `next/font` fallback metrics).

**Acceptance:** first visit on "Fast 4G" shows no half-drawn hero; CLS < 0.05.

#### MS-603 / MS-604 / MS-605 · Design-review fixes (LG/MD)
**Owners:** Rosyln (Hero, About, Values) · Phaedra (Speakers, Testimonials, Projects) · Yurika (Sponsors, Team, FAQ/Footer) · **Depends on:** the S5 design review checklist
1. Work through every item in the review checklist for your sections (visual and motion). Each fix is a checklist item in the PR.
2. Re-verify end states against Figma at 1512 and 1000 after the fixes.
3. Motion fixes stay inside your sections' `*.animation.ts`. Timing changes that affect the global scroll length are posted in #mainsite so Aditya knows (FYI only, not blocking).

**Acceptance:** every review item for your sections is fixed or explicitly deferred by Cole or Lucy.

#### MS-606 · SEO, metadata, social cards, analytics
**Owner:** Mehana
1. `metadata` in `layout.tsx`/`page.tsx`: title, description (update "5013c" → "501(c)(3)"), canonical URL, `themeColor`.
2. OG/Twitter image (ask Cole for a 1200×630 from the night hero), favicon/app icons from the HBP moon logo.
3. JSON-LD `Event` schema for HackBeanpot 2027 (dates from content).
4. `robots.txt` and `sitemap.xml` via Next metadata routes.
5. Analytics (whatever HBP already uses; confirm with Aditya): page view, Apply clicks, Sponsor Us clicks, sponsorship packet clicks, mailing list signups.

**Acceptance:** link previews render in Slack/iMessage; Lighthouse SEO = 100; analytics events show up in the dashboard.

#### MS-607 · SM visual QA pass (all SM sections in isolation)
**Owner:** Shreeya · **Depends on:** MS-405–MS-408, MS-501, MS-502
1. In `/dev/mobile?section=<id>`, overlay-compare each SM section at 402px, spot-check 320/375/430/639.
2. Real devices: iPhone (Safari), an Android phone (Chrome).
3. Fix deviations in the `mobile/*` files.

**Acceptance:** each SM section within ~4px of Figma at 402px; no horizontal overflow at any width from 320 to 639.

#### MS-608 · Automated visual smoke tests + CI
**Owner:** Andre
1. Add Playwright to `apps/main` (dev dep). Tests: load `/`, and for each scene id jump via hash and screenshot at 1512×982 and 1000×982; `/` at 402×874 full-page. Use `prefers-reduced-motion` emulation for deterministic screenshots.
2. Smoke assertions: nav links, accordion toggles, carousel arrows change content, mailing list form validation.
3. GitHub Action on PRs to `dev` touching `apps/main/**`: lint, type-check, build, Playwright (screenshots uploaded as artifacts; visual diffs are advisory, not blocking).

**Acceptance:** CI runs green on a PR; screenshot artifacts downloadable.

---

### Sprint 7 — SM design fixes + bug bash fixes (Nov 5 – Nov 11) · 🎯 SM feature-complete

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-701 | Staging + release process, bug triage | Michael | S |
| MS-702 | Bug fixes: `scroll` label (engine, transitions, nav sync) | **Aditya** | M |
| MS-703 | SM design-review fixes: Hero, About, Values, Speakers | Rosyln | M |
| MS-704 | SM design-review fixes: Testimonials, Projects, Sponsors, Team, FAQ | Shreeya | M |
| MS-705 | Bug fixes: `lg-visual` label | Phaedra | M |
| MS-706 | Bug fixes: `md-visual` label | Yurika | M |
| MS-707 | Accessibility round 2 (all breakpoints, incl. SM) | Mehana | M |
| MS-708 | Cross-device test matrix execution + report | Andre | M |

- **MS-701 (Michael):** set up a stable staging URL (Vercel preview of `dev`, or a `staging` branch), write `RELEASE.md` (freeze dates, who approves, rollback steps), triage the bug-bash board daily, and reassign anything outside the labels. *Acceptance:* staging URL shared; every bug has an owner and priority by Friday Nov 6.
- **MS-702 (Aditya):** fix every `scroll` bug from the bash; re-run the MS-506 matrix on the fixed build. *Acceptance:* zero open P0/P1 `scroll` bugs.
- **MS-703 / MS-704 (Rosyln / Shreeya):** work through the S6 SM design-review checklist for your sections in `mobile/*`. *Acceptance:* every item is fixed or deferred by design.
- **MS-705 / MS-706 (Phaedra / Yurika):** fix `lg-visual` / `md-visual` bugs. Changes are scoped to scene TSX/CSS. *Acceptance:* zero open P0/P1 in your label; before/after screenshots.
- **MS-707 (Mehana):** redo the MS-503 checks at SM (axe, VoiceOver iOS, TalkBack Android), check the mobile menu focus trap, and make touch targets ≥ 44px. *Acceptance:* 0 critical/serious axe issues at all breakpoints.
- **MS-708 (Andre):** run the full matrix (Chrome/Safari/Firefox/Edge desktop at 1512, 1280, 1920; iPad portrait and landscape; iPhone SE/15/15 Pro Max; a mid-range Android) on staging with a checklist per device (loads, scrolls end to end, nav, carousels, accordion, form). Write `QA_REPORT.md` and file bugs. *Acceptance:* report committed; bugs filed with device and repro.

---

### Sprint 8 — Release candidate (Nov 12 – Nov 18)

**Code freeze for features: Mon Nov 16.** Only bug fixes after that.

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-801 | Release candidate, launch checklist, redirects & domain | Michael | M |
| MS-802 | Final performance audit & fixes (all breakpoints) | **Aditya** | M |
| MS-803 | Content lock + final copy proofread | Rosyln | S |
| MS-804 | Bug fixes: LG (from QA report) | Phaedra | M |
| MS-805 | Bug fixes: MD + tablet touch (from QA report) | Yurika | M |
| MS-806 | Bug fixes: SM (from QA report) | Shreeya | M |
| MS-807 | Final a11y + reduced-motion verification | Mehana | S |
| MS-808 | Regression run + update visual baselines | Andre | S |

- **MS-801 (Michael):** cut the RC from `dev`; write the launch checklist (DNS/domain, env vars such as the mailing-list API key in prod, verify the MS-101 redirects for `/projects`, `/sponsors`, `/team`, `/sponsor-us` work in prod, 404 page styled with museum tokens, analytics prod key); get a go/no-go from Aditya and the directors. *Acceptance:* RC tagged; checklist signed off.
- **MS-802 (Aditya):** re-run the MS-504 audits on the RC at all breakpoints; fix regressions. *Acceptance:* Lighthouse desktop ≥ 90, mobile ≥ 80.
- **MS-803 (Rosyln):** get final sign-off on all copy from the directors; proofread every section at every breakpoint; lock `lib/content`. *Acceptance:* the directors approve in writing.
- **MS-804 / MS-805 / MS-806 (Phaedra / Yurika / Shreeya):** close the QA-report bugs in your breakpoint. *Acceptance:* zero P0/P1 open.
- **MS-807 (Mehana):** final pass of the axe, keyboard and reduced-motion checks on the RC. *Acceptance:* clean report attached.
- **MS-808 (Andre):** run the Playwright suite + the manual smoke checklist on the RC; update the screenshot baselines. *Acceptance:* green run on the RC commit.

---

### Sprint 9 — Launch 🚀 (Nov 19 – Nov 25)

**Launch target: Tuesday Nov 24** (before Thanksgiving; nobody wants to hotfix on the 26th).

| Ticket | Title | Owner | Size |
|---|---|---|---|
| MS-901 | Production deploy + launch announcement coordination | Michael | S |
| MS-902 | Launch-day on-call: scroll/animation | **Aditya** | S |
| MS-903 | Handoff docs: scene system & content editing guide | Rosyln | S |
| MS-904 | Post-launch smoke test: LG | Phaedra | S |
| MS-905 | Post-launch smoke test: MD + tablets | Yurika | S |
| MS-906 | Post-launch smoke test: SM | Shreeya | S |
| MS-907 | Analytics & SEO verification in production | Mehana | S |
| MS-908 | Launch-day on-call: content/forms + legacy cleanup | Andre | S |

- **MS-901 (Michael):** merge the RC to the prod branch after Aditya's sign-off, deploy, verify the domain; coordinate the announcement with marketing (Instagram/LinkedIn/TikTok); run the retro on Wed Nov 25.
- **MS-902 / MS-908 (Aditya / Andre):** on call for 48h after launch in their areas; hotfixes go through PRs with one review. Andre also removes the leftover dev-only pages from the prod build (`/dev/*` already 404s in prod; double-check) and deletes the stale branches.
- **MS-903 (Rosyln):** `apps/main/README.md` sections: how to add or edit a scene, update content (speakers, sponsors, team, FAQ), run the harness, and run the tests. Written for next year's team.
- **MS-904 / MS-905 / MS-906 (Phaedra / Yurika / Shreeya):** run the smoke checklist on **production** on real devices for your breakpoint within 2h of the deploy; file anything critical to the on-call.
- **MS-907 (Mehana):** confirm the analytics events arrive from prod; submit the sitemap to Google Search Console; check the OG previews on the live domain.

---

## 5. Ownership summary

| Person | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 |
|---|---|---|---|---|---|---|---|---|---|
| **Aditya** | Header + Footer (all) + remove old routes | Scroll orchestrator | Hero anim | Full page assembly | Scroll hardening | Loading exp. | Scroll bugs | Perf audit | On-call (scroll) |
| **Michael** | Anim engine + spec | Sponsors static | FAQ static | Sponsors anim | Real content | SM assembly | Release/triage | RC + launch checklist | Prod deploy |
| **Rosyln** | Tokens + type | About static | About anim | SM Hero | SM Team | Fixes: Hero/About/Values | SM fixes A | Content lock | Handoff docs |
| **Phaedra** | PictureFrame | Values static | Values anim | FAQ anim | MD QA A | Fixes: Spk/Test/Proj | LG bugs | LG bugs | Smoke LG |
| **Mehana** | Carousel prims | Speakers static | Speakers anim | SM About + Values | A11y + reduced motion | SEO + analytics | A11y round 2 | A11y final | Analytics verify |
| **Yurika** | Hero assets | Hero static | Team static | Team anim | MD QA B | Fixes: Spons/Team/FAQ | MD bugs | MD bugs | Smoke MD |
| **Shreeya** | Decor prims | Testimonials static | Testimonials anim | SM Spk + Test | Perf + assets | SM QA | SM fixes B | SM bugs | Smoke SM |
| **Andre** | Content data | Projects static | Projects anim | SM Proj + Spons | SM FAQ | Visual tests + CI | Device matrix | Regression | On-call |

Most people build a section statically and then animate it in the next sprint, so they keep context and nobody waits on anyone in the same sprint. After S1, Aditya owns the **scroll-engine track**: orchestrator → hero animation → full page assembly → hardening → scroll bugs/perf. Michael owns the **release track** after building the engine foundation in S1.

## 6. Risks & open questions

| # | Risk / question | Owner | Resolve by |
|---|---|---|---|
| 1 | **No motion spec in Figma.** §3.5 is inferred. | Michael + Cole/Lucy | Sat Sep 26 (MS-102) |
| 2 | **Figma text styles are stale** (they say Sancreek/Neulis/DM Sans; the frames use Amarante/Special Gothic/Merriweather). | Rosyln + Cole | Sep 30 (MS-103) |
| 3 | Speakers has 2 LG frames (title centered vs. in column): is that a final choice or an animation pair? | Mehana + Lucy | Sep 26 (via MS-102) |
| 4 | Team gallery grouping (continuous strip vs. per department). | Yurika + Cole | Oct 8 (MS-303) |
| 5 | Content gaps (placeholder speakers, testimonials, team, FAQ answers, 2027 dates). | Aditya + directors | Oct 28 (MS-505) |
| 6 | The hero is the riskiest piece (asset size + zoom performance). It has a dedicated asset ticket in S1 and a perf budget. If MS-301 slips, ship a crossfade-only hero and add the zoom later. | Aditya/Yurika | Oct 14 |
| 7 | Sponsor Us button target once `/sponsor-us` is removed: `/#sponsors` or the sponsorship packet? | Aditya + Cole/Lucy | Sep 30 (MS-101) |
| 8 | Components → "Other" (`5539:741`) wasn't reviewed; it may contain shared UI (buttons/inputs). | Aditya | Sep 30 (MS-101) |
