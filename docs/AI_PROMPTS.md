# Reconstructed AI Prompts

> Maintained for submission by **@itsnarutouzumaki**

## Provenance

The prompts below are reconstructed and recommended coding-agent prompts. They are organized from repository evidence, `.ai-workflow/` role files, `AGENTS.md`, `README.md`, `PROMPT_SEQUENCE.md`, and the implemented contracts. They are not exact historical transcripts. They describe realistic instructions that fit the work and its acceptance criteria.

## Phase A Discovery

### 01 Repository Audit

**Purpose:** Establish the stack, scope, files, and constraints before implementation.

**Prompt:**

```text
Audit this repository before changing code. Identify the React/Vite/Tailwind entry points, component tree, local data and asset sources, existing hooks, build/lint commands, and documentation-only constraints. Confirm that the target is a desktop-only Listing Page, Photo Tour, and Lightbox. Do not modify files during the audit.
```

**Expected output:** A short repository map, implementation boundaries, risks, and validation commands.

**Acceptance criteria:** The audit identifies React/Vite/JavaScript/Tailwind, local assets, the three configured roles, `AGENTS.md`, and the absence of an automated test runner.

### 02 Reference Behavior Breakdown

**Purpose:** Convert observable reference behavior into testable requirements.

**Prompt:**

```text
Break down the rendered reference into observable requirements. Record desktop geometry, typography, hero photo grid, sticky navigation, listing sections, booking card, Photo Tour, Lightbox, Save, Share, Reserve, review expansion, map controls, URL transitions, Escape behavior, browser history, and keyboard boundaries. Describe behavior without copying source code or hotlinking assets.
```

**Expected output:** A behavior inventory separated into visual, interaction, URL, accessibility, and known-gap requirements.

**Acceptance criteria:** Requirements are observable and implementable; no claim depends on access to the reference source code.

### 03 Component Mapping

**Purpose:** Assign responsibilities to the existing component and hook structure.

**Prompt:**

```text
Map the behavior inventory to the existing React structure. Keep listing data in `src/data/mockListing.js`; keep cross-component state in `App.jsx`; use `PhotoGrid`, `PhotoTour`, `Lightbox`, `ListingHeader`, `BookingCard`, and `ListingAfterCalendar` for their documented responsibilities; reuse `useFocusTrap`, `useKeyboardNav`, and `useScrollLock`. Identify any parent state or prop contract that is missing before implementation.
```

**Expected output:** A component/state/prop map and a small list of implementation tasks.

**Acceptance criteria:** No unnecessary global store is introduced, and Lightbox selection is explicitly parent-owned.

## Phase B Visual Implementation

### 04 Listing Page Layout

**Purpose:** Build the primary desktop page geometry.

**Prompt:**

```text
Implement the desktop Listing Page from the observed layout using React and Tailwind. Match the hero photo grid, title row, sticky booking card, listing details, amenities, calendar, reviews, map, host section, and footer. Use local data and local images. Preserve semantic sections and the desktop-first constraint; do not add core `sm:`, `md:`, or `lg:` layout breakpoints.
```

**Expected output:** A composed Listing Page with stable desktop geometry and local assets.

**Acceptance criteria:** The page renders without remote image dependencies, keeps content within the intended desktop columns, and exposes semantic interactive elements.

### 05 Header and Navigation

**Purpose:** Reconstruct top-level navigation and listing actions.

**Prompt:**

```text
Implement the header, title row, Share and Save actions, and scroll-aware secondary navigation. Use real buttons and links, provide labels for icon-only controls, preserve the observed spacing and hover states, and keep sticky-nav visibility controlled by the existing `IntersectionObserver` path in `App.jsx`.
```

**Expected output:** Header and secondary navigation integrated with existing page state.

**Acceptance criteria:** Save and Share have visible feedback paths, navigation targets are stable, and no responsive core-layout prefixes are added.

### 06 Gallery

**Purpose:** Build the hero gallery and Photo Tour presentation.

**Prompt:**

```text
Implement the five-image hero grid and the full Photo Tour category grids from local assets. The Photo Tour must expose all 43 flattened photos, preserve category jump links, and support opening a selected image through the parent callback. Do not copy reference markup or hotlink reference image URLs.
```

