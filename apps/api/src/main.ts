import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security (Medium Impact)
  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });

  // Base path config
  app.setGlobalPrefix('api/v1');

  await app.listen(3001);
}
bootstrap();
