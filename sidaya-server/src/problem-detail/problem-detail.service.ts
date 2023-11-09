import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProblemDetailService {
  constructor(private db: PrismaService) { }

  async createData(data: any) {
    return this.db.problemDetail.create({
      data: data
    })
  }

  async findAllByProblem(problemId: string) {
    return await this.db.problemDetail.findMany({
      where: { problemId }
    });
  }

  async findAll() {
    return await this.db.problemDetail.findMany();
  }

  async findOne(id: string) {
    return await this.db.problemDetail.findFirst({
      where: { id }
    });
  }

  async update(id: string, data: any) {
    return await this.db.problemDetail.update({
      where: { id },
      data: data
    });
  }

  async delete(id: string) {
    return this.db.problemDetail.delete({
      where: { id }
    });
  }
}
