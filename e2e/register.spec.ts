import { test, expect } from './fixtures';

test.describe('Register page', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  test('renders the registration form', async ({ registerPage }) => {
    await expect(registerPage.title).toBeVisible();
    await expect(registerPage.nameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.confirmPasswordInput).toBeVisible();
    await expect(registerPage.submitButton).toBeVisible();
  });

  test('submit button is disabled when form is empty', async ({ registerPage }) => {
    await expect(registerPage.submitButton).toBeDisabled();
  });

  test('shows email error for invalid email', async ({ registerPage }) => {
    await registerPage.fillEmail('bad-email');
    await registerPage.blurField(registerPage.emailInput);

    await expect(registerPage.page.getByText('Invalid email address')).toBeVisible();
  });

  test('shows password error when too short', async ({ registerPage }) => {
    await registerPage.fillPassword('123');
    await registerPage.blurField(registerPage.passwordInput);

    await expect(
      registerPage.page.getByText('Password must be at least 6 characters')
    ).toBeVisible();
  });

  test('shows confirm password error when passwords do not match', async ({ registerPage }) => {
    await registerPage.fillPassword('password123');
    await registerPage.fillConfirmPassword('different');
    await registerPage.blurField(registerPage.confirmPasswordInput);

    await expect(registerPage.page.getByText('Passwords do not match')).toBeVisible();
  });

  test('enables submit button when all fields are valid', async ({ registerPage }) => {
    await registerPage.fillName('John Doe');
    await registerPage.fillEmail('john@example.com');
    await registerPage.fillPassword('password123');
    await registerPage.fillConfirmPassword('password123');

    await expect(registerPage.submitButton).toBeEnabled();
  });

  test('navigates to login page via link', async ({ registerPage, page }) => {
    await registerPage.loginLink.click();

    await expect(page).toHaveURL('/login');
  });
});
