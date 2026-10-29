import { expect, test } from '@playwright/test';

/**
 * The signature element. These tests cover the behaviour that makes it more than
 * a picture: per-era selection, keyboard operability, and the accuracy invariant
 * that only genuinely-replaced apps get a "superseded by" arrow.
 *
 * The card is framed as a duel — one detail card per era, side by side — so the
 * selection model is two selections, not one. A click on the 2019 lane must
 * never blank the 2026 evidence.
 */

const DIAGRAM = '/design-system/';

const legacyCard = '[data-era="legacy"]';
const rebuiltCard = '[data-era="rebuilt"]';

test.describe('pipeline diagram', () => {
  test('opens on a champion for each era', async ({ page }) => {
    await page.goto(DIAGRAM);
    await expect(page.locator(legacyCard)).toContainText('Field Data Collection App');
    // The 2026 champion is the one that actually replaced something.
    await expect(page.locator(rebuiltCard)).toContainText('Digital Evidence Centre');
    await expect(page.locator(rebuiltCard)).toContainText('golden validation');
    await expect(page.locator(rebuiltCard)).toContainText('2026 · replaces 2 desktop apps');
  });

  test('clicking a node swaps only its own era card', async ({ page }) => {
    await page.goto(DIAGRAM);
    await page.locator('g[aria-label*="Healthy Village Tracker"]').click();

    await expect(page.locator(legacyCard)).toContainText('Healthy Village Tracker');
    // The other era is untouched — that is the whole point of the two cards.
    await expect(page.locator(rebuiltCard)).toContainText('Digital Evidence Centre');
  });

  test('nodes are keyboard operable', async ({ page }) => {
    await page.goto(DIAGRAM);
    const node = page.locator('g[aria-label*="Desktop Evidence Centre"]');

    await node.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator(legacyCard)).toContainText('Desktop Evidence Centre');

    const spaceTarget = page.locator('g[aria-label*="Survey Configuration Console"]');
    await spaceTarget.focus();
    await page.keyboard.press(' ');
    await expect(page.locator(rebuiltCard)).toContainText('Survey Configuration Console');
  });

  test('marks the selected node in each lane with aria-pressed', async ({ page }) => {
    await page.goto(DIAGRAM);
    const node = page.locator('g[aria-label*="Survey Configuration Console"]');
    await node.click();
    await expect(node).toHaveAttribute('aria-pressed', 'true');

    // Exactly one node per era is selected — two in total.
    const pressed = page.locator('g.pipeline-node[aria-pressed="true"]');
    await expect(pressed).toHaveCount(2);
  });

  test('labels every node with its real status', async ({ page }) => {
    await page.goto(DIAGRAM);
    // Retired apps must say so — the honesty rule applies inside the drawing too.
    await expect(page.locator('g[aria-label*="Healthy Village Tracker"]')).toHaveAttribute(
      'aria-label',
      /retired 2026/,
    );
    await expect(page.locator('g[aria-label*="Field Data Collection App"]')).toHaveAttribute(
      'aria-label',
      /still active/,
    );
  });

  test('draws superseded arrows only for apps that were actually replaced', async ({ page }) => {
    await page.goto(DIAGRAM);
    // Two retired apps -> one rebuild. The other two rebuilds are additive, so
    // they must not gain arrows implying they replaced something.
    const arrows = page.locator('path[stroke-dasharray="3 5"]');
    await expect(arrows).toHaveCount(2);
  });

  test('calls the additive 2026 systems new builds, not rebuilds', async ({ page }) => {
    // The drawing stacks a 2026 node under a 2019 node it never replaced, which
    // read as "this one was rebuilt". The detail card must contradict that.
    await page.goto(DIAGRAM);
    await page.locator('g[aria-label*="Field Data Management Platform"]').click();
    await expect(page.locator(rebuiltCard)).toContainText('2026 · new system');
  });

  test('frames the two eras against each other', async ({ page }) => {
    await page.goto(DIAGRAM);
    // The comparison is the argument: hand-typed vs. directed, years vs. months.
    await expect(page.getByText('every line typed')).toBeVisible();
    await expect(page.getByText('every line directed')).toBeVisible();
  });

  test('scrolls horizontally on mobile instead of shrinking', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'mobile-only behaviour');
    await page.goto(DIAGRAM);

    const scroller = page.locator('div.overflow-x-auto').filter({ has: page.locator('svg') }).first();
    const box = await scroller.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    // The drawing is wider than its container...
    expect(box.scrollWidth).toBeGreaterThan(box.clientWidth);

    // ...but that must not leak into the page.
    const page_ = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      win: window.innerWidth,
    }));
    expect(page_.doc).toBeLessThanOrEqual(page_.win + 1);
  });
});
