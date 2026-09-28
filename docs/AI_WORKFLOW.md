# AI-Assisted Development Workflow

> Maintained for submission by **@itsnarutouzumaki**

## Objective

This repository documents an AI-assisted development workflow for a desktop-only, visually and behaviorally reconstructed Airbnb-style Listing Page. The implemented scope is the Listing Page, Photo Tour, and Lightbox, using React 19, Vite, JavaScript, Tailwind CSS, local listing data, and local image assets.

The workflow record is a reconstructed prompt history based on repository evidence, configuration files, source comments, and the final implementation. It is not a literal transcript of every agent exchange.

## Development Strategy

The work followed this sequence:

**Reference Observation -> Requirement Decomposition -> Design/Component Planning -> Visual Implementation -> Behavior Implementation -> Accessibility & Motion Review -> Integration Review -> Code Review -> Build/Lint -> Final Human QA**

Reference observation focused on rendered behavior, layout, spacing, typography, image composition, navigation, and modal states. Requirements were then separated into page structure, gallery behavior, URL state, accessibility, motion, and QA concerns. The desktop-first target was kept explicit throughout; the repository does not attempt to become a mobile product.

## AI Roles

Three repository-configured roles supported the workflow:

- **Layout expert:** translated the observed desktop UI into React components and Tailwind styles. This role owned visual hierarchy, measured spacing, typography, colors, image treatment, semantic structure, and the Listing Page, Photo Tour, and Lightbox presentation. It was constrained against copied source, hotlinked assets, and responsive prefixes for the core layout.
- **Accessibility and motion reviewer:** reviewed interactive surfaces, especially Photo Tour, Lightbox, and their hooks. This role checked keyboard operation, focus trapping and restoration, ARIA labels and live announcements, boundary behavior, target sizes, scroll locking, and reduced-motion handling. Known gaps were to be recorded instead of silently approved.
- **Code reviewer:** performed the final cross-cutting review of state ownership, component boundaries, file structure, scope discipline, dependency use, and integration risks. It also required lint/build checks and documentation of unresolved constraints.

The roles are repository configuration under `.ai-workflow/`; they describe responsibilities and review gates rather than proving that every listed activity happened in a separate historical session.

## Why Multiple Agents

The roles separate concerns that are easy to conflate in a visual recreation. Layout work can optimize pixels while missing keyboard behavior; an accessibility review can identify focus or motion problems without owning geometry; and a final code review can catch state duplication, scope creep, or integration regressions across components. The handoffs create explicit checkpoints without introducing a heavyweight application architecture.

## Human-in-the-Loop

Human judgment remained responsible for selecting the reference behaviors, accepting or rejecting agent suggestions, choosing local assets, deciding which deviations were acceptable, and confirming the submission scope. The AI roles were used as constrained engineering collaborators. They did not establish that the reference implementation was copied, and they did not replace final browser inspection or the maintainer's acceptance decision.

## Originality / Anti-Copying Strategy

The implementation was built natively in this repository's React/Vite/Tailwind stack from observable behavior. The workflow prohibited lifting reference source code and prohibited hotlinking or copying reference image URLs. Listing data is centralized in `src/data/mockListing.js`, while images are bundled or served from this repository's local asset folders. Visual similarity is treated as an output goal, not as evidence that the reference source was reused.

## Iterative Development Loop

Each feature was treated as a small loop: observe the reference, define an acceptance condition, implement the smallest component or state change, inspect the result, and pass it to the next review role. Examples include the hero gallery opening the Photo Tour, URL-driven modal state using `modal=PHOTO_TOUR_SCROLLABLE`, parent-owned Lightbox photo selection, disabled first/last navigation, toast feedback for Save/Share/Reserve, and grouped Photo Tour categories. The final loop combines `npm run lint`, `npm run build`, focused checks of the touched behavior, and manual human QA of the listing and gallery flows.

The current source and `AGENTS.md` also preserve known gaps where behavior was not silently changed during documentation-focused maintenance, including the historical reduced-motion limitation and any remaining integration assumptions.

## Related Records

- [AI_PROMPTS.md](./AI_PROMPTS.md)
- [AI_AGENT_PIPELINE.md](./AI_AGENT_PIPELINE.md)
- [AI_QA_LOG.md](./AI_QA_LOG.md)
- [AI_SUBMISSION_SUMMARY.md](./AI_SUBMISSION_SUMMARY.md)
- [AGENTS.md](../AGENTS.md)
- [PROMPT_SEQUENCE.md](../PROMPT_SEQUENCE.md)
