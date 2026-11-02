# MR Living Capital — Cinematic Walkthrough Review

**Review date:** 2026-11-02  
**Source repository:** `mrlivingcapital/mrlivingcapital-website`  
**Reviewed source commit:** `f005eed` — Deploy 2026-10-27

This local review candidate replaces homepage vertical scrolling with a nine-scene horizontal walkthrough. It retains the existing static routes, SEO files, forms, imagery, Decision Lab, and Motion Lab. It is not a published release.

## Run locally

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run lint
npm run build
npm run preview
```

The production output is generated in `dist/`. Existing static documents and deployment files are copied into that output, including `CNAME`, `robots.txt`, `sitemap.xml`, and `llms.txt`.

## Walkthrough experience

- Original thirteen-structure Three.js skyline: one taller signature tower and twelve architecturally distinct companions, including terraced, blade-like, and lower background forms on both sides of the core five. The signature tower now has a complete stepped octagonal crown, illuminated lantern, and integrated spire. Three companions include side-mounted helipads with structural braces, connecting decks, perimeter lights, safety rings, and H markings. Closed roof caps, finished crowns, façade fins, diagonal bracing, sky decks, terraces, podiums, and entrance canopies retain the language of completed buildings. No real-world landmark model is used. Secondary structures use lighter geometry, and repeated fins/decks are merged to reduce rendering work.
- Geometry-following façade light rails with alternating upward/downward shader trails and instanced travelling light heads. Illumination remains restrained. Responsive skyline offsets and scaling protect the introduction copy: a right-weighted desktop composition, compact landscape-tablet framing, and lower phone/tablet-portrait compositions keep the cluster clear of the text.
- Reactive digital veil retained as a shared GPU particle field, increased to 10,609 points (approximately 20% denser) for a more visible net effect across every scene.
- Full-screen horizontal navigation by wheel, trackpad, touch swipe, keyboard, scene menu, progress controls, and deep links. Scene changes create browser-history entries, so Back/Forward restores the corresponding scene. Legacy `#market`, `#contact`, and `#corridor-brief` links resolve to mapped scenes. Flashing previous/next controls were replaced by smooth scene transitions and an animated scroll/swipe cue.
- Five circular Intelligence Layer nodes surround a central MR LIVING CAPITAL / INTELLIGENCE command center. Connected orbital and inward-feeding lines lead into five distinct animated charts: transaction evidence, infrastructure networks, district demand, capital risk, and property intelligence. Every node supports direct selection and Arrow/Home/End keyboard control. The charts are explicitly labelled illustrative live-style signals, not live market data.
- Dark globe with bundled Natural Earth country geometry and light-green borders; no runtime CDN or border-data request is required.
- One consolidated Let’s Talk scene combines four direct conversation paths with four common-question accordions. Every conversation row leads directly to inquiry; the inherited `#faq` deep link resolves to the combined scene.
- Founder portrait uses a responsive high-quality WebP picture without a softening CSS filter. Larger screens retain the full 2048 × 2048 chess composition (485,748 bytes); phones receive a dedicated 920 × 1495 portrait-focused crop (217,380 bytes) at approximately 140–190 pixels wide, with the head anchored safely inside the mask. The original JPEG remains as fallback.
- Small typography has been enlarged selectively across Investor Intelligence, the five Intelligence Layer plates, Market Intelligence, Corridors, the consolidated conversation/FAQ, and the inquiry form. Compact spacing preserves single-view composition at the verified viewports; FAQ answers begin collapsed and remain available on demand.
- Decision Lab sits directly above the shared digital veil, with solid fills retained only on the Inputs, Results, live-report, and formula boxes. Panels size to their content rather than stretching into empty space. A live project evaluation/investor-thesis message appears beneath Inputs. Scenario formulas, calculations, reset, and focused Assumptions/Results/Sensitivity mobile views are preserved.
- Living Map and Government Strategy/Facts are not mounted in the homepage walkthrough. XAI copy identifies the system as in development rather than a live proprietary capability.
- Reduced-motion behaviour, inactive-scene `inert` handling, menu focus trapping/restoration, native overflow boundary handling, and a lightweight non-WebGL fallback.

Keyboard controls: Arrow Left/Right and Page Up/Down navigate; Home returns to the opening; End opens the inquiry scene. All audited scenes and calculator panels fit without internal scrolling at the verified viewports; native overflow handling remains available for unforeseen content or viewport constraints.

## Preserved routes

The review retains the existing static route structure, including:

