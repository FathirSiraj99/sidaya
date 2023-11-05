import { Module } from '@nestjs/common';
import { ProblemDetailService } from './problem-detail.service';
import { ProblemDetailController } from './problem-detail.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProblemDetailController],
  providers: [ProblemDetailService, PrismaService],
})
export class ProblemDetailModule {}
