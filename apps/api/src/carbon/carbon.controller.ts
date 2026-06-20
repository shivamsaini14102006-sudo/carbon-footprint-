import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CarbonService } from './carbon.service';
import { CalculateCarbonDto } from './dto/carbon.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ZodValidationPipe } from 'nestjs-zod';
import { UsePipes } from '@nestjs/common';

@Controller('carbon')
@UseGuards(AuthGuard)
@UsePipes(ZodValidationPipe)
export class CarbonController {
  constructor(private readonly carbonService: CarbonService) {}

  @Post('calculate')
  async calculate(@Body() calculateCarbonDto: CalculateCarbonDto, @Request() req: any) {
    const userId = req.user.sub;
    const result = await this.carbonService.calculateEmissions(calculateCarbonDto, userId);
    return {
      success: true,
      data: result,
    };
  }
}
