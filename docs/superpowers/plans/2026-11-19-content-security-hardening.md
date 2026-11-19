# Content and Security Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the approved content contradictions and homepage security gaps, deploy them, and prove the complete website remains functional through local and live QC.

**Architecture:** Keep the existing Vite/React application and static research system intact. Edit canonical source files, regenerate `dist/`, synchronize the generated `public/` and `docs/` outputs while preserving `docs/superpowers/`, and use exact JSON-LD hashes for the homepage-only script CSP. The owner applies Cloudflare controls separately with guided steps.

**Tech Stack:** TypeScript, React 19, Vite, static HTML, Playwright/Chromium, Node.js test assertions, GitHub Pages, Cloudflare, GA4.

## Global Constraints

- Preserve the approved design DNA, selective AI-crawler policy, ten-scene order, MansionR behavior, research styling and inquiry flows.
- Do not submit live forms, add CAPTCHA, open all AI crawlers, change Formspree, or modify Cloudflare through the agent.
- Do not claim protection against every attack or legal verification of every market statement.
- Produce one final reviewed commit containing the approved specification, this plan, implementation, tests and generated output; push only after local QC passes.
- Work only inside `/Users/masoud/Desktop/Migration/02-Packs-and-Content` and do not use subagents.

---

### Task 1: Add content and security regression tests

**Files:**
- Create: `tests/content-security-hardening.spec.ts`
- Test: `tests/content-security-hardening.spec.ts`

**Interfaces:**
- Consumes: canonical `index.html`, `public/llms.txt`, the two identified public article files, `public/blog/index.html`, `public/warroom/index.html`, and `public/.well-known/security.txt`.
- Produces: regression coverage used before publishing and after generated-output synchronization.

- [ ] **Step 1: Write failing static tests**

Create Playwright tests using `readFileSync` and `existsSync`:

```ts
import { test, expect } from '@playwright/test'
import { existsSync, readFileSync } from 'node:fs'

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('AI-facing and brand content uses current conservative wording', () => {
  const llms = read('public/llms.txt')
  expect(llms).toContain('35 years')
  expect(llms).toContain('Masoud@mrlivingcapital.com')
  expect(llms).not.toMatch(/ANY purchase|mrlivingcapital@gmail\.com|RERA-registered advisory|Two decades|two decades/)
  expect(read('index.html')).toContain('Thirty-five years')
  expect(read('index.html')).not.toMatch(/Two decades|two decades/)
  expect(read('public/blog/index.html')).not.toContain('Any Property Purchase Now Qualifies')
  expect(read('public/warroom/index.html')).not.toMatch(/mortgaged properties no longer qualify|50% payment completion|15-20 working days/)
})

test('POA wording distinguishes representation from payment receipt', () => {
  const files = [read('index.html'), read('public/blog/farsi-diaspora-dubai-investment-guide-2026.html')]
  for (const content of files) {
    expect(content).not.toMatch(/power-of-attorney sales are banned|POA\) is standard/)
    expect(content).toMatch(/sale proceeds/i)
    expect(content).toMatch(/registered owner|title.deed holder/i)
  }
})

test('security contact file exists with branded contact and expiry', () => {
  const path = 'public/.well-known/security.txt'
  expect(existsSync(new URL(`../${path}`, import.meta.url))).toBe(true)
  const security = read(path)
  expect(security).toContain('Contact: mailto:Masoud@mrlivingcapital.com')
  expect(security).toContain('Expires: 2027-11-19T00:00:00+04:00')
  expect(security).toContain('Canonical: https://mrlivingcapital.com/.well-known/security.txt')
})
```

- [ ] **Step 2: Run static tests and verify RED**

Run: `npx playwright test tests/content-security-hardening.spec.ts --browser=chromium --grep "AI-facing|POA|security contact"`

Expected: failures for outdated `llms.txt`, missing `security.txt`, absolute POA wording and the blog title. No production edits yet.

- [ ] **Step 3: Write failing browser CSP test**

Add to the same file:

```ts
test('homepage loads external analytics without unsafe-inline scripts or CSP errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', message => {
    if (message.type() === 'error' && message.text().includes('Content Security Policy')) errors.push(message.text())
  })
  await page.route(/http:\/\/127\.0\.0\.1:4199\/(?:\?.*)?$/, async route => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace(' upgrade-insecure-requests;', '') })
  })
  await page.goto('/#architecture')
  await expect(page.locator('[data-slide="architecture"]')).toHaveAttribute('data-active', 'true')
  const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content')
  expect(csp?.split(';').find(part => part.trim().startsWith('script-src'))).not.toContain("'unsafe-inline'")
  expect(await page.locator('script[src="/analytics.js"]').count()).toBe(1)
  const jsonTypes = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(node => JSON.parse(node.textContent || '{}')['@type']))
  expect(jsonTypes).toEqual(['FAQPage', 'Organization', 'ProfessionalService'])
  expect(errors).toEqual([])
})
```

