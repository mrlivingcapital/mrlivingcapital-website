import { test, expect } from '@playwright/test'

async function open(page: import('@playwright/test').Page, url: string) {
  await page.route(/http:\/\/127\.0\.0\.1:4199\/(?:\?.*)?$/, async (route) => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace(' upgrade-insecure-requests;', '') })
  })
  await page.goto(url)
}

test('cinematic demo replaces the opening slide with an overlapping chapter transition', async ({ page }) => {
  await open(page, '/?walkthrough-demo=1#architecture')
  const root = page.locator('.walkthrough')
  await expect(root).toHaveAttribute('data-cinematic-demo', 'true')
  await page.getByRole('button', { name: 'Enter the intelligence' }).click()
  await expect(page.locator('[data-slide="founder-letter"]')).toHaveAttribute('data-active', 'true')
  await expect(page.locator('.walk-track')).toHaveCSS('transform', 'none')
  await expect(page.locator('.walk-progress > span')).toBeHidden()
  await expect(page.locator('.progress-scenes')).toBeHidden()
})

test('ordinary opening to founder navigation keeps the baseline presentation', async ({ page }) => {
  await open(page, '/#architecture')
  await expect(page.locator('.walkthrough')).toHaveAttribute('data-cinematic-demo', 'false')
  await page.getByRole('button', { name: 'Enter the intelligence' }).click()
  await expect(page.locator('[data-slide="founder-letter"]')).toHaveAttribute('data-active', 'true')
  await expect(page.locator('.walk-progress > span')).toBeVisible()
})
