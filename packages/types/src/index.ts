// @carbonwise/types

export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  preferences?: UserPreference;
}

export interface UserPreference {
  id: string;
  userId: string;
  dietType: string;
  transportationType: string;
  sustainabilityGoal: string;
}

export type ActivityCategory = 'TRANSPORTATION' | 'FOOD' | 'ENERGY' | 'SHOPPING';
export type RecommendationPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type GoalStatus = 'ACTIVE' | 'COMPLETED' | 'PAUSED';

export interface CarbonRecord {
  id: string;
  userId: string;
  category: ActivityCategory;
  emissionValue: number;
  emissionUnit: string;
  createdAt: string;
}

export interface CarbonBreakdown {
  TRANSPORTATION: number;
  FOOD: number;
  ENERGY: number;
  SHOPPING: number;
}

export interface CarbonCalculationResult {
  carbonScore: number;
  totalEmission: number;
  unit: string;
  hotspot: ActivityCategory | 'NONE';
  breakdown: CarbonBreakdown;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  targetCategory: ActivityCategory;
  priority: RecommendationPriority;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  estimatedSavings: number; // kg CO2/year
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  targetReduction: number;
  currentProgress: number;
  targetDate: string;
  status: GoalStatus;
  createdAt: string;
}

export interface CarbonTwinScenario {
  scenarioName: string;
  currentEmission: number;
  projectedEmission: number;
  potentialSavings: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
