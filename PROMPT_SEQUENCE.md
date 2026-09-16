# AI-Assisted Development Prompt Sequence Log

**Prompt**: "ct as my project initialization assistant. Help me set up a React Vite project with Tailwind CSS configured with custom brand colors matching Airbnb's style guide (coral/rausch primary, neutral grays, rounded corners, soft shadows)
 

**Prompt**: "Create a structured JSON/JS object containing the title, host details, amenities, and image arrays for the 'Luxury 3 BHK Villa, Maniville @ Assagao' listing to decouple data from UI components. scrap data from https://airbnb-clone-umber-two.vercel.app/"
   - **Result**: `src/data/mockListing.js` generated and populated with exact reference assets.

**Prompt** : "Using the persona and rules defined in agent-layout-expert.md, build the 
Listing Page for our Airbnb clone.

Reference UI: https://airbnb-clone-umber-two.vercel.app/
Data Source: Frontend\src\data\mockListing.js
 
Do not build PhotoTour or Lightbox yet — those come next as a separate, 
focused task against agent-a11y-motion-reviewer.md."


**Prompt** : "You are an expert frontend engineer specializing in pixel-perfect web application cloning. 

### Task:
Replicate and build an **exact pixel-for-pixel clone** of the UI, layout, typography, spacing, and DOM structure present at:
**https://airbnb-clone-umber-two.vercel.app/**

### Strict Constraints & Guidelines:

1. **Exact UI & Layout Replication:**
   - Fetch, analyze, and mirror the exact layout, CSS styles, positioning, and visual hierarchy directly from `https://airbnb-clone-umber-two.vercel.app/`. Do not omit, simplify, or modify any UI sections or micro-interactions.
   - Achieve 1:1 pixel accuracy on desktop viewport.

3. **Data & Local Assets:**
   - Source all assets (images, icons, media) and content data (titles, descriptions) directly from the local directory: `/src/data/mockListing.js`. Do not use external network placeholders if the corresponding local asset is available.

4. **Quality & Accessibility:**
   - Ensure interactive elements support focus states, hover effects, and keyboard navigation following WCAG 2.2 AA standards as specified in the design system skill file.

Inspect the target URL and begin generating the code to match its exact DOM tree, styling, and asset references."

**Prompt** : "Using agent-a11y-motion-reviewer.md, build the PhotoTour lightbox for the listing gallery: keyboard-navigable (arrow keys, Esc to close, focus trap), respects prefers-reduced-motion for slide transitions, and announces slide position to screen readers"