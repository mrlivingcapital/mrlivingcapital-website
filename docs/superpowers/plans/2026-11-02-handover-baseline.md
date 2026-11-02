# Handover Baseline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Import the approved November 2 cinematic-walkthrough handover into the dedicated GitHub upgrade branch, prove that it builds and serves correctly, and publish only that verified baseline for review.

**Architecture:** Keep the existing React, TypeScript, Vite, and Three.js stack. Synchronise the supplied `source/` tree onto the branch while preserving Git metadata and Superpowers documentation, then run integrity, static, build, route, and browser checks before any redesign work begins.

**Tech Stack:** Node.js 22 LTS, npm, React 19, TypeScript 5.9, Vite 7, Three.js, Git, GitHub, curl, local preview browser.

## Global Constraints

- Work only in `/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository` on `upgrade/2026-11-foundation`.
- Use the handover at `/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/extracted/MR-Living-Capital-Handover-2026-11-02`.
- Do not modify or deploy `main`.
- Do not include `node_modules`, `dist`, ZIP files, credentials, local environment files, caches, or browser profiles.
- Do not mix UI/UX, performance, backend, or content redesign changes into this baseline.
- Preserve `docs/superpowers/` and the local design commit `9dde1b1`.
- Preserve the seven missing-PDF limitations; do not create replacement documents.
- Do not make real form submissions, external contact requests, GitHub pushes, pull requests, or deployments without the corresponding execution approval.
- Stop every temporary development or preview server before completing execution.

---

### Task 1: Verify the handover before importing it

**Files:**
- Read: `/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/extracted/MR-Living-Capital-Handover-2026-11-02/FILE-MANIFEST-SHA256.txt`
- Read: `/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/extracted/MR-Living-Capital-Handover-2026-11-02/START-HERE.md`
- No repository files change in this task.

**Interfaces:**
- Consumes: the extracted handover and its SHA-256 manifest.
- Produces: a verified source tree eligible for import.

- [ ] **Step 1: Confirm the repository branch and clean documentation-only state**

```bash
REPO="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
git -C "$REPO" branch --show-current
git -C "$REPO" status --short
git -C "$REPO" log --oneline -3
```

Expected: branch is `upgrade/2026-11-foundation`; status is empty; latest commit is `docs: add handover baseline implementation plan`, followed by `9dde1b1 docs: define website upgrade design` and `f005eed`.

- [ ] **Step 2: Verify every file against the supplied SHA-256 manifest**

```bash
HANDOVER="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/extracted/MR-Living-Capital-Handover-2026-11-02"
cd "$HANDOVER"
shasum -a 256 -c FILE-MANIFEST-SHA256.txt > /tmp/mrlc-handover-sha-check.txt
! grep -v ': OK$' /tmp/mrlc-handover-sha-check.txt
wc -l /tmp/mrlc-handover-sha-check.txt
```

Expected: command exits `0`, no line lacks `: OK`, and the manifest reports 370 verified files.

- [ ] **Step 3: Confirm that excluded materials are absent from the source import**

```bash
HANDOVER="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/extracted/MR-Living-Capital-Handover-2026-11-02"
test ! -e "$HANDOVER/source/node_modules"
test ! -e "$HANDOVER/source/dist"
test ! -e "$HANDOVER/source/.git"
test ! -e "$HANDOVER/source/.env"
```

Expected: all four commands exit `0`.

### Task 2: Import the exact handover source as one baseline commit

**Files:**
- Modify: repository root files from the handover `source/` tree, including `README.md`, `index.html`, `package-lock.json`, `public/**`, `src/**`, and generated static `docs/**`.
- Create: `src/walkthrough/**`, `src/architecture/**`, `src/data/**`, handover-only public assets, and static routes.
- Remove: files present in `main` but absent from the handover, except `.git/**` and `docs/superpowers/**`.
- Preserve: `docs/superpowers/specs/2026-11-02-website-upgrade-design.md` and this plan.

**Interfaces:**
- Consumes: verified `$HANDOVER/source/` contents.
- Produces: a Git commit whose non-Superpowers tree matches `$HANDOVER/source/` exactly.

- [ ] **Step 1: Preview the synchronisation and review the paths before writing**

```bash
REPO="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
HANDOVER="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/extracted/MR-Living-Capital-Handover-2026-11-02"
rsync -ain --delete \
  --exclude='.git/' \
  --exclude='docs/superpowers/' \
  "$HANDOVER/source/" "$REPO/" > /tmp/mrlc-baseline-rsync-preview.txt
wc -l /tmp/mrlc-baseline-rsync-preview.txt
```

