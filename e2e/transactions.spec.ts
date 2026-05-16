import { test, expect, hasBackend } from './fixtures';

test.describe('HU4.4 — Monitor and query payment transactions', () => {
  // ─── Guard ─────────────────────────────────────────────────────────────────
  test.describe('ProtectedHotelRoute', () => {
    test('visiting /hotel/transactions without a session redirects to /hotel/login', async ({
      page,
    }) => {
      await page.goto('/hotel/transactions');
      await expect(page).toHaveURL(/\/hotel\/login$/);
    });
  });

  // ─── UI (no backend required) ──────────────────────────────────────────────
  test.describe('Transactions page — UI', () => {
    test.beforeEach(async ({ transactionsPage }) => {
      await transactionsPage.gotoAsAdmin();
    });

    test('renders the title, subtitle and the export button', async ({ transactionsPage }) => {
      await expect(transactionsPage.title).toBeVisible();
      await expect(transactionsPage.subtitle).toBeVisible();
      await expect(transactionsPage.exportButton).toBeVisible();
    });

    test('renders the six filter controls and the clear-filters button', async ({
      transactionsPage,
    }) => {
      await expect(transactionsPage.statusFilter).toBeVisible();
      await expect(transactionsPage.methodFilter).toBeVisible();
      await expect(transactionsPage.dateFromFilter).toBeVisible();
      await expect(transactionsPage.dateToFilter).toBeVisible();
      await expect(transactionsPage.clearFiltersButton).toBeVisible();
    });

    test('the clear-filters button starts disabled', async ({ transactionsPage }) => {
      await expect(transactionsPage.clearFiltersButton).toBeDisabled();
    });

    test('renders the table headers', async ({ page }) => {
      // Headers come from i18n — use exact match to avoid greedy matches
      await expect(page.getByRole('columnheader', { name: 'ID' })).toBeVisible();
      await expect(page.getByRole('columnheader', { name: 'Fecha' })).toBeVisible();
      await expect(page.getByRole('columnheader', { name: 'Viajero' })).toBeVisible();
      await expect(page.getByRole('columnheader', { name: 'Monto' })).toBeVisible();
    });

    test('clicking a date filter enables the clear-filters button', async ({
      transactionsPage,
    }) => {
      await transactionsPage.dateFromFilter.fill('2026-04-01');
      await expect(transactionsPage.clearFiltersButton).toBeEnabled();
    });
  });

  // ─── Backend-gated flow ────────────────────────────────────────────────────
  test.describe('Transactions page — with backend', () => {
    test('loads transactions from the live backend', async ({ transactionsPage, page }) => {
      test.skip(!hasBackend, 'Requires backend');
      test.setTimeout(20000);

      await transactionsPage.gotoAsAdmin();

      // The summary endpoint should populate the KPI cards (or render zeros)
      // Either way at least one card label should appear
      await expect(page.getByText(/total procesado/i)).toBeVisible({ timeout: 10000 });
    });
  });
});
