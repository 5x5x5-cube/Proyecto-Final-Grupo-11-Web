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

  test('switching to wallet reveals the wallet form and hides the card form', async ({
    paymentPage,
  }) => {
    await paymentPage.selectWalletMethod();

    await expect(paymentPage.walletEmailInput).toBeVisible();
    await expect(paymentPage.cardNumberInput).toHaveCount(0);
    await expect(paymentPage.walletTab).toHaveAttribute('aria-checked', 'true');
  });

  test('wallet flow: pay button stays disabled with invalid email and enables with a valid one', async ({
    paymentPage,
  }) => {
    await paymentPage.selectWalletMethod();
    await paymentPage.selectWalletProvider('paypal');

    await paymentPage.fillWalletEmail('not-an-email');
    await expect(paymentPage.payButton).toBeDisabled();

    await paymentPage.fillWalletEmail('buyer@example.com');
    await expect(paymentPage.payButton).toBeEnabled();
  });

  test('switching to transfer reveals the transfer form and hides the card form', async ({
    paymentPage,
  }) => {
    await paymentPage.selectTransferMethod();

    await expect(paymentPage.accountNumberInput).toBeVisible();
    await expect(paymentPage.accountHolderInput).toBeVisible();
    await expect(paymentPage.cardNumberInput).toHaveCount(0);
    await expect(paymentPage.transferTab).toHaveAttribute('aria-checked', 'true');
  });

  test('transfer form only accepts digits in the account number', async ({ paymentPage }) => {
    await paymentPage.selectTransferMethod();

    await paymentPage.fillAccountNumber('12a3-4b5');

    await expect(paymentPage.accountNumberInput).toHaveValue('12345');
  });

  test('transfer flow: pay button enables when bank, account and holder are valid', async ({
    paymentPage,
  }) => {
    await paymentPage.selectTransferMethod();
    await paymentPage.selectBank('007');
    await paymentPage.fillAccountNumber('12345');

    await expect(paymentPage.payButton).toBeDisabled();

    await paymentPage.fillAccountNumber('1234567');
    await paymentPage.fillAccountHolder('Ada Lovelace');

    await expect(paymentPage.payButton).toBeEnabled();
  });
});
