import type { Locator, Page } from '@playwright/test';

export class RatesPage {
  readonly page: Page;

  readonly title: Locator;
  readonly newRateButton: Locator;
  readonly searchInput: Locator;

  readonly filterAll: Locator;
  readonly filterStandard: Locator;
  readonly filterWeekend: Locator;
  readonly filterSeason: Locator;
  readonly filterPromo: Locator;

  readonly tableRows: Locator;

  readonly editPanel: Locator;
  readonly roomSelect: Locator;
  readonly priceInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByText('Gestion de Tarifas');
    this.newRateButton = page.getByRole('button', { name: 'Nueva tarifa' });
    this.searchInput = page.getByPlaceholder('Buscar tarifa o habitacion...');

    this.filterAll = page.getByText('Todas', { exact: true });
    this.filterStandard = page.getByText('Estandar', { exact: true }).first();
    this.filterWeekend = page.getByText('Fin de semana', { exact: true }).first();
    this.filterSeason = page.getByText('Temporada', { exact: true });
    this.filterPromo = page.getByText('Promocional', { exact: true }).first();

    this.tableRows = page.locator('tbody tr');

    this.editPanel = page.getByText('Guardar tarifa');
    this.roomSelect = page.locator('select').first();
    this.priceInput = page.locator('input[type="number"]');
    this.startDateInput = page.locator('input[type="date"]').first();
    this.endDateInput = page.locator('input[type="date"]').last();
    this.saveButton = page.getByRole('button', { name: 'Guardar tarifa' });
    this.cancelButton = page.getByRole('button', { name: 'Cancelar' });
  }

  /**
   * Navigate to the rates page. The route sits behind `ProtectedHotelRoute`,
   * which reads the session from `localStorage`. For UI-only tests we seed
   * a fake admin session before navigating — that avoids hitting the auth
   * API while still exercising the real guard. Backend-dependent tests use
   * `loginAndGoto()` instead, which does a proper login round-trip.
   */
  async goto() {
    // `addInitScript` runs before any page script on every navigation in this
    // context, so the guard sees a populated `localStorage` on first render.
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
        // Storage not available — tests that need the guard will surface this.
      }
    });
    await this.page.goto('/hotel/rates');
  }

  async loginAndGoto(email: string, password: string) {
    await this.page.goto('/hotel/login');
    await this.page.getByLabel('Correo electronico').fill(email);
    await this.page.getByLabel('Contrasena').fill(password);
    await this.page.getByRole('button', { name: 'Iniciar sesion' }).click();
    await this.page.waitForURL(/\/hotel\/dashboard/, { timeout: 10000 });
    await this.page.goto('/hotel/rates');
  }

  async openCreatePanel() {
    await this.newRateButton.click();
  }

  /** Click one of the 4 rate-type option cards inside the open panel */
  async selectRateType(type: 'standard' | 'weekend' | 'season' | 'promo') {
    const descMap = {
      standard: 'Precio base regular',
      weekend: 'Vie, Sab, Dom',
      season: 'Rango de fechas',
      promo: 'Descuento especial',
    };
    await this.page.getByText(descMap[type], { exact: true }).click();
  }

  async fillPrice(price: string) {
    await this.priceInput.fill(price);
  }

  async clickEditButton(rowIndex: number) {
    const buttons = this.tableRows.nth(rowIndex).getByRole('button');
    await buttons.first().click();
  }

  async clickDeleteButton(rowIndex: number) {
    const buttons = this.tableRows.nth(rowIndex).getByRole('button');
    await buttons.last().click();
  }

  async getRowCount() {
    return this.tableRows.count();
  }
}
