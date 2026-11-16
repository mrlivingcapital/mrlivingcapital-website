import { test, expect } from '@playwright/test'

for (const target of [
  { url: '/blog/dubai-q1-2026-market-brief.html', minimumSections: 5 },
  { url: '/corridors/dubai/', minimumSections: 8 },
]) {
  test(`reading enhancements work on ${target.url}`, async ({ page }) => {
    await page.goto(target.url)
    await expect(page.locator('.mrlc-reading-progress')).toBeVisible()
    await expect(page.locator('.mrlc-reading-time')).toContainText('min read')
    expect(await page.locator('.mrlc-reading-toc a').count()).toBeGreaterThanOrEqual(target.minimumSections)
    await expect(page.locator('.mrlc-related-links a')).toHaveCount(3)
    await page.evaluate(() => { window.__qcPrint = false; window.print = () => { window.__qcPrint = true } })
    await page.getByRole('button', { name: 'Print / save PDF' }).click()
    await expect.poll(() => page.evaluate(() => window.__qcPrint)).toBe(true)
    if (!await page.locator('.mrlc-reading-toc').evaluate((element) => (element as HTMLDetailsElement).open)) {
      await page.locator('.mrlc-reading-toc summary').click()
    }
    await page.locator('.mrlc-reading-toc a').first().click()
    await expect(page).toHaveURL(/#/)
  })
}

declare global {
  interface Window { __qcPrint?: boolean }
}
