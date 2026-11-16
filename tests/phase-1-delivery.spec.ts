import { test, expect } from '@playwright/test'

test('all required fonts are delivered from the same origin', async ({ page }) => {
  const externalFontRequests: string[] = []
  page.on('request', (request) => {
    if (/fonts\.(googleapis|gstatic)\.com/.test(request.url())) externalFontRequests.push(request.url())
  })
  await page.route('http://127.0.0.1:4199/', async (route) => {
    const response = await route.fetch()
    const body = (await response.text()).replace(' upgrade-insecure-requests;', '')
    await route.fulfill({ response, body })
  })
  await page.goto('/#architecture')
  await expect(page.locator('.opening-title')).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
  expect(externalFontRequests).toEqual([])
  const responses = await page.request.get('/fonts/fonts.css')
  expect(responses.status()).toBe(200)
  expect(await responses.text()).toContain("font-family: 'Space Grotesk'")
  expect(await responses.text()).toContain("font-family: 'Cormorant Garamond'")
})

test('Web Vitals stay local during demonstration', async ({ page }) => {
  await page.route('http://127.0.0.1:4199/', async (route) => {
    const response = await route.fetch()
    const body = (await response.text()).replace(' upgrade-insecure-requests;', '')
    await route.fulfill({ response, body })
  })
  await page.goto('/#architecture')
  await expect.poll(() => page.evaluate(() => Boolean(window.__MRLC_VITALS__?.LCP))).toBe(true)
})
