import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { problem } from '@prisma/client';

@Injectable()
export class ProblemsService {
  constructor(private db: PrismaService) {}

  async findAll(): Promise<problem[]> {
    return this.db.problem.findMany({
        include: {
            activity_template: true
        }
    });
  }

  async findById(id: string): Promise<problem> {
    return this.db.problem.findUnique({ where: { id } });
  }

  async createData(data: {
    name: string;
    description: string;
    activity_templateId: string;
  }): Promise<problem> {
    return this.db.problem.create({ data });
  }

  async updateData(
    id: string,
    data: { name: string; description: string; activity_templateId: string },
  ): Promise<problem> {
    return this.db.problem.update({ where: { id }, data });
  }

  async deleteData(id: string): Promise<problem> {
    return this.db.problem.delete({ where: { id } });
  }

  async findByActivityTemplate(id: string): Promise<problem[]> {
    return this.db.problem.findMany({
        where: {
            activityTemplateId: id
        },
    })
  }
}
