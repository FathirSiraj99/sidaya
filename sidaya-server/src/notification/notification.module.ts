import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationController } from './notification.controller';

@Module({
  providers: [NotificationService, PrismaService],
  controllers: [NotificationController],
})
export class NotificationModule {}
