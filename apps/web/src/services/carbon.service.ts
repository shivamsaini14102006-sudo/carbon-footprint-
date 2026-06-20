import { apiClient } from './api.service';
import type { ApiResponse, CarbonCalculationResult } from '@carbonwise/types';

interface CarbonInput {
  transportation: { carKm: number; busKm: number; flightKm: number; bikeKm: number };
  food: { meatMeals: number; vegetarianMeals: number };
  energy: { electricityKwh: number };
  shopping: { clothingItems: number };
}

export const carbonService = {
  async calculate(input: CarbonInput, token: string): Promise<ApiResponse<CarbonCalculationResult>> {
    return apiClient.request('/carbon/calculate', {
      method: 'POST',
      body: input,
      token,
    });
  },
};
