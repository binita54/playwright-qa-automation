import { Page, Locator, expect } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly burgerMenuBtn: Locator;
  readonly closeMenuBtn: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetLink: Locator;
  readonly menuContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
    this.closeMenuBtn = page.locator('#react-burger-cross-btn');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetLink = page.locator('#reset_sidebar_link');
    this.menuContainer = page.locator('.bm-menu-wrap');
  }

  async openMenu() {
    await this.burgerMenuBtn.click();
    await expect(this.menuContainer).toHaveAttribute('aria-hidden', 'false');
  }

  async closeMenu() {
    await this.closeMenuBtn.click();
    await expect(this.menuContainer).toHaveAttribute('aria-hidden', 'true');
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL('/');
  }

  async goToAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
    await expect(this.page).toHaveURL(/inventory/);
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetLink.click();
  }
}
