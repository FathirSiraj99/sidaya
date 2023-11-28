import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProblemDetailService {
  constructor(private db: PrismaService) { }

  async createData(data: any) {
    const newProblemDetail = await this.db.problemDetail.create({
      data: data
    })

    return {
      response: HttpStatus.CREATED,
      data: {
        problemDetail: newProblemDetail
      }
    }
  }

  async findAllByProblem(problemId: string) {
    const problemDetail = await this.db.problemDetail.findMany({
      where: { problemId }
    });

    if (!problemDetail) {
      return {
        response: HttpStatus.NOT_FOUND
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        problemDetail: problemDetail
      }
    }
  }

  async findAll() {
    const problemDetail = await this.db.problemDetail.findMany();

    if (!problemDetail) {
      return {
        response: HttpStatus.GONE,
        data: {
          problemDetail: []
        }
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        problemDetail: problemDetail
      }
    }
  }

  async findOne(id: string) {
    const problemDetail = await this.db.problemDetail.findFirst({
      where: { id }
    });

    if (!problemDetail) {
      return {
        response: HttpStatus.NOT_FOUND,
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        problemDetail: problemDetail
      }
    }
  }

  async update(id: string, data: any) {
    const updatedProblemDetail = await this.db.problemDetail.update({
      where: { id },
      data: data
    });

    if (!updatedProblemDetail) {
      return {
        response: HttpStatus.NOT_FOUND
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        problemDetail: updatedProblemDetail
      }
    }
  }

  async delete(id: string) {
    const deletedProblemDetail = await this.db.problemDetail.delete({
      where: { id }
    });

    if (!deletedProblemDetail) {
      return {
        response: HttpStatus.NOT_FOUND
      }
    }

    return {
      response: HttpStatus.GONE
    }
  }
}
