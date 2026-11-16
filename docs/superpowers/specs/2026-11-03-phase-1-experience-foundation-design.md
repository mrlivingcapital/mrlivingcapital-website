# Phase 1 Experience Foundation Design

**Status:** Approved for a local demonstration only. Deployment requires a separate explicit approval after demonstration, QC, and audit.

## Goal

Improve adaptive rendering, mobile perceptibility, motion control, asset delivery, and measurement while preserving the approved nine-section design, copy, routes, content, and desktop composition.

## Baseline protection

The current local site, including the iPhone Bloom and tower-motion correction, is the comparison baseline. Phase 1 changes must be independently reviewable and reversible. No generic design template, framework migration, extra section, scroll-jacking, smooth-touch scrolling, or automatic audio is permitted.

## Experience and rendering

Use the installed React Three Fiber and Drei stack. Add a `PerformanceMonitor` that adjusts canvas DPR within 1.0–1.5 in rounded increments. Record FPS, DPR, and adaptive quality in the existing scene-metrics interface. Pause continuous rendering when the document is hidden, when the visitor pauses motion, when reduced motion is requested, or in capture mode; retain on-demand rendering for state changes.

Add a scene-menu motion control with Pause/Resume labels and a persistent local preference. Reduced-motion remains authoritative and cannot be overridden. CSS decorative loops and transitions must pause through a root data attribute without hiding content. Keep the approved mobile Bloom values and gentle tower rotation.

## Motion refinement

Define shared CSS motion tokens for micro, interface, reveal, and scene durations and easing. Apply them to existing navigation, buttons, cards, menus, progress controls, and reveals without changing geometry or timing locks. Add subtle pressed-state feedback only on devices that support hover and fine pointers. Keep touch scrolling native.

## Delivery and measurement

Self-host the existing Space Grotesk, Inter, and Cormorant Garamond font files, preserving families, weights, styles, and `font-display: swap`. Remove Google Fonts connections from the primary HTML and narrow its CSP font/style allowances accordingly. Do not alter report content or compress corridor PDFs in this phase.

Add deferred `web-vitals` reporting for LCP, INP, and CLS. Local/demo mode keeps metrics in a read-only diagnostic interface and sends nothing. Production may send metric name, value, rating, and path to the existing GA4 property; it must never send form values, names, email addresses, phone numbers, or inquiry text.

## Demonstration mode

`?phase1-demo=1` opens a compact diagnostic panel unavailable in ordinary visits. It shows the Phase 1 feature checklist, live FPS/DPR/quality, motion state, font-hosting state, and latest Web Vitals. It provides links to all nine sections and a motion pause/resume control. It does not appear in normal production use and does not alter the underlying scene.

## Error handling

If WebGL is unavailable, retain the existing lightweight fallback. If font files fail, use the existing system-family fallbacks. If metrics are unsupported or analytics is blocked, keep the site fully functional and expose only locally available diagnostic values. A storage failure must not prevent the motion control from working for the current session.

## Verification and release gate

Test mobile WebKit visible motion, reduced motion, pause/resume, background-tab rendering, adaptive metrics, local font responses, all nine sections, keyboard and touch navigation, all links, lint, TypeScript, production build, CSP, and runtime console. Run the existing 331-check navigation audit and static-link audit. No real inquiry submission, analytics validation with personal data, commit, push, or deployment is included in the demo.

Present the local demo for approval. After approval, repeat full QC and security audit, request deployment approval, publish, verify live behavior, and only then begin Phase 2.
