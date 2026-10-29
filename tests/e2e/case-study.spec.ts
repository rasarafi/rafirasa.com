import { expect, test } from '@playwright/test';

/**
 * Case-study template, including the two shapes that differ: the ecosystem's
 * bespoke layout and the hidden sub-apps reachable only from it.
 */

test.describe('flagship case study', () => {
  test('renders the header, hard parts, trade-offs and stack', async ({ page }) => {
    await page.goto('/projects/jarvis/');

    await expect(page.getByRole('heading', { level: 1, name: 'Jarvis' })).toBeVisible();
    await expect(page.getByText('WHO USES IT')).toBeVisible();
    await expect(page.getByRole('heading', { name: /problems worth writing down/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Key decisions' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tech stack' })).toBeVisible();

    // Trade-off cards show chosen and rejected options, not a scrolling table.
    await expect(page.getByText('A hosted service', { exact: true })).toBeVisible();
  });

  test('offers the live link only when the project is live', async ({ page }) => {
    await page.goto('/projects/jarvis/');
    await expect(page.getByRole('link', { name: /Visit the live site/ })).toBeVisible();

    // BD-LLM is pre-pilot and must not advertise a live URL.
    await page.goto('/projects/bd-llm/');
    await expect(page.getByRole('link', { name: /Visit the live site/ })).toHaveCount(0);
    await expect(page.getByText('pre-pilot').first()).toBeVisible();
  });

  test('shows the status note where one exists', async ({ page }) => {
    await page.goto('/projects/bd-llm/');
    await expect(page.getByText(/The live server is running an older build/)).toBeVisible();
  });

  test('omits empty sections rather than rendering bare headings', async ({ page }) => {
    // The ecosystem carries no keyDecisions; the heading must not appear.
    await page.goto('/projects/mfb-mis-ecosystem/');
    await expect(page.getByRole('heading', { name: 'Key decisions' })).toHaveCount(0);
  });

  test('the hero shows the click-to-play walkthrough where a video exists', async ({ page }) => {
    await page.goto('/projects/jarvis/');
    await expect(page.getByRole('button', { name: /Play Jarvis walkthrough/ })).toBeVisible();

    // BD-LLM has screens but no video, so it gets the composite hero, not the button.
    await page.goto('/projects/bd-llm/');
    await expect(page.getByRole('button', { name: /Play.*walkthrough/ })).toHaveCount(0);
  });
});

test.describe('ecosystem case study', () => {
  test('leads with the interactive pipeline and lists every application', async ({ page }) => {
    await page.goto('/projects/mfb-mis-ecosystem/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Max Foundation Digital Data Platform' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Same system. Same engineer. Two eras.' }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Four patterns, five applications' })).toBeVisible();

    // All seven applications across both eras are linked.
    for (const name of [
      'Field Data Collection App',
      'Desktop Evidence Centre',
      'Healthy Village Tracker',
      'Child Growth Dashboard',
      'Field Data Management Platform',
      'Survey Configuration Console',
      'Digital Evidence Centre',
    ]) {
      // Names appear both inside the diagram and as a card heading; either is fine.
      await expect(page.getByRole('heading', { name, exact: true }).first()).toBeVisible();
    }
  });
});

test.describe('hidden sub-app pages', () => {
  test('breadcrumb returns to the parent and prev/next is suppressed', async ({ page }) => {
    await page.goto('/projects/field-data-collection-app/');

    const crumb = page.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(crumb.getByRole('link', { name: 'Max Foundation Digital Data Platform' })).toBeVisible();

    // Sub-apps sit outside the visible sequence, so they get no prev/next.
    await expect(page.getByRole('navigation', { name: 'More projects' })).toHaveCount(0);
  });

  test('explains the parent relationship in the body', async ({ page }) => {
    await page.goto('/projects/digital-evidence-centre/');
    await expect(page.getByText(/One of five applications in the/)).toBeVisible();
  });
});
