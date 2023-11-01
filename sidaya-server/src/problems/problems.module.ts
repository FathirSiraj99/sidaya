import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProblemsService, PrismaService],
  controllers: [ProblemsController]
})
export class ProblemsModule {}
