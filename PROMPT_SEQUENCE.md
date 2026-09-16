# AI-Assisted Development Workflow

> Maintained for submission by **@itsnarutouzumaki**

This document is a documentation-level account of the AI-assisted prompt
sequence used to build this project. It restates the intent behind each
development step accurately, without fabricating dates, tools, or steps that
did not occur, and without implying that any source code was copied directly
from the reference deployment. All UI in this repository was built natively
in React + Tailwind CSS, using the reference deployment only as a visual and
behavioral guide (see `AGENTS.md`'s constraint: "Do not copy code directly
from the reference site — rebuild from visual/behavioral reference").

## Objective

Build a desktop-only, visually- and behaviorally-faithful clone of a single
Airbnb-style listing page — hero photo grid, listing details, sticky booking
card, host section, reviews, a full-screen photo tour, and a single-photo
lightbox — using an AI-assisted, role-specific agent workflow for layout
accuracy, accessibility, and code quality.

## Reference Analysis

The reference deployment (https://airbnb-clone-umber-two.vercel.app/) was
used as the visual and interaction source of truth: layout, spacing,
typography, color palette, and micro-interactions (hover states, sticky
scroll behavior) were observed and measured from its rendered output, not
extracted from its underlying source or assets. This distinction is
reflected in `.ai-workflow/agent-layout-expert.md`'s explicit instruction not
to hotlink or copy image URLs from the reference deployment.

## Project Initialization

Set up a React + Vite project with Tailwind CSS, configuring custom brand
tokens to match the Airbnb-style palette observed in the reference (coral/
"rausch" primary accent, neutral grays, rounded corners, soft shadows). These
tokens now live in `src/index.css` and are documented in
`.cursor/skills/design-system/SKILL.md`.

## Data Modeling

Created a structured JavaScript data object (`src/data/mockListing.js`)
containing the title, host details, amenities, and image arrays needed to
render a complete listing, decoupling listing content from the presentation
components. The listing's copy, structure, and layout groupings (title, host
info, amenity categories, review structure) were modeled after the visual
and content organization observed in the reference listing page, then
authored as original mock data for this project rather than copied verbatim
from any live source. This produced `src/data/mockListing.js`, later
consumed by every listing-page component.

## Listing Page

Using the persona and rules defined in `agent-layout-expert.md`, built the
core listing page — header, hero photo grid, listing details, sticky booking
card, host section, and footer — against the visual reference, with data
sourced from `src/data/mockListing.js`. Photo Tour and Lightbox were
explicitly deferred to a separate, focused pass.

A subsequent pass aimed for close pixel-level parity with the reference's
layout, spacing, and visual hierarchy at desktop viewport width, using local
mock assets (`src/data/mockListing.js`) rather than external placeholders
where a matching local asset was available, and following the accessibility
expectations defined in the design-system skill file (focus states, hover
effects, keyboard navigation per WCAG 2.2 AA).

## Photo Tour

Built the full-screen "Photo Tour" gallery (`src/components/PhotoTour.jsx`):
a category thumbnail strip plus a grouped image grid per room/category,
matching the reference's gallery layout and grouping behavior.

## Lightbox

Using `agent-a11y-motion-reviewer.md`, built the single-photo Lightbox
overlay (`src/components/Lightbox.jsx`) and its supporting hooks
(`useFocusTrap`, `useKeyboardNav`): keyboard-navigable (arrow keys, `Esc` to
close, focus trap), with a target of respecting `prefers-reduced-motion` for
transitions and announcing slide position to screen readers via
`aria-live`.

**Verification note (added during this documentation pass):** an audit of
the current codebase found that `Lightbox` is fully implemented and styled,
including its focus-trap and keyboard-nav behavior, but is not currently
mounted/triggered from `PhotoGrid` or `PhotoTour` (no photo click opens it),
and that no `prefers-reduced-motion` media query exists anywhere in
`src/index.css`. These gaps are recorded in `AGENTS.md`'s "Known
constraints" section rather than corrected here, consistent with this
repository's documentation-only maintenance scope.

## Accessibility

Interactive elements across the listing page, Photo Tour, and Lightbox were
built with keyboard operability, visible focus states, and ARIA roles/labels
on non-text controls in mind, per the rules in
`.ai-workflow/agent-a11y-motion-reviewer.md`.

## Motion Review

Hover/scroll animation timing and easing were matched to the reference as
closely as practical using Tailwind's transition utilities, per
`.ai-workflow/agent-layout-expert.md`'s motion guidance. As noted above,
reduced-motion handling was targeted but is not present in the current
codebase.

## Code Review

The implementation was reviewed against `.ai-workflow/agent-code-reviewer.md`'s
cross-validation checklist (no responsive prefixes, no hotlinked reference
images, focus-trap/scroll-lock/aria-live present in overlays, logical tab
order) to catch scope creep and cross-cutting issues that component-level
review might miss.

## Architecture Diagram

An accompanying production-scale system architecture (see
`Architecture-diagram.png`) was designed separately to illustrate how this
listing-page UI would fit into a larger, scalable marketplace backend
(decoupled services, async search indexing, booking concurrency control,
CI/CD). This diagram documents a hypothetical backend architecture — it is
not implemented in this repository, which is a frontend-only static clone.

## Documentation

This documentation-maintenance pass added file-level and component-level
rationale comments across `src/`, rewrote `AGENTS.md` as the authoritative
engineering guide, corrected `.cursor/skills/design-system/SKILL.md` to
describe this project instead of generic/mismatched content, formalized the
`.ai-workflow/*` agent configuration files, and reconciled stale references
across `README.md` — all without changing executable application behavior.

## Final QA

Verification performed during the documentation-maintenance pass: `npm run
build` and `npm run lint` were run to confirm the codebase still builds and
lints cleanly after documentation-only edits, and a line-by-line diff review
confirmed no executable statement was altered — see the "Regression
verification" summary at the end of the maintenance report for this pass.