- `/blog/` — eleven linked HTML research reports, including the previously orphaned H1 2026 brief.
- `/farsi/` and `/fa/`
- `/corridors/`
- `/deals/`
- `/london/`
- `/toronto/`
- `/off-plan/`
- `/warroom/`

## Verification completed

On 2026-11-02, this revised review candidate passed:

- ESLint, TypeScript, and clean production-build checks. Production desktop and phone renders were inspected directly with zero console errors.
- Seventy-two settled production scene/device checks at 360 × 800, 390 × 844, 768 × 1024, 820 × 1180, 1024 × 768, 1366 × 768, 1440 × 1000, and 2788 × 1542. Final failures: zero; runtime errors: zero; failed local assets: zero.
- Ten focused production interaction/content checks covering global Home/End, wheel navigation, the opening CTA, five command-center nodes/charts, node keyboard selection without accidental scene navigation, exact live-report copy, and compact menu/Escape/focus restoration. The earlier 27-check revision suite and 24-check full regression baseline also passed for the preserved interface.
- Direct visual inspection of the revised opening at wide desktop, standard desktop, laptop, tablet portrait/landscape, and phone sizes: the headline remains clear of the towers, the complete crown is readable, and all three helipads are visible. The founder portrait, five-circle command center, and compact Decision Lab were retained.
- Reduced-motion comparison with mean absolute RGB delta **0.0** and **0** changed pixels above threshold 12. Reduced-motion veil opacity and tower rotation now snap to their final states rather than easing once per frame. Normal-mode comparison confirmed visible animation remains active.
- Simulated WebGL failure: architectural fallback active, zero architectural WebGL canvases, readable opening, and the independent 2D globe retained.
- Static audit of 29 HTML pages and 26 root-relative/document-relative HTML, `srcset`, and CSS asset references in the current production output, with zero missing references. Required globe data, CNAME, favicon assets, and responsive portraits were verified; source and production WebP hashes match.
- Navigation/report revision: twelve final browser checks passed for history entries, Back/Forward, direct corridor-file opening and return, eleven linked HTML reports, and homepage return. A separate production audit covered 79 internal link instances, 25 unique internal targets, and 18 unique external targets with zero missing local destinations or assets.
- Aliases, internal document routes, email/WhatsApp targets, and four `#register` forms were checked. The active inquiry plus Deals, London, Toronto, and Farsi forms passed intercepted HTTP 200/500 behavior checks; failed static-form requests no longer show false success. No real form submission was made.
- Seven legacy PDF paths remain unprovisioned because no original PDF files exist in the supplied project or uploads. They are inventory items for the website work stream, not working downloads.

## Data and calculation boundaries

- The thirteen-structure skyline, travelling façade lights, analytical diagrams, and interface motion are original design demonstrations, not live market feeds.
- No proprietary AI, automated valuation, live transaction feed, or investment recommendation engine is claimed.
- Decision Lab results are illustrative scenarios calculated locally from user-entered assumptions. They exclude taxes, financing fees beyond the stated acquisition assumption, vacancy changes, exit transaction costs, and other real-world effects unless explicitly modelled. They are educational, not financial advice.
- Inherited editorial market figures remain labelled for independent live-source re-verification before publication.
- Existing Formspree forms remain in source. No inquiry or other external form submission was made during testing.
- Google Analytics loads only on `mrlivingcapital.com` and `www.mrlivingcapital.com`; local review traffic is not sent to GA.

## Approval and known limitations

- No GitHub write, deployment, or publishing action has been performed for this review.
- Publishing remains a separate manual action after explicit approval.
- Configure real HTTP security headers at the host, including an appropriate `Content-Security-Policy` with `frame-ancestors` and `X-Frame-Options` or equivalent framing protection. Meta tags are not substitutes for response headers.
- The shared Three.js production chunk exceeds Vite’s 500 kB warning threshold. The build succeeds; further chunk optimisation is optional performance work.
- Development tooling reports moderate advisories. The suggested forced breaking fix was not applied.
- WebGL quality and frame rate vary by device and GPU. Essential content remains available without the 3D renderer.
- The headless software-rendered test browser reported only 2–3 animation frames per second under the expanded skyline; this is not a representative hardware-GPU benchmark, but it means real iOS/Android and desktop-GPU frame-rate validation remains a launch-day requirement. Secondary-structure level of detail and merged façade geometry have been applied without changing the approved visual language.
- Representative viewports were tested, not every possible device or browser. Final physical-device checks should include current iPhone Safari, Android Chrome, iPad Safari, and the deployment work stream’s desktop browser.
