# Final Combined Experience Design

**Status:** Approved for local demonstration by Masoud's explicit “go”; no deployment approval.

## Protected baseline

Keep all nine scenes, their copy, geometry, navigation, corridor content, Phase 1 rendering/accessibility work, and the public experience free of diagnostics. No additional scene, template, animation burden, or automatic form submission.

## Phase 2 — connected journeys and publishing

- Remember only non-personal corridor and Decision Lab context in session storage. Selecting a corridor updates the inquiry context; Decision Lab assumptions produce an editable inquiry summary.
- Show carried context inside the inquiry as removable, accessible summaries. Never populate name, email, telephone, or other personal data.
- Consolidate the walkthrough inquiry request into one typed module with validation, a honeypot, payload limits, explicit submit action, and existing Formspree destination.
- Add a shared research-reading layer to the ten existing articles and three corridor briefs: top progress line, estimated reading time, generated section navigation, print control, and related research/corridor links. Do not rewrite editorial content.
- Prefetch corridor pages only on pointer/focus intent and never prefetch PDFs automatically.

## Phase 3 — selective continuity

- Restore non-personal corridor and lab context during the same browser session and provide clear removal controls.
- Preserve a lightweight reading return link through browser history; no modal, resume banner, or new viewer control box.
- Add print-specific output and keyboard/reduced-motion support to the shared research layer.
- Keep `?final-demo=1` diagnostics query-only and collapsible; ordinary visitors see only useful journey enhancements.

## Failure behavior

Storage, prefetch, and enhancement failures leave baseline navigation usable. Unsupported browser APIs disable enhancements quietly. Inquiry failure keeps entered values and offers the existing email/WhatsApp alternatives.

## Verification

Automated tests cover context carry-over/removal, no personal data in storage, consolidated request payload without real submission, all research enhancements, keyboard controls, and intent-only prefetch. Repeat Phase 1 tests, 331-check navigation audit, static links, build/lint, WebKit mobile, security/dependency review, and desktop/mobile visual review. No commit, push, deployment, or external form submission.
