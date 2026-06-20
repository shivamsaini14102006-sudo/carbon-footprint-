import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

// Mock bcrypt
jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser = {
    id: 'user-123',
    fullName: 'Test User',
    email: 'test@example.com',
    passwordHash: 'hashed_password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock_token'),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockResolvedValue({ ...mockUser });
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_pw');

      const result = await service.register({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'SecurePass123',
      });

      expect(result.success).toBe(true);
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.hash).toHaveBeenCalledWith('SecurePass123', 10);
    });

    it('should throw BadRequestException if user already exists', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);

      await expect(
        service.register({ fullName: 'Test', email: 'test@example.com', password: '12345678' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should return tokens on successful login', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({ email: 'test@example.com', password: 'SecurePass123' });

      expect(result.success).toBe(true);
      expect(result.data?.accessToken).toBeDefined();
      expect(result.data?.refreshToken).toBeDefined();
    });

    it('should throw UnauthorizedException when user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ email: 'missing@example.com', password: 'any' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({ email: 'test@example.com', password: 'WrongPassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    it('should return a new access token for a valid refresh token', async () => {
      jwtService.verifyAsync.mockResolvedValue({ sub: 'user-123', email: 'test@example.com' });

      const result = await service.refresh({ refreshToken: 'valid_refresh_token' });

      expect(result.accessToken).toBeDefined();
    });

    it('should throw UnauthorizedException for an invalid refresh token', async () => {
      jwtService.verifyAsync.mockRejectedValue(new Error('invalid'));

      await expect(
        service.refresh({ refreshToken: 'bad_token' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
