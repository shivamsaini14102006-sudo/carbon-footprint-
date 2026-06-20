import { Injectable } from '@nestjs/common';
import { CalculateCarbonDto } from './dto/carbon.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class CarbonService {
  constructor(private prisma: PrismaService) {}

  // Simplified hardcoded emission factors for demonstration purposes
  private readonly FACTORS = {
    car: 0.192,
    bus: 0.089,
    flight: 0.255,
    bike: 0.0,
    meatMeal: 3.3, // kg CO2e per meal
    vegMeal: 0.8,
    electricity: 0.5, // kg CO2e per kWh
    clothing: 15.0, // kg CO2e per item
  };

  async calculateEmissions(data: CalculateCarbonDto, userId: string) {
    const t = data.transportation;
    const transportationEmissions = 
      (t.carKm * this.FACTORS.car) +
      (t.busKm * this.FACTORS.bus) +
      (t.flightKm * this.FACTORS.flight) +
      (t.bikeKm * this.FACTORS.bike);

    const f = data.food;
    const foodEmissions = 
      (f.meatMeals * this.FACTORS.meatMeal) +
      (f.vegetarianMeals * this.FACTORS.vegMeal);

    const e = data.energy;
    const energyEmissions = (e.electricityKwh * this.FACTORS.electricity);

    const s = data.shopping;
    const shoppingEmissions = (s.clothingItems * this.FACTORS.clothing);

    const totalEmission = transportationEmissions + foodEmissions + energyEmissions + shoppingEmissions;

    // Normalizing assuming 300 kg CO2e is base for score 0
    let normalized = (totalEmission / 300) * 100;
    if (normalized > 100) normalized = 100;
    
    let carbonScore = Math.round(100 - normalized);
    if(carbonScore < 0) carbonScore = 0;

    const breakdown = {
      TRANSPORTATION: transportationEmissions,
      FOOD: foodEmissions,
      ENERGY: energyEmissions,
      SHOPPING: shoppingEmissions,
    };

    let hotspot = 'NONE';
    let max = 0;
    for (const [key, val] of Object.entries(breakdown)) {
      if (val > max) {
        max = val;
        hotspot = key;
      }
    }

    // Persist into database
    await this.prisma.carbonRecord.createMany({
      data: [
        { userId, category: 'TRANSPORTATION', emissionValue: transportationEmissions, emissionUnit: 'kgCO2e' },
        { userId, category: 'FOOD', emissionValue: foodEmissions, emissionUnit: 'kgCO2e' },
        { userId, category: 'ENERGY', emissionValue: energyEmissions, emissionUnit: 'kgCO2e' },
        { userId, category: 'SHOPPING', emissionValue: shoppingEmissions, emissionUnit: 'kgCO2e' },
      ],
    });

    return {
      carbonScore,
      totalEmission,
      unit: 'kgCO2e',
      hotspot,
      breakdown
    };
  }
}
