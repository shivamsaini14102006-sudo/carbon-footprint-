import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req, UnauthorizedException } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { UsePipes } from '@nestjs/common';

@Controller('auth')
@UsePipes(ZodValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { success, data } = await this.authService.login(loginDto);
    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    return { success, data: { accessToken: data.accessToken } };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const rToken = req.cookies?.refreshToken;
    if (!rToken) {
      throw new UnauthorizedException({ error: { code: 'UNAUTHORIZED', message: 'No refresh token' } });
    }
    const { accessToken } = await this.authService.refresh({ refreshToken: rToken });
    return { success: true, data: { accessToken } };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' });
    return this.authService.logout();
  }
}
