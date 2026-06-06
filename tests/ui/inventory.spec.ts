import { test, expect } from '../../fixtures/index';
import { PRODUCTS } from '../../utils/testData';

test.describe('Inventory & Sorting', () => {

  // TC-007: Sort products A-Z
  test('TC-007: should display products sorted A to Z by default', async ({ authenticatedPage }) => {
    const titles = await authenticatedPage.getAllProductTitles();
    const sorted = [...titles].sort();
    expect(titles).toEqual(sorted);
  });

  // TC-008: Sort products Z-A
  test('TC-008: should sort products Z to A', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('za');
    const titles = await authenticatedPage.getAllProductTitles();
    const sortedDesc = [...titles].sort().reverse();
    expect(titles).toEqual(sortedDesc);
  });

  // TC-009: Sort by price low to high
  test('TC-009: should sort products by price low to high', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('lohi');
    const prices = await authenticatedPage.getAllProductPrices();
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  // TC-010: Sort by price high to low
  test('TC-010: should sort products by price high to low', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('hilo');
    const prices = await authenticatedPage.getAllProductPrices();
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  });

  // TC-011: Navigate to product detail page
  test('TC-011: should navigate to product detail page on click', async ({
    authenticatedPage,
    page,
  }) => {
    await authenticatedPage.clickProductByName(PRODUCTS.backpack);
    await expect(page).toHaveURL(/inventory-item/);
    await expect(page.locator('.inventory_details_name')).toContainText(PRODUCTS.backpack);
  });
});
