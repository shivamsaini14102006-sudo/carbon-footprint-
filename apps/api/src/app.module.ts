import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { CarbonModule } from './carbon/carbon.module';
import { ActivitiesModule } from './activities/activities.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // 100 Requests / Minute
    }]),
    DatabaseModule,
    UsersModule,
    AuthModule,
    CarbonModule,
    ActivitiesModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
