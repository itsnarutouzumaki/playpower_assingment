# AGENTS.md — Repository Engineering Guide

> Maintained for submission by **@itsnarutouzumaki**

This document is the authoritative engineering reference for this repository:
what the project is, how it's built, how its pieces fit together, and the
conventions that apply to anyone (human or AI agent) working on it going
forward.

## Project objective

A desktop-only, visually- and behaviorally-reconstructed clone of a single
Airbnb-style listing page (hero photo grid, listing details, sticky booking
card, host section, reviews, and a full-screen "photo tour" gallery view),
built as a take-home submission. The implementation targets close visual and
interaction parity with a reference deployment while being built natively in
this project's own stack — it is not a scrape or direct code lift of that
reference (see `PROMPT_SEQUENCE.md`).

## Technology stack

- **React 19** (function components, hooks only — no class components)
- **Vite** — dev server and build tool (`vite.config.js` registers the React
  and Tailwind plugins)
- **Tailwind CSS v4** — utility-first styling, loaded via `@import
  "tailwindcss"` in `src/index.css`; project-specific design tokens are
  defined as CSS custom properties in the same file
- **lucide-react** — icon set used alongside a small set of hand-drawn inline
  SVG icons (see `src/components/Icon.jsx`)
- **ESLint** (flat config, `eslint.config.js`) — `js.configs.recommended` +
  `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`
- Deployed as a static site (see `vercel.json`, which rewrites all routes to
  `index.html` for client-side routing support)

There is no backend, database, or test runner in this project — all listing
data is static, local mock data (`src/data/mockListing.js`).

## Directory structure

```
├── index.html                 # Vite entry HTML; loads fonts + /src/main.jsx
├── src/
│   ├── main.jsx                # React root; mounts <App /> in StrictMode
│   ├── App.jsx                 # Top-level state (photo tour view, sticky nav)
│   ├── index.css                # Tailwind import, design tokens, global CSS
│   ├── components/              # All presentational + interactive components
│   ├── hooks/                   # Reusable interaction hooks
│   ├── data/mockListing.js      # Single source of truth for listing content
│   └── assets/                  # Bundled images imported directly into JS
├── public/                     # Statically-served images referenced by URL
│                                # (kitchen/, bedroom/, pool/, gym/, etc. —
│                                # consumed by PhotoTour.jsx's category grids)
├── .ai-workflow/                # Sub-agent configuration used during build
├── .cursor/skills/design-system/SKILL.md  # Design-system reference skill
├── PROMPT_SEQUENCE.md          # AI-assisted development workflow log
├── Architecture-diagram.png    # Production-scale system architecture diagram
└── AGENTS.md / README.md       # This file / submission overview
```

## Component architecture

```
App
├── ListingHeader            (logo, search pill, account nav, title row)
├── PhotoGrid                (hero image grid, "Show all photos" trigger)
├── ListingNav                (sticky secondary nav, appears on scroll)
├── ListingDetails            (host summary, highlights, amenities, calendar)
├── BookingCard               (sticky reservation widget)
├── ListingAfterCalendar     (ratings/reviews, location)
├── MeetHost  → MeetYourHost  (host bio, co-host avatars)
├── ListingFooter → ListingFooterDetails  (nearby stays carousel, legal footer)
└── PhotoTour                 (full-screen gallery — replaces the tree above
                                when the `?photo` query param is present)
     Lightbox                 (single-photo modal — built and styled, see
                                "Known constraints" below for its current
                                integration status)
```

### Responsibility boundaries

- **`App.jsx`** owns the two pieces of state that affect more than one
  component: whether Photo Tour is showing (`showPhotoTour`, driven by the
  `?photo` URL param so the view is linkable and back/forward-navigable) and
  whether the secondary nav should be sticky (`isNavSticky`, driven by an
  `IntersectionObserver` on the area around `PhotoGrid`).
