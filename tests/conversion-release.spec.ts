import { test, expect } from '@playwright/test'

async function openSite(page: import('@playwright/test').Page, path: string) {
  await page.route(/http:\/\/127\.0\.0\.1:4199\/(?:\?.*)?$/, async route => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace(' upgrade-insecure-requests;', '') })
  })
  await page.goto(path)
}

async function startMandate(page: import('@playwright/test').Page) {
  const header = page.getByRole('button', { name: 'START YOUR PRIVATE MANDATE' }).first()
  if (await header.isVisible()) {
    await header.click()
    return
  }
  await page.getByRole('button', { name: 'Open scene menu' }).click()
  await page.locator('.menu-mandate').click()
}

test('mandate CTA, WhatsApp booking and trust process use the existing journey', async ({ page }) => {
  await openSite(page, '/#architecture')
  await startMandate(page)
  await expect(page.locator('[data-slide="decision-lab"]')).toHaveAttribute('data-active', 'true')
  const booking = page.getByRole('link', { name: 'BOOK A 20-MINUTE INVESTOR-FIT CALL' }).first()
  await expect(booking).toHaveAttribute('href', /wa\.me\/971585899112\?text=.*20-minute/)
  await openSite(page, '/#inquiry')
  await expect(page.locator('.engagement-process')).toContainText('Mandate')
  await expect(page.locator('.engagement-process')).toContainText('Evidence & shortlist')
  await expect(page.locator('.engagement-process')).toContainText('Execution')
  await expect(page.locator('.engagement-process')).toContainText('referral arrangements')
})

test('conversion events contain only intended anonymous fields and referral attribution', async ({ page }) => {
  await openSite(page, '/?utm_source=norwick-edge#architecture')
  await page.evaluate(() => {
    window.__conversionEvents = []
    window.gtag = (...args) => window.__conversionEvents.push(args)
  })
  await startMandate(page)
  const event = await page.evaluate(() => window.__conversionEvents[0])
  expect(event[1]).toBe('mandate_cta_click')
  expect(event[2]).toMatchObject({ source: 'header', referral_source: 'norwick-edge', page_path: '/' })
  expect(JSON.stringify(event)).not.toMatch(/email|phone|full_name|message/i)
})

test('inquiry start, Decision Lab completion and success are tracked without personal data', async ({ page }) => {
  await openSite(page, '/#inquiry')
  await page.evaluate(() => {
    sessionStorage.setItem('mrlc-journey', JSON.stringify({ lab: { scenario: 'base', inputs: { category: 'Apartment', price: 2500000, rent: 150000, expenses: 20000, years: 5, appreciation: 3, deposit: 50, rate: 5, risk: 'medium', liquidity: 'medium' } } }))
    window.__conversionEvents = []
    window.gtag = (...args) => window.__conversionEvents.push(args)
  })
  await openSite(page, '/#inquiry')
  await page.getByLabel('Name *').fill('QC Test')
  await page.getByLabel('Email *').fill('qc@example.test')
  await page.getByLabel('Investment interest *').selectOption({ label: 'Portfolio strategy' })
  await page.route('https://formspree.io/f/xkokazvz', async route => {
    const payload = route.request().postDataJSON()
    expect(payload.referral_source).toBe('')
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  await page.getByRole('button', { name: 'SUBMIT PRIVATE INQUIRY' }).click()
  await expect(page.getByText('Your inquiry has been sent for personal review.')).toBeVisible()
  const names = await page.evaluate(() => window.__conversionEvents.map(event => event[1]))
  expect(names).toEqual(expect.arrayContaining(['decision_lab_complete', 'inquiry_start', 'inquiry_success']))
  expect(JSON.stringify(await page.evaluate(() => window.__conversionEvents))).not.toContain('qc@example.test')
})

test('research pages expose mandate and booking actions and preserve all four social channels', async ({ page }) => {
  await openSite(page, '/blog/dubai-q1-2026-market-brief.html')
  await expect(page.locator('.mrlc-mandate-cta')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Start Your Private Mandate' })).toHaveAttribute('href', /#decision-lab/)
  await expect(page.getByRole('link', { name: 'Book a 20-minute investor-fit call' })).toHaveAttribute('href', /wa\.me/)
  for (const channel of ['Instagram', 'LinkedIn', 'Telegram', 'WhatsApp']) {
    await expect(page.getByRole('link', { name: new RegExp(channel, 'i') }).first()).toBeVisible()
  }
  await openSite(page, '/blog/')
  await expect(page.locator('.mrlc-mandate-cta')).toBeVisible()
  expect(await page.locator('body').textContent()).not.toMatch(/Any real estate purchase qualifies|removes minimum thresholds/i)
  await openSite(page, '/corridors/')
  await expect(page.locator('.mrlc-mandate-cta')).toBeVisible()
})

declare global {
  interface Window {
    __conversionEvents: Array<[string, string, Record<string, unknown>]>
  }
}
