import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityService } from 'src/activity/activity.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AreaController],
  providers: [AreaService, UserService, ActivityService, PrismaService]
})
export class AreaModule { }
