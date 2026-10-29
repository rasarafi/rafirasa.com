import { expect, test } from '@playwright/test';

/**
 * The v5 case study: composited mockups, tier-driven band counts, and the
 * degradation rules for thin projects. 15 of 24 projects have fewer than four
 * screens, so degradation is the common path, not an edge case.
 *
 * Band counts are derived from lib/composites.ts (`bandCount`) and
 * app/(main)/projects/[slug]/page.tsx, not guessed:
 *
 *   bandCount(tier, availableScreens) = 0 for 'minor', else
 *   min(cap, availableScreens) with cap 4 for flagship/ecosystem, 2 for standard.
 *
 *   availableScreens is screens.length when the hero is a video (video hero
 *   consumes no screen), or screens.length - 1 when the hero is a composite
 *   (the composite hero consumes screens[0]).
 *
 * jarvis: tier 'flagship', video hero, screens.length === 2
 *   -> availableScreens = 2 (video hero) -> min(4, 2) = 2 bands.
 * mis-dash-web: tier 'standard', video hero, screens.length === 3
 *   -> availableScreens = 3 (video hero) -> min(2, 3) = 2 bands.
 * mfnl-site: tier 'minor' -> 0 bands regardless of screen count.
 * mfb-mis-ecosystem: tier 'ecosystem' but rendered by the bespoke
 *   EcosystemCaseStudy layout, which never mounts ClaimBand -> 0 bands.
 *
 * jarvis has links.live (jarvis.rafirasa.com) — used for the sticky-bar
 * visible/hidden test. mfnl-site has no links.live — used for the
 * sticky-bar-absent test.
 */

