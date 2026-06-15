import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface UserContext {
  userId: string;
  hotspot: string;
  preferences?: any;
}

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  private readonly BASE_RECOMMENDATIONS = [
    {
      id: 'rec_001',
      title: 'Use Public Transport Twice Weekly',
      description: 'Replacing two car trips a week with public transit yields major impact.',
      targetCategory: 'TRANSPORTATION',
      priority: 'HIGH',
      difficulty: 'MEDIUM',
      baseImpact: 9,
      baseFeasibility: 8,
      estimatedSavings: 120, // kg CO2/year
    },
    {
      id: 'rec_002',
      title: 'Bike for Short Distances',
      description: 'Replace trips under 5km with biking or walking.',
      targetCategory: 'TRANSPORTATION',
      priority: 'MEDIUM',
      difficulty: 'HARD',
      baseImpact: 6,
      baseFeasibility: 6,
      estimatedSavings: 60,
    },
    {
      id: 'rec_003',
      title: 'Reduce Meat Consumption',
      description: 'Swapping two meat meals for plant-based choices reduces your food footprint.',
      targetCategory: 'FOOD',
      priority: 'HIGH',
      difficulty: 'EASY',
      baseImpact: 8,
      baseFeasibility: 9,
      estimatedSavings: 90,
    },
    {
      id: 'rec_004',
      title: 'Turn Off Unused Lights',
      description: 'Simple habits save money and cut electricity waste.',
      targetCategory: 'ENERGY',
      priority: 'LOW',
      difficulty: 'EASY',
      baseImpact: 3,
      baseFeasibility: 10,
      estimatedSavings: 15,
    },
  ];

  async generateRecommendations(context: UserContext) {
    // Recommendation Rank Formula = Impact * Feasibility * Alignment
    
    // In a real app we'd fetch preference alignment. For MVP, we align with the hotspot.
    const scoredRecs = this.BASE_RECOMMENDATIONS.map((rec) => {
      let alignment = 5; // Base alignment
      if (rec.targetCategory === context.hotspot) {
        alignment = 10; // High alignment if targeting hotspot
      }

      const priorityScore = rec.baseImpact * rec.baseFeasibility * alignment;

      return {
        ...rec,
        priorityScore
      };
    });

    // Sort heavily by score descending
    scoredRecs.sort((a, b) => b.priorityScore - a.priorityScore);

    // Filter top 3 for the user
    return scoredRecs.slice(0, 3).map(({ priorityScore, baseImpact, baseFeasibility, ...rest }) => rest);
  }

  async acceptRecommendation(recommendationId: string, userId: string) {
     // Prisma logic to save a RecommendationAction
     return { success: true, acceptedId: recommendationId };
  }
}
