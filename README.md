# Vacation Rental Marketplace — Desktop UI Clone & System Architecture

A pixel-perfect, desktop-optimized clone of the target Airbnb listing page, accompanied by a production-scale distributed architecture blueprint. Built using an AI-native workflow with custom agent skills for rapid iteration, behavioral fidelity, and strict accessibility standards.

---

## 🛠️ Tech Stack & Key Choices

* **Frontend Framework:** React (Vite)
* **Styling:** Tailwind CSS (Custom brand tokens matching reference typography, spacing, and `#FF385C` accents)
* **Icons & Assets:** Lucide React / Localized assets in `src/data/mockListing.js`
* **State & Local Storage:** React State / Context API for seamless Photo Tour & Lightbox modal transitions
* **Architecture Diagram:** Excalidraw (Exported to `Architecture-diagram.jpg`)

---

## 🎯 Scope & Feature Parity

Per the submission guidelines, this implementation focuses strictly on the **Desktop Viewport (1440px+)**.

### 1. Core Listing Page
* **Visual Parity:** Identical hero grid, sticky reservation card, host section, amenities list, and review cards.
* **Sticky Navigation & Header:** Interactive scroll-aware search header and sticky price widget on right column.
* **Animations:** Matching hover zoom effects, soft shadow overlays, and state transitions.

### 2. Photo Tour Overlay View
* **Modal Trigger:** Opens seamlessly from "Show all photos" or clicking any image in the main hero grid.
* **Full-Screen Gallery:** Scrollable full-width image grid matching target layout.

### 3. Lightbox Overlay View
* **Single-Photo Viewer:** Opens directly upon selecting any image inside the Photo Tour or Hero grid.
* **Keyboard Navigation:** Native Arrow Left (`←`) and Arrow Right (`→`) key handlers for image navigation, and `Escape` key handler to dismiss overlays.
* **Focus Management:** Traps focus inside the modal and restores focus to the triggering element upon close (WCAG 2.2 AA compliant).

---

## 🤖 Modern AI Workflow & Sub-Agent Architecture

This project was built using an **AI-native engineering approach** using sub-agents and custom skill configurations to maintain strict code quality, accessibility, and visual fidelity.

### Sub-Agent Configurations Included in Submission:
* `.cursor/skills/agent-layout-expert.md`: Specialized in visual hierarchy, Tailwind spacing tokens, and DOM parity.
* `.cursor/skills/agent-a11y-motion-reviewer.md`: Specialized in keyboard focus traps, ARIA attributes, and smooth micro-interactions.

### AI Prompt Log:
All prompt sequences used during development are documented in **`prompts.md`**.

---

## 🏗️ Production Architecture Blueprint

Alongside the frontend clone, an enterprise-grade system architecture was designed for scaling this marketplace to millions of active listings and high-concurrency booking events.

### Core Architectural Highlights (See `Architecture-diagram.jpg`):

1. **Decoupled Data Layer & DB Isolation:**
   * Microservices (`Booking`, `Listings`, `User/Auth`) utilize isolated primary databases with dedicated read-replicas to prevent connection bottlenecks.

2. **Async Search Indexing via CDC & Event Bus:**
   * To prevent write blocking when hosts update listing details or availability, row-level database changes are captured using **Change Data Capture (CDC / Debezium)**.
   * Changes are streamed into an **Apache Kafka Event Bus**, where a dedicated **Search Indexer worker** updates the **Search Cluster (Elasticsearch)** asynchronously for low-latency geo-spatial queries.

3. **Concurrency Control for Bookings:**
   * **Redis Cache (ElastiCache)** handles session state, hot listing caches, and distributed soft-locks (`Redlock`) during checkout to guarantee **zero double-bookings** under high concurrency.

4. **CI/CD & Artifact Management:**
   * Automated pipelines build Docker artifacts pushed to **AWS ECR**, which CD workers pull to update production compute containers zero-downtime. Edge assets are pushed directly to the **CDN / S3**.

---

## 📂 Project Submission Package Structure

```text
├── src/                          # Frontend application codebase
│   ├── components/               # Listing, PhotoTour, Lightbox modules
│   └── data/mockListing.js       # Decoupled mock data & assets
├── .cursor/skills/               # Custom AI sub-agent skill config files
│   ├── agent-layout-expert.md
│   └── agent-a11y-motion-reviewer.md
├── Architecture-diagram.jpg      # Scalable Production System Architecture
├── Architecture-diagram.excalidraw # Editable Excalidraw canvas file
├── prompts.md                    # Complete AI prompt sequence log
└── README.md                     # Documentation & setup guide