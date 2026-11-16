import { test, expect } from '@playwright/test'

async function openUrl(page: import('@playwright/test').Page, url: string) {
  await page.route(/http:\/\/127\.0\.0\.1:4199\/(?:\?.*)?$/, async (route) => {
    const response = await route.fetch()
    const body = (await response.text()).replace(' upgrade-insecure-requests;', '')
    await route.fulfill({ response, body })
  })
  await page.goto(url)
}

test('diagnostics are absent during ordinary visits', async ({ page }) => {
  await openUrl(page, '/#architecture')
  await expect(page.locator('.phase-one-demo')).toHaveCount(0)
})

test('demo mode presents live details and all nine scene destinations', async ({ page }) => {
  await openUrl(page, '/?phase1-demo=1#architecture')
  const panel = page.locator('.phase-one-demo')
  await expect(panel).toBeVisible()
  await expect(panel.getByText('Adaptive rendering', { exact: true })).toBeVisible()
  await expect(panel.getByText('Self-hosted typography', { exact: true })).toBeVisible()
  await expect(panel.locator('[data-demo-metric="dpr"]')).not.toHaveText('—')
  await expect(panel.locator('nav a')).toHaveCount(10)
})

test('demo panel pauses and resumes motion without leaving the scene', async ({ page }) => {
  await openUrl(page, '/?phase1-demo=1#architecture')
  const panel = page.locator('.phase-one-demo')
  await panel.getByRole('button', { name: 'Pause motion' }).click()
  await expect(page.locator('.walkthrough')).toHaveAttribute('data-motion-paused', 'true')
  await panel.getByRole('button', { name: 'Resume motion' }).click()
  await expect(page.locator('.walkthrough')).toHaveAttribute('data-motion-paused', 'false')
  await expect(page).toHaveURL(/#architecture$/)
})
