import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RegisterSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid Email is required'),
  password: z.string().min(8, 'Password Minimum 8 Characters'),
});

export class RegisterDto extends createZodDto(RegisterSchema) {}

export const LoginSchema = z.object({
  email: z.string().email('Valid Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export class LoginDto extends createZodDto(LoginSchema) {}

export const RefreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh Token is required'),
});

export class RefreshDto extends createZodDto(RefreshSchema) {}