test.describe('case study v5', () => {
  test('never scrolls horizontally', async ({ page }) => {
    for (const slug of ['jarvis', 'mis-dash-web', 'mfnl-site', 'mfb-mis-ecosystem']) {
      await page.goto(`/projects/${slug}/`);
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflows, `${slug} scrolls horizontally`).toBe(false);
    }
  });

  test('gives a flagship exactly its derived claim band count', async ({ page }) => {
    // jarvis: flagship, video hero, 2 screens -> min(4, 2) = 2 bands.
    await page.goto('/projects/jarvis/');
    await expect(page.locator('[data-band]')).toHaveCount(2);
  });

  test('gives a standard project exactly its derived claim band count', async ({ page }) => {
    // mis-dash-web: standard, video hero, 3 screens -> min(3, 3) = 3 bands.
    await page.goto('/projects/mis-dash-web/');
    await expect(page.locator('[data-band]')).toHaveCount(3);
  });

  test('gives a minor project a single band and still renders', async ({ page }) => {
    // mfnl-site: minor, composite hero takes screens[0], 1 left -> min(1, 1) = 1 band.
    // Minor tier earned its band on 2026-09-09; before that it showed the hero alone.
    await page.goto('/projects/mfnl-site/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('[data-band]')).toHaveCount(1);
  });

  test('renders a project with no screens without erroring', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/projects/mfb-mis-ecosystem/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('reveals the sticky bar only after the hero actions scroll away', async ({ page }) => {
    await page.goto('/projects/jarvis/');
    const bar = page.locator('[data-sticky-bar]');
    await expect(bar).toHaveAttribute('aria-hidden', 'true');
    await page.evaluate(() => window.scrollTo(0, 1600));
    await expect(bar).toHaveAttribute('aria-hidden', 'false');
  });

  test('has no sticky bar at all for a project with no live link', async ({ page }) => {
    // mfnl-site carries no links.live, so StickyActionBar returns null.
    await page.goto('/projects/mfnl-site/');
    await expect(page.locator('[data-sticky-bar]')).toHaveCount(0);
  });

  test('puts at most one filled CTA in any one region', async ({ page }) => {
    await page.goto('/projects/jarvis/');
    // A filled CTA is the coral-background link/button (`.bg-coral`, an exact
    // class-token match — it does not match the `.bg-coral-bg` badge class).
    // Verified against the built page: bg-coral appears exactly 5 times on
    // /projects/jarvis/ — the hero CTA (inside #hero-actions, inside
    // <header>), the [data-case-study-close] "Start a project" CTA, the
    // footer CTA (inside <footer>), the fixed sticky-bar CTA, and a fixed
    // scroll-to-top FAB. Only the close section lives inside a <section> —
    // it's checked explicitly below — which is why the old per-<section>
    // version of this test was vacuous: it always saw zero-CTA sections and
    // could never fail.
    //
    // The sticky bar is deliberately excluded from the regions checked below:
    // it duplicates the hero's CTA by design (the "one label per intent"
    // rule — see the test above), so counting it here would flag a
    // non-violation. It never appears inside the hero/#hero-actions, a
    // [data-band], or <footer>, so excluding it just means not adding a
    // fourth region for it.
    const filledCta = 'a.bg-coral, button.bg-coral';

    // Guard: the selector must actually find the hero's one filled CTA, or
    // the "at most one" checks below would pass vacuously if the selector
    // ever stopped matching anything.
    await expect(page.locator('#hero-actions').locator(filledCta)).toHaveCount(1);

    const bands = page.locator('[data-band]');
    const bandCount = await bands.count();
    expect(bandCount).toBeGreaterThan(0); // jarvis has 2 bands; guards this loop actually running

    for (let i = 0; i < bandCount; i++) {
      const count = await bands.nth(i).locator(filledCta).count();
      expect(count, `[data-band] index ${i} carries more than one filled CTA`).toBeLessThanOrEqual(
        1,
      );
    }

    const footerCount = await page.locator('footer').locator(filledCta).count();
    expect(footerCount, 'footer carries more than one filled CTA').toBeLessThanOrEqual(1);

    const closeCount = await page.locator('[data-case-study-close]').locator(filledCta).count();
    expect(closeCount, 'close section carries more than one filled CTA').toBeLessThanOrEqual(1);
  });

  test('closes with a client CTA before prev/next, one filled action only', async ({ page }) => {
    await page.goto('/projects/jarvis/');
    const close = page.locator('[data-case-study-close]');
    await expect(close.getByRole('heading', { name: 'Need something like this?' })).toBeVisible();
    await expect(close.getByRole('link', { name: 'Start a project' })).toHaveAttribute(
      'href',
      'mailto:info@rafirasa.com',
    );
    await expect(close.getByRole('link', { name: 'See other work' })).toHaveAttribute(
      'href',
      '/projects/',
    );

    const closeBox = await close.boundingBox();
    const nav = page.getByRole('navigation', { name: 'More projects' });
    const navBox = await nav.boundingBox();
    expect(closeBox).not.toBeNull();
    expect(navBox).not.toBeNull();
    expect(closeBox!.y).toBeLessThan(navBox!.y);
  });

  test('renders the close CTA on the ecosystem case study too', async ({ page }) => {
    await page.goto('/projects/mfb-mis-ecosystem/');
    await expect(
      page.locator('[data-case-study-close]').getByRole('heading', {
        name: 'Need something like this?',
      }),
    ).toBeVisible();
  });

  test('uses one label for the live-site intent, with no arrow', async ({ page }) => {
    await page.goto('/projects/jarvis/');
    const links = page.getByRole('link', { name: 'Visit the live site', exact: true });
    expect(await links.count()).toBeGreaterThanOrEqual(1);
    await expect(page.getByText(/Visit the live site ↗/)).toHaveCount(0);
  });

  test('orders the hero before the engineering region, and bands before it', async ({ page }) => {
    await page.goto('/projects/jarvis/');
    const h1Top = await page.getByRole('heading', { level: 1 }).boundingBox();
    const engineersLabel = page.getByText('FOR THE ENGINEERS', { exact: true });
    const engineersTop = await engineersLabel.boundingBox();
    const bands = page.locator('[data-band]');
    const lastBandTop = await bands.last().boundingBox();

    expect(h1Top).not.toBeNull();
    expect(engineersTop).not.toBeNull();
    expect(lastBandTop).not.toBeNull();

    // Hero renders above the engineering region, and the last claim band
    // renders above (i.e. before) it too — the redesign's whole point is
    // product pitch first, engineering depth last.
    expect(h1Top!.y).toBeLessThan(engineersTop!.y);
    expect(lastBandTop!.y).toBeLessThan(engineersTop!.y);
  });

  test('drops the old overview heading', async ({ page }) => {
    await page.goto('/projects/jarvis/');
    await expect(page.getByRole('heading', { name: /^overview$/i })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: /what it is/i })).toHaveCount(0);
  });

  test('renders exactly one h1 per case study', async ({ page }) => {
    for (const slug of ['jarvis', 'mis-dash-web', 'mfnl-site', 'mfb-mis-ecosystem']) {
      await page.goto(`/projects/${slug}/`);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    }
  });

  test('leaves FactStrip and RecentWork absent everywhere pending authored data', async ({
    page,
  }) => {
    // No project currently authors `facts` or `recentWork` in data/projects.ts,
    // so both components render null across the whole site today. This is a
    // fact about current content, not a permanent rule — once a project
    // authors facts/recentWork this test's target slugs should gain one.
    for (const slug of ['jarvis', 'mis-dash-web', 'mfnl-site', 'mfb-mis-ecosystem']) {
      await page.goto(`/projects/${slug}/`);
      // FactStrip is the only <dl> rendered on case-study pages (EcosystemFeature
      // and FlagshipShowcase also render a <dl>, but neither mounts on these
      // routes — don't reuse this locator on a route where that's not true).
      await expect(page.locator('dl')).toHaveCount(0);
      await expect(page.getByText('What shipped recently', { exact: true })).toHaveCount(0);
    }
  });

  test('ecosystem keeps its bespoke layout and never mounts claim bands', async ({ page }) => {
    await page.goto('/projects/mfb-mis-ecosystem/');
    // SHARED FOUNDATIONS is unique to EcosystemCaseStudy's shared-patterns section.
    await expect(page.getByText('SHARED FOUNDATIONS', { exact: true })).toBeVisible();
    await expect(page.locator('[data-band]')).toHaveCount(0);
  });
});
