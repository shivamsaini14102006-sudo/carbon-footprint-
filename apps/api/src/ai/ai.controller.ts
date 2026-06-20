import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from '../auth/auth.guard';
import { AiService } from './ai.service';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const AiPromptSchema = z.object({
  hotspot: z.string(),
  currentEmission: z.number().min(0),
});
class AiPromptDto extends createZodDto(AiPromptSchema) {}

@Controller('ai')
@UseGuards(ThrottlerGuard, AuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('suggest')
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // Ultra-strict rate limit for LLMs (10 req / min)
  async getSuggestion(@Body() body: AiPromptDto) {
    const data = await this.aiService.getSuggestion(body.hotspot, body.currentEmission);
    return { success: true, data };
  }
}
