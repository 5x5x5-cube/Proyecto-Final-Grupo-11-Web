import { test as base } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { ResultsPage } from './pages/results.page';

/**
 * Whether a real backend is available.
 * Tests that need a backend should call: test.skip(!hasBackend, 'Requires backend');
 */
export const hasBackend = !!process.env.E2E_BACKEND_URL;

/**
 * Custom test fixtures that provide page objects to all tests.
 *
 * Usage:
 *   import { test, expect, hasBackend } from './fixtures';
 *
 *   // Test that always runs (uses mocked data or doesn't need backend):
 *   test('homepage loads', async ({ homePage }) => { ... });
 *
 *   // Test that requires a real backend:
 *   test('booking flow creates a reservation', async ({ homePage }) => {
 *     test.skip(!hasBackend, 'Requires backend');
 *     ...
 *   });
 */
export const test = base.extend<{
  homePage: HomePage;
  resultsPage: ResultsPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  resultsPage: async ({ page }, use) => {
    const resultsPage = new ResultsPage(page);
    await use(resultsPage);
  },
});

export { expect } from '@playwright/test';
