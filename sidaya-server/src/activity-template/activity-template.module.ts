import { Module } from '@nestjs/common';
import { ActivityTemplateController } from './activity-template.controller';
import { ActivityTemplateService } from './activity-template.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityDetailService } from 'src/activity-detail/activity-detail.service';

@Module({
  controllers: [ActivityTemplateController],
  providers: [ActivityTemplateService, ActivityDetailService, PrismaService],
})
export class ActivityTemplateModule { }
