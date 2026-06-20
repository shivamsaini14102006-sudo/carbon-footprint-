import { apiClient } from './api.service';
import type { ApiResponse, AuthTokens, User } from '@carbonwise/types';

export const authService = {
  async register(fullName: string, email: string, password: string): Promise<ApiResponse<void>> {
    return apiClient.request('/auth/register', {
      method: 'POST',
      body: { fullName, email, password },
    });
  },

  async login(email: string, password: string): Promise<ApiResponse<{ accessToken: string }>> {
    return apiClient.request('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },

  async refresh(): Promise<ApiResponse<{ accessToken: string }>> {
    return apiClient.request('/auth/refresh', {
      method: 'POST',
    });
  },

  async logout(): Promise<void> {
    return apiClient.request('/auth/logout', { method: 'POST' });
  },

  async getProfile(token: string): Promise<ApiResponse<User>> {
    return apiClient.request('/users/profile', { token });
  },
};
