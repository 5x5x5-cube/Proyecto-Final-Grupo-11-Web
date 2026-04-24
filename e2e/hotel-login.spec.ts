import { test, expect, hasBackend } from './fixtures';

// Credentials of the seeded hotel admin. The backend ships this user via
// `_seed_hotel_admin()` in `auth_service/app/routers/auth.py` (admin@hotel.com
// / Admin123!, role `hotel_admin`). When running against a different env,
// override with HOTEL_ADMIN_EMAIL / HOTEL_ADMIN_PASSWORD.
const HOTEL_ADMIN_EMAIL = process.env.HOTEL_ADMIN_EMAIL ?? 'admin@hotel.com';
const HOTEL_ADMIN_PASSWORD = process.env.HOTEL_ADMIN_PASSWORD ?? 'Admin123!';

test.describe('HU3.1 – Iniciar sesión en el portal administrativo', () => {
  // ─── UI tests (no backend required) ────────────────────────────────────────
  test.describe('Página de login – UI', () => {
    test.beforeEach(async ({ hotelLoginPage }) => {
      await hotelLoginPage.goto();
    });

    test('renderiza el formulario de login de hotel', async ({ hotelLoginPage }) => {
      await expect(hotelLoginPage.portalBadge).toBeVisible();
      await expect(hotelLoginPage.title).toBeVisible();
      await expect(hotelLoginPage.emailInput).toBeVisible();
      await expect(hotelLoginPage.passwordInput).toBeVisible();
      await expect(hotelLoginPage.submitButton).toBeVisible();
    });

    test('el botón de iniciar sesión está deshabilitado con el formulario vacío', async ({
      hotelLoginPage,
    }) => {
      await expect(hotelLoginPage.submitButton).toBeDisabled();
    });

    test('muestra error de correo tras blur con email inválido', async ({
      hotelLoginPage,
      page,
    }) => {
      await hotelLoginPage.fillEmail('not-an-email');
      await hotelLoginPage.blurEmail();

      await expect(page.getByText('Ingresa un correo electronico valido')).toBeVisible();
    });

    test('no muestra error de correo para un email válido', async ({ hotelLoginPage, page }) => {
      await hotelLoginPage.fillEmail('admin@hotel.com');
      await hotelLoginPage.blurEmail();

      await expect(page.getByText('Ingresa un correo electronico valido')).not.toBeVisible();
    });

    test('habilita el botón cuando el formulario es válido', async ({ hotelLoginPage }) => {
      await hotelLoginPage.fillEmail('admin@hotel.com');
      await hotelLoginPage.fillPassword('Admin123!');

      await expect(hotelLoginPage.submitButton).toBeEnabled();
    });
  });

  // ─── Guard de ruta protegida (no backend required) ─────────────────────────
  test.describe('ProtectedHotelRoute', () => {
    test('visitar /hotel/dashboard sin sesión redirige a /hotel/login', async ({ page }) => {
      // No seed: the guard must send us to /hotel/login.
      await page.goto('/hotel/dashboard');
      await expect(page).toHaveURL(/\/hotel\/login$/);
    });

    test('visitar /hotel/rates sin sesión redirige a /hotel/login', async ({ page }) => {
      await page.goto('/hotel/rates');
      await expect(page).toHaveURL(/\/hotel\/login$/);
    });

    test('con sesión válida se puede entrar a /hotel/dashboard', async ({ page }) => {
      // Seed a fake admin session — the guard only inspects localStorage, so
      // this exercises the guard's allow-path without touching the backend.
      await page.addInitScript(() => {
        localStorage.setItem('auth_token', 'e2e.fake.jwt');
        localStorage.setItem(
          'auth_user',
          JSON.stringify({
            id: 'e2e-admin',
            name: 'E2E Admin',
            email: 'e2e-admin@hotel.com',
            role: 'hotel_admin',
          })
        );
      });

      await page.goto('/hotel/dashboard');
      await expect(page).toHaveURL(/\/hotel\/dashboard$/);
    });
  });

  // ─── Backend-dependent flow (requires real auth_service) ───────────────────
  test.describe('Flujo de login con backend real', () => {
    test('login con credenciales válidas lleva al dashboard', async ({ hotelLoginPage, page }) => {
      test.skip(!hasBackend, 'Requires backend');
      test.setTimeout(20000);

      await hotelLoginPage.goto();
      await hotelLoginPage.login(HOTEL_ADMIN_EMAIL, HOTEL_ADMIN_PASSWORD);

      await page.waitForURL(/\/hotel\/dashboard$/, { timeout: 10000 });
      await expect(page).toHaveURL(/\/hotel\/dashboard$/);
    });

    test('login con credenciales inválidas muestra mensaje genérico y no navega', async ({
      hotelLoginPage,
      page,
    }) => {
      test.skip(!hasBackend, 'Requires backend');
      test.setTimeout(20000);

      await hotelLoginPage.goto();
      await hotelLoginPage.login('admin@hotel.com', 'ThisIsNotThePassword');

      // Generic message — no distinction between "user not found" and "bad
      // password" (CA2: avoid user enumeration).
      await expect(page.getByText('Usuario o contrasena incorrectos')).toBeVisible({
        timeout: 5000,
      });
      await expect(page).toHaveURL(/\/hotel\/login$/);
    });
  });
});
