import { Module } from '@nestjs/common';
import { ActivityTemplateController } from './activity-template.controller';
import { ActivityTemplateService } from './activity-template.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ActivityTemplateController],
  providers: [ActivityTemplateService, PrismaService],
})
export class ActivityTemplateModule {}
