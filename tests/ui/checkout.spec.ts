import { test, expect } from '../../fixtures/index';
import { PRODUCTS, CHECKOUT_INFO } from '../../utils/testData';

test.describe('Checkout Flow', () => {

  test.beforeEach(async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addItemToCartByName(PRODUCTS.backpack);
    await authenticatedPage.navigateToCart();
    await cartPage.proceedToCheckout();
  });

  // TC-017: Complete full checkout flow
  test('TC-017: should complete checkout with valid information', async ({
    checkoutPage,
  }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_INFO.valid;
    await checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
    await checkoutPage.continue();

    // Overview step
    const total = await checkoutPage.getSummaryTotal();
    expect(total).toMatch(/Total:/);

    await checkoutPage.finish();
    await checkoutPage.expectOrderConfirmed();
  });

  // TC-018: Empty form submission (NEGATIVE)
  test('TC-018 [NEGATIVE]: should show error when checkout form is empty', async ({
    checkoutPage,
  }) => {
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage('First Name is required');
  });

  // TC-019: Missing first name
  test('TC-019 [NEGATIVE]: should show error when first name is missing', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillShippingInfo(
      CHECKOUT_INFO.missingFirstName.firstName,
      CHECKOUT_INFO.missingFirstName.lastName,
      CHECKOUT_INFO.missingFirstName.postalCode,
    );
    await checkoutPage.continue();
    await checkoutPage.expectErrorMessage('First Name is required');
  });
});
