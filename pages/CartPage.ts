import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItemNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartItemNames = page.locator('.inventory_item_name');
  }

  async expectOnCartPage() {
    await expect(this.page).toHaveURL(/cart/);
  }

  async expectItemInCart(name: string) {
    await expect(this.cartItemNames.filter({ hasText: name })).toBeVisible();
  }

  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeItem(name: string) {
    const item = this.cartItems.filter({ hasText: name });
    await item.locator('button').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async getItemNames(): Promise<string[]> {
    return this.cartItemNames.allTextContents();
  }
}