- **Presentational components** (`ListingHeader`, `PhotoGrid`, `BookingCard`,
  `ListingDetails`, `ListingAfterCalendar`, `MeetHost`, `ListingFooter`,
  `ListingNav`) read from `src/data/mockListing.js` and hold only
  component-local UI state (e.g. the "show all amenities" toggle in
  `ListingDetails`). None of them mutate booking or listing data.
- **`PhotoTour`** is a full page-level view, not a modal — `App` swaps to it
  entirely rather than overlaying it on the listing page.
- **`Lightbox`** is a self-contained, single-photo modal dialog with its own
  focus-trap, keyboard-nav, and close behavior, built as a reusable unit
  independent of `PhotoTour`'s grid layout.
- **Hooks** (`useFocusTrap`, `useKeyboardNav`, `useScrollLock`) extract
  accessibility-critical, non-visual behavior out of components so any
  current or future modal-style component can reuse it verbatim.

### State, modal, and data flow

- Listing content flows one-way: `mockListing.js` → components. No component
  writes back to it.
- View flow: `App` holds `showPhotoTour`; `PhotoGrid`'s "Show all photos"
  button calls `onShowPhotos` (owned by `App`) which pushes `?photo` onto the
  URL and flips the flag; `PhotoTour`'s back button calls `onClose` (also
  owned by `App`) which reverses both.
- Modal flow (as designed): `Lightbox` receives `isOpen`, `photoIndex`,
  `onClose`, `onPrev`, `onNext` from a parent that owns the "which photo is
  selected" index; `Lightbox` itself holds no photo-selection state.

### Keyboard interaction flow

- **`PhotoTour`**: a window-level `keydown` listener closes the view on
  `Escape` (calls `onClose`). This is implemented locally in `PhotoTour`
  rather than via `useKeyboardNav`.
- **`Lightbox`**: uses `useKeyboardNav` for `ArrowLeft` (previous photo),
  `ArrowRight` (next photo), and `Escape` (close), with `onPrev`/`onNext`
  disabled (`undefined`) at the first/last photo to match the disabled state
  of the on-screen prev/next buttons.

### Focus management & scroll locking

- **`useFocusTrap`** confines Tab/Shift+Tab within a container while active
  and restores focus to the previously-focused element on deactivation. Used
  by `Lightbox`.
- **`useScrollLock`** disables background scrolling and compensates for the
  removed scrollbar's width to avoid layout shift while an overlay is open.
  This hook exists in `src/hooks/` but is not currently invoked by any
  component — see "Known constraints" below.

## Accessibility expectations

- All icon-only buttons must carry `aria-label` (already the convention
  throughout `src/components/*.jsx`).
- Interactive elements use semantic `<button>`/`<a>` tags, not clickable
  `<div>`s.
- Modal dialogs (`Lightbox`) use `role="dialog"`, `aria-modal="true"`, and an
  `aria-label` describing current state (`Photo N of M`), plus an
  `aria-live="polite"` counter for screen-reader position feedback.
- Focus must never be trapped outside a modal's boundary, and must return to
  the triggering element when a modal closes (`useFocusTrap`).

## Known constraints

Documented here rather than silently "fixed," per this repository's
documentation-only maintenance policy (see below):

- **`Lightbox` is not currently wired into the click flow.** Its styling
  (`.lightbox__*` rules in `src/index.css`), keyboard navigation, and focus
  trap are fully implemented, but no image click in `PhotoGrid` or
  `PhotoTour` currently opens it, and `useScrollLock` is not called from any
  component. The component's prop contract (`isOpen`, `photoIndex`,
  `onClose`, `onPrev`, `onNext`) represents the intended integration surface
  for a future "click a photo to open Lightbox" feature.
- **No `prefers-reduced-motion` handling exists in the codebase.** Motion
  (hover scale/opacity transitions, the sticky-nav slide-in) uses plain
  Tailwind transition utilities without a reduced-motion media query
  fallback.
