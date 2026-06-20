'use client';
import { useState, useCallback } from 'react';
import type { Recommendation } from '@carbonwise/types';

const STATIC_RECOMMENDATIONS: Recommendation[] = [
  { id: 'rec_001', title: 'Use Public Transport Twice Weekly', description: 'Replacing two car trips a week with public transit yields major impact on your transportation emissions.', targetCategory: 'TRANSPORTATION', priority: 'HIGH', difficulty: 'MEDIUM', estimatedSavings: 120 },
  { id: 'rec_002', title: 'Reduce Meat Consumption', description: 'Swapping two meat meals per week for plant-based choices can reduce your food footprint significantly.', targetCategory: 'FOOD', priority: 'HIGH', difficulty: 'EASY', estimatedSavings: 90 },
  { id: 'rec_003', title: 'Bike for Short Distances', description: 'Replace trips under 5km with biking or walking for zero emission travel.', targetCategory: 'TRANSPORTATION', priority: 'MEDIUM', difficulty: 'HARD', estimatedSavings: 60 },
];

export function useRecommendations(hotspot?: string) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(
    hotspot ? STATIC_RECOMMENDATIONS.filter(r => r.targetCategory === hotspot).concat(
      STATIC_RECOMMENDATIONS.filter(r => r.targetCategory !== hotspot)
    ).slice(0, 3) : STATIC_RECOMMENDATIONS
  );
  const [isLoading] = useState(false);

  const accept = useCallback((id: string) => {
    setRecommendations(prev => prev.filter(r => r.id !== id));
  }, []);

  return { recommendations, isLoading, accept };
}
