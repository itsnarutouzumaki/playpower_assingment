# Airbnb Clone

> Maintained for submission by **@itsnarutouzumaki**

## Overview

A desktop-optimized, visually- and behaviorally-reconstructed clone of a
single Airbnb-style listing page, built with React, Vite, and Tailwind CSS.
The submission also includes a production-scale system architecture
blueprint for how this UI would fit into a real, high-concurrency vacation
rental marketplace, and a documented AI-assisted development workflow.

## Reference

Visual and interaction reference: https://airbnb-clone-umber-two.vercel.app/

This project rebuilds the reference's layout, spacing, typography, and
micro-interactions from visual/behavioral observation. It is implemented
natively in this project's own stack rather than by copying the reference's
source code or hotlinking its assets (see `AGENTS.md` and
`.ai-workflow/agent-layout-expert.md`).

## Features

### Core Listing Page
- Hero photo grid, sticky reservation card, host section, amenities list,
  and review cards matching the reference's visual layout.
- A scroll-aware secondary navigation bar that slides in once the hero photo
  grid scrolls out of view (`App.jsx` + `ListingNav.jsx`).
- Hover/scroll transitions built with Tailwind transition utilities.

### Photo Tour
- Full-screen gallery opened from "Show all photos," driven by a `?photo`
  URL query parameter (so the view is linkable and works with browser
  back/forward navigation).
- Category thumbnail strip with jump-to-section scrolling, and a grouped
  image grid per room/category (`src/components/PhotoTour.jsx`).

### Lightbox
- A single-photo modal (`src/components/Lightbox.jsx`) with Arrow Left/Right
  key navigation, `Escape` to close, a focus trap, and an `aria-live` photo
  counter for screen readers.
- **Current integration status:** Lightbox is fully implemented and styled
  but is not yet wired to any photo-click handler in `PhotoGrid` or
  `PhotoTour` in this build — see `AGENTS.md`'s "Known constraints" section
  for details. Its prop contract is ready for that wiring.

## Tech Stack

- **Frontend framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4, with custom design tokens (typography, color,
  spacing, radius, shadow, motion) defined in `src/index.css`
- **Icons:** `lucide-react`, plus a small set of hand-drawn inline SVG icons
  (`src/components/Icon.jsx`)
- **State:** Local React state and hooks only — no Redux/Context/global
  store; all listing content is static mock data
- **Linting:** ESLint (flat config) with `eslint-plugin-react-hooks` and
  `eslint-plugin-react-refresh`
- **Deployment:** Static hosting via Vercel (`vercel.json`)

## Project Structure

```
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Top-level state (view switch, sticky nav)
│   ├── index.css                 # Tailwind import + design tokens + global CSS
│   ├── components/               # Listing, Photo Tour, Lightbox, and shared UI
│   ├── hooks/                    # useFocusTrap, useKeyboardNav, useScrollLock
│   ├── data/mockListing.js       # Decoupled mock listing content
│   └── assets/                   # Bundled images imported into components
├── public/                       # Statically-served category photos (kitchen/,
│                                  # bedroom/, pool/, gym/, etc.) used by PhotoTour
├── .ai-workflow/                 # AI sub-agent configuration files
│   ├── agent-layout-expert.md
│   ├── agent-a11y-motion-reviewer.md
│   └── agent-code-reviewer.md
├── .cursor/skills/design-system/SKILL.md  # Project design-system reference skill
├── AGENTS.md                     # Authoritative engineering guide
├── PROMPT_SEQUENCE.md             # AI-assisted development workflow log
├── Architecture-diagram.png       # Production-scale system architecture diagram
└── README.md                      # This file
```

## Component Architecture

```
App
├── ListingHeader
├── PhotoGrid            (hero grid; triggers Photo Tour)
├── ListingNav            (sticky secondary nav)
├── ListingDetails
├── BookingCard
├── ListingAfterCalendar
├── MeetHost  → MeetYourHost
├── ListingFooter → ListingFooterDetails
└── PhotoTour              (replaces the tree above when ?photo is present)
     Lightbox               (single-photo modal; see "Features" above)
```

See `AGENTS.md` for the full breakdown of responsibility boundaries, state
flow, and known constraints.

## Interaction Model

- **View switching:** `App.jsx` swaps between the listing page and Photo
  Tour based on a `?photo` URL parameter, rather than local-only state, so
  the gallery view is directly linkable and survives back/forward
  navigation.
