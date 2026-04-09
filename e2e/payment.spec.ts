import { test, expect } from './fixtures';

test.describe('Payment page', () => {
  test.beforeEach(async ({ paymentPage }) => {
    await paymentPage.goto();
  });

  test('renders the payment form with card preview', async ({ paymentPage }) => {
    await expect(paymentPage.cardNumberInput).toBeVisible();
    await expect(paymentPage.expiryInput).toBeVisible();
    await expect(paymentPage.cvvInput).toBeVisible();
    await expect(paymentPage.cardPreview).toBeVisible();
  });

  test('pay button is disabled when form is empty', async ({ paymentPage }) => {
    await expect(paymentPage.payButton).toBeDisabled();
  });

  test('formats card number with spaces every 4 digits', async ({ paymentPage }) => {
    await paymentPage.fillCardNumber('4242424242424242');

    await expect(paymentPage.cardNumberInput).toHaveValue('4242 4242 4242 4242');
  });

  test('formats expiry as MM/YY', async ({ paymentPage }) => {
    await paymentPage.fillExpiry('1228');

    await expect(paymentPage.expiryInput).toHaveValue('12/28');
  });

  test('limits CVV to 3 digits', async ({ paymentPage }) => {
    await paymentPage.fillCvv('12345');

    await expect(paymentPage.cvvInput).toHaveValue('123');
  });

  test('enables pay button when all fields are valid', async ({ paymentPage }) => {
    await paymentPage.fillCardNumber('4242424242424242');
    await paymentPage.fillCardHolder('CARLOS MARTINEZ');
    await paymentPage.fillExpiry('1228');
    await paymentPage.fillCvv('123');

    await expect(paymentPage.payButton).toBeEnabled();
  });
});
