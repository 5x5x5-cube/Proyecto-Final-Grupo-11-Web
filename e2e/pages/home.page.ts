import type { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Hero
  readonly heroTitle: Locator;

  // Search card fields — use exact label text to avoid matching "Destinos populares" etc.
  readonly destinationField: Locator;
  readonly checkInField: Locator;
  readonly checkOutField: Locator;
  readonly guestsField: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heroTitle = page.locator('h1');
    this.destinationField = page.getByText('Destino', { exact: true }).locator('..');
    this.checkInField = page.getByText('Llegada', { exact: true }).locator('..');
    this.checkOutField = page.getByText('Salida', { exact: true }).locator('..');
    this.guestsField = page.getByText('Huespedes', { exact: true }).locator('..');
    this.searchButton = page.getByRole('button', { name: 'Buscar' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async selectDestination(name: string) {
    await this.destinationField.click();
    // Scope to the MUI Popover to avoid matching destination cards in the background
    const popover = this.page.locator('.MuiPopover-paper');
    await popover.getByText(name, { exact: true }).click();
  }

  async selectCheckIn(label: string) {
    await this.checkInField.click();
    await this.page.getByText(label, { exact: true }).click();
  }

  async selectCheckOut(label: string) {
    await this.checkOutField.click();
    await this.page.getByText(label, { exact: true }).click();
  }

  async setGuests(count: number) {
    await this.guestsField.click();
    const popover = this.page.locator('.MuiPopover-paper');
    // The guest counter has two icon buttons: [-] and [+]. The [+] is the last one.
    const addButton = popover.locator('button').last();
    for (let i = 1; i < count; i++) {
      await addButton.click();
    }
    // Close the popover by pressing Escape
    await this.page.keyboard.press('Escape');
  }

  async search() {
    await this.searchButton.click();
  }

  async fillSearchAndSubmit(options: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests?: number;
  }) {
    await this.selectDestination(options.destination);
    await this.selectCheckIn(options.checkIn);
    await this.selectCheckOut(options.checkOut);
    if (options.guests && options.guests > 1) {
      await this.setGuests(options.guests);
    }
    await this.search();
  }
}
