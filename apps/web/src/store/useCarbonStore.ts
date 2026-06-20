import { create } from 'zustand';
import type { CarbonCalculationResult } from '@carbonwise/types';

export interface CarbonState {
  // Inputs
  carKm: number;
  busKm: number;
  flightKm: number;
  bikeKm: number;
  meatMeals: number;
  vegMeals: number;
  electricityKwh: number;
  clothingItems: number;
  
  // Results
  result: CarbonCalculationResult | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setField: (field: keyof Omit<CarbonState, 'result' | 'isLoading' | 'error' | 'setField' | 'calculate'>, value: number) => void;
  calculate: () => void;
}

export const useCarbonStore = create<CarbonState>((set, get) => ({
  carKm: 0,
  busKm: 0,
  flightKm: 0,
  bikeKm: 0,
  meatMeals: 0,
  vegMeals: 0,
  electricityKwh: 0,
  clothingItems: 0,
  result: null,
  isLoading: false,
  error: null,

  setField: (field, value) => set({ [field]: value }),

  calculate: async () => {
    set({ isLoading: true, error: null });
    try {
      const state = get();
      const FACTORS = { car: 0.192, bus: 0.089, flight: 0.255, bike: 0, meatMeal: 3.3, vegMeal: 0.8, electricity: 0.5, clothing: 15 };
      
      const transportationEmissions = state.carKm * FACTORS.car + state.busKm * FACTORS.bus + state.flightKm * FACTORS.flight + state.bikeKm * FACTORS.bike;
      const foodEmissions = state.meatMeals * FACTORS.meatMeal + state.vegMeals * FACTORS.vegMeal;
      const energyEmissions = state.electricityKwh * FACTORS.electricity;
      const shoppingEmissions = state.clothingItems * FACTORS.clothing;
      
      const totalEmission = transportationEmissions + foodEmissions + energyEmissions + shoppingEmissions;
      
      let normalized = (totalEmission / 300) * 100;
      if (normalized > 100) normalized = 100;
      
      const carbonScore = Math.max(0, Math.round(100 - normalized));
      const breakdown = { TRANSPORTATION: transportationEmissions, FOOD: foodEmissions, ENERGY: energyEmissions, SHOPPING: shoppingEmissions };
      
      let hotspot: keyof typeof breakdown = 'TRANSPORTATION';
      let max = 0;
      for (const [key, val] of Object.entries(breakdown)) {
        if (val > max) { max = val; hotspot = key as keyof typeof breakdown; }
      }
      
      // Simulate network wait
      await new Promise(r => setTimeout(r, 600));

      set({
        result: {
          carbonScore,
          totalEmission,
          unit: 'kgCO2e',
          hotspot,
          breakdown
        },
        isLoading: false
      });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Calculation failed', isLoading: false });
    }
  }
}));
