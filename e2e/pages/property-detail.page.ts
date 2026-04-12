import type { Locator, Page } from '@playwright/test';

export class PropertyDetailPage {
  readonly page: Page;

  readonly hotelTitle: Locator;
  readonly reserveButton: Locator;
  readonly roomCards: Locator;

  constructor(page: Page) {
    this.page = page;

    this.hotelTitle = page.locator('h1');
    this.reserveButton = page.getByRole('button', { name: 'Reservar ahora' });
    this.roomCards = page.getByText('Seleccionar');
  }

  async goto(hotelId: string, params: { checkIn: string; checkOut: string; guests: number }) {
    const qs = new URLSearchParams({
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      guests: String(params.guests),
    });
    await this.page.goto(`/property/${hotelId}?${qs}`);
  }
}
