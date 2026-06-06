import { test, expect } from '../../fixtures/index';

test.describe('Navigation & Sidebar Menu', () => {

  // TC-020: Open and close burger menu
  test('TC-020: should open and close the sidebar menu', async ({
    authenticatedPage,
    navigationPage,
  }) => {
    await navigationPage.openMenu();
    await navigationPage.closeMenu();
  });

  // TC-021: Navigate to All Items from menu
  test('TC-021: should navigate to all items from sidebar', async ({
    authenticatedPage,
    navigationPage,
    page,
  }) => {
    await authenticatedPage.navigateToCart();
    await navigationPage.goToAllItems();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  // TC-022: Logout via menu
  test('TC-022: should logout via the sidebar menu', async ({
    authenticatedPage,
    navigationPage,
    loginPage,
    page,
  }) => {
    await navigationPage.logout();
    await loginPage.expectLoginPageVisible();
    await expect(page).toHaveURL('/');
  });

  // TC-023: Reset app state clears cart
  test('TC-023: should reset cart when Reset App State is clicked', async ({
    authenticatedPage,
    navigationPage,
  }) => {
    await authenticatedPage.addItemToCartByName('Sauce Labs Backpack');
    const countBefore = await authenticatedPage.getCartCount();
    expect(countBefore).toBe(1);

    await navigationPage.resetAppState();
    await navigationPage.closeMenu();

    const countAfter = await authenticatedPage.getCartCount();
    expect(countAfter).toBe(0);
  });
});
