import { RecommendationsService } from './recommendations.service';

describe('RecommendationsService', () => {
  let service: RecommendationsService;

  // CarbonService has no DB dependency for calculateEmissions, create a lightweight mock
  const mockPrisma = {} as never;

  beforeEach(() => {
    service = new RecommendationsService(mockPrisma);
  });

  describe('generateRecommendations', () => {
    it('should return at most 3 recommendations', async () => {
      const result = await service.generateRecommendations({
        userId: 'user-1',
        hotspot: 'TRANSPORTATION',
      });
      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('should prioritize recommendations matching the hotspot', async () => {
      const result = await service.generateRecommendations({
        userId: 'user-1',
        hotspot: 'TRANSPORTATION',
      });
      // First result should target transportation since that's the hotspot
      expect(result[0].targetCategory).toBe('TRANSPORTATION');
    });

    it('should prioritize FOOD recommendations when FOOD is the hotspot', async () => {
      const result = await service.generateRecommendations({
        userId: 'user-1',
        hotspot: 'FOOD',
      });
      expect(result[0].targetCategory).toBe('FOOD');
    });

    it('should not expose internal scoring fields to the caller', async () => {
      const result = await service.generateRecommendations({
        userId: 'user-1',
        hotspot: 'TRANSPORTATION',
      });
      for (const rec of result) {
        expect(rec).not.toHaveProperty('priorityScore');
        expect(rec).not.toHaveProperty('baseImpact');
        expect(rec).not.toHaveProperty('baseFeasibility');
      }
    });
  });

  describe('acceptRecommendation', () => {
    it('should return success when a recommendation is accepted', async () => {
      const result = await service.acceptRecommendation('rec_001', 'user-1');
      expect(result.success).toBe(true);
      expect(result.acceptedId).toBe('rec_001');
    });
  });
});
