# Final Combined Experience Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. Subagents are forbidden. Steps use checkbox syntax.

**Goal:** Deliver one local final website demo combining Phase 1 with Phase 2 connected journeys/publishing and Phase 3 selective continuity.

**Architecture:** Add a small typed journey/inquiry layer to the existing React walkthrough and a framework-free shared reading layer to existing static research documents. Keep enhancements progressive and ordinary visits free of diagnostics.

**Tech Stack:** React 19, TypeScript, browser sessionStorage/fetch APIs, existing static HTML/CSS, Playwright WebKit.

## Global Constraints

- Preserve nine scenes, copy, routes, corridor reports, design DNA, and Phase 1 behavior.
- No personal data in web storage, automatic submissions, automatic PDF downloads, commit, push, or deployment.
- Final review UI requires `?final-demo=1`; ordinary visitors never see diagnostics.

### Task 1: Non-personal journey context and inquiry consolidation

**Files:** Create `src/lib/journey.ts`, `src/lib/inquiry.ts`, `tests/final-journey.spec.ts`; modify `Slides.tsx`, `DecisionLab.tsx`, `Walkthrough.css`.

- [ ] Write failing browser tests for corridor selection, lab summary, removal, and a mocked inquiry payload.
- [ ] Implement guarded session storage with typed corridor/lab context and no personal fields.
- [ ] Move the existing Formspree request into `submitInquiry`, add validation, payload limits, and honeypot rejection.
- [ ] Render removable inquiry context summaries and verify success/error states without a real request.

### Task 2: Shared research-reading experience

**Files:** Create `public/research/reading-experience.js`, `public/research/reading-experience.css`; modify ten `public/blog/*.html` articles and three `public/corridors/*/index.html`; create `tests/final-research.spec.ts`.

- [ ] Write failing assertions for reading progress, estimated time, generated section navigation, print action, and related links.
- [ ] Implement progressive enhancement using existing `h2[id]` or assigned stable IDs, `requestAnimationFrame`, and accessible controls.
- [ ] Add print/mobile/reduced-motion styles and include the two shared assets on exactly thirteen long-form documents.
- [ ] Verify every enhanced document and all original links/PDFs.

### Task 3: Intent delivery and final review mode

**Files:** Create `src/lib/intent.ts`; modify `Slides.tsx`, `PhaseOneDemo.tsx`, `PhaseOneDemo.css`; create `tests/final-delivery.spec.ts`.

- [ ] Write failing assertions proving no corridor request occurs before hover/focus and no PDF is prefetched.
- [ ] Add a one-per-URL HTML-only intent prefetch with `fetch(..., { credentials: 'same-origin' })`, guarded for Save-Data and reduced connectivity.
- [ ] Extend query-only review mode to list the Phase 2/3 enhancements while remaining absent ordinarily.
- [ ] Run all focused tests, lint/build, 331 navigation checks, static links, mobile WebKit, visual and security reviews.
- [ ] Stop temporary servers and present the combined local preview for approval; do not deploy.
