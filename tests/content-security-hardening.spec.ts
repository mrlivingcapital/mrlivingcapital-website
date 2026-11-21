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

test('GitHub Pages preserves dot-directory security resources', () => {
  for (const path of ['public/.nojekyll', 'docs/.nojekyll']) {
    expect(existsSync(new URL(`../${path}`, import.meta.url))).toBe(true)
  }
})

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
