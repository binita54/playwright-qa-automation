import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly burgerMenu: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_list');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.productTitles = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async expectOnInventoryPage() {
    await expect(this.productList).toBeVisible();
    await expect(this.page).toHaveURL(/inventory/);
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async addItemToCartByName(name: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await item.locator('button').click();
  }

  async removeItemFromCartByName(name: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await item.locator('button').click();
  }

  async getAddButtonTextByName(name: string): Promise<string> {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    return (await item.locator('button').textContent()) ?? '';
  }

  async getCartCount(): Promise<number> {
    const badge = this.cartBadge;
    const visible = await badge.isVisible();
    if (!visible) return 0;
    return parseInt((await badge.textContent()) ?? '0', 10);
  }

  async clickProductByName(name: string) {
    await this.productTitles.filter({ hasText: name }).click();
  }

  async getAllProductTitles(): Promise<string[]> {
    return this.productTitles.allTextContents();
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async navigateToCart() {
    await this.cartIcon.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async openBurgerMenu() {
    await this.burgerMenu.click();
  }
}