**Expected output:** A visual gallery with local image resolution and category navigation.

**Acceptance criteria:** The hero trigger opens Photo Tour, category sections are addressable, and the flattened photo contract contains indices 0 through 42.

## Phase C Behavior

### 07 Photo Tour State

**Purpose:** Make the gallery view linkable and controlled by URL state.

**Prompt:**

```text
Implement Photo Tour view state in `App.jsx`. Opening the gallery must set `modal=PHOTO_TOUR_SCROLLABLE`, remove `modalItem`, push browser history, and render Photo Tour in place of the listing tree. Closing must remove the modal parameters and restore focus to the Show all photos trigger.
```

**Expected output:** Parent-owned Photo Tour state with pushState/popstate coordination.

**Acceptance criteria:** The exact URL contract is `modal=PHOTO_TOUR_SCROLLABLE`, browser back/forward rehydrates the view, and Escape/close returns to the listing.

### 08 Lightbox

**Purpose:** Add focused single-photo viewing without duplicating state.

**Prompt:**

```text
Wire Lightbox through the existing parent contract: `isOpen`, `photoIndex`, `onClose`, `onPrev`, and `onNext`. Keep the selected index in the parent. Use the existing `useFocusTrap`, `useKeyboardNav`, and `useScrollLock` hooks. Disable previous at index 0 and next at index 42 rather than wrapping.
```

**Expected output:** A modal single-photo view with keyboard and focus behavior.

**Acceptance criteria:** The dialog exposes `role=dialog`, `aria-modal=true`, an `aria-live` counter, and correct first/last boundary behavior.

### 09 Browser History

**Purpose:** Define URL navigation semantics for gallery and Lightbox states.

**Prompt:**

```text
Implement browser history for Photo Tour and Lightbox. Opening Photo Tour uses `modal=PHOTO_TOUR_SCROLLABLE`; opening a photo additionally uses `modalItem=1000..1042`, where 1000 is the first photo and 1042 is the 43rd. Use `pushState` for entering a view, `replaceState` for Lightbox navigation/close where appropriate, and `popstate` to restore state.
```

**Expected output:** Shareable, back/forward-aware modal state.

**Acceptance criteria:** Invalid or absent `modalItem` values do not produce an out-of-range photo, and all 43 valid values resolve deterministically.

### 10 Save Interaction

**Purpose:** Provide a clear local saved-state interaction.

**Prompt:**

```text
Implement the Save action with local React state only. Toggle the heart between unsaved and saved appearance, update the accessible label, and show a polite toast such as `Saved` or `Removed from saved places`. Do not add persistence or a backend for this static submission.
```

**Expected output:** A reversible Save interaction with state and feedback.

**Acceptance criteria:** The outline/filled state is visually distinct, the button remains keyboard-operable, and feedback is announced.

### 11 Share Interaction

**Purpose:** Make sharing useful without a backend.

**Prompt:**

```text
Implement Share using the current URL and the Clipboard API when available. Show a polite success/fallback message such as `Link copied` or `Link ready to share`; handle rejected or unavailable clipboard access without throwing. Preserve the current modal URL contract when sharing from Photo Tour.
```

**Expected output:** Share feedback with graceful clipboard fallback.

**Acceptance criteria:** The action never silently fails, works from keyboard activation, and does not mutate unrelated modal state.

### 12 Reserve Interaction

**Purpose:** Give the static booking action a clear response.

**Prompt:**

```text
Implement the Reserve button as a local interaction for this frontend-only submission. Keep the booking summary unchanged and show a polite confirmation such as `Reservation ready to book`. Do not invent payment, availability, or backend behavior.
```

**Expected output:** A bounded Reserve interaction with explicit scope.

**Acceptance criteria:** The button gives immediate feedback, is semantic and keyboard-operable, and does not claim to complete a real reservation.

### 13 Review Expansion

**Purpose:** Support readable review and description expansion states.

**Prompt:**

```text
Add or verify local expansion state for the listing description and review cards. Each Show more control must toggle to Show less, preserve surrounding layout, and have an accessible name that reflects the current action. Keep review data in the existing local data model.
```

**Expected output:** Reversible text expansion for description and reviews.

