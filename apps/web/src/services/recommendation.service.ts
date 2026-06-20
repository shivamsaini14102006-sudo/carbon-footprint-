import { apiClient } from './api.service';
import type { ApiResponse, Recommendation } from '@carbonwise/types';

export const recommendationService = {
  async getRecommendations(hotspot: string, token: string): Promise<ApiResponse<Recommendation[]>> {
    return apiClient.request('/recommendations/generate', {
      method: 'POST',
      body: { hotspot },
      token,
    });
  },

  async acceptRecommendation(id: string, token: string): Promise<ApiResponse<void>> {
    return apiClient.request(`/recommendations/${id}/accept`, {
      method: 'POST',
      token,
    });
  },
};
