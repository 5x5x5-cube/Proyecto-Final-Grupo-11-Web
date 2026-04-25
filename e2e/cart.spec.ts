import { test, expect, hasBackend } from './fixtures';

test.describe('Cart flow', () => {
  test('selecting a room and reserving creates a cart', async ({
    propertyDetailPage,
    cartPage,
    page,
  }) => {
    test.skip(!hasBackend, 'Requires backend');

    // Use the seeded Cartagena hotel with dates that have availability
    const hotelId = 'a1000000-0000-0000-0000-000000000001';
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const checkOut = new Date(tomorrow);
    checkOut.setDate(checkOut.getDate() + 3);

    const fmt = (d: Date) => d.toISOString().split('T')[0];

    await propertyDetailPage.goto(hotelId, {
      checkIn: fmt(tomorrow),
      checkOut: fmt(checkOut),
      guests: 2,
    });

    // Hotel detail should render with the hotel name and rooms
    await expect(propertyDetailPage.hotelTitle).toContainText('Hotel Caribe Plaza');
    await expect(propertyDetailPage.reserveButton).toBeVisible();

    // Click "Reservar ahora"
    await propertyDetailPage.reserveButton.click();

    // Should navigate to the cart page
    await expect(page).toHaveURL(/\/checkout\/cart/);

    // Cart page should show the accommodation summary and payment sidebar
    await expect(cartPage.accommodationTitle).toBeVisible();
    await expect(cartPage.paymentSummaryTitle).toBeVisible();
    await expect(cartPage.totalAmount).toBeVisible();
    await expect(cartPage.continueToPaymentButton).toBeVisible();
    await expect(cartPage.continueToPaymentButton).toBeEnabled();
  });
});
