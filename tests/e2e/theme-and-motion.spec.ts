import { expect, test } from '@playwright/test';

/**
 * Theme and motion behaviour.
 *
 * Both are set by the pre-paint boot script in app/layout.tsx, so these tests
 * assert the resolved DOM state rather than any React state.
 */

test.describe('theme', () => {
  test('defaults to Biscuit (light) when nothing is stored', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('defaults to light even when the OS prefers dark', async ({ page }) => {
    // Biscuit is the brand default; the toggle is one click away.
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('toggle flips the theme, repaints, and persists across reloads', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    const toggle = page.getByRole('button', { name: /Biscuit and Dark Roast/i }).first();
    await toggle.click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    // Dark Roast --bg is #191614.
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(25, 22, 20)');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('restores a stored light preference over an OS dark preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('theme', 'light'));
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });
});

test.describe('motion', () => {
  test('suppresses ambient animation when the OS asks for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/design-system/');
    await page.evaluate(() => localStorage.removeItem('motion'));
    await page.reload();

    await expect(page.locator('html')).not.toHaveAttribute('data-motion', 'force');
    const duration = await page
      .locator('.wash-drift')
      .first()
      .evaluate((el) => getComputedStyle(el).animationDuration);
    // globals.css collapses the duration rather than removing the animation.
    // Parse rather than string-match: browsers serialise this as "1e-05s".
    expect(parseFloat(duration)).toBeLessThan(0.01);
  });

  test('?motion=force restores animation and persists', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/design-system/?motion=force');

    await expect(page.locator('html')).toHaveAttribute('data-motion', 'force');
    const duration = await page
      .locator('.wash-drift')
      .first()
      .evaluate((el) => getComputedStyle(el).animationDuration);
    expect(duration).toBe('18s');

    // Persists without the query string.
    await page.goto('/design-system/');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'force');
  });

  test('?motion=os clears the override', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/design-system/?motion=force');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'force');

    await page.goto('/design-system/?motion=os');
    await expect(page.locator('html')).not.toHaveAttribute('data-motion', 'force');
  });
});
