# MR Living Capital Content and Security Hardening Design

Date: 2026-11-19
Status: Approved in conversation for implementation planning

## Objective

Correct the identified content contradictions and practical security gaps without changing the approved design DNA, opening AI crawlers indiscriminately, adding visitor friction, or refactoring all legacy research pages.

This is a bounded consistency and hardening release, not a guarantee against every attack or a legal review of every market statement.

## Approved scope

### Content and AEO

1. Rewrite `public/llms.txt` as a concise, stable AI-facing summary containing:
   - Current MR Living Capital positioning and approved 35-year experience statement.
   - Branded contact details already used by the current homepage.
   - Stable service descriptions and links to current research destinations.
   - No unverified company registration claim, volatile market statistics, tax tables, or automatic Golden Visa entitlement claims.
2. Change the homepage no-JavaScript experience wording from “Two decades” to the approved 35-year positioning.
3. Replace the blog-library “Any Property Purchase Now Qualifies” title with the canonical guide title.
4. Align Golden Visa wording around AED 2 million eligibility subject to current authority requirements, rather than automatic qualification through any purchase.
5. Correct the POA contradiction in the homepage FAQ and Farsi-diaspora article:
   - Distinguish transaction representation from receipt of sale proceeds.
   - Do not describe POA as universally banned or as an unrestricted standard purchase route.
   - State that sale proceeds must go to the registered owner’s matching account and that current DLD requirements must be verified for the transaction.
6. Correct the private War Room Golden Visa note using the same conditional eligibility language so inaccurate claims are not published later.
7. Preserve the existing selective AI-crawler policy, robots rules, sitemap, canonicals, and dark research presentation.

### Repository security

1. Add `public/.well-known/security.txt` with:
   - `Contact: mailto:Masoud@mrlivingcapital.com`
   - `Expires: 2027-11-19T00:00:00+04:00`
   - `Preferred-Languages: en, fa`
   - `Canonical: https://mrlivingcapital.com/.well-known/security.txt`
2. Move homepage analytics initialization and existing tracking helpers into a same-origin external JavaScript file while preserving GA4 `G-B651X4S3J7`, production-host gating, and existing event behavior.
3. Preserve the three inline JSON-LD blocks and authorize their exact contents with CSP SHA-256 hashes.
4. Remove `script-src 'unsafe-inline'` from the homepage CSP only. Keep required style allowances and existing model/blob support.
5. Do not impose the homepage script policy on legacy research pages. Their separate inline-script refactor is outside this release.

### Cloudflare settings applied by the owner

Provide exact owner-guided steps and then verify the public results:

1. HSTS with a one-year max age, initially without preload or `includeSubDomains`.
2. `X-Content-Type-Options: nosniff`.
3. `Referrer-Policy: strict-origin-when-cross-origin`.
4. The existing restrictive `Permissions-Policy` as an HTTP header.
5. `Content-Security-Policy: frame-ancestors 'none'` and `X-Frame-Options: DENY` for clickjacking protection without replacing each page’s content policy.
6. DNSSEC where available, TLS 1.2 minimum, and available Cloudflare managed WAF protection.
7. No aggressive bot blocking, mandatory CAPTCHA, or new rate limits without abuse evidence and a separate approval.

Cloudflare and Formspree settings are not changed by the agent. No credentials are requested in chat.

## Implementation boundaries

- Edit only the identified content, analytics/CSP files, security contact file, tests, and generated publishing output.
- Preserve all visual styling, scene ordering, MansionR behavior, research navigation, PDFs, and inquiry flows.
- Do not submit forms or trigger inquiry events.
- Produce one final reviewed commit containing this specification, implementation, tests, and generated output; push only after local verification passes.

## Error handling and rollback

- If GA4 or any inline JSON-LD block is blocked, stop publishing and correct the external script or exact CSP hash before continuing.
- If a content fact cannot be supported conservatively, remove the absolute claim rather than inventing replacement legal wording.
- If Cloudflare settings cause access or rendering failures, the owner disables only the newly added rule while the agent verifies; website files remain independently deployable.
- Preserve the pre-release commit for straightforward Git rollback if required.

## Verification

1. Add regression checks first and confirm they fail for the identified content and homepage CSP conditions.
2. Run the production build and focused browser tests, including homepage analytics/CSP and existing MansionR behavior.
3. Re-run metadata/link checks and confirm all sitemap destinations remain valid.
4. Run a fresh production dependency audit.
5. Verify the live homepage, ten-scene sequence, MansionR, research destinations, PDFs, mobile behavior, and GA4 without form submissions.
6. Confirm zero browser console errors, uncaught page errors, failed requests, and HTTP error responses in the final functional audit.
7. After the owner applies Cloudflare settings, verify the actual HTTP headers, HTTPS redirects, DNSSEC-visible state where available, and normal website access.

## Acceptance criteria

- No identified “any purchase,” outdated experience, alternate contact, unverified company registration, or contradictory POA wording remains in the scoped files.
- The homepage executes its external analytics and readable JSON-LD without `script-src 'unsafe-inline'` or new CSP console errors.
- `/.well-known/security.txt` is live and valid.
- The owner has exact low-risk Cloudflare instructions, and the final report distinguishes repository-verified controls from owner-applied controls.
- All approved existing experiences remain functional and visually unchanged.
