# Phase 1 Experience Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Subagents are not permitted in this workspace.

**Goal:** Deliver a local Phase 1 demo with adaptive rendering, motion controls, self-hosted fonts, Web Vitals, and diagnostics while preserving the nine-section baseline.

**Architecture:** Extend the existing React/TypeScript walkthrough and R3F canvas. Keep diagnostics query-only, use existing scene metrics, and send no analytics outside production. Test each subsystem before integration and run the full release suite before demonstration.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, Three.js, React Three Fiber, Drei, Playwright WebKit, web-vitals, CSS.

## Global Constraints

- Work only in `/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository` and its sibling `checks` directory.
- Preserve all nine section layouts, copy, routes, corridor reports, and desktop composition.
- Preserve the local iPhone Bloom and tower-motion correction.
- No generic template, framework migration, smooth-touch scrolling, automatic audio, real form submission, commit, push, or deployment.
- Ordinary visits must not show diagnostics; demo mode requires `?phase1-demo=1`.
- Stop every temporary preview server before delivery.

---

### Task 1: Adaptive canvas and motion lifecycle

**Files:**
- Modify: `src/walkthrough/ExperienceCanvas.tsx`
- Modify: `src/walkthrough/Walkthrough.tsx`
- Test: `../checks/phase-1-rendering-audit.mjs`

**Interfaces:**
- Consumes: `activeSlide: number`, existing `window.__CITY_METRICS__`, and a new `motionPaused: boolean` canvas property.
- Produces: DPR 1.0–1.5, demand rendering when hidden/paused/reduced/captured, and live `fps`, `dpr`, and `quality` metrics.

- [ ] **Step 1: Write browser assertions for ready state, running animation, pause, resume, and adaptive DPR bounds.**

```js
const metrics = await page.evaluate(() => window.__CITY_METRICS__?.())
if (!metrics || metrics.dpr < 1 || metrics.dpr > 1.5) throw new Error('Invalid adaptive DPR')
await page.getByRole('button', { name: 'Pause motion' }).click()
if (await page.evaluate(() => document.querySelector('.walkthrough')?.dataset.motionPaused !== 'true')) throw new Error('Pause failed')
```

- [ ] **Step 2: Run the rendering audit against the baseline and confirm pause/metric assertions fail.**

Run: `node ../checks/phase-1-rendering-audit.mjs`
Expected: FAIL for missing motion control and adaptive metric fields.

- [ ] **Step 3: Add `motionPaused`, monitor document visibility, and configure the canvas.**

```tsx
<Canvas dpr={dpr} frameloop={motionPaused || REDUCED || CAPTURE || !pageVisible ? 'demand' : 'always'}>
  <PerformanceMonitor
    flipflops={3}
    onChange={({ factor, fps }) => {
      const nextDpr = Math.round((1 + factor * 0.5) * 20) / 20
      setDpr(nextDpr)
      renderMetrics.current = { dpr: nextDpr, fps, quality: 'adaptive' }
    }}
    onFallback={() => setDpr(1)}
  />
</Canvas>
```

- [ ] **Step 4: Extend the existing metrics getter and verify the rendering audit.**

```tsx
window.__CITY_METRICS__ = () => ({
  drawCalls: gl.info.render.calls,
  triangles: gl.info.render.triangles,
  landmarks: COMPANIONS.length + 1,
  ...renderMetrics.current,
})
```

Run: `node ../checks/phase-1-rendering-audit.mjs`
Expected: PASS with DPR within bounds and pause/resume working.

### Task 2: Motion tokens and visitor controls

**Files:**
- Modify: `src/walkthrough/Walkthrough.tsx`
- Modify: `src/walkthrough/Walkthrough.css`
- Test: `../checks/phase-1-rendering-audit.mjs`

**Interfaces:**
- Consumes: `prefers-reduced-motion` and `localStorage['mrlc-motion-paused']`.
- Produces: root `data-motion-paused`, menu Pause/Resume control, and shared CSS timing tokens.

- [ ] **Step 1: Add failing assertions for persistence, decorative animation pause, and reduced-motion authority.**

```js
await page.getByRole('button', { name: 'Pause motion' }).click()
await page.reload()
await page.getByRole('button', { name: 'Open scene menu' }).click()
await page.getByRole('button', { name: 'Resume motion' }).waitFor()
```

- [ ] **Step 2: Implement session-safe preference state and pass it to the canvas.**

```tsx
const [motionPaused, setMotionPaused] = useState(() => {
  try { return localStorage.getItem('mrlc-motion-paused') === 'true' } catch { return false }
})
const toggleMotion = () => setMotionPaused((current) => {
  const next = !current
  try { localStorage.setItem('mrlc-motion-paused', String(next)) } catch { /* Session state still works. */ }
  return next
})
```

