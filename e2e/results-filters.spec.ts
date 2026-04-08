import { test, expect } from './fixtures';

test.describe('Results page filters', () => {
  test.beforeEach(async ({ homePage, page }) => {
    await homePage.goto();
    await page.locator('text=Cartagena').first().click();
    await expect(page).toHaveURL(/\/results\?destination=Cartagena/);
  });

  test('displays filter sidebar with all filter sections', async ({ resultsPage, page }) => {
    await expect(resultsPage.filtersTitle).toBeVisible();
    await expect(page.getByText('Precio por noche')).toBeVisible();
    await expect(page.getByText('Tipo de alojamiento')).toBeVisible();
    // Use first() to avoid matching the sort dropdown option "Calificacion"
    await expect(page.getByText('Calificacion').first()).toBeVisible();
    await expect(page.getByText('Servicios')).toBeVisible();
  });

  test('sort dropdown has all options', async ({ resultsPage }) => {
    const options = resultsPage.sortSelect.locator('option');

    await expect(options).toHaveCount(5);
    await expect(options.nth(0)).toHaveText('Recomendados');
    await expect(options.nth(1)).toHaveText('Precio: menor a mayor');
    await expect(options.nth(2)).toHaveText('Precio: mayor a menor');
  });

  test('property type tags are clickable and toggle', async ({ page }) => {
    // Scope to the filter sidebar to avoid matching hotel card overline text
    const sidebar = page.locator('text=Filtros').locator('..');
    const hotelTag = sidebar.getByText('Hotel', { exact: true });
    await hotelTag.click();

    // Click again to deselect
    await hotelTag.click();

    // Should still have results visible
    await expect(page.getByText('Ver habitaciones').first()).toBeVisible();
  });

  test('amenity checkboxes are interactive', async ({ page }) => {
    const wifiCheckbox = page.getByLabel('Wi-Fi');
    await expect(wifiCheckbox).not.toBeChecked();

    await wifiCheckbox.check();
    await expect(wifiCheckbox).toBeChecked();

    await wifiCheckbox.uncheck();
    await expect(wifiCheckbox).not.toBeChecked();
  });
});
