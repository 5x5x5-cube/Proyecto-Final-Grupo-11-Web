import { test as base } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { ResultsPage } from './pages/results.page';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { PaymentPage } from './pages/payment.page';
import { PropertyDetailPage } from './pages/property-detail.page';
import { CartPage } from './pages/cart.page';
import { ConfirmationPage } from './pages/confirmation.page';

/**
 * Whether a real backend is available.
 * Tests that need a backend should call: test.skip(!hasBackend, 'Requires backend');
 */
export const hasBackend = !!process.env.E2E_BACKEND_URL;

/**
 * Custom test fixtures that provide page objects to all tests.
 *
 * Usage:
 *   import { test, expect, hasBackend } from './fixtures';
 *
 *   // Test that always runs (uses mocked data or doesn't need backend):
 *   test('homepage loads', async ({ homePage }) => { ... });
 *
 *   // Test that requires a real backend:
 *   test('booking flow creates a reservation', async ({ homePage }) => {
 *     test.skip(!hasBackend, 'Requires backend');
 *     ...
 *   });
 */
export const test = base.extend<{
  homePage: HomePage;
  resultsPage: ResultsPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  paymentPage: PaymentPage;
  propertyDetailPage: PropertyDetailPage;
  cartPage: CartPage;
  confirmationPage: ConfirmationPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  resultsPage: async ({ page }, use) => {
    await use(new ResultsPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  propertyDetailPage: async ({ page }, use) => {
    await use(new PropertyDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  },
});

export { expect } from '@playwright/test';
