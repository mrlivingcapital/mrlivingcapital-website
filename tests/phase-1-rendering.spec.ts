import { test, expect } from '@playwright/test'

async function openSite(page: import('@playwright/test').Page) {
  await page.route('http://127.0.0.1:4199/', async (route) => {
    const response = await route.fetch()
    const body = (await response.text()).replace(' upgrade-insecure-requests;', '')
    await route.fulfill({ response, body })
  })
  await page.goto('/#architecture')
  await page.waitForFunction(() => window.__SCENE_READY__ === true)
}

test('adaptive renderer exposes bounded live quality metrics', async ({ page }) => {
  await openSite(page)
  await expect.poll(() => page.evaluate(() => window.__CITY_METRICS__?.().quality)).toBe('adaptive')
  const metrics = await page.evaluate(() => window.__CITY_METRICS__?.())
  expect(metrics?.dpr).toBeGreaterThanOrEqual(1)
  expect(metrics?.dpr).toBeLessThanOrEqual(1.5)
  expect(metrics?.fps).toBeGreaterThan(0)
})

test('visitor can pause decorative motion and persist that choice', async ({ page }) => {
  await openSite(page)
  await page.getByRole('button', { name: 'Open scene menu' }).click()
  await page.getByRole('button', { name: 'Pause motion' }).click()
  await expect(page.locator('.walkthrough')).toHaveAttribute('data-motion-paused', 'true')
  await page.getByRole('button', { name: 'Close scene menu' }).click()
  await page.goto('/#intelligence-layers')
  await expect(page.locator('[data-slide="intelligence-layers"]')).toHaveAttribute('data-active', 'true')
  await expect(page.locator('.node-pulse').first()).toHaveCSS('animation-play-state', 'paused')
  await page.reload()
  await page.getByRole('button', { name: 'Open scene menu' }).click()
  await expect(page.getByRole('button', { name: 'Resume motion' })).toBeVisible()
})

test('reduced motion keeps content available and stops decorative loops', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openSite(page)
  await expect(page.locator('.opening-title')).toBeVisible()
  await page.goto('/#intelligence-layers')
  await expect(page.locator('[data-slide="intelligence-layers"]')).toHaveAttribute('data-active', 'true')
  await expect(page.locator('.node-pulse').first()).toHaveCSS('animation-name', 'none')
})

test('page visibility changes switch the rendering lifecycle', async ({ page }) => {
  await openSite(page)
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(page.locator('.experience-canvas')).toHaveAttribute('data-page-visible', 'false')
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(page.locator('.experience-canvas')).toHaveAttribute('data-page-visible', 'true')
})
