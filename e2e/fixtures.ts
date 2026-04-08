import { test as base } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { ResultsPage } from './pages/results.page';

/**
 * Custom test fixtures that provide page objects to all tests.
 *
 * Usage:
 *   import { test, expect } from '../fixtures';
 *   test('my test', async ({ homePage, resultsPage }) => { ... });
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
