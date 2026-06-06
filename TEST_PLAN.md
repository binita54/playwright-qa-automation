# TEST_PLAN.md — NECTA QA Playwright Assignment

## 1. Overview

| Field | Details |
|---|---|
| Project | QA Automation Engineer Interview Task |
| Website Under Test | https://www.saucedemo.com |
| API Under Test | https://reqres.in/api |
| Framework | Playwright (TypeScript) |
| Architecture | Page Object Model (POM) |
| Author | Candidate Submission |

---

## 2. Scope

### In Scope
- User authentication (login / logout)
- Product inventory display and sorting
- Shopping cart add/remove operations
- Checkout form submission and order completion
- Sidebar navigation
- REST API: CRUD operations on `/users`, authentication via `/login`, `/register`

### Out of Scope
- Payment gateway processing
- Third-party OAuth flows
- Mobile-specific gestures
- Performance / load testing

---

## 3. Test Environment

| Item | Value |
|---|---|
| Base URL | `https://www.saucedemo.com` |
| API Base URL | `https://reqres.in/api` |
| Browsers | Chromium, Firefox |
| Node.js | ≥ 18 |
| Playwright Version | Latest stable |

---

## 4. Test Cases

### 4.1 UI Test Cases

| ID | Title | Type | Priority | Expected Result |
|---|---|---|---|---|
| TC-001 | Valid login with standard_user | Positive | P1 | Redirects to `/inventory.html` |
| TC-002 | Login with locked_out_user | Negative | P1 | Error: "Sorry, this user has been locked out" |
| TC-003 | Login with invalid credentials | Negative | P1 | Error: "Username and password do not match" |
| TC-004 | Login with empty username | Negative | P2 | Error: "Username is required" |
| TC-005 | Login with empty password | Negative | P2 | Error: "Password is required" |
| TC-006 | Logout via burger menu | Positive | P1 | Redirects to `/` (login page) |
| TC-007 | Default sort order is A–Z | Positive | P2 | Product titles sorted alphabetically ascending |
| TC-008 | Sort products Z–A | Positive | P2 | Products sorted reverse alphabetical |
| TC-009 | Sort by price low to high | Positive | P2 | Each product price ≥ previous |
| TC-010 | Sort by price high to low | Positive | P2 | Each product price ≤ previous |
| TC-011 | Navigate to product detail page | Positive | P2 | Product detail page loads with matching title |
| TC-012 | Add single item to cart | Positive | P1 | Cart badge shows count "1" |
| TC-013 | Add multiple items to cart | Positive | P1 | Badge reflects correct item count |
| TC-014 | Remove item from inventory page | Positive | P1 | Badge decrements correctly |
| TC-015 | Remove item from cart page | Positive | P1 | Cart item count decreases |
| TC-016 | Cart shows correct items | Positive | P1 | Added items visible in cart |
| TC-017 | Complete full checkout flow | Positive | P1 | "Thank you for your order" confirmation |
| TC-018 | Submit empty checkout form | Negative | P1 | Error: "First Name is required" |
| TC-019 | Checkout with missing first name | Negative | P2 | Error: "First Name is required" |
| TC-020 | Open and close sidebar menu | Positive | P3 | Menu opens and closes correctly |
| TC-021 | Navigate to All Items from sidebar | Positive | P2 | Redirects to `/inventory.html` |
| TC-022 | Logout from sidebar | Positive | P1 | Redirects to login page |
| TC-023 | Reset App State clears cart | Positive | P2 | Cart badge disappears after reset |

### 4.2 API Test Cases

| ID | Title | Type | Status Code | Validates |
|---|---|---|---|---|
| TC-A01 | GET /users — paginated list | Positive | 200 | `data[]`, `total`, `page` fields |
| TC-A02 | GET /users/:id — single user | Positive | 200 | `id`, `email` fields |
| TC-A03 | GET /users/9999 — non-existent user | Negative | 404 | Empty body `{}` |
| TC-A04 | POST /users — create user | Positive | 201 | `id`, `createdAt` returned |
| TC-A05 | POST /login — valid credentials | Positive | 200 | `token` field present |
| TC-A06 | POST /login — missing password | Negative | 400 | `error: "Missing password"` |
| TC-A07 | POST /register — missing password | Negative | 400 | `error` field present |
| TC-A08 | PUT /users/:id — update user | Positive | 200 | `updatedAt` field present |
| TC-A09 | DELETE /users/:id — delete user | Positive | 204 | Empty response body |
| TC-A10 | Hybrid: API token + UI login both work | Hybrid | 200 | Token truthy, UI redirects to inventory |

---

## 5. Edge Cases

| ID | Scenario | Risk |
|---|---|---|
| EC-01 | Login form XSS injection in username field | Security — app may reflect unsanitized input |
| EC-02 | Add same product to cart twice (button becomes "Remove") | UI state mutation — badge should not double count |
| EC-03 | Complete checkout with cart empty (navigate directly) | App may allow checkout with $0 order |
| EC-04 | Sort while items are in cart | Cart state should persist across sort interactions |
| EC-05 | API GET /users with page=999 | Should return empty data array, not error |
| EC-06 | API POST /login with unregistered email | Should return 400 with "user not found" |

---

## 6. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Saucedemo.com site downtime | Low | High | Run tests against a local mirror if available |
| reqres.in API rate limiting | Medium | Medium | Retry strategy enabled; keep test data minimal |
| Flaky selectors on re-renders | Medium | Medium | Use `data-test` attributes exclusively |
| Locked user credentials change | Low | High | Externalise credentials in `.env` |
| Checkout total changes | Low | Low | Assert pattern match on "Total:" string, not exact value |

---

## 7. Tools & Configuration

- **Test Runner**: `@playwright/test`
- **Language**: TypeScript
- **Reporter**: HTML (`playwright-report/`) + List (console)
- **Trace**: `retain-on-failure`
- **Screenshots**: `only-on-failure`
- **Retries**: 1 locally, 2 on CI
- **Parallelism**: Enabled (full parallel by default)
- **CI**: GitHub Actions (`playwright.yml`)

---

## 8. Folder Structure

```
playwright-qa/
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── cart.spec.ts
│   │   ├── checkout.spec.ts
│   │   └── navigation.spec.ts
│   └── api/
│       └── api.spec.ts
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── NavigationPage.ts
├── fixtures/
│   └── index.ts
├── utils/
│   ├── testData.ts
│   └── apiHelper.ts
├── .env
├── .env.example
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── TEST_PLAN.md
└── README.md
```
