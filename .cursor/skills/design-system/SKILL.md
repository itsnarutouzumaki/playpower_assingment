---
name: design-system-airbnb-desktop-listing-clone
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards for the Airbnb Desktop Listing Clone. Use when creating or updating UI rules, component specifications, or design-system documentation for this project.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Airbnb Desktop Listing Clone — Design System

## Mission
Deliver implementation-ready design-system guidance for the **Airbnb Desktop
Listing Clone** that can be applied consistently across this project's
listing-page, photo-tour, and lightbox surfaces.

## Project
- Project: Airbnb Desktop Listing Clone
- Reference: https://airbnb-clone-umber-two.vercel.app/
- Audience: end users browsing/booking a single vacation-rental listing
- Product surface: desktop-only marketing/listing web page (1440px+ viewport)
- Primary stack: React + Vite + JavaScript + Tailwind CSS

Note: the mock listing content rendered by this app happens to describe a
"Romantic Jacuzzi 1BHK" property (see `src/data/mockListing.js`) — that is
listing *content*, not the name of this design system or project. This
document intentionally scopes itself to the Airbnb Desktop Listing Clone
project as a whole, independent of whichever mock listing is currently
loaded.

## Style Foundations
- Visual style: Airbnb-style visual language as observed in the reference —
  structured, accessible, implementation-first
- Main font style: `font.family.primary=Airbnb Cereal VF`,
  `font.family.stack=Airbnb Cereal VF, Circular, -apple-system,
  BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, sans-serif`,
  `font.size.base=14px`, `font.weight.base=500`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=12px`, `font.size.sm=13.33px`,
  `font.size.md=14px`, `font.size.lg=15px`, `font.size.xl=16px`,
  `font.size.2xl=22px`, `font.size.3xl=26px`
- Color palette: `color.text.primary=#222222`, `color.text.secondary=#717171`,
  `color.surface.muted=#ffffff`, `color.text.inverse=#ff385c`,
  `color.surface.base=#000000`, `color.surface.raised=#eeeeee`,
  `color.surface.strong=#f2f2f2`, `color.border.muted=#dddddd`,
  `color.border.strong=rgb(235, 235, 235) rgb(34, 34, 34) rgb(34, 34, 34)`
- Spacing scale: `space.1=1px`, `space.2=2px`, `space.3=6px`, `space.4=7px`,
  `space.5=8px`, `space.6=10px`, `space.7=12px`, `space.8=13px`
- Radius/shadow/motion tokens: `radius.xs=8px`, `radius.sm=12px`,
  `radius.md=16px`, `radius.lg=22px`, `radius.xl=40px`, `radius.2xl=50px`,
  `radius.step7=999px` | `shadow.1=rgba(0, 0, 0, 0.2) 0px 2px 6px 0px`,
  `shadow.2=rgba(0, 0, 0, 0.15) 0px 2px 8px 0px` |
  `motion.duration.instant=100ms`, `motion.duration.fast=150ms`,
  `motion.duration.normal=180ms`

These tokens are drawn directly from `src/index.css`'s `:root` custom
properties and should stay in sync with that file — do not invent tokens
that are not backed by an existing implementation.

## Design system goals
- Match the Airbnb-style visual language observed in the reference deployment
- Desktop-first layout (no responsive breakpoints for the core listing page)
- Accurate typography, spacing, borders, radii, and shadows matching the
  tokens above
- Consistent interaction states (hover, focus-visible, active, disabled)
  across buttons and controls
- A documented, WCAG 2.2 AA-aligned modal behavior contract for `Lightbox`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define required states: default, hover, focus-visible,
  active, disabled, loading, error (where applicable to this static-data
  project — e.g. "loading" applies to image loads, not data fetches).
- Accessibility acceptance criteria must be testable in implementation.
- Reference this project's actual components (`ListingHeader`, `PhotoGrid`,
  `PhotoTour`, `Lightbox`, `BookingCard`, `ListingDetails`,
  `ListingAfterCalendar`, `MeetHost`, `ListingFooter`, `ListingNav`) when
  writing component-level guidance, rather than generic dashboard examples.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions not present in
  `src/index.css`.
- Do not use ambiguous labels or non-descriptive actions.
- Do not describe responsive/mobile behavior for the core listing page — this
  project is explicitly desktop-only.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens (pulling from `src/index.css`, not inventing
   new values).
3. Define component anatomy, variants, and interactions for this project's
   actual components.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and known constraints (see `AGENTS.md`).
6. End with a QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states)
- Accessibility requirements and testable acceptance criteria
- Visual inspection notes (spacing/typography/image-treatment parity with the
  reference)
- Component states (default/hover/focus-visible/active/disabled)
- Motion notes (including the current absence of `prefers-reduced-motion`
  handling — see `AGENTS.md`, "Known constraints")
- Modal behavior (`Lightbox` contract: `isOpen`, `photoIndex`, `onClose`,
  `onPrev`, `onNext`; focus trap and keyboard nav via `useFocusTrap` /
  `useKeyboardNav`)
- QA checklist
- Documentation expectations

## Component Rule Expectations
- Include keyboard and pointer behavior (touch/mobile is out of scope for
  this desktop-only project).
- Include spacing and typography token requirements, sourced from
  `src/index.css`.
- Include overflow/empty-state handling only where it actually applies to
  this project's static-data components (e.g. long review text, missing
  avatar images in `MeetHost.jsx`'s `handleImgError` fallback).

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency (tokens in `src/index.css`) over local visual
  exceptions.

## Maintainer
@itsnarutouzumaki

<!-- TYPEUI_SH_MANAGED_END -->