- [ ] **Step 3: Add shared tokens and pause rules.**

```css
.walkthrough {
  --motion-micro: 180ms;
  --motion-interface: 300ms;
  --motion-reveal: 700ms;
  --motion-scene: 1080ms;
  --ease-interface: cubic-bezier(.16,1,.3,1);
  --ease-reveal: cubic-bezier(.8,0,.55,.94);
}
.walkthrough[data-motion-paused='true'] .digital-scan,
.walkthrough[data-motion-paused='true'] .data-flow,
.walkthrough[data-motion-paused='true'] .node-pulse,
.walkthrough[data-motion-paused='true'] .gesture-line i { animation-play-state: paused; }
```

- [ ] **Step 4: Verify persistence, keyboard navigation, reduced motion, and touch swipe.**

Run: `node ../checks/phase-1-rendering-audit.mjs`
Expected: PASS with no hidden content or extra navigation action.

### Task 3: Self-hosted fonts and Web Vitals

**Files:**
- Create: `public/fonts/*` and `public/fonts/fonts.css`
- Create: `src/lib/vitals.ts`
- Modify: `index.html`
- Modify: `src/main.tsx`
- Modify: `package.json` and `package-lock.json` using `npm install web-vitals`
- Test: `../checks/phase-1-delivery-audit.mjs`

**Interfaces:**
- Consumes: existing font families and production GA4 configuration.
- Produces: same-origin fonts and `window.__MRLC_VITALS__` containing only LCP/INP/CLS values and ratings.

- [ ] **Step 1: Write failing assertions that font URLs are same-origin and no Google Fonts request is required.**

```js
for (const entry of await page.evaluate(() => performance.getEntriesByType('resource').map((item) => item.name))) {
  if (entry.includes('fonts.googleapis.com') || entry.includes('fonts.gstatic.com')) throw new Error('External font request')
}
```

- [ ] **Step 2: Download the exact existing font families, define `@font-face`, and remove external font connections.**

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-latin.woff2') format('woff2');
  font-style: normal;
  font-weight: 300 600;
  font-display: swap;
}
```

- [ ] **Step 3: Install and defer metric collection.**

```ts
export async function startVitals() {
  const { onCLS, onINP, onLCP } = await import('web-vitals')
  const report = (metric: { name: string; value: number; rating: string }) => {
    window.__MRLC_VITALS__ = { ...window.__MRLC_VITALS__, [metric.name]: { value: metric.value, rating: metric.rating } }
  }
  onCLS(report); onINP(report); onLCP(report)
}
```

- [ ] **Step 4: Run delivery checks and inspect the production CSP.**

Run: `node ../checks/phase-1-delivery-audit.mjs`
Expected: PASS; all fonts return HTTP 200 and no external font request occurs.

### Task 4: Query-only demonstration and complete QC

**Files:**
- Create: `src/walkthrough/PhaseOneDemo.tsx` and `src/walkthrough/PhaseOneDemo.css`
- Modify: `src/walkthrough/Walkthrough.tsx`
- Test: `../checks/phase-1-demo-audit.mjs`

**Interfaces:**
- Consumes: `window.__CITY_METRICS__`, `window.__MRLC_VITALS__`, and motion pause/resume.
- Produces: `?phase1-demo=1` feature and metrics panel, absent on ordinary visits.

- [ ] **Step 1: Add failing assertions for ordinary-mode absence and demo-mode presence.**

```js
await page.goto(`${base}/`)
if (await page.locator('.phase-one-demo').count()) throw new Error('Diagnostics leaked into ordinary mode')
await page.goto(`${base}/?phase1-demo=1`)
await page.locator('.phase-one-demo').waitFor()
```

- [ ] **Step 2: Implement a compact read-only panel polling metrics once per second and linking to all nine scenes.**

```tsx
const enabled = new URLSearchParams(location.search).get('phase1-demo') === '1'
if (!enabled) return null
return <aside className="phase-one-demo" aria-label="Phase 1 demonstration diagnostics" />
```

- [ ] **Step 3: Run demo, lint, build, visual, navigation, static-link, and security checks.**

```bash
npm run lint && npm run build
node ../checks/phase-1-rendering-audit.mjs
node ../checks/phase-1-delivery-audit.mjs
node ../checks/phase-1-demo-audit.mjs
node ../checks/full-navigation-audit.mjs
python ../checks/static-link-audit.py
```

Expected: all checks PASS, 331 existing browser checks remain passing, static failures equal zero, and no runtime or local asset errors occur.

- [ ] **Step 4: Present the local preview for approval; do not commit or deploy.**

Expected: owner reviews the demo. Deployment remains a separate explicit action after approval and repeated QC/security audit.
