# QA Automation — Playwright (TypeScript)

A complete UI + API test automation suite built with **Playwright** and **TypeScript**, targeting [saucedemo.com](https://www.saucedemo.com) for UI flows and [reqres.in](https://reqres.in) for API testing.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Test runner, browser automation, API testing |
| TypeScript | Language |
| Page Object Model | Architecture pattern |
| HTML Reporter | Test results with screenshots & traces |
| GitHub Actions | CI/CD pipeline |

---

## Project Structure

```
playwright-qa/
├── tests/
│   ├── ui/                    # UI test specs
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── cart.spec.ts
│   │   ├── checkout.spec.ts
│   │   └── navigation.spec.ts
│   └── api/                   # API test specs
│       └── api.spec.ts
├── pages/                     # Page Object Models
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── NavigationPage.ts
├── fixtures/
│   └── index.ts               # Custom fixtures (pre-auth, page instances)
├── utils/
│   ├── testData.ts            # Test data constants
│   └── apiHelper.ts           # API request wrapper
├── .env.example               # Environment variable template
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json
├── TEST_PLAN.md
└── README.md
```

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher
- Git

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/playwright-qa.git
cd playwright-qa
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

The default `.env` values work out of the box with saucedemo.com and reqres.in — no changes needed.

```env
BASE_URL=https://www.saucedemo.com
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
LOCKED_USERNAME=locked_out_user
API_BASE_URL=https://reqres.in/api
```

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run only UI tests

```bash
npx playwright test tests/ui
```

### Run only API tests

```bash
npx playwright test tests/api
```

### Run a specific spec file

```bash
npx playwright test tests/ui/login.spec.ts
```

### Run in headed mode (watch the browser)

```bash
npx playwright test --headed
```

### Run with a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### Run in debug mode (Playwright Inspector)

```bash
npx playwright test --debug
```

---

## Viewing Reports

### Open the HTML report

```bash
npx playwright show-report
```

This opens an interactive report at `http://localhost:9323` with:
- Pass/fail status per test
- Screenshots on failure
- Trace viewer for failed tests (timeline, DOM snapshots, network)

### Open a trace file manually

```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

---

## Test Coverage Summary

| Area | Tests | Notes |
|---|---|---|
| Login (positive) | TC-001, TC-006 | Valid login + logout |
| Login (negative) | TC-002, TC-003, TC-004, TC-005 | Locked, invalid, empty fields |
| Inventory & Sorting | TC-007 to TC-011 | A-Z, Z-A, price asc/desc, detail nav |
| Cart — Add/Remove | TC-012 to TC-016 | Single, multi, remove from inventory & cart |
| Checkout Form | TC-017, TC-018, TC-019 | Full flow + empty/missing fields |
| Navigation | TC-020 to TC-023 | Burger menu, All Items, logout, reset |
| API — Users | TC-A01 to TC-A04, TC-A08, TC-A09 | GET list, single, 404, POST, PUT, DELETE |
| API — Auth | TC-A05, TC-A06, TC-A07 | Login OK, missing password, missing register pw |
| Hybrid | TC-A10 | API token verified + UI login confirmed |

**Total: 23 UI tests + 10 API/hybrid tests = 33 test cases**

---

## CI/CD

Tests run automatically on every push and pull request via **GitHub Actions**.

See `.github/workflows/playwright.yml`.

The workflow:
- Runs on Ubuntu latest
- Installs Node.js 20
- Installs dependencies and Playwright browsers
- Runs the full test suite with 2 retries
- Uploads the HTML report as a build artifact

---

## Key Design Decisions

- **`data-test` attributes used exclusively** — no XPath, no fragile CSS class selectors
- **No `waitForTimeout`** — all waits use `expect(...).toBeVisible()` or auto-waiting built into Playwright
- **Custom fixtures** provide a pre-authenticated page state, avoiding login boilerplate in every test
- **`.env` driven** — credentials and URLs are never hardcoded
- **Parallel execution** enabled by default for faster CI runs
- **Retries** set to 1 locally, 2 on CI to handle transient network flakiness
