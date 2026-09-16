---
name: design-system-romantic-jacuzzi-1bhk-candolim
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Romantic Jacuzzi 1BHK Candolim

## Mission
Deliver implementation-ready design-system guidance for Romantic Jacuzzi 1BHK Candolim that can be applied consistently across dashboard web app interfaces.

## Brand
- Product/brand: Romantic Jacuzzi 1BHK Candolim
- URL: https://airbnb-clone-umber-two.vercel.app/
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Airbnb Cereal VF`, `font.family.stack=Airbnb Cereal VF, Circular, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, sans-serif`, `font.size.base=14px`, `font.weight.base=500`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=12px`, `font.size.sm=13.33px`, `font.size.md=14px`, `font.size.lg=15px`, `font.size.xl=16px`, `font.size.2xl=22px`, `font.size.3xl=26px`
- Color palette: `color.text.primary=#222222`, `color.text.secondary=#717171`, `color.surface.muted=#ffffff`, `color.text.inverse=#ff385c`, `color.surface.base=#000000`, `color.surface.raised=#eeeeee`, `color.surface.strong=#f2f2f2`, `color.border.muted=#dddddd`, `color.border.strong=rgb(235, 235, 235) rgb(34, 34, 34) rgb(34, 34, 34)`
- Spacing scale: `space.1=1px`, `space.2=2px`, `space.3=6px`, `space.4=7px`, `space.5=8px`, `space.6=10px`, `space.7=12px`, `space.8=13px`
- Radius/shadow/motion tokens: `radius.xs=8px`, `radius.sm=12px`, `radius.md=16px`, `radius.lg=22px`, `radius.xl=40px`, `radius.2xl=50px`, `radius.step7=999px` | `shadow.1=rgba(0, 0, 0, 0.2) 0px 2px 6px 0px`, `shadow.2=rgba(0, 0, 0, 0.15) 0px 2px 8px 0px` | `motion.duration.instant=100ms`, `motion.duration.fast=150ms`, `motion.duration.normal=180ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
