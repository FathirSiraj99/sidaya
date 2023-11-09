import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProblemService {
  constructor(private db: PrismaService) { }

  async createData(data: any) {
    return await this.db.problem.create({
      data: data
    })
  }

  async findAllByActivityTemplate(activityTemplateId: string) {
    return await this.db.problem.findMany({
      where: { activityTemplateId }
    });
  }

  async findAll() {
    return await this.db.problem.findMany();
  }

  async findOne(id: string) {
    return await this.db.problem.findUnique({
      where: { id }
    });
  }

  async update(id: string, data: any) {
    return await this.db.problem.update({
      where: { id },
      data: data
    });
  }

  async remove(id: string) {
    const deleteProblemDetail = await this.db.problemDetail.deleteMany({
      where: { problemId: id }
    })

    return await this.db.problem.delete({
      where: { id }
    });
  }
}