Expected: output lists only handover differences; no path begins with `.git/` or `docs/superpowers/`. Review the file before continuing. The existing `public/images` symlink is expected to be replaced by the handover's real image directory.

- [ ] **Step 2: Apply the exact source synchronisation**

```bash
REPO="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
HANDOVER="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/extracted/MR-Living-Capital-Handover-2026-11-02"
rsync -a --delete \
  --exclude='.git/' \
  --exclude='docs/superpowers/' \
  "$HANDOVER/source/" "$REPO/"
```

Expected: command exits `0`; no redesign edits are made.

- [ ] **Step 3: Prove that the imported tree matches the handover**

```bash
REPO="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
HANDOVER="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/extracted/MR-Living-Capital-Handover-2026-11-02"
rsync -ain --delete \
  --exclude='.git/' \
  --exclude='docs/superpowers/' \
  "$HANDOVER/source/" "$REPO/" > /tmp/mrlc-baseline-rsync-verify.txt
test ! -s /tmp/mrlc-baseline-rsync-verify.txt
git -C "$REPO" diff --check
```

Expected: verification file is empty and `git diff --check` exits `0`.

- [ ] **Step 4: Review and commit the baseline**

```bash
REPO="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
git -C "$REPO" status --short
git -C "$REPO" diff --stat
git -C "$REPO" add -A
git -C "$REPO" commit -m "feat: import cinematic walkthrough handover"
```

Expected: one commit containing only the handover baseline; the already-committed Superpowers documents remain unchanged.

### Task 3: Install and run static/production verification

**Files:**
- Read: `package.json` and `package-lock.json`.
- Generate locally but do not commit: `node_modules/` and `dist/`.

**Interfaces:**
- Consumes: the handover baseline commit and npm lockfile.
- Produces: verified lint, TypeScript, and production-build results.

- [ ] **Step 1: Confirm the required runtime**

```bash
node --version
npm --version
```

Expected: Node reports a `v22.x` release; npm runs successfully. If Node is not 22 LTS, stop and switch the local runtime before installing.

- [ ] **Step 2: Install exactly from the lockfile**

```bash
REPO="/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
cd "$REPO"
npm ci
```

Expected: exit `0`; `package.json` and `package-lock.json` remain unchanged. Dependency-advisory output is recorded, not fixed with `npm audit fix --force`.

- [ ] **Step 3: Run lint**

```bash
cd "/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
npm run lint
```

Expected: exit `0` with no ESLint errors.

- [ ] **Step 4: Run TypeScript and the production build**

```bash
cd "/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
npm run build
```

Expected: `tsc -b && vite build` exits `0`; `dist/index.html` exists. A Three.js chunk-size warning is acceptable in this unchanged baseline and must be reported rather than hidden.

- [ ] **Step 5: Confirm that verification created no source changes**

```bash
cd "/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
git status --short
git check-ignore node_modules dist
```

Expected: status is empty; both generated directories are reported as ignored.

### Task 4: Verify the production preview and preserved routes

**Files:**
- Serve locally: `dist/**`.
- No repository files change in this task.

**Interfaces:**
- Consumes: successful production build from Task 3.
- Produces: HTTP and browser evidence for the unchanged handover baseline.

- [ ] **Step 1: Start the production preview temporarily**

```bash
cd "/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
npm run preview -- --host 127.0.0.1 --port 4173
```

Expected: Vite preview serves `http://127.0.0.1:4173/`. Keep this process attached to its terminal so it can be stopped with `Ctrl+C`.

- [ ] **Step 2: Check the homepage and every preserved static route**

In a second terminal, run:

```bash
for path in / /blog/ /farsi/ /fa/ /corridors/ /deals/ /london/ /toronto/ /off-plan/ /warroom/ /robots.txt /sitemap.xml /llms.txt /CNAME; do
  status="$(curl -sS -o /dev/null -w '%{http_code}' "http://127.0.0.1:4173$path")"
  test "$status" = "200" || { echo "$path returned $status"; exit 1; }
  echo "$path 200"
done
```

Expected: every listed path prints `200` and the command exits `0`.

- [ ] **Step 3: Check all eleven research documents**

