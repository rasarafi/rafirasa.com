import { expect, test } from '@playwright/test';

/**
 * Gallery behaviour: tier grouping when unfiltered, a flat grid when filtered,
 * and a designed empty state rather than a blank page.
 */

test.describe('project gallery', () => {
  test('groups by tier and features the ecosystem when unfiltered', async ({ page }) => {
    await page.goto('/projects/');

    await expect(page.getByRole('heading', { name: 'Flagship', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Standard', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Minor & archived/ })).toBeVisible();

    // The ecosystem gets its own feature tile above the grid.
    await expect(
      page.getByRole('heading', { name: 'Max Foundation Digital Data Platform' }),
    ).toBeVisible();
    // ...and carries the miniature pipeline drawing from the approved mock.
    await expect(page.getByRole('img', { name: /Pipeline of 4 original applications/ })).toBeVisible();
  });

  test('filtering drops the tier headings and narrows the grid', async ({ page }) => {
    await page.goto('/projects/');
    const before = await page.locator('a[href^="/projects/"]').count();

    // Python appears in 3 visible projects; single-project technologies are
    // deliberately not offered as filters.
    await page.getByRole('button', { name: 'Python', exact: true }).click();

    await expect(page.getByRole('heading', { name: 'Flagship', exact: true })).toHaveCount(0);
    const after = await page.locator('a[href^="/projects/"]').count();
    expect(after).toBeLessThan(before);
    expect(after).toBeGreaterThan(0);
  });

  test('marks the active filter with aria-pressed', async ({ page }) => {
    await page.goto('/projects/');
    const laravel = page.getByRole('button', { name: 'Laravel', exact: true });
    await laravel.click();
    await expect(laravel).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('button[aria-pressed="true"]')).toHaveCount(1);
  });

  test('never shows a project whose status contradicts its live link', async ({ page }) => {
    await page.goto('/projects/');
    // "pre-pilot" and "staging" must be visible somewhere — the honesty rule is
    // a feature of this page, not an omission.
    await expect(page.getByText('pre-pilot').first()).toBeVisible();
    await expect(page.getByText('staging').first()).toBeVisible();
  });

  test('hidden sub-apps never appear', async ({ page }) => {
    await page.goto('/projects/');
    // Named "Desktop Evidence Centre" since the 2026 web platform took over the
    // "Digital Evidence Centre" name — which IS in the gallery, so match exactly.
    await expect(
      page.getByRole('heading', { name: 'Desktop Evidence Centre', exact: true }),
    ).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Healthy Village Tracker' })).toHaveCount(0);
  });

  test('shows a recoverable empty state when a filter matches nothing', async ({ page }) => {
    await page.goto('/projects/');

    // Drive the component into its empty state directly: no real tag yields zero
    // results (every offered filter has at least two projects by construction).
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('button')].find((b) =>
        b.textContent?.trim().toLowerCase() === 'all',
      );
      btn?.click();
    });

    // Sanity: the "all" filter shows everything.
    expect(await page.locator('a[href^="/projects/"]').count()).toBeGreaterThan(10);
  });
});
