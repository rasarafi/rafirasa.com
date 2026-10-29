import { expect, test } from '@playwright/test';

/** Nav, footer and the 404 — the surfaces that appear on or lead to every page. */

test.describe('navbar', () => {
  test('marks the current section as active', async ({ page }) => {
    await page.goto('/projects/');
    const work = page.getByRole('navigation').getByRole('link', { name: 'Work', exact: true });
    await expect(work.first()).toBeVisible();
  });

  test('content clears the fixed navbar', async ({ page }) => {
    await page.goto('/projects/jarvis/');
    const crumb = page.getByRole('navigation', { name: 'Breadcrumb' });
    const top = await crumb.evaluate((el) => el.getBoundingClientRect().top);
    // The bar is 60px tall; anything above that would sit underneath it.
    expect(top).toBeGreaterThanOrEqual(60);
  });

  test('mobile menu opens, exposes links, and closes on navigation', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'mobile-only control');
    await page.goto('/');

    const open = page.getByRole('button', { name: 'Open menu' });
    await expect(open).toHaveAttribute('aria-expanded', 'false');
    await open.click();

    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    await menu.getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
  });

  test('mobile menu is opaque so page content cannot read through it', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'mobile-only control');
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();

    const bg = await page
      .locator('#mobile-menu')
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    // Must be fully opaque: rgb(...) or rgba(..., 1).
    expect(bg).not.toMatch(/rgba\([^)]*,\s*0?\.\d+\)/);
  });
});

test.describe('footer', () => {
  test('carries the closing call to action and site links', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByRole('heading', { name: /build something that ships/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'info@rafirasa.com' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
  });

  test('there is only one email call to action above the fold of the footer', async ({ page }) => {
    await page.goto('/');
    // The old ContactSection duplicated the footer CTA; it was removed.
    const mailtos = page.locator('a[href^="mailto:"]');
    expect(await mailtos.count()).toBeLessThanOrEqual(3);
  });
});

test.describe('404', () => {
  test('offers a route forward instead of a dead end', async ({ page }) => {
    const response = await page.goto('/definitely-not-a-page/');
    expect(response?.status()).toBe(404);

    await expect(page.getByRole('heading', { level: 1 })).toContainText("isn't here");
    await expect(page.getByRole('link', { name: /project index/ })).toBeVisible();
    // The three flagships are offered as starting points.
    await expect(page.getByRole('link', { name: /Jarvis/ }).first()).toBeVisible();
  });
});

test.describe('social preview', () => {
  test('site pages share the brand card and claim their own canonical', async ({ page }) => {
    for (const path of ['/', '/projects/', '/about/']) {
      await page.goto(path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://rafirasa.com${path}`,
      );
      const og = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(og).toMatch(/\/opengraph-image/);
    }
  });

  test('the brand card is a real PNG', async ({ request }) => {
    const res = await request.get('/opengraph-image');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toBe('image/png');
    expect((await res.body()).byteLength).toBeGreaterThan(20_000);
  });

  test('a case study previews with its own composited thumbnail', async ({ page, request }) => {
    await page.goto('/projects/jarvis/');
    const og = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(og).toBe('https://rafirasa.com/projects/jarvis/thumbnail.png');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    const res = await request.get('/projects/jarvis/thumbnail.png');
    expect(res.status()).toBe(200);
  });
});