- **Minor naming mismatches, preserved as-is:** `MeetHost.jsx` exports a
  component named `MeetYourHost`; `ListingFooter.jsx` exports
  `ListingFooterDetails`. Both are imported under aliased names in `App.jsx`
  and function correctly — the file/export name mismatch has no runtime
  effect.
- **`src/assets/maniville/`** contains image assets left over from an earlier
  listing concept (see `PROMPT_SEQUENCE.md`'s reference to a villa listing)
  that are not imported by the current `mockListing.js`, which models a
  different property ("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10").
- **`ListingFooter.jsx`'s `nearbyStays` mock data** contains two entries with
  a duplicate `id: 7`.

## Development conventions

- Function components with hooks only; no class components.
- Desktop-first, fixed/arbitrary Tailwind values are used where the
  reference's exact spacing/typography doesn't map to the default scale
  (e.g. `text-[15px]`, `mt-[24px]`) — see `.ai-workflow/agent-layout-expert.md`.
- No responsive (`sm:`/`md:`/`lg:`) breakpoints are used for the core layout,
  consistent with the desktop-only scope; a small number of `sm:`/`md:`
  classes appear in `PhotoTour.jsx`'s thumbnail grid only.
- Shared, non-visual interaction logic (focus trap, keyboard nav, scroll
  lock) belongs in `src/hooks/`, not duplicated per component.
- Listing content belongs in `src/data/mockListing.js`, not hardcoded in
  components.

## Testing expectations

No automated test suite is included in this repository. Verification is
manual: `npm run build` for a production build check, `npm run lint` for
static analysis, and manual interaction testing (keyboard navigation, focus
behavior, Photo Tour open/close) in a browser.

## AI-assisted workflow

This project was built using an AI-assisted workflow with role-specific
sub-agent configuration files under `.ai-workflow/` (layout, accessibility/
motion, and code review) and a project-specific design-system skill under
`.cursor/skills/design-system/`. The actual prompt sequence used is logged in
`PROMPT_SEQUENCE.md`.

## Source-code immutability policy

This repository is currently in **documentation-only maintenance mode**.
**Executable application behavior should not be modified as part of
documentation-only maintenance.** Contributors and AI agents working from
this file should:

- Add or improve comments, README/AGENTS/PROMPT_SEQUENCE content, and
  `.ai-workflow`/`.cursor` configuration freely.
- Not change component logic, JSX structure, Tailwind classes, hooks,
  imports/exports, state management, routing, or dependency/config files as
  part of a documentation pass.
- Record any genuinely useful improvement idea under a "Known constraints" or
  "Maintenance notes" section instead of implementing it silently.
- Treat existing source files as immutable outside of adding rationale
  comments that do not alter any executable statement.

## Documentation conventions

- File/component-level doc comments use JSDoc-style blocks:
  ```js
  /**
   * @author @itsnarutouzumaki
   * @purpose ...
   * @why ...
   */
  ```
- Markdown documents note maintenance authorship as:
  > Maintained for submission by **@itsnarutouzumaki**
- The signature is used at meaningful file/document boundaries, not on every
  line or trivial function.
- Accurate language is used for authorship — "maintained by," "documented
  by," "organized by" — rather than claims of having originally authored the
  underlying application code from scratch.

## Maintainer

**@itsnarutouzumaki**

## Review checklist

Before merging any change to this repository:

- [ ] No `.jsx`/`.js`/`.css` executable statement, import, export, class
      name, or Tailwind class was changed (documentation comments only).
- [ ] `package.json` / `package-lock.json` are unchanged.
- [ ] `npm run build` succeeds.
- [ ] `npm run lint` succeeds (or pre-existing warnings are unchanged).
- [ ] Manual check: listing page loads, "Show all photos" opens Photo Tour,
      Escape closes Photo Tour, category thumbnail jump-links scroll
      correctly, sticky nav appears/disappears on scroll.
- [ ] Any documentation inaccuracy found (broken filename reference, stale
      claim) is corrected or flagged, not silently ignored.
