import { test, expect, hasBackend } from './fixtures';

test.describe('Payment flow', () => {
  // Run sequentially — each test creates a cart which needs its own hold
  test.describe.configure({ mode: 'serial' });

  const hotelId = 'a1000000-0000-0000-0000-000000000001';

  const getCheckDates = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkOut = new Date(tomorrow);
    checkOut.setDate(checkOut.getDate() + 3);
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    return { checkIn: fmt(tomorrow), checkOut: fmt(checkOut) };
  };

  /** Full UI flow: search → property → reserve → cart → continue → payment */
  const navigateToPayment = async (propertyDetailPage: any, cartPage: any, page: any) => {
    const { checkIn, checkOut } = getCheckDates();

    await propertyDetailPage.goto(hotelId, { checkIn, checkOut, guests: 2 });
    await expect(propertyDetailPage.reserveButton).toBeVisible({ timeout: 15000 });
    await propertyDetailPage.reserveButton.click();

    await expect(page).toHaveURL(/\/checkout\/cart/, { timeout: 10000 });
    await expect(cartPage.continueToPaymentButton).toBeEnabled({ timeout: 20000 });
    await cartPage.continueToPaymentButton.click();

    await expect(page).toHaveURL(/\/checkout\/payment/, { timeout: 10000 });
  };

  // ─── Card payment tests ───

  test('card: successful payment reaches confirmation', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(90000);

    await navigateToPayment(propertyDetailPage, cartPage, page);

    await paymentPage.fillCardNumber('4242424242424242');
    await paymentPage.fillCardHolder('Carlos Martinez');
    await paymentPage.fillExpiry('1228');
    await paymentPage.fillCvv('123');

    await expect(paymentPage.payButton).toBeEnabled();
    await paymentPage.payButton.click();

    await expect(page).toHaveURL(/\/checkout\/confirmation/, { timeout: 30000 });
  });

  test('card: declined card shows error feedback and stays on page', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(90000);

    await navigateToPayment(propertyDetailPage, cartPage, page);

    await paymentPage.fillCardNumber('4000000000000002');
    await paymentPage.fillCardHolder('Test Decline');
    await paymentPage.fillExpiry('1228');
    await paymentPage.fillCvv('123');

    await paymentPage.payButton.click();

    // Button re-enables after decline (proves the gateway processed and rejected)
    await expect(paymentPage.payButton).toBeEnabled({ timeout: 20000 });

    // Should NOT navigate to confirmation — stays on payment
    await expect(page).toHaveURL(/\/checkout\/payment/);
  });

  test('card: expired magic card is declined and stays on page', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(90000);

    await navigateToPayment(propertyDetailPage, cartPage, page);

    await paymentPage.fillCardNumber('4000000000000069');
    await paymentPage.fillCardHolder('Test Expired');
    await paymentPage.fillExpiry('1228');
    await paymentPage.fillCvv('123');

    await paymentPage.payButton.click();

    await expect(paymentPage.payButton).toBeEnabled({ timeout: 20000 });
    await expect(page).toHaveURL(/\/checkout\/payment/);
  });

  // ─── Wallet payment test ───

  test('wallet: successful PayPal payment reaches confirmation', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(90000);

    await navigateToPayment(propertyDetailPage, cartPage, page);

    await paymentPage.selectWalletMethod();
    await paymentPage.selectWalletProvider('paypal');
    await paymentPage.fillWalletEmail('carlos@example.com');

    await expect(paymentPage.payButton).toBeEnabled();
    await paymentPage.payButton.click();

    await expect(page).toHaveURL(/\/checkout\/confirmation/, { timeout: 30000 });
  });

  // ─── Transfer payment test ───

  test('transfer: successful bank transfer reaches confirmation', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(90000);

    await navigateToPayment(propertyDetailPage, cartPage, page);

    await paymentPage.selectTransferMethod();
    await paymentPage.selectBank('007');
    await paymentPage.fillAccountNumber('1234567890');
    await paymentPage.fillAccountHolder('Carlos Martinez');

    await expect(paymentPage.payButton).toBeEnabled();
    await paymentPage.payButton.click();

    await expect(page).toHaveURL(/\/checkout\/confirmation/, { timeout: 30000 });
  });

  // ─── Form validation tests ───

  test('pay button is disabled with empty form', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(60000);

    await navigateToPayment(propertyDetailPage, cartPage, page);

    await expect(paymentPage.payButton).toBeDisabled();
  });

  test('card fields are visible on payment page', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(60000);

    await navigateToPayment(propertyDetailPage, cartPage, page);

    await expect(paymentPage.cardNumberInput).toBeVisible();
    await expect(paymentPage.expiryInput).toBeVisible();
    await expect(paymentPage.cvvInput).toBeVisible();
  });

  test('wallet tab shows wallet form', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(60000);

    await navigateToPayment(propertyDetailPage, cartPage, page);

    await paymentPage.selectWalletMethod();
    await expect(paymentPage.walletEmailInput).toBeVisible();
  });

  test('transfer tab shows transfer form', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(60000);

    await navigateToPayment(propertyDetailPage, cartPage, page);

    await paymentPage.selectTransferMethod();
    await expect(paymentPage.accountNumberInput).toBeVisible();
  });
});
