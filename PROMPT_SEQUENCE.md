# AI-Assisted Development Prompt Sequence Log

### Prompt 1 — Project Initialization

> Act as my project initialization assistant. Help me set up a React + Vite project with Tailwind CSS, including custom design tokens inspired by the Airbnb visual language: coral/rausch primary tones, neutral grays, rounded corners, and soft shadows.

### Prompt 2 — Listing Data Modeling

> Create a structured JSON/JS object containing the title, host details, amenities, property information, and image arrays for the **"Luxury 3 BHK Villa, Maniville @ Assagao"** listing. Keep the data decoupled from UI components so the interface can consume a centralized local data source.
>
> Use the reference page for visual/content inspection and prepare the required data and assets in `src/data/mockListing.js`.

**Result:** `src/data/mockListing.js` was generated and populated with the required listing data and local assets.

### Prompt 3 — Listing Page Implementation

> Using the persona and rules defined in `agent-layout-expert.md`, build the Listing Page for the Airbnb clone.
>
> **Reference UI:** https://airbnb-clone-umber-two.vercel.app/
>
> **Data Source:** `src/data/mockListing.js`
>
> Focus only on the Listing Page in this phase. Do not implement PhotoTour or Lightbox yet; those will be handled separately as focused interaction and accessibility tasks.

### Prompt 4 — Pixel-Accurate UI Implementation

> You are an expert frontend engineer specializing in high-fidelity web interface recreation.
>
> **Task:** Reproduce the reference page as accurately as possible in terms of layout, typography, spacing, visual hierarchy, interactions, and desktop presentation.
>
> **Reference:** https://airbnb-clone-umber-two.vercel.app/
>
> **Requirements:**
>
> 1. Match the desktop layout, spacing, typography, visual hierarchy, and component states closely to the reference.
> 2. Reproduce all visible sections and relevant micro-interactions.
> 3. Use assets and content from the local `src/data/mockListing.js` source wherever available.
> 4. Do not use unnecessary external placeholders when local assets exist.
> 5. Preserve accessible focus states, hover states, and keyboard interactions.
> 6. Validate the rendered implementation against the reference before considering the phase complete.

### Prompt 5 — PhotoTour and Lightbox

> Using the rules defined in `agent-a11y-motion-reviewer.md`, implement the PhotoTour and Lightbox for the listing gallery.
>
> Requirements:
>
> - Open the PhotoTour from the listing gallery.
> - Open the Lightbox from gallery images.
> - Support previous/next navigation.
> - Support `←` and `→` keyboard navigation.
> - Support `Esc` to close.
> - Implement appropriate focus management/focus trapping.
> - Prevent inappropriate background scrolling while overlays are active.
> - Respect `prefers-reduced-motion`.
> - Announce the current slide position to screen readers.
> - Match the reference transitions and interaction behavior as closely as possible.
>
> Verify the implementation through actual browser interaction before completing the task.

### Prompt 6 — Responsive Behavior & Layout Validation

> Review the implemented Airbnb clone for responsive behavior across desktop and intermediate viewport sizes.
>
> **Task:**
> Validate that the existing layout adapts correctly without breaking the reference design.
>
> **Requirements:**
>
> - Preserve the reference desktop layout as the primary target.
> - Test common viewport widths such as **1440px, 1280px, 1024px, and 768px**.
> - Adjust only responsive CSS/layout rules where necessary.
> - Prevent horizontal overflow, content clipping, and unexpected layout shifts.
> - Ensure images maintain correct aspect ratios and cropping.
> - Ensure navigation, gallery, listing content, and booking sections remain correctly aligned.
> - Verify PhotoTour and Lightbox remain usable at smaller desktop/tablet widths.
> - Verify keyboard navigation, focus states, and modal behavior remain intact.
> - Check for breakpoint-specific issues using browser inspection and screenshots.
> - Do not redesign the UI for mobile; the assignment is desktop-focused.
>
> **Verification:** Test each target viewport in the browser, inspect screenshots, fix responsive issues, and re-test before marking the phase complete.
