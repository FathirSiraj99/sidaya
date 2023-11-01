import { Module } from '@nestjs/common';
import { ActivityDetailController } from './activity-detail.controller';
import { ActivityDetailService } from './activity-detail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ActivityDetailController],
  providers: [ActivityDetailService, PrismaService]
})
export class ActivityDetailModule {}
