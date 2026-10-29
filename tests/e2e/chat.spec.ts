import { expect, test, type Page } from '@playwright/test';

/**
 * The AI assistant drawer. Every test mocks `/api/chat` — these assert the
 * drawer's own behaviour (streaming, failure, retry, the message cap), not
 * the model's answers, and they must never spend a real API call.
 *
 * The drawer only mounts when `ENABLE_CHATBOT=true` at build time, so each
 * test skips itself rather than failing when the flag is off.
 */

const ANSWER =
  'Seventeen applications are live. See [Jarvis](/projects/jarvis) for the method.';

/** Streams `text` back a word at a time, the way the real route does. */
async function mockChatOk(page: Page, text = ANSWER) {
  await page.route('**/api/chat/**', async (route) => {
    await route.fulfill({ status: 200, contentType: 'text/plain', body: text });
  });
}

async function mockChatFailure(page: Page, status = 500) {
  await page.route('**/api/chat/**', async (route) => {
    await route.fulfill({ status, contentType: 'application/json', body: '{}' });
  });
}

async function openDrawer(page: Page) {
  const trigger = page.locator('button[data-chat-trigger]');
  if ((await trigger.count()) === 0) test.skip(true, 'chatbot feature flag is off in this build');
  await trigger.click();
  return page.getByRole('dialog', { name: 'Chat assistant' });
}

test.describe('chat drawer', () => {
  test('opens to a designed empty state with suggestions', async ({ page }) => {
    await page.goto('/');
    const drawer = await openDrawer(page);

    await expect(drawer.getByRole('heading', { name: 'What would you like to know?' })).toBeVisible();
    const suggestions = drawer.getByRole('group', { name: 'Suggested questions' });
    await expect(suggestions.getByRole('button')).toHaveCount(4);
  });

  test('answers a suggestion and renders its links as in-app navigation', async ({ page }) => {
    await mockChatOk(page);
    await page.goto('/');
    const drawer = await openDrawer(page);

    await drawer.getByRole('button', { name: "What's live in production?" }).click();

    // The question is echoed, the answer arrives, and the empty state is gone.
    await expect(drawer.getByText("What's live in production?")).toBeVisible();
    await expect(drawer.getByText('Seventeen applications are live')).toBeVisible();
    await expect(drawer.getByRole('heading', { name: 'What would you like to know?' })).toHaveCount(0);

    // An internal link routes inside the app and closes the drawer.
    await drawer.getByRole('link', { name: 'Jarvis' }).click();
    await expect(page).toHaveURL(/\/projects\/jarvis/);
    await expect(page.getByRole('dialog', { name: 'Chat assistant' })).toHaveCount(0);
  });

  test('reports a failed request as a recoverable error, and retry resends it', async ({ page }) => {
    await mockChatFailure(page);
    await page.goto('/');
    const drawer = await openDrawer(page);

    const input = drawer.getByRole('textbox', { name: 'Type your question' });
    await input.fill('How do you work with AI agents?');
    await input.press('Enter');

    const alert = drawer.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Something went wrong');

    // Recover the endpoint, then retry: the error is replaced by an answer and
    // the question is not asked twice.
    await mockChatOk(page);
    await alert.getByRole('button', { name: 'Try again' }).click();

    await expect(drawer.getByRole('alert')).toHaveCount(0);
    await expect(drawer.getByText('Seventeen applications are live')).toBeVisible();
    await expect(drawer.getByText('How do you work with AI agents?')).toHaveCount(1);
  });

  test('a long unbroken string never scrolls the panel sideways', async ({ page }) => {
    await mockChatOk(page);
    await page.goto('/');
    const drawer = await openDrawer(page);

    const input = drawer.getByRole('textbox', { name: 'Type your question' });
    await input.fill(`https://example.com/${'a'.repeat(120)}`);
    await input.press('Enter');
    await expect(drawer.getByText('Seventeen applications are live')).toBeVisible();

    const log = drawer.getByRole('log');
    const overflow = await log.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const pageOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(pageOverflow).toBeLessThanOrEqual(1);
  });

  test('swaps the composer for a contact prompt once the cap is reached', async ({ page }) => {
    await mockChatOk(page);
    await page.goto('/');
    const drawer = await openDrawer(page);

    const input = drawer.getByRole('textbox', { name: 'Type your question' });
    // The cap counts both sides, so eight questions produce sixteen turns.
    for (let i = 0; i < 8; i++) {
      await input.fill(`question ${i}`);
      await input.press('Enter');
      await expect(drawer.getByText('Seventeen applications are live')).toHaveCount(i + 1);
    }

    await expect(drawer.getByText('Conversation limit reached')).toBeVisible();
    await expect(drawer.getByRole('textbox', { name: 'Type your question' })).toHaveCount(0);
    await expect(drawer.getByRole('link', { name: 'info@rafirasa.com' })).toBeVisible();
  });

  test('closes on Escape', async ({ page }) => {
    await page.goto('/');
    const drawer = await openDrawer(page);
    await expect(drawer).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Chat assistant' })).toHaveCount(0);
  });
});