**Acceptance criteria:** Description and individual review expansion are independent, deterministic, and do not require a network request.

### 14 Map

**Purpose:** Provide the observed location section without remote map tiles.

**Prompt:**

```text
Implement the location section using the existing CSS map scene and local state. Include the marker, location label, zoom controls with disabled boundaries, and neighbourhood Show more/Show less behavior. Keep the map usable without a remote map provider or API key.
```

**Expected output:** A self-contained map visual and location content block.

**Acceptance criteria:** Zoom buttons have labels and boundary states, the map does not depend on hotlinked tiles, and the post-map content aligns with the page width.

## Phase D Accessibility

### 15 Accessibility Audit

**Purpose:** Review keyboard and assistive-technology behavior.

**Prompt:**

```text
Audit Listing Page, Photo Tour, and Lightbox for keyboard-only operation. Verify semantic buttons, visible focus, `aria-label` on icon-only controls, `role=dialog`, `aria-modal=true`, polite photo-position announcements, focus trapping, focus restoration, and Escape handling. Check that first/last photo navigation is disabled rather than wrapped.
```

**Expected output:** A checklist of passes, defects, and documented known gaps.

**Acceptance criteria:** No modal can be tabbed behind, focus returns to the trigger, and every non-text control is labelled.

### 16 Motion Audit

**Purpose:** Review transitions against responsible-motion requirements.

**Prompt:**

```text
Audit gallery, hover, sticky-nav, and modal transitions. Confirm whether `prefers-reduced-motion` is implemented in CSS. If it is absent, document it as a known gap and do not claim support. Ensure state changes are also communicated through text, color, or control state rather than motion alone.
```

**Expected output:** Motion inventory with reduced-motion status and remediation notes.

**Acceptance criteria:** The report distinguishes implemented transitions from unsupported reduced-motion behavior.

## Phase E QA

### 17 Visual QA

**Purpose:** Compare the implemented desktop render with the observed reference.

**Prompt:**

```text
Perform visual QA at the desktop target width and inspect the hero grid, header, sticky navigation, listing columns, booking card, Photo Tour category layout, and Lightbox framing. Check image aspect ratios, local asset loading, spacing, typography, and overflow. Record deviations without changing the target to mobile.
```

**Expected output:** A focused visual QA checklist with accepted deviations.

**Acceptance criteria:** No missing local images, no unexpected horizontal overflow at the target desktop viewport, and no core responsive prefixes.

### 18 Integration Review

**Purpose:** Check cross-component state and handoffs.

**Prompt:**

```text
Review the integration from `App.jsx` through PhotoGrid, ListingHeader, BookingCard, PhotoTour, Lightbox, and the shared hooks. Verify parent-owned modal state, URL updates, popstate handling, toast feedback, focus restoration, and cleanup of observers/listeners/timeouts.
```

**Expected output:** A state-flow review with concrete integration findings.

**Acceptance criteria:** No duplicated source of truth exists for the active photo, and closing one overlay does not leave stale URL state.

### 19 Code Review

**Purpose:** Apply the final repository code-quality and scope checks.

**Prompt:**

```text
Review the full `src/` tree for scope creep, unnecessary dependencies, copied reference code, hotlinked assets, duplicated hook logic, unclear component boundaries, and stale documentation. Respect the documentation-only maintenance policy when the task is documentation. Report exact files for any finding.
```

**Expected output:** Findings ordered by risk, with known gaps clearly separated from defects.

**Acceptance criteria:** The review covers state ownership, file structure, dependency discipline, local assets, and the three agent charters.

### 20 Final Submission Audit

**Purpose:** Confirm the repository is ready for handoff.

**Prompt:**

```text
Run the final submission audit. Check that only intended files changed, run `npm run lint` and `npm run build`, and manually verify listing render, Show all photos, Photo Tour close, Escape, browser back, category jumps, sticky navigation, Save, Share, Reserve, Lightbox boundaries, focus restoration, and reduced-motion documentation. Do not claim browser QA unless it was actually performed.
```

**Expected output:** A concise release-readiness record with commands, manual checks, known gaps, and human acceptance decisions.

**Acceptance criteria:** Lint/build results are reported accurately, unresolved issues are documented, and no fake test numbers or unsupported historical claims are added.
