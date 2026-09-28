# AI QA Log

> Maintained for submission by **@itsnarutouzumaki**

## Scope and Provenance

This is a reconstructed engineering QA record based on repository comments, role charters, source behavior, and documented known constraints. It is not a timestamped test transcript and contains no invented execution counts. Statuses describe the documented implementation state and the expected disposition of each issue.

| Area                  | Observed issue                                                      | Classification            | Agent                                             | Resolution                                                                                                   | Status             |
| --------------------- | ------------------------------------------------------------------- | ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------ |
| Hero gallery          | Hero trigger did not open Photo Tour                                | Functional defect         | Layout expert / code reviewer                     | Connected the hero and Show all photos controls to the parent Photo Tour callback and URL state              | Resolved           |
| Photo Tour URL        | Gallery used the wrong query parameter contract                     | Integration defect        | Code reviewer                                     | Standardized the view on `modal=PHOTO_TOUR_SCROLLABLE`                                                       | Resolved           |
| Lightbox state        | Lightbox parent state was missing                                   | State architecture defect | Accessibility and motion reviewer / code reviewer | Kept `photoIndex` and open/close callbacks in `App.jsx`; Lightbox remains controlled                         | Resolved           |
| Save                  | Saved heart remained an outline after activation                    | Interaction defect        | Layout expert / code reviewer                     | Added local saved state, filled-state styling, accessible label changes, and feedback                        | Resolved           |
| Share                 | Share action provided no feedback                                   | Interaction defect        | Code reviewer                                     | Added Clipboard API use with a fallback toast                                                                | Resolved           |
| Reserve               | Reserve action provided no feedback                                 | Interaction defect        | Code reviewer                                     | Added bounded local confirmation feedback without claiming a real booking                                    | Resolved           |
| Description           | Description Show more state was fixed rather than reversible        | State defect              | Layout expert                                     | Added local expansion state and Show less state                                                              | Resolved           |
| Reviews               | Review Show more control was missing                                | Feature gap               | Code reviewer                                     | Added per-review expansion state and reversible labels                                                       | Resolved           |
| Map                   | Location map was incomplete                                         | Visual/interaction gap    | Layout expert                                     | Added a local CSS map scene, marker, location label, controls, and neighbourhood expansion                   | Partially resolved |
| Post-map layout       | Content width did not match the listing column after the map        | Layout defect             | Layout expert / code reviewer                     | Aligned the post-map content with the page-width layout contract                                             | Resolved           |
| Escape/history        | Escape and browser history could leave modal state out of sync      | Integration defect        | Accessibility and motion reviewer / code reviewer | Coordinated `popstate`, URL cleanup, modal state, and focus return                                           | Resolved           |
| Lightbox boundaries   | Previous/next controls did not clearly disable at boundaries        | Accessibility defect      | Accessibility and motion reviewer                 | Disabled previous at the first photo and next at the last photo; keyboard callbacks follow the same boundary | Resolved           |
| Focus restoration     | Closing an overlay did not reliably restore focus to its trigger    | Accessibility defect      | Accessibility and motion reviewer                 | Reused the focus-trap contract and scheduled focus restoration to the Show all photos trigger                | Resolved           |
| Reduced motion        | No `prefers-reduced-motion` fallback was present                    | Accessibility/motion gap  | Accessibility and motion reviewer                 | Recorded the missing media-query fallback as a known constraint rather than claiming support                 | Known gap          |
| Build/lint validation | Final verification needed explicit lint and production-build checks | QA process gap            | Code reviewer / human maintainer                  | Defined `npm run lint` and `npm run build` as final gates; manual browser QA remains separate                | Partially resolved |

## Current Validation Note

Build and lint are executable repository checks and should be reported from the current working tree when run. Focused checks can validate URL parsing, parent-owned modal state, hook wiring, and source-level contracts. Manual browser QA is a separate acceptance activity; this record does not claim that a browser session, screenshot comparison, or numerical test run occurred unless separately recorded by the maintainer.

## Residual Risk

The project has no automated test runner. The most important residual checks are manual keyboard and browser-history behavior, Lightbox integration across all 43 photos, visual comparison at the desktop target width, and the documented reduced-motion gap.
