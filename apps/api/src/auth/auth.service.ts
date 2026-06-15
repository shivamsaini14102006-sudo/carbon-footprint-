import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto, RefreshDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await this.usersService.create(data, hashedPassword);

    return {
      success: true,
      message: 'User registered successfully',
    };
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException({ error: { code: 'UNAUTHORIZED', message: 'Authentication Failed' } });
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException({ error: { code: 'UNAUTHORIZED', message: 'Authentication Failed' } });
    }

    const payload = { sub: user.id, email: user.email };
    
    return {
      success: true,
      data: {
        accessToken: await this.jwtService.signAsync(payload, { expiresIn: '15m' }),
        refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '30d' }),
      },
    };
  }

  async refresh(data: RefreshDto) {
    try {
      const payload = await this.jwtService.verifyAsync(data.refreshToken);
      const newPayload = { sub: payload.sub, email: payload.email };
      
      return {
        accessToken: await this.jwtService.signAsync(newPayload, { expiresIn: '15m' }),
      };
    } catch (e) {
      throw new UnauthorizedException({ error: { code: 'UNAUTHORIZED', message: 'Invalid refresh token' } });
    }
  }

  async logout() {
    return { success: true };
  }
}
