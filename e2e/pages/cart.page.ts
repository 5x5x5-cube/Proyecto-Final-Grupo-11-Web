import type { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly accommodationTitle: Locator;
  readonly paymentSummaryTitle: Locator;
  readonly continueToPaymentButton: Locator;
  readonly totalAmount: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accommodationTitle = page.getByText('Tu alojamiento');
    this.paymentSummaryTitle = page.getByText('Resumen de pago');
    this.continueToPaymentButton = page.getByRole('button', { name: 'Continuar al pago' });
    this.totalAmount = page.getByText('Total a pagar');
  }
}
