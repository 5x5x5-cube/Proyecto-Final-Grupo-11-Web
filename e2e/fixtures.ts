import { test as base } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { ResultsPage } from './pages/results.page';
import { LoginPage } from './pages/login.page';
import { RegisterPage } from './pages/register.page';
import { PaymentPage } from './pages/payment.page';
import { PropertyDetailPage } from './pages/property-detail.page';
import { CartPage } from './pages/cart.page';
import { ConfirmationPage } from './pages/confirmation.page';
import { RatesPage } from './pages/rates.page';
import { HotelLoginPage } from './pages/hotel-login.page';

/**
 * Whether a real backend is available.
 * Tests that need a backend should call: test.skip(!hasBackend, 'Requires backend');
 */
export const hasBackend = !!process.env.E2E_BACKEND_URL;

/** API base URL for direct backend calls in fixtures. */
const apiBaseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:8090/api/v1';

/** Test traveler credentials (must exist in the auth service). */
export const TEST_TRAVELER = {
  email: 'e2e-traveler@test.com',
  password: 'Test1234',
  name: 'E2E Traveler',
};

/** Test hotel admin credentials. */
export const TEST_HOTEL_ADMIN = {
  email: 'admin@hotel.com',
  password: 'Admin123!',
};

/**
 * Ensures the test traveler user exists by attempting registration.
 * Idempotent — ignores "already registered" errors.
 */
async function ensureTestTraveler(): Promise<{ token: string; userId: string }> {
  // Try to register first (idempotent)
  await fetch(`${apiBaseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: TEST_TRAVELER.email,
      password: TEST_TRAVELER.password,
      name: TEST_TRAVELER.name,
    }),
  }).catch(() => {});

  // Login to get a fresh token
  const resp = await fetch(`${apiBaseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: TEST_TRAVELER.email,
      password: TEST_TRAVELER.password,
    }),
  });

  if (!resp.ok) throw new Error(`Login failed: ${resp.status}`);
  const data = (await resp.json()) as { access_token: string; user_id: string };
  return { token: data.access_token, userId: data.user_id };
}

export const test = base.extend<{
  homePage: HomePage;
  resultsPage: ResultsPage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  paymentPage: PaymentPage;
  propertyDetailPage: PropertyDetailPage;
  cartPage: CartPage;
  confirmationPage: ConfirmationPage;
  ratesPage: RatesPage;
  hotelLoginPage: HotelLoginPage;
  authenticatedPage: void;
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

  ratesPage: async ({ page }, use) => {
    await use(new RatesPage(page));
  },

  hotelLoginPage: async ({ page }, use) => {
    await use(new HotelLoginPage(page));
  },

  /**
   * Fixture that logs in as a test traveler before the test runs.
   * Sets auth_token and user_id in localStorage so the gateway accepts requests.
   * Use: test('my test', async ({ authenticatedPage, cartPage, page }) => { ... });
   */
  authenticatedPage: async ({ page }, use) => {
    const { token, userId } = await ensureTestTraveler();
    await page.goto('/');
    await page.evaluate(
      ({ token, userId }) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_id', userId);
      },
      { token, userId }
    );
    await use();
  },
});

export { expect } from '@playwright/test';