```bash
for file in \
  dubai-h1-2026-market-brief.html \
  dubai-q1-2026-market-brief.html \
  cash-buyer-market-analysis-2026.html \
  london-investors-dubai-capital-shift-2026.html \
  toronto-vs-dubai-property-comparison-2026.html \
  balkans-dubai-investment-guide-2026.html \
  farsi-diaspora-dubai-investment-guide-2026.html \
  ras-al-khaimah-real-estate-yield-play-2026.html \
  uae-golden-visa-real-estate-2026-guide.html \
  dubai-mortgage-non-residents-2026-guide.html \
  dubai-abu-dhabi-rak-three-emirates-comparison-2026.html; do
  status="$(curl -sS -o /dev/null -w '%{http_code}' "http://127.0.0.1:4173/blog/$file")"
  test "$status" = "200" || { echo "$file returned $status"; exit 1; }
done
```

Expected: command exits `0` for all eleven documents.

- [ ] **Step 4: Confirm the seven known PDFs are not falsely represented as restored**

```bash
for file in \
  Dubai-Real-Estate-Brief-H1-2026.pdf \
  cash-buyer-market-analysis-2026.pdf \
  blog-dubai-cash-buyers-2026.pdf \
  blog-london-to-dubai-2026.pdf \
  blog-toronto-dubai-comparison-2026.pdf \
  blog-balkans-dubai-guide-2026.pdf \
  blog-farsi-dubai-investment-2026.pdf; do
  test ! -e "/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository/dist/downloads/$file" || {
    echo "Unexpected PDF present: $file"
    exit 1
  }
done
```

Expected: command exits `0`; none of the seven files exists in `dist/downloads/`.

- [ ] **Step 5: Run the browser smoke check**

Open `http://127.0.0.1:4173/` in the available preview browser and verify:

1. The opening scene renders its headline, CTA, and architectural visual without console errors.
2. Arrow Right/Left, mouse wheel, and the scene menu change scenes; Back/Forward restores scene history.
3. `/#intelligence-layers` selects the Intelligence Layers scene and all five nodes open their respective detail content.
4. `/#decision-lab` opens Decision Lab; changing purchase price updates results and Reset restores defaults.
5. `/#inquiry` opens the inquiry scene. Do not submit the form.
6. The research-library CTA opens `/blog/`; browser Back returns to the homepage.
7. Emulated reduced motion leaves content visible and stops nonessential diagram animation.
8. At 390 × 844 and 1440 × 1000, all nine scenes remain reachable with no horizontal document overflow.

Expected: all eight checks pass. Any failure stops publication; record the exact scene, viewport, action, and console/network error before revising the baseline.

- [ ] **Step 6: Stop the preview and confirm a clean repository**

Stop the attached preview with `Ctrl+C`, then run:

```bash
cd "/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
git status --short
```

Expected: no preview process remains and Git status is empty.

### Task 5: Publish the verified branch for review

**Files:**
- Push: all commits on `upgrade/2026-11-foundation`, including the design, this plan, and the verified handover baseline.
- No additional source changes.

**Interfaces:**
- Consumes: explicit user approval to push after Tasks 1–4 pass.
- Produces: a remote upgrade branch and draft pull request; no merge or deployment.

- [ ] **Step 1: Obtain the publication checkpoint**

Report the commit hash, lint/build results, route results, browser results, and remaining limitations. Continue only after the user explicitly approves pushing this verified baseline to GitHub.

- [ ] **Step 2: Push the dedicated branch**

```bash
cd "/Users/masoud/Desktop/Migration/02-Packs-and-Content/website-upgrade/repository"
git push -u origin upgrade/2026-11-foundation
```

Expected: remote branch `origin/upgrade/2026-11-foundation` is created or updated; `main` is unchanged.

- [ ] **Step 3: Create a draft pull request**

Use GitHub pull-request creation with these exact values:

```text
owner: mrlivingcapital
repo: mrlivingcapital-website
base: main
head: upgrade/2026-11-foundation
draft: true
title: Upgrade foundation: cinematic walkthrough handover
body:
## Summary
- Import the verified 2026-11-02 cinematic walkthrough handover.
- Preserve the existing static routes, research pages, SEO files, and Decision Lab.
- Add the approved upgrade design and baseline implementation plan.

## Verification
- SHA-256 handover manifest verified.
- ESLint, TypeScript, and production build passed.
- Homepage, preserved routes, and eleven research documents returned HTTP 200.
- Browser smoke checks completed without real form submissions.

## Known limitations
- Seven original PDFs remain absent.
- Physical-device GPU/frame-rate certification remains pending.
- No deployment or merge is included in this request.
```

Expected: a draft pull request targets `main`; it is not merged and no deployment is triggered by this plan.