Run: `npx playwright test tests/content-security-hardening.spec.ts --browser=chromium --grep "external analytics"`

Expected: failure because `/analytics.js` is absent and `script-src` still contains `'unsafe-inline'`.

### Task 2: Correct canonical content and add security contact

**Files:**
- Modify: `index.html`
- Modify: `public/llms.txt`
- Modify: `public/blog/index.html`
- Modify: `public/blog/farsi-diaspora-dubai-investment-guide-2026.html`
- Modify: `public/warroom/index.html`
- Create: `public/.well-known/security.txt`

**Interfaces:**
- Consumes: the failing static tests from Task 1.
- Produces: stable AI-facing content, consistent public POA/Golden Visa wording and a live security-contact resource after publishing.

- [ ] **Step 1: Replace `public/llms.txt` with stable canonical content**

Use sections `# MR Living Capital`, `## Positioning`, `## Services`, `## Research`, `## Contact`, and `## Content policy`. State 35 years in Dubai, independent advisory, branded email, links to `/blog/`, `/corridors/`, `/off-plan/`, `/fa/`, and note that regulatory eligibility is conditional and must be verified with current authorities. Exclude market statistics, tax tables, company license claims and automatic visa promises.

- [ ] **Step 2: Correct the identified public and private wording**

In `index.html`, use `Thirty-five years of Dubai market execution.` in the no-JavaScript card and replace the POA FAQ answer with conservative text distinguishing representation from sale-proceeds receipt. In `public/blog/index.html`, use `UAE Golden Visa Through Real Estate 2026: The Complete Investor's Guide`. In the Farsi-diaspora article, replace the POA answer with the same representation/payment distinction and current-DLD verification advice. In the private War Room Golden Visa note, replace absolute mortgage/off-plan/processing claims with conditional eligibility and authority-verification language.

- [ ] **Step 3: Create the security contact file**

```txt
Contact: mailto:Masoud@mrlivingcapital.com
Expires: 2027-11-19T00:00:00+04:00
Preferred-Languages: en, fa
Canonical: https://mrlivingcapital.com/.well-known/security.txt
```

- [ ] **Step 4: Run static regression tests**

Run: `npx playwright test tests/content-security-hardening.spec.ts --browser=chromium --grep "AI-facing|POA|security contact"`

Expected: all selected tests PASS; the separate analytics test remains for Task 3.

### Task 3: Externalize homepage analytics and enforce exact script CSP

**Files:**
- Create: `public/analytics.js`
- Modify: `index.html`
- Modify: `../checks/final-seo-audit.py` so GA4 ID and production-host guard checks read both `dist/index.html` and `dist/analytics.js`
- Test: `tests/content-security-hardening.spec.ts`

**Interfaces:**
- Consumes: existing GA4 ID `G-B651X4S3J7`, production-host guard, `trackDownload(reportName, geo)`, `trackFormSubmit(formType)` and three inline JSON-LD blocks.
- Produces: global `window.dataLayer`, `window.gtag`, `window.trackDownload`, `window.trackFormSubmit`, and a homepage CSP containing exact `sha256-...` JSON-LD hashes without `script-src 'unsafe-inline'`.

- [ ] **Step 1: Move the analytics code without behavior changes**

Create `public/analytics.js` from the existing inline block. Keep the production hostname condition and event fields exactly unchanged. Declare globals explicitly:

```js
window.dataLayer = window.dataLayer || []
function gtag(){window.dataLayer.push(arguments)}
window.gtag = gtag
if (location.hostname === 'mrlivingcapital.com' || location.hostname === 'www.mrlivingcapital.com') {
  const analyticsScript = document.createElement('script')
  analyticsScript.async = true
  analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-B651X4S3J7'
  document.head.appendChild(analyticsScript)
  gtag('js', new Date())
  gtag('config', 'G-B651X4S3J7', {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
    custom_map: {
      dimension1: 'report_download',
      dimension2: 'geo_region',
      dimension3: 'form_type',
    },
  })
}
window.trackDownload = function(reportName, geo) {
  gtag('event', 'download', {
    event_category: 'report',
    event_label: reportName,
    report_download: reportName,
    geo_region: geo || 'unknown',
  })
}
window.trackFormSubmit = function(formType) {
  gtag('event', 'submit', {
    event_category: 'form',
    event_label: formType,
    form_type: formType,
  })
}
```

Load it from `index.html` with `<script src="/analytics.js"></script>` before `/src/main.tsx` and remove the old inline analytics block.

- [ ] **Step 2: Add exact JSON-LD hashes to `script-src`**

Keep the JSON-LD bytes unchanged. Compute each hash from the exact inline script text:

