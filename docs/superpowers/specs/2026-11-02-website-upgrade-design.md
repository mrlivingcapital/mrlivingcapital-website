# MR Living Capital Website Upgrade Design

**Date:** 2026-11-02  
**Status:** Approved design direction; implementation planning pending  
**Repository:** `mrlivingcapital/mrlivingcapital-website`  
**Baseline:** `main` at `f005eed796968403a36cb71df8675c618cbdd7b4`  
**Handover:** `MR-Living-Capital-website-2026-11-02.zip`  
**Working branch:** `upgrade/2026-11-foundation`

## 1. Purpose and success criteria

Upgrade the existing website without discarding the supplied design work or replacing the repository in one opaque change. The result should balance brand storytelling with qualified lead generation while preserving the nine-scene cinematic walkthrough as the signature experience.

The upgrade is successful when:

- The handover baseline builds and behaves in the GitHub working branch as documented.
- The walkthrough has clearer hierarchy, navigation, calls to action, mobile behaviour, and accessibility.
- Components, design tokens, and content boundaries are easier to maintain than the baseline.
- Forms report delivery outcomes honestly and use shared, typed submission logic.
- Existing routes, SEO files, Decision Lab calculations, and deployment behaviour remain intact unless explicitly changed.
- Production assets are loaded more deliberately, with reduced-motion and non-WebGL experiences retained.
- Every change is reviewable, independently verifiable, and reversible.

## 2. Scope and non-goals

### In scope

- Import and verify the supplied November 2 handover as the upgrade baseline.
- Preserve and evolve the React, TypeScript, Vite, and Three.js architecture.
- Introduce shared design tokens and focused scene/component boundaries.
- Upgrade walkthrough UI/UX scene by scene.
- Improve performance, loading, accessibility, and fallback behaviour.
- Centralise form handling, validation, submission states, and analytics events.
- Separate content from presentation so a CMS can be introduced without another frontend rewrite.
- Preserve and audit static routes, research pages, metadata, sitemap, CNAME, and robots files.

### Not in the first release

- Investor accounts, authentication, or personalised dashboards.
- Live market-data ingestion or claims of live/proprietary investment intelligence.
- A framework migration without a separately demonstrated requirement.
- A custom API, database, or CMS provider before its workflow and hosting are approved.
- Fabricated replacements for missing reports or market figures.
- Deployment, DNS changes, production form submissions, or publication without separate approval.

## 3. Baseline and repository strategy

The handover identifies `f005eed` as its reviewed source commit, and GitHub `main` remains at that commit. The handover can therefore be applied without overriding newer work on `main`.

1. Create and retain all upgrade work on `upgrade/2026-11-foundation`.
2. Import the handover `source/` contents as a distinct baseline change, excluding local credentials, `node_modules`, generated caches, and unrelated handover artifacts.
3. Verify the imported baseline before making design changes.
4. Keep subsequent changes small and grouped by concern.
5. Use pull requests for repository review; never push an unreviewed wholesale replacement to `main`.
6. Keep production deployment as a separate, explicitly approved operation.

## 4. Frontend architecture

### 4.1 Design foundation

Create a shared token layer for:

- Colour roles and contrast-safe surface/foreground combinations.
- Heading, body, navigation, caption, and data typography.
- Spacing, container widths, radii, borders, and elevation.
- Scene transitions, interaction motion, and reduced-motion alternatives.
- Shared breakpoints and responsive layout constraints.

Tokens should express semantic roles rather than duplicate isolated hex values throughout components. Existing brand colours and visual language may be refined, but the approved cinematic identity remains.

### 4.2 Component boundaries

Refactor the walkthrough into focused units with clear responsibilities:

- **Walkthrough controller:** active scene, deep links, browser history, input navigation, and scene accessibility.
- **Scene navigation:** menu, progress, previous/next controls, and direct calls to action.
- **Scene components:** content and interactions unique to each of the nine scenes.
- **Visual layers:** skyline, digital veil, charts, globe, and other decorative or illustrative systems.
- **Shared UI:** buttons, form fields, dialogs/drawers, accordions, cards, and status messages.
- **Content models:** typed scene copy, research links, corridor data, FAQs, and contact destinations.
- **Utilities:** motion preferences, analytics events, form submission, and reusable calculations.

Large files should be divided only where doing so clarifies ownership or enables reuse. Existing working calculations and navigation behaviour must be preserved through regression checks.

### 4.3 UX behaviour

The primary visitor journey is:

**Understand the thesis → explore intelligence and research → start a private conversation.**

The redesign should:

- Preserve the nine-scene narrative rather than replace it with an unrelated layout.
- Make scene purpose, position, and next actions clear.
- Strengthen readable copy hierarchy and consistent CTA placement.
- Retain wheel, touch, keyboard, menu, deep-link, and Back/Forward navigation.
- Avoid motion competing with reading or form completion.
- Keep essential content usable with reduced motion or unavailable WebGL.
- Remove dead demo code and duplicated dormant implementations only after dependency and route checks.

