import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProblemService {
  constructor(private db: PrismaService) { }

  async createData(data: any) {
    const newProblem = await this.db.problem.create({
      data: data
    })

    return {
      response: HttpStatus.CREATED,
      data: {
        problem: newProblem
      }
    }
  }

  async findAllByActivityTemplate(activityTemplateId: string) {
    const problem = await this.db.problem.findMany({
      where: { activityTemplateId }
    });

    if (!problem) {
      return {
        response: HttpStatus.NOT_FOUND
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        problem: problem
      }
    }
  }

  async findAll() {
    const problem = await this.db.problem.findMany();

    if (!problem) {
      return {
        response: HttpStatus.NOT_FOUND
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        problem: problem
      }
    }
  }

  async findOne(id: string) {
    const problem = await this.db.problem.findUnique({
      where: { id }
    });

    if (!problem) {
      return {
        response: HttpStatus.NOT_FOUND
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        problem: problem
      }
    }
  }

  async update(id: string, data: any) {
    const problem = await this.db.problem.update({
      where: { id },
      data: data
    });

    if (!problem) {
      return {
        response: HttpStatus.NOT_FOUND
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        problem: problem
      }
    }
  }

  async remove(id: string) {
    const deletedProblemDetail = await this.db.problemDetail.deleteMany({
      where: { problemId: id }
    })

    const deletedProblem = await this.db.problem.delete({
      where: { id }
    });

    return {
      response: HttpStatus.GONE
    }
  }
}
