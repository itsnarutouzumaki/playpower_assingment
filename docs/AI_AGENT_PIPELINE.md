# AI Agent Pipeline

> Maintained for submission by **@itsnarutouzumaki**

This pipeline describes the repository's configured review flow. The agent files are repository configuration and role guidance. The prompts in [AI_PROMPTS.md](./AI_PROMPTS.md) are reconstructed prompts, not exact transcripts.

## Pipeline Diagram

```text
              Reference
                 |
                 v
          Discovery / Analysis
                 |
                 v
          Implementation Plan
                 |
                 v
          agent-layout-expert
                 |
                 v
        Visual Validation Checkpoint
                 |
                 v
        agent-a11y-motion-reviewer
                 |
                 v
     Accessibility/Motion Checkpoint
                 |
                 v
          Integration Review
                 |
                 v
          agent-code-reviewer
                 |
                 v
         Lint + Build + QA
                 |
                 v
             Human Review
                 |
                 v
          Final Submission
```

## Stage Contracts

| Stage                         | Input                                          | Responsibility                                                                                  | Output                                              | Quality gate                                                                           |
| ----------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Reference Observation         | Rendered reference and repository scope        | Record visible layout, states, interactions, and desktop target                                 | Observable behavior inventory                       | No source-code extraction, copied markup, or hotlinked assets                          |
| Requirement Decomposition     | Behavior inventory and assignment constraints  | Separate visual, behavior, URL, accessibility, motion, and QA requirements                      | Testable requirements                               | Listing Page, Photo Tour, and Lightbox remain the complete product scope               |
| Design / Component Planning   | Requirements and existing tree                 | Map responsibilities to React components, local data, and hooks                                 | Component/state/prop plan                           | State ownership and existing repository conventions are explicit                       |
| Visual Implementation         | Component plan, local assets, Tailwind tokens  | Layout expert builds desktop geometry, styling, semantic structure, and hover/scroll states     | Listing Page, Photo Tour, and Lightbox presentation | 1440px+ target, local assets, no core responsive prefixes                              |
| Behavior Implementation       | Visual components and interaction requirements | Wire URL state, gallery navigation, Save, Share, Reserve, reviews, map, and modal callbacks     | Working interactions and state transitions          | URL and parent-state contracts are deterministic                                       |
| Accessibility & Motion Review | Interactive components and hooks               | A11y/motion reviewer checks keyboard, focus, ARIA, boundaries, scroll lock, and reduced motion  | Checklist and documented gaps                       | No unlabelled icon controls or focus escape; absent reduced-motion support is recorded |
| Integration Review            | Cross-component implementation                 | Verify App-to-component state flow, cleanup, browser history, and toast feedback                | Integration findings                                | One source of truth for active modal/photo state                                       |
| Code Review                   | Full `src/` tree and configuration             | Code reviewer checks scope, structure, dependencies, copied code, and cross-cutting regressions | Final review record                                 | Scope discipline, no unnecessary dependencies, and documented deviations               |
| Build / Lint                  | Reviewed working tree                          | Run repository validation commands                                                              | Build/lint evidence                                 | `npm run lint` and `npm run build` results are reported accurately                     |
| Final Human QA                | Built application, review record, known gaps   | Human accepts or rejects behavior and visual tradeoffs through browser inspection               | Submission decision and residual-risk notes         | No claim of manual verification without actual inspection                              |

## Handoffs

The primary handoff is **layout expert -> accessibility/motion reviewer -> code reviewer**. The layout role identifies ready components, visual gaps, and pending hover/motion work. The accessibility/motion role passes a keyboard, ARIA, focus, scroll-lock, and reduced-motion checklist to the code reviewer, including any explicit known gap. The code reviewer verifies the result across the full source tree rather than treating each component as isolated.

The actual charters constrain the roles: the layout expert owns visual and geometric fidelity, the accessibility/motion reviewer owns keyboard and responsible-motion behavior, and the code reviewer owns integration, scope, state architecture, dependency discipline, and final validation. During documentation-only maintenance, these roles document findings instead of modifying executable behavior.

## Final Gate

The final gate combines lint/build commands with manual checks of listing render, Photo Tour open/close, Escape, browser back/forward, category jump links, sticky navigation, Save, Share, Reserve, Lightbox boundary behavior, focus restoration, and the reduced-motion status. Any missing automated test infrastructure is stated plainly. Human acceptance remains the final decision.

## Related Files

- [agent-layout-expert.md](../.ai-workflow/agent-layout-expert.md)
- [agent-a11y-motion-reviewer.md](../.ai-workflow/agent-a11y-motion-reviewer.md)
- [agent-code-reviewer.md](../.ai-workflow/agent-code-reviewer.md)
- [AGENTS.md](../AGENTS.md)
- [PROMPT_SEQUENCE.md](../PROMPT_SEQUENCE.md)
