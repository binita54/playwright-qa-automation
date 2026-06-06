import { test, expect } from '../../fixtures/index';
import { USERS, ERROR_MESSAGES } from '../../utils/testData';

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // TC-001: Valid login
  test('TC-001: should login successfully with valid credentials', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectOnInventoryPage();
  });

  // TC-002: Locked out user
  test('TC-002: should show error for locked out user', async ({ loginPage }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);
    await loginPage.expectErrorMessage(ERROR_MESSAGES.lockedUser);
  });

  // TC-003: Invalid credentials (NEGATIVE)
  test('TC-003 [NEGATIVE]: should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await loginPage.expectErrorMessage(ERROR_MESSAGES.invalidCredentials);
  });

  // TC-004: Empty username (NEGATIVE)
  test('TC-004 [NEGATIVE]: should show error when username is empty', async ({ loginPage }) => {
    await loginPage.login(USERS.emptyUsername.username, USERS.emptyUsername.password);
    await loginPage.expectErrorMessage(ERROR_MESSAGES.usernameRequired);
  });

  // TC-005: Empty password (NEGATIVE)
  test('TC-005 [NEGATIVE]: should show error when password is empty', async ({ loginPage }) => {
    await loginPage.login(USERS.emptyPassword.username, USERS.emptyPassword.password);
    await loginPage.expectErrorMessage(ERROR_MESSAGES.passwordRequired);
  });

  // TC-006: Logout flow
  test('TC-006: should logout successfully and redirect to login page', async ({
    loginPage,
    inventoryPage,
    navigationPage,
    page,
  }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await inventoryPage.expectOnInventoryPage();
    await navigationPage.logout();
    await loginPage.expectLoginPageVisible();
    await expect(page).toHaveURL('/');
  });
});
