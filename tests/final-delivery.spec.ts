import { test, expect } from '@playwright/test'

async function openSite(page: import('@playwright/test').Page, url: string) {
  await page.route(/http:\/\/127\.0\.0\.1:4199\/(?:\?.*)?$/, async (route) => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace(' upgrade-insecure-requests;', '') })
  })
  await page.goto(url)
}

test('corridor HTML is fetched only on intent and PDFs are never prefetched', async ({ page }) => {
  const requests: string[] = []
  page.on('request', (request) => requests.push(request.url()))
  await openSite(page, '/#corridors')
  await expect(page.locator('[data-slide="corridors"]')).toHaveAttribute('data-active', 'true')
  expect(requests.filter((url) => url.includes('/corridors/'))).toEqual([])
  await page.getByRole('link', { name: 'Read the corridor briefings' }).hover()
  await expect.poll(() => requests.some((url) => /\/corridors\/$/.test(url))).toBe(true)
  expect(requests.some((url) => url.endsWith('.pdf'))).toBe(false)
})

test('final review is query-only and includes both additional phases', async ({ page }) => {
  await openSite(page, '/#architecture')
  await expect(page.locator('.final-review')).toHaveCount(0)
  await openSite(page, '/?final-demo=1#architecture')
  await expect(page.locator('.final-review')).toBeVisible()
  await expect(page.getByText('Connected investor journeys', { exact: true })).toBeVisible()
  await expect(page.getByText('Research reading experience', { exact: true })).toBeVisible()
  await expect(page.getByText('Intent-only delivery', { exact: true })).toBeVisible()
})
