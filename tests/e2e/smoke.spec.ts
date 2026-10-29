import { expect, test } from '@playwright/test';

/**
 * Route-level smoke tests. These encode the regressions that actually bit this
 * project before: horizontal overflow on narrow viewports, and console errors
 * shipping unnoticed.
 */

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/projects', name: 'gallery' },
  { path: '/about', name: 'about' },
  { path: '/projects/jarvis', name: 'flagship case study' },
  { path: '/projects/mfb-mis-ecosystem', name: 'ecosystem case study' },
  { path: '/projects/field-data-collection-app', name: 'hidden sub-app' },
];

for (const route of ROUTES) {
  test(`${route.name} renders without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    const response = await page.goto(route.path);
    expect(response?.status(), `${route.path} status`).toBeLessThan(400);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors, `console errors on ${route.path}`).toEqual([]);
  });

  test(`${route.name} has no horizontal overflow`, async ({ page }) => {
    await page.goto(route.path);
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    // 1px tolerance for sub-pixel rounding.
    expect(
      overflow.scrollWidth,
      `${route.path} overflows: ${overflow.scrollWidth} > ${overflow.innerWidth}`,
    ).toBeLessThanOrEqual(overflow.innerWidth + 1);
  });
}

test('404 page renders for an unknown project', async ({ page }) => {
  const response = await page.goto('/projects/does-not-exist');
  expect(response?.status()).toBe(404);
});

test('hidden sub-apps stay out of the gallery', async ({ page }) => {
  await page.goto('/projects');
  // Field Data Collection App is reachable only from the ecosystem case study.
  await expect(page.getByRole('link', { name: /Field Data Collection App/i })).toHaveCount(0);
});
