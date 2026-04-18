import type { Locator, Page } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;

  // Method selector
  readonly cardTab: Locator;
  readonly walletTab: Locator;
  readonly transferTab: Locator;

  // Card form
  readonly cardNumberInput: Locator;
  readonly cardHolderInput: Locator;
  readonly expiryInput: Locator;
  readonly cvvInput: Locator;
  readonly currencySelect: Locator;
  readonly cardPreview: Locator;

  // Wallet form
  readonly walletProviderSelect: Locator;
  readonly walletEmailInput: Locator;

  // Transfer form
  readonly bankSelect: Locator;
  readonly accountNumberInput: Locator;
  readonly accountHolderInput: Locator;

  // Shared
  readonly payButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Spanish labels/placeholders from i18n (default locale is ES)
    this.cardTab = page.getByRole('radio', { name: 'Tarjeta' });
    this.walletTab = page.getByRole('radio', { name: 'Billetera digital' });
    this.transferTab = page.getByRole('radio', { name: 'Transferencia' });

    this.cardNumberInput = page.locator('input[placeholder="1234 5678 9012 3456"]');
    this.cardHolderInput = page.getByRole('textbox').nth(1);
    this.expiryInput = page.locator('input[placeholder="MM/AA"]');
    this.cvvInput = page.locator('input[placeholder="•••"]');
    this.currencySelect = page.locator('select');
    this.cardPreview = page.getByText('VISA').locator('..');

    this.walletProviderSelect = page.locator('select');
    this.walletEmailInput = page.locator('input[placeholder="tu@ejemplo.com"]');

    this.bankSelect = page.locator('select');
    this.accountNumberInput = page.locator('input[placeholder="Ingrese su numero de cuenta"]');
    this.accountHolderInput = page.locator('input[placeholder="Nombre completo del titular"]');

    this.payButton = page.getByRole('button', { name: /Pagar/ });
  }

  async goto() {
    await this.page.goto('/checkout/payment');
  }

  async selectCardMethod() {
    await this.cardTab.click();
  }

  async selectWalletMethod() {
    await this.walletTab.click();
  }

  async selectTransferMethod() {
    await this.transferTab.click();
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

  async fillWalletEmail(value: string) {
    await this.walletEmailInput.fill(value);
  }

  async selectWalletProvider(value: string) {
    await this.walletProviderSelect.selectOption(value);
  }

  async selectBank(value: string) {
    await this.bankSelect.selectOption(value);
  }

  async fillAccountNumber(value: string) {
    await this.accountNumberInput.fill(value);
  }

  async fillAccountHolder(value: string) {
    await this.accountHolderInput.fill(value);
  }
}
