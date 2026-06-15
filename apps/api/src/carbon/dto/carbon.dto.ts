import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const TransportationSchema = z.object({
  carKm: z.number().optional().default(0),
  busKm: z.number().optional().default(0),
  flightKm: z.number().optional().default(0),
  bikeKm: z.number().optional().default(0),
});

export const FoodSchema = z.object({
  meatMeals: z.number().optional().default(0),
  vegetarianMeals: z.number().optional().default(0),
});

export const EnergySchema = z.object({
  electricityKwh: z.number().optional().default(0),
});

export const ShoppingSchema = z.object({
  clothingItems: z.number().optional().default(0),
});

export const CalculateCarbonSchema = z.object({
  transportation: TransportationSchema,
  food: FoodSchema,
  energy: EnergySchema,
  shopping: ShoppingSchema,
});

export class CalculateCarbonDto extends createZodDto(CalculateCarbonSchema) {}
