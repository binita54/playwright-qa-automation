import { test, expect } from '../../fixtures/index';
import { PRODUCTS } from '../../utils/testData';

test.describe('Cart — Add & Remove Actions', () => {

  // TC-012: Add single item to cart
  test('TC-012: should add a product to cart and show badge count', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addItemToCartByName(PRODUCTS.backpack);
    const count = await authenticatedPage.getCartCount();
    expect(count).toBe(1);
  });

  // TC-013: Add multiple items to cart
  test('TC-013: should add multiple products and reflect correct badge count', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addItemToCartByName(PRODUCTS.backpack);
    await authenticatedPage.addItemToCartByName(PRODUCTS.bikeLight);
    await authenticatedPage.addItemToCartByName(PRODUCTS.boltTShirt);
    const count = await authenticatedPage.getCartCount();
    expect(count).toBe(3);
  });

  // TC-014: Remove item from inventory page
  test('TC-014: should remove an item from inventory page and update badge', async ({
    authenticatedPage,
  }) => {
    await authenticatedPage.addItemToCartByName(PRODUCTS.backpack);
    await authenticatedPage.addItemToCartByName(PRODUCTS.bikeLight);
    await authenticatedPage.removeItemFromCartByName(PRODUCTS.backpack);
    const count = await authenticatedPage.getCartCount();
    expect(count).toBe(1);
  });

  // TC-015: Remove item from cart page
  test('TC-015: should remove item directly from the cart page', async ({
    authenticatedPage,
    cartPage,
  }) => {
    await authenticatedPage.addItemToCartByName(PRODUCTS.backpack);
    await authenticatedPage.addItemToCartByName(PRODUCTS.bikeLight);
    await authenticatedPage.navigateToCart();
    await cartPage.expectItemCount(2);
    await cartPage.removeItem(PRODUCTS.backpack);
    await cartPage.expectItemCount(1);
  });

  // TC-016: Cart persists correct items
  test('TC-016: should show added items in the cart correctly', async ({
    authenticatedPage,
    cartPage,
  }) => {
    await authenticatedPage.addItemToCartByName(PRODUCTS.fleeceJacket);
    await authenticatedPage.navigateToCart();
    await cartPage.expectItemInCart(PRODUCTS.fleeceJacket);
  });
});
