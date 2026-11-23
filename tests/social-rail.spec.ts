import { test, expect } from '@playwright/test'

const expected = [
  ['whatsapp', 'https://wa.me/971585899112'],
  ['linkedin', 'https://www.linkedin.com/in/mrlivingcapital/'],
  ['telegram', 'https://t.me/mrlivingcapital'],
  ['instagram', 'https://instagram.com/mrlivingcapital'],
] as const

async function openSite(page: import('@playwright/test').Page, path: string) {
  await page.route(/http:\/\/127\.0\.0\.1:4199\/(?:\?.*)?$/, async route => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace(' upgrade-insecure-requests;', '') })
  })
  await page.goto(path)
}

async function verifyRail(page: import('@playwright/test').Page) {
  const rail = page.locator('.mrlc-social-rail').first()
  await expect(rail).toBeVisible()
  await expect(rail).toHaveCSS('position', 'fixed')
  await expect(rail).toHaveCSS('flex-direction', 'row')
  const links = rail.locator('a')
  await expect(links).toHaveCount(4)
  for (let index = 0; index < expected.length; index += 1) {
    const [network, href] = expected[index]
    await expect(links.nth(index)).toHaveAttribute('data-network', network)
    await expect(links.nth(index)).toHaveAttribute('href', href)
    await expect(links.nth(index)).toHaveAttribute('target', '_blank')
    await expect(links.nth(index)).toHaveAttribute('rel', /noopener/)
  }
}

test('walkthrough keeps all four social channels visible on desktop and mobile', async ({ page }) => {
  await openSite(page, '/#architecture')
  await verifyRail(page)
  await page.setViewportSize({ width: 402, height: 874 })
  await verifyRail(page)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
})

test('research library, articles and corridor index keep the same social rail', async ({ page }) => {
  for (const path of ['/blog/', '/blog/dubai-q1-2026-market-brief.html', '/corridors/']) {
    await openSite(page, path)
    await verifyRail(page)
  }
})
