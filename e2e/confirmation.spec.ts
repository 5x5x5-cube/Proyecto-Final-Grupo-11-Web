import { test, expect, hasBackend } from './fixtures';

test.describe('Confirmation page', () => {
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

  /** Full flow: search → reserve → cart → payment → confirmation */
  const navigateToConfirmation = async (
    propertyDetailPage: any,
    cartPage: any,
    paymentPage: any,
    page: any
  ) => {
    const { checkIn, checkOut } = getCheckDates();

    await propertyDetailPage.goto(hotelId, { checkIn, checkOut, guests: 2 });
    await expect(propertyDetailPage.reserveButton).toBeVisible({ timeout: 15000 });
    await propertyDetailPage.reserveButton.click();

    await expect(page).toHaveURL(/\/checkout\/cart/, { timeout: 10000 });
    await expect(cartPage.continueToPaymentButton).toBeEnabled({ timeout: 20000 });
    await cartPage.continueToPaymentButton.click();

    await expect(page).toHaveURL(/\/checkout\/payment/, { timeout: 10000 });

    await paymentPage.fillCardNumber('4242424242424242');
    await paymentPage.fillCardHolder('Carlos Martinez');
    await paymentPage.fillExpiry('1228');
    await paymentPage.fillCvv('123');
    await paymentPage.payButton.click();

    await expect(page).toHaveURL(/\/checkout\/confirmation\//, { timeout: 30000 });
  };

  // Navigate once, then run all assertions on the same page
  test('full confirmation page after successful payment', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    confirmationPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(180000);

    await navigateToConfirmation(propertyDetailPage, cartPage, paymentPage, page);

    // Title and subtitle
    await expect(confirmationPage.title).toBeVisible({ timeout: 10000 });
    await expect(confirmationPage.subtitle).toBeVisible();

    // Booking code appears async
    await confirmationPage.waitForBookingCode(90000);
    const code = await confirmationPage.getBookingCode();
    expect(code).toMatch(/^BK-[A-Z0-9]+$/i);

    // Sidebar details
    await expect(confirmationPage.sidebarTitle).toBeVisible();
    await expect(confirmationPage.checkInLabel).toBeVisible();
    await expect(confirmationPage.checkOutLabel).toBeVisible();
    await expect(confirmationPage.guestsLabel).toBeVisible();

    // Payment success
    await expect(confirmationPage.paymentSuccessPill).toBeVisible();

    // Action buttons and next steps
    await expect(confirmationPage.viewReservationsButton).toBeVisible();
    await expect(confirmationPage.downloadReceiptButton).toBeVisible();
    await expect(confirmationPage.nextStepsTitle).toBeVisible();
  });

  test('confirmation page survives page reload', async ({
    propertyDetailPage,
    cartPage,
    paymentPage,
    confirmationPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');
    test.setTimeout(180000);

    await navigateToConfirmation(propertyDetailPage, cartPage, paymentPage, page);

    await confirmationPage.waitForBookingCode(90000);
    const codeBefore = await confirmationPage.getBookingCode();

    await page.reload();

    await expect(confirmationPage.title).toBeVisible({ timeout: 15000 });
    await confirmationPage.waitForBookingCode(90000);
    const codeAfter = await confirmationPage.getBookingCode();
    expect(codeAfter).toBe(codeBefore);
  });
});
