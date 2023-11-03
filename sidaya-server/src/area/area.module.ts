import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityService } from 'src/activity/activity.service';

@Module({
  controllers: [AreaController],
  providers: [AreaService, ActivityService, PrismaService]
})
export class AreaModule { }
