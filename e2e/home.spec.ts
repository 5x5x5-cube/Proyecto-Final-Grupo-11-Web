import { test, expect } from './fixtures';

test('homepage loads successfully', async ({ homePage }) => {
  await homePage.goto();

  await expect(homePage.heroTitle).toBeVisible();
  await expect(homePage.heroTitle).toHaveText('Tu proxima aventura comienza aqui');
  await expect(homePage.searchButton).toBeVisible();
});
