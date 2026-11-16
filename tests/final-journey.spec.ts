import { test, expect } from '@playwright/test'

async function openSite(page: import('@playwright/test').Page, scene: string) {
  await page.route('http://127.0.0.1:4199/', async (route) => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replace(' upgrade-insecure-requests;', '') })
  })
  await page.goto(`/#${scene}`)
  await expect(page.locator(`[data-slide="${scene}"]`)).toHaveAttribute('data-active', 'true')
}

test('corridor context reaches inquiry and can be removed without storing personal data', async ({ page }) => {
  await openSite(page, 'corridors')
  await page.getByRole('tab', { name: 'ABU DHABI' }).click()
  await page.getByRole('button', { name: 'Open scene menu' }).click()
  await page.getByRole('button', { name: /The Partnership Conversation/ }).click()
  await expect(page.locator('[data-journey-context="corridor"]')).toContainText('Abu Dhabi')
  await page.getByRole('button', { name: 'Remove corridor context' }).click()
  await expect(page.locator('[data-journey-context="corridor"]')).toHaveCount(0)
  const stored = await page.evaluate(() => sessionStorage.getItem('mrlc-journey'))
  expect(stored ?? '').not.toMatch(/email|phone|name/i)
})

test('Decision Lab produces an editable inquiry summary and consolidated mocked submission', async ({ page }) => {
  await openSite(page, 'decision-lab')
  await page.locator('#lab-illustrative-purchase-price').focus()
  await page.keyboard.press('ArrowRight')
  await page.getByRole('button', { name: 'Open scene menu' }).click()
  await page.getByRole('button', { name: /The Partnership Conversation/ }).click()
  const context = page.locator('[data-journey-context="lab"]')
  await expect(context).toContainText('Base case')
  await expect(context).toContainText('2,550,000')
  await page.getByLabel('Name *').fill('QC Test')
  await page.getByLabel('Email *').fill('qc@example.test')
  await page.getByLabel('Investment interest *').selectOption({ label: 'Portfolio strategy' })
  let payload: Record<string, unknown> | undefined
  await page.route('https://formspree.io/f/xkokazvz', async (route) => {
    payload = route.request().postDataJSON() as Record<string, unknown>
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  await page.getByRole('button', { name: 'SUBMIT PRIVATE INQUIRY' }).click()
  await expect(page.getByText('Your inquiry has been sent for personal review.')).toBeVisible()
  expect(payload?.source).toBe('Cinematic Walkthrough Inquiry')
  expect(payload?.scenario_context).toContain('Base case')
  expect(payload?._gotcha).toBe('')
})
