import { test, expect } from '@playwright/test';

const BASE = 'https://jsonplaceholder.typicode.com';

test.describe('API Tests', () => {

  test('TC-A01: GET /users - should return list of users', async ({ request }) => {
    const response = await request.get(`${BASE}/users`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('email');
  });

  test('TC-A02: GET /users/:id - should return a single user', async ({ request }) => {
    const response = await request.get(`${BASE}/users/1`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body.email).toMatch(/@/);
  });

  test('TC-A03: GET /posts - should return list of posts', async ({ request }) => {
    const response = await request.get(`${BASE}/posts`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(100);
  });

  test('TC-A04: POST /posts - should create a post and return 201', async ({ request }) => {
    const response = await request.post(`${BASE}/posts`, {
      data: { title: 'QA Automation Post', body: 'Created by Playwright', userId: 1 },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title', 'QA Automation Post');
  });

  test('TC-A05: PUT /posts/:id - should update a post and return 200', async ({ request }) => {
    const response = await request.put(`${BASE}/posts/1`, {
      data: { id: 1, title: 'Updated Title', body: 'Updated body', userId: 1 },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('title', 'Updated Title');
  });

  test('TC-A06: DELETE /posts/:id - should delete a post and return 200', async ({ request }) => {
    const response = await request.delete(`${BASE}/posts/1`);
    expect(response.status()).toBe(200);
  });

  // NEGATIVE TESTS
  test('TC-A07 [NEGATIVE]: GET non-existent user - should return 404', async ({ request }) => {
    const response = await request.get(`${BASE}/users/9999`);
    expect(response.status()).toBe(404);
  });

  test('TC-A08 [NEGATIVE]: GET non-existent post - should return 404', async ({ request }) => {
    const response = await request.get(`${BASE}/posts/99999`);
    expect(response.status()).toBe(404);
  });

  test('TC-A09 [NEGATIVE]: Unauthorized API access - should return 401', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users', {
      headers: { Authorization: 'Bearer invalid_token_12345' },
    });
    expect(response.status()).toBe(401);
  });

  // HYBRID
  test('TC-A10 [HYBRID]: API health check + UI login both succeed', async ({ request, page }) => {
    const apiResponse = await request.get(`${BASE}/users/1`);
    expect(apiResponse.status()).toBe(200);
    const user = await apiResponse.json();
    expect(user).toHaveProperty('name');

    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);
  });
});