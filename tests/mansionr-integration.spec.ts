import { test, expect } from '@playwright/test'

async function openMansion(page: import('@playwright/test').Page, reducedMotion = false) {
  if (reducedMotion) await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.route(/http:\/\/127\.0\.0\.1:4199\/(?:\?.*)?$/, async (route) => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace(' upgrade-insecure-requests;', '') })
  })
  await page.goto('/#mansionr')
}

test('MansionR is a dedicated modular scene with scroll assembly and facility exploration', async ({ page }) => {
  await openMansion(page)
  const scene = page.locator('[data-slide="mansionr"]')
  await expect(scene).toHaveAttribute('data-active', 'true')
  await expect(page.getByRole('heading', { name: 'The architecture of living capital.' })).toBeVisible()
  await expect(page.locator('.mansionr-stage canvas')).toBeVisible()
  await expect(scene).toHaveAttribute('data-assembly', '0')
  await page.locator('.mansionr-stage').evaluate((stage) => {
    stage.dispatchEvent(new WheelEvent('wheel', { deltaY: 600, bubbles: true, cancelable: true }))
  })
  await expect(scene).toHaveAttribute('data-assembly', '1')
  await page.getByRole('button', { name: 'Pool & gardens' }).click()
  await expect(page.locator('.mansionr-facility')).toBeVisible()
  await expect(page.locator('.mansionr-facility')).toContainText('Pool & gardens')
})

test('reduced motion opens on the assembled static composition', async ({ page }) => {
  await openMansion(page, true)
  await expect(page.locator('[data-slide="mansionr"]')).toHaveAttribute('data-assembly', '1')
  await expect(page.locator('.mansionr-stage img')).toBeVisible()
})

test('MansionR has no project identity or property-sales wording', async ({ page }) => {
  await openMansion(page)
  const content = await page.locator('[data-slide="mansionr"]').innerText()
  expect(content).not.toMatch(/mews|meydan|nad al sheba|discuss this residence/i)
  expect(content).toContain('ARCHITECTURAL GAMIFICATION & ILLUSTRATION')
})

test('MansionR wheel handling is non-passive and emits no browser warning', async ({ page }) => {
  const warnings: string[] = []
  page.on('console', (message) => {
    if (message.text().includes('Unable to preventDefault inside passive event listener')) warnings.push(message.text())
  })
  await openMansion(page)
  const scene = page.locator('[data-slide="mansionr"]')
  await page.locator('.mansionr-stage').evaluate((stage) => {
    stage.dispatchEvent(new WheelEvent('wheel', { deltaY: 120, bubbles: true, cancelable: true }))
  })
  await expect(scene).not.toHaveAttribute('data-assembly', '0')
  expect(warnings).toEqual([])
})
