import { CarbonService } from './carbon.service';

describe('CarbonService', () => {
  let service: CarbonService;
  const mockPrisma = {
    carbonRecord: { createMany: jest.fn().mockResolvedValue({ count: 4 }) },
  } as any;

  beforeEach(() => {
    service = new CarbonService(mockPrisma);
  });

  const baseInput = {
    transportation: { carKm: 0, busKm: 0, flightKm: 0, bikeKm: 0 },
    food: { meatMeals: 0, vegetarianMeals: 0 },
    energy: { electricityKwh: 0 },
    shopping: { clothingItems: 0 },
  };

  describe('calculateEmissions', () => {
    it('should return a perfect score of 100 for zero emissions', async () => {
      const result = await service.calculateEmissions(baseInput, 'u1');
      expect(result.carbonScore).toBe(100);
      expect(result.totalEmission).toBe(0);
    });

    it('should correctly calculate transportation emissions', async () => {
      const result = await service.calculateEmissions({
        ...baseInput,
        transportation: { carKm: 100, busKm: 0, flightKm: 0, bikeKm: 0 },
      }, 'u1');
      expect(result.breakdown.TRANSPORTATION).toBeCloseTo(19.2);
    });

    it('should correctly calculate food emissions', async () => {
      const result = await service.calculateEmissions({
        ...baseInput,
        food: { meatMeals: 5, vegetarianMeals: 2 },
      }, 'u1');
      expect(result.breakdown.FOOD).toBeCloseTo(18.1);
    });

    it('should identify the correct hotspot', async () => {
      const result = await service.calculateEmissions({
        ...baseInput,
        transportation: { carKm: 500, busKm: 0, flightKm: 0, bikeKm: 0 },
        food: { meatMeals: 1, vegetarianMeals: 1 },
      }, 'u1');
      expect(result.hotspot).toBe('TRANSPORTATION');
    });

    it('should cap carbonScore at 0 for extreme high emissions', async () => {
      const result = await service.calculateEmissions({
        transportation: { carKm: 10000, busKm: 0, flightKm: 10000, bikeKm: 0 },
        food: { meatMeals: 100, vegetarianMeals: 0 },
        energy: { electricityKwh: 10000 },
        shopping: { clothingItems: 100 },
      }, 'u1');
      expect(result.carbonScore).toBe(0);
    });

    it('should return totalEmission as sum of all breakdowns', async () => {
      const result = await service.calculateEmissions({
        transportation: { carKm: 50, busKm: 20, flightKm: 0, bikeKm: 10 },
        food: { meatMeals: 3, vegetarianMeals: 4 },
        energy: { electricityKwh: 100 },
        shopping: { clothingItems: 2 },
      }, 'u1');
      const sum = Object.values(result.breakdown).reduce((a, b) => a + b, 0);
      expect(result.totalEmission).toBeCloseTo(sum);
    });
  });
});
