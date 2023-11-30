import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ActivityTemplateModule } from './activity-template/activity-template.module';
import { AreaModule } from './area/area.module';
import { ActivityDetailModule } from './activity-detail/activity-detail.module';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import { ProblemDetailModule } from './problem-detail/problem-detail.module';
import { ProblemModule } from './problem/problem.module';
import { NotificationModule } from './notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, ActivityTemplateModule, AreaModule, ActivityDetailModule, ActivityModule, AuthModule, ProblemDetailModule, ProblemModule, NotificationModule, ScheduleModule.forRoot(), UserModule],
})
export class AppModule { }