## 5. Content and lead architecture

### 5.1 Content flow

Initially, content remains local and typed. Presentation components consume content models rather than embedding repeated research, corridor, FAQ, and contact data throughout JSX. This creates a stable boundary for a future CMS.

A future CMS, if approved, should populate the same content models at build time or through a deliberately cached read path. The frontend must retain a usable fallback and must not require a CMS request to render critical homepage copy.

### 5.2 Lead capture flow

All active forms use one shared submission path:

1. Validate required fields and formats with typed schemas.
2. Enter a visible pending state and prevent duplicate submission.
3. Submit only the required lead fields and source metadata to the configured provider.
4. Inspect the actual response before showing success.
5. Show a specific, accessible error state on failure, with retry and direct email/WhatsApp alternatives.
6. Record analytics only for genuine interaction events, never for form contents.

Existing Formspree delivery remains the initial provider. Provider keys or private configuration must not be embedded in source. Spam protection should use the provider's supported controls and non-invasive form techniques; a custom server-side rate limiter is not assumed on static hosting.

### 5.3 Analytics

Analytics should measure meaningful journey events such as scene navigation, research selection, CTA use, and confirmed form outcome. Events must exclude names, contact details, messages, and other lead payloads. Existing hostname restrictions and privacy behaviour must be preserved or strengthened.

## 6. Reliability, security, and recovery

- Add error boundaries around advanced visual experiences so decorative failures do not remove core content.
- Preserve the lightweight non-WebGL fallback and reduced-motion behaviour.
- Do not show false success for failed form submissions.
- Keep secrets, local environment files, browser profiles, caches, and credentials out of Git.
- Preserve CNAME, canonical metadata, robots, sitemap, nested routes, and rollback assets.
- Treat the seven inventoried legacy PDFs as missing until their original files are recovered and verified.
- Do not generate substitute reports merely to satisfy old filenames.
- Review host-level security headers separately during deployment; HTML meta tags are not substitutes for HTTP headers.

## 7. Performance approach

- Measure before optimisation and retain baseline production-build information.
- Split advanced visual code from essential content where practical.
- Reduce unnecessary active animation work for hidden or inactive scenes.
- Use adaptive visual complexity for constrained devices without changing essential content.
- Optimise responsive image selection and loading priority.
- Review large chunks and dependency advisories without forced breaking upgrades.
- Validate performance on physical devices before calling GPU/frame-rate work complete.

## 8. Verification strategy

Every implementation step must run the checks relevant to its changes. The final release candidate requires:

1. **Static checks:** ESLint, TypeScript, production build, and whitespace/diff validation.
2. **Unit checks:** shared form state/validation, content transformations, and preserved Decision Lab calculations.
3. **Interaction checks:** all scene navigation methods, deep links, browser history, menus, CTAs, accordions, layer selection, and calculator controls.
4. **Form checks:** mocked success, provider failure, network failure, duplicate-submit prevention, retry, and no lead payload in analytics. Real submissions require separate approval.
5. **Responsive checks:** representative phone, tablet, laptop, desktop, and wide-desktop viewports.
6. **Accessibility checks:** keyboard operation, focus management, semantic labels, contrast, inactive-scene isolation, reduced motion, and readable fallbacks.
7. **Route/asset checks:** internal destinations, images, scripts, styles, static reports, SEO files, and explicit reporting of missing PDFs.
8. **Performance checks:** bundle comparison, runtime errors, asset failures, and physical-device rendering/frame-rate review.
9. **Review evidence:** concise results attached to each commit or pull request, with unresolved limitations stated plainly.

## 9. Implementation sequence

### Step 0 — Handover baseline

Import the supplied source, install from the lockfile, run static checks, build, and smoke-test the unchanged walkthrough and routes.

### Step 1 — Foundation

Introduce semantic tokens, shared utilities, content models, and component boundaries. Remove verified dead demo code without altering the approved visual language.

### Step 2 — Walkthrough UI/UX

Upgrade scenes incrementally. After each scene group, verify navigation, responsive layout, accessibility, and visual fallbacks.

### Step 3 — Performance and resilience

Apply measured bundle, animation, image, and loading improvements. Add visual error containment and validate reduced-motion/non-WebGL behaviour.

### Step 4 — Lead and content backend boundaries

Unify forms and analytics, add typed validation and robust delivery states, and finish separating content from presentation. Keep provider changes and any CMS selection explicit.

### Step 5 — Full regression and release review

Run the complete verification strategy, compare against the baseline, document remaining gaps, and prepare a pull request. Deployment remains a separate approval gate.

## 10. Known carried-forward gaps

- Seven legacy PDF originals are absent and must not be represented as available downloads.
- Physical-device GPU/frame-rate certification remains necessary.
- Editorial market figures require independent source verification before publication.
- Controlled real-world form receipt requires explicit approval and confirmation.
- The baseline has a large Three.js chunk and reported development-tooling advisories; these require measured remediation rather than blind forced upgrades.
