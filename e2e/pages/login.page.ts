import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly title: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByText('Iniciar sesion', { exact: true }).first();
    this.emailInput = page.getByLabel('Correo electronico');
    this.passwordInput = page.getByLabel('Contrasena');
    this.submitButton = page.getByRole('button', { name: 'Iniciar sesion' });
    this.registerLink = page.getByText('Registrate');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async fillEmail(value: string) {
    await this.emailInput.fill(value);
  }

  async fillPassword(value: string) {
    await this.passwordInput.fill(value);
  }

  async blurEmail() {
    await this.emailInput.blur();
  }
}
