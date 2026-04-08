import { test, expect } from './fixtures';

test.describe('Login page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('renders the login form', async ({ loginPage }) => {
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('submit button is disabled when form is empty', async ({ loginPage }) => {
    await expect(loginPage.submitButton).toBeDisabled();
  });

  test('shows email error after blur with invalid email', async ({ loginPage }) => {
    await loginPage.fillEmail('not-an-email');
    await loginPage.blurEmail();

    await expect(loginPage.page.getByText('Invalid email address')).toBeVisible();
  });

  test('no email error for a valid email', async ({ loginPage }) => {
    await loginPage.fillEmail('user@example.com');
    await loginPage.blurEmail();

    await expect(loginPage.page.getByText('Invalid email address')).not.toBeVisible();
  });

  test('enables submit button when form is valid', async ({ loginPage }) => {
    await loginPage.fillEmail('user@example.com');
    await loginPage.fillPassword('password123');

    await expect(loginPage.submitButton).toBeEnabled();
  });

  test('navigates to register page via link', async ({ loginPage, page }) => {
    await loginPage.registerLink.click();

    await expect(page).toHaveURL('/register');
  });
});
