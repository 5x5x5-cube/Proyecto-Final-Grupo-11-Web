import { test, expect } from './fixtures';

test.describe('Search flow', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('shows validation errors when searching without filling fields', async ({
    homePage,
    page,
  }) => {
    await homePage.search();

    // The error hint text should appear — use a specific error message
    await expect(page.getByText('Selecciona un destino')).toBeVisible();
  });

  test('completes a full search and displays results', async ({ homePage, resultsPage, page }) => {
    await homePage.fillSearchAndSubmit({
      destination: 'Cartagena',
      checkIn: 'Tomorrow',
      checkOut: '+3 days',
      guests: 2,
    });

    // Should navigate to results page with correct query params
    await expect(page).toHaveURL(/\/results\?/);
    await expect(page).toHaveURL(/destination=Cartagena/);
    await expect(page).toHaveURL(/guests=2/);

    // Results page should show hotel cards
    await expect(resultsPage.resultsCount).toBeVisible();
    await expect(resultsPage.filtersTitle).toBeVisible();

    // At least one "Ver habitaciones" button should be visible (= at least 1 hotel card)
    await expect(resultsPage.viewRoomsButtons.first()).toBeVisible();
  });

  test('clicking a popular destination navigates to results', async ({ homePage, page }) => {
    await expect(homePage.heroTitle).toBeVisible();

    // Click the first destination card
    const destinationCard = page.locator('text=Cartagena').first();
    await destinationCard.click();

    await expect(page).toHaveURL(/\/results\?destination=Cartagena/);
  });
});
