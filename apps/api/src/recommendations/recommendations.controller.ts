import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('recommendations')
@UseGuards(AuthGuard)
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post('generate')
  async generate(@Body() data: { hotspot: string }, @Request() req) {
    const recs = await this.recommendationsService.generateRecommendations({
      userId: req.user.sub,
      hotspot: data.hotspot,
    });
    return {
      success: true,
      data: recs,
    };
  }

  @Post(':id/accept')
  async accept(@Param('id') id: string, @Request() req) {
    return this.recommendationsService.acceptRecommendation(id, req.user.sub);
  }
}
