import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { NavigationPage } from '../pages/NavigationPage';
import dotenv from 'dotenv';

dotenv.config();

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  navigationPage: NavigationPage;
  authenticatedPage: InventoryPage; // pre-logged-in fixture
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  // Pre-authenticated fixture — skips login step for tests that don't test auth
  authenticatedPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(
      process.env.VALID_USERNAME ?? 'standard_user',
      process.env.VALID_PASSWORD ?? 'secret_sauce'
    );
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectOnInventoryPage();
    await use(inventoryPage);
  },
});

export { expect };
