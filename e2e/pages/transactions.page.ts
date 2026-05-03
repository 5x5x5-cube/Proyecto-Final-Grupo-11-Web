import type { Locator, Page } from '@playwright/test';

/**
 * Page object for the admin transactions monitoring page (/hotel/transactions).
 * Mirrors the pattern of HotelLoginPage / RatesPage.
 */
export class TransactionsPage {
  readonly page: Page;

  readonly title: Locator;
  readonly subtitle: Locator;
  readonly exportButton: Locator;
  readonly statusFilter: Locator;
  readonly methodFilter: Locator;
  readonly dateFromFilter: Locator;
  readonly dateToFilter: Locator;
  readonly clearFiltersButton: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByRole('heading', { name: 'Transacciones', exact: true }).first();
    this.subtitle = page
      .getByText('Monitorea y consulta todas las transacciones de pago', { exact: true })
      .first();
    this.exportButton = page.getByRole('button', { name: 'Exportar CSV' });
    this.statusFilter = page.getByLabel('Estado');
    this.methodFilter = page.getByLabel('Metodo de pago');
    this.dateFromFilter = page.getByLabel('Desde');
    this.dateToFilter = page.getByLabel('Hasta');
    this.clearFiltersButton = page.getByRole('button', { name: 'Limpiar filtros' });
    this.tableRows = page.locator('tbody tr');
  }

  /**
   * Seed a fake hotel admin session in localStorage and navigate.
   * The route is gated by ProtectedHotelRoute, which only inspects the local
   * session, so this is enough to exercise the UI without a real backend.
   */
  async gotoAsAdmin() {
    await this.page.addInitScript(() => {
      try {
        localStorage.setItem('auth_token', 'e2e.fake.jwt');
        localStorage.setItem(
          'auth_user',
          JSON.stringify({
            id: 'e2e-admin',
            name: 'E2E Admin',
            email: 'e2e-admin@hotel.com',
            role: 'hotel_admin',
          })
        );
      } catch {
        // ignore — tests that need the guard will surface this
      }
    });
    await this.page.goto('/hotel/transactions');
  }

  async goto() {
    await this.page.goto('/hotel/transactions');
  }
}
