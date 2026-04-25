import type { Locator, Page } from '@playwright/test';

/**
 * Page object for the hotel admin login page (/hotel/login).
 *
 * Mirrors the shape of `LoginPage` (traveler) so the suite stays consistent.
 * Labels come from `src/i18n/locales/es/hotels.json` (accent-free keys), so
 * we match them literally rather than with regex.
 */
export class HotelLoginPage {
  readonly page: Page;

  readonly title: Locator;
  readonly portalBadge: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // "Bienvenido de vuelta" — rendered as a heading-ish title inside the form.
    this.title = page.getByText('Bienvenido de vuelta', { exact: true });
    this.portalBadge = page.getByText('Portal de Hoteles', { exact: true });
    this.emailInput = page.getByLabel('Correo electronico');
    this.passwordInput = page.getByLabel('Contrasena');
    this.submitButton = page.getByRole('button', { name: 'Iniciar sesion' });
    this.forgotPasswordLink = page.getByText('Olvidaste tu contrasena?');
  }

  async goto() {
    await this.page.goto('/hotel/login');
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

  async submit() {
    await this.submitButton.click();
  }

  /**
   * Full login flow: fill credentials and submit. The caller decides how to
   * wait for navigation (e.g. `waitForURL(/\/hotel\/dashboard/)`) so this
   * helper stays useful for both success and failure paths.
   */
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }
}
