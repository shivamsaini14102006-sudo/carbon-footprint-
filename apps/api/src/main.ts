import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // ── Security: Full Helmet Configuration ──────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https://api.dicebear.com'],
          connectSrc: ["'self'", process.env.CORS_ORIGIN || 'http://localhost:3000'],
          fontSrc: ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
          objectSrc: ["'none'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false, // Allow external images
      hsts: {
        maxAge: 63072000, // 2 years
        includeSubDomains: true,
        preload: true,
      },
      noSniff: true,
      xssFilter: true,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      frameguard: { action: 'deny' },
    }),
  );

  // ── CORS ──────────────────────────────────────────────────────────────────
  const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',');
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ── Global Prefix ─────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen(port);
  console.log(`🚀 CarbonWise API running on http://localhost:${port}/api/v1`);
}
bootstrap();
