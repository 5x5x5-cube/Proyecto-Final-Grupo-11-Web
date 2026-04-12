import type { Locator, Page } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;

  // Header
  readonly resultsCount: Locator;
  readonly sortSelect: Locator;

  // Filters
  readonly filtersTitle: Locator;
  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;

  // Hotel cards — "Ver habitaciones" button indicates a card
  readonly viewRoomsButtons: Locator;

  // Empty state
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;

    this.resultsCount = page.getByText(/\d+ alojamientos/);
    this.sortSelect = page.locator('select');
    this.filtersTitle = page.getByText('Filtros');
    this.minPriceInput = page.locator('input[placeholder="0"]');
    this.maxPriceInput = page.locator('input[placeholder="800000"]');
    this.viewRoomsButtons = page.getByText('Ver habitaciones');
    this.emptyState = page.getByText('No hay hospedajes disponibles');
  }

  async getHotelCardByName(name: string) {
    return this.page.getByText(name, { exact: false });
  }

  async selectPropertyType(type: string) {
    await this.page.getByText(type, { exact: true }).click();
  }

  async setSortBy(value: string) {
    await this.sortSelect.selectOption(value);
  }

  async toggleAmenity(label: string) {
    await this.page.getByLabel(label).check();
  }

  async setPriceRange(min?: string, max?: string) {
    if (min) {
      await this.minPriceInput.fill(min);
    }
    if (max) {
      await this.maxPriceInput.fill(max);
    }
  }
}
