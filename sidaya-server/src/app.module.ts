import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ActivityTemplateModule } from './activity-template/activity-template.module';
import { AreaModule } from './area/area.module';
import { ActivityDetailModule } from './activity-detail/activity-detail.module';
import { ActivityModule } from './activity/activity.module';
import { ProblemsModule } from './problems/problems.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ActivityTemplateModule, AreaModule, ActivityDetailModule, ActivityModule, ProblemsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
