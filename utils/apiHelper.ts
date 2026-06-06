import { APIRequestContext, expect } from '@playwright/test';
import { API } from './testData';

export class ApiHelper {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUsers(page = 1) {
    const response = await this.request.get(`${API.baseUrl}/users`, {
      params: { page },
    });
    return response;
  }

  async getUserById(id: number) {
    const response = await this.request.get(`${API.baseUrl}/users/${id}`);
    return response;
  }

  async createUser(name: string, job: string) {
    const response = await this.request.post(`${API.baseUrl}/users`, {
      data: { name, job },
    });
    return response;
  }

  async loginUser(email: string, password: string) {
    const response = await this.request.post(`${API.baseUrl}/login`, {
      data: { email, password },
    });
    return response;
  }

  async registerUser(email: string, password: string) {
    const response = await this.request.post(`${API.baseUrl}/register`, {
      data: { email, password },
    });
    return response;
  }

  async deleteUser(id: number) {
    const response = await this.request.delete(`${API.baseUrl}/users/${id}`);
    return response;
  }

  async updateUser(id: number, name: string, job: string) {
    const response = await this.request.put(`${API.baseUrl}/users/${id}`, {
      data: { name, job },
    });
    return response;
  }

  // Assertion helpers
  async expectStatus(response: Awaited<ReturnType<typeof this.request.get>>, status: number) {
    expect(response.status()).toBe(status);
  }

  async parseJson(response: Awaited<ReturnType<typeof this.request.get>>) {
    return response.json();
  }
}
