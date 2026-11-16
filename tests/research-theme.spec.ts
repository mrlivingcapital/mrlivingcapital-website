import { test, expect } from '@playwright/test'

for (const path of ['/blog/', '/blog/dubai-q1-2026-market-brief.html', '/corridors/dubai/']) {
  test(`Mews palette and digital veil apply to ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('canvas.mrlc-digital-veil')).toBeVisible()
    const background = await page.locator('body').evaluate((body) => getComputedStyle(body).backgroundColor)
    expect(['rgb(6, 13, 11)', 'rgb(20, 24, 23)']).toContain(background)
    const primary = await page.locator('h1').first().evaluate((heading) => getComputedStyle(heading).color)
    expect(primary).toBe('rgb(241, 238, 231)')
    if (path === '/blog/') await expect(page.locator('.blog-card').first()).toHaveCSS('border-radius', '0px')
  })
}

test('reduced motion makes the research particle veil static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/blog/')
  await expect(page.locator('canvas.mrlc-digital-veil')).toHaveAttribute('data-motion', 'static')
})
