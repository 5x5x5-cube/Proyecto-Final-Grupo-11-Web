import type { Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  readonly title: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByText('Crear cuenta', { exact: true }).first();
    this.nameInput = page.getByLabel('Nombre completo');
    this.emailInput = page.getByLabel('Correo electronico');
    this.passwordInput = page.getByLabel('Contrasena', { exact: true });
    this.confirmPasswordInput = page.getByLabel('Confirmar contrasena');
    this.submitButton = page.getByRole('button', { name: 'Crear cuenta' });
    this.loginLink = page.getByText('Inicia sesion');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async fillName(value: string) {
    await this.nameInput.fill(value);
  }

  async fillEmail(value: string) {
    await this.emailInput.fill(value);
  }

  async fillPassword(value: string) {
    await this.passwordInput.fill(value);
  }

  async fillConfirmPassword(value: string) {
    await this.confirmPasswordInput.fill(value);
  }

  async blurField(field: Locator) {
    await field.blur();
  }
}
