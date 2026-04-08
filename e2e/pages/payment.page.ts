import type { Locator, Page } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;

  readonly cardNumberInput: Locator;
  readonly cardHolderInput: Locator;
  readonly expiryInput: Locator;
  readonly cvvInput: Locator;
  readonly currencySelect: Locator;
  readonly payButton: Locator;
  readonly cardPreview: Locator;

  constructor(page: Page) {
    this.page = page;

    // Spanish placeholders from i18n
    this.cardNumberInput = page.locator('input[placeholder="1234 5678 9012 3456"]');
    // Card holder is the second textbox (after card number)
    this.cardHolderInput = page.getByRole('textbox').nth(1);
    this.expiryInput = page.locator('input[placeholder="MM/AA"]');
    this.cvvInput = page.locator('input[placeholder="•••"]');
    this.currencySelect = page.locator('select');
    this.payButton = page.getByRole('button', { name: /Pagar/ });
    this.cardPreview = page.getByText('VISA').locator('..');
  }

  async goto() {
    await this.page.goto('/checkout/payment');
  }

  async fillCardNumber(value: string) {
    await this.cardNumberInput.fill(value);
  }

  async fillCardHolder(value: string) {
    await this.cardHolderInput.fill(value);
  }

  async fillExpiry(value: string) {
    await this.expiryInput.fill(value);
  }

  async fillCvv(value: string) {
    await this.cvvInput.fill(value);
  }
}