- **Sticky nav:** An `IntersectionObserver` on the area around `PhotoGrid`
  toggles `ListingNav`'s visibility as the hero grid scrolls out of view.
- **Keyboard navigation:** `Lightbox` uses a shared `useKeyboardNav` hook for
  Arrow Left/Right and Escape; `PhotoTour` closes on Escape via its own
  local listener.

## Accessibility

- Icon-only buttons carry `aria-label`.
- `Lightbox` uses `role="dialog"`, `aria-modal="true"`, an `aria-live`
  region for photo-position announcements, and `useFocusTrap` to keep
  keyboard focus contained while open, restoring it to the triggering
  element on close.
- Interactive elements are real `<button>`/`<a>` elements, not clickable
  `<div>`s.
- **Known gap:** no `prefers-reduced-motion` media query exists in the
  current stylesheet — see `AGENTS.md`, "Known constraints."

## Motion & Transitions

Hover states (image scale, button color/border shifts) and the sticky-nav
slide-in use Tailwind's built-in transition utilities, matching the timing
and easing observed in the reference as closely as practical.

## Data Architecture

All listing content — title, host details, amenities, pricing, reviews, and
image references — lives in `src/data/mockListing.js`, decoupled from the
presentation components that consume it. See the file-level documentation
comment in that file for the image-grouping structure and why data is kept
separate from components.

## AI-Assisted Development Workflow

This project was built using an AI-assisted workflow with role-specific
sub-agent configurations for layout accuracy, accessibility/motion review,
and code review. The full prompt sequence, written to accurately reflect
what was actually done (no fabricated steps or tools), is documented in
[`PROMPT_SEQUENCE.md`](./PROMPT_SEQUENCE.md).

## Agent Configuration

Sub-agent persona/rule files used during development live under
`.ai-workflow/`:

- [`agent-layout-expert.md`](./.ai-workflow/agent-layout-expert.md) —
  visual hierarchy, spacing, typography, DOM parity with the reference.
- [`agent-a11y-motion-reviewer.md`](./.ai-workflow/agent-a11y-motion-reviewer.md) —
  keyboard focus traps, ARIA attributes, and motion review.
- [`agent-code-reviewer.md`](./.ai-workflow/agent-code-reviewer.md) —
  cross-cutting code quality and scope-discipline review.

A project-specific design-system reference skill is maintained at
[`.cursor/skills/design-system/SKILL.md`](./.cursor/skills/design-system/SKILL.md).

## Architecture Diagram

An enterprise-scale system architecture — covering decoupled service
databases, async search indexing via CDC/Kafka, Redis-backed booking
concurrency control, and CI/CD pipelines — is included as
[`Architecture-diagram.png`](./Architecture-diagram.png). This diagram
illustrates how the UI in this repository would fit into a larger,
production-scale marketplace backend; that backend is not implemented here,
as this repository is a frontend-only static clone.

## Running Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # serve the production build locally
```

## Testing / QA

No automated test suite is included. QA is manual:

```bash
npm run lint
npm run build
```

Followed by manual verification of: listing page render, "Show all photos"
→ Photo Tour open/close (including via Escape and browser back), category
thumbnail jump-links, and sticky-nav appearance on scroll.

## Documentation Philosophy

This repository is currently maintained under a **documentation-only**
policy: application behavior, JSX structure, styling, state management, and
dependencies are treated as frozen, and all maintenance work adds or
corrects documentation (comments, this README, `AGENTS.md`,
`PROMPT_SEQUENCE.md`, and the `.ai-workflow`/`.cursor` configuration) without
altering executable code. Any improvement opportunity discovered along the
way is recorded under `AGENTS.md`'s "Known constraints" section instead of
being silently implemented.

## Submission Notes

- Filenames referenced throughout this documentation set
  (`PROMPT_SEQUENCE.md`, `Architecture-diagram.png`, `.ai-workflow/*.md`)
  match the actual files present in this repository.
- Known, intentionally-undisturbed constraints (Lightbox integration status,
  absence of reduced-motion handling, minor file/export naming mismatches,
  a duplicate mock-data `id`) are documented in `AGENTS.md` rather than
  fixed, per the documentation-only scope of this maintenance pass.

## Maintainer

**@itsnarutouzumaki**