```bash
node -e "const fs=require('fs'),c=require('crypto');const h=fs.readFileSync('index.html','utf8');for(const m of h.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)){console.log(\"'sha256-\"+c.createHash('sha256').update(m[1]).digest('base64')+\"'\")}"
```

Replace only `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com` with `script-src 'self' https://www.googletagmanager.com` followed by the three printed hashes. Do not add hashes for the removed analytics block.

Update `../checks/final-seo-audit.py` to read the external analytics file while retaining its existing checks:

```py
homepage = (dist / 'index.html').read_text(encoding='utf-8')
analytics = (dist / 'analytics.js').read_text(encoding='utf-8')
# In the existing `required` mapping:
'Google Analytics ID': 'G-B651X4S3J7' in homepage + analytics,
'Production analytics guard': "location.hostname === 'mrlivingcapital.com'" in analytics,
```

- [ ] **Step 3: Build and run the CSP regression test**

Run: `npm run build && npx playwright test tests/content-security-hardening.spec.ts --browser=chromium`

Expected: all static and browser tests PASS, with no CSP errors and all three JSON-LD types readable.

### Task 4: Full local QC and publishing

**Files:**
- Regenerate: `dist/`
- Synchronize: `public/`, `docs/`
- Preserve: `docs/superpowers/`
- Review: all modified source, test, specification and plan files

**Interfaces:**
- Consumes: verified source changes from Tasks 2–3.
- Produces: identical generated `dist/`, `public/` and `docs/` website output, except preserved `docs/superpowers/` documentation.

- [ ] **Step 1: Run focused and existing browser tests**

Run: `npx playwright test --browser=chromium`

Expected: all Playwright tests PASS. Do not submit a live form; the existing mocked Formspree route is the only submission test.

- [ ] **Step 2: Run structural, metadata, link and dependency checks**

```bash
node --test tests/mansionr-structure.spec.ts
python3 ../checks/final-seo-audit.py
python3 ../checks/static-link-audit.py
node ../checks/full-navigation-audit.mjs
npm audit --omit=dev --audit-level=low
for path in /deals/ /farsi/ /london/ /toronto/ /off-plan/ /fa/golden-visa-dubai.html /fa/buying-property-dubai.html; do
  curl -fsS -o /dev/null "https://mrlivingcapital.com$path" || exit 1
done
```

Expected: 31 metadata files and all static links pass, 335/335 navigation checks pass, every sitemap destination returns successfully, and zero known production vulnerabilities remain.

- [ ] **Step 3: Synchronize and compare generated output**

```bash
rsync -a --delete dist/ public/
rsync -a --delete dist/ docs/
git restore --source=HEAD -- docs/superpowers
diff -qr public dist
diff -qr -x superpowers docs dist
git diff --check
```

Expected: no content differences and no whitespace errors. Re-run Task 1 static tests because canonical generated files changed.

- [ ] **Step 4: Review and create the single final commit**

Review `git status --short`, `git diff --stat`, and the complete source diff. Amend the local design commit so the final commit contains the specification, plan, implementation, tests and generated output:

```bash
git add -A
git commit --amend --no-edit
git push origin main
```

Expected: one new reviewed commit on `origin/main`; working tree clean.

### Task 5: Full live QC and owner-guided Cloudflare verification

**Files:**
- Update: `../checks/live-post-deploy-results.json` through the existing audit script
- Update: `../checks/live-research-discovery-results.json` through the existing audit script
- Update: the live-audit commit identifier/query label to the final commit

**Interfaces:**
- Consumes: the pushed GitHub Pages deployment and owner-applied Cloudflare settings.
- Produces: evidence for the final functionality and security report.

- [ ] **Step 1: Verify deployment and run all live checks**

Confirm the new hashed homepage bundle and successful GitHub Pages check runs. Run `node checks/live-post-deploy-qc.cjs` and `node checks/live-research-discovery-audit.cjs` from `website-upgrade/`.

Expected: 38/38 functional checks PASS and 15/15 public research destinations plus 6/6 redirect destinations remain dark, with no runtime errors.

- [ ] **Step 2: Verify security resources and content**

Check `/analytics.js`, `/.well-known/security.txt`, `/llms.txt`, `/robots.txt`, `/sitemap.xml`, all sitemap destinations, the corrected blog title and POA wording.

Expected: all resources return valid content; no scoped contradictory wording remains.

- [ ] **Step 3: Give the owner exact Cloudflare steps**

Provide separate instructions for HSTS, response-header transform rules, DNSSEC, TLS 1.2 minimum and available managed WAF protection. Do not enable preload, `includeSubDomains`, aggressive bot blocking, CAPTCHA or new rate limits.

- [ ] **Step 4: Verify owner-applied controls and report honestly**

After the owner confirms Cloudflare changes, inspect response headers and normal website access. Report repository-verified functionality separately from owner-applied Cloudflare controls. Confirm the website fully functional only when all functional QC is green; do not claim immunity from every attack.
