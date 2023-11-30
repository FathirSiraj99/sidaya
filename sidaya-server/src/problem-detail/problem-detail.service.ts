import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProblemDetailDto, UpdateProblemDetailDto } from './problem-detail.dto';

@Injectable()
export class ProblemDetailService {
  constructor(private db: PrismaService) { }

  async createData(data: CreateProblemDetailDto) {
    const newProblemDetail = await this.db.problemDetail.create({
      data
    })

    return {
      status: HttpStatus.CREATED,
      data: {
        problemDetail: newProblemDetail
      }
    }
  }

  async findAllByProblem(problemId: string) {
    const problemDetail = await this.db.problemDetail.findMany({
      where: { problemId },
      orderBy: { turn: 'asc' }
    });

    return {
      status: HttpStatus.OK,
      data: {
        problemDetail: problemDetail
      }
    }
  }

  async findAll() {
    const problemDetail = await this.db.problemDetail.findMany({
      orderBy: { problemId: "asc", turn: "asc" }
    });

    return {
      status: HttpStatus.OK,
      data: {
        problemDetail: problemDetail
      }
    }
  }

  async findOne(id: string) {
    const problemDetail = await this.db.problemDetail.findUnique({
      where: { id }
    });

    return {
      status: HttpStatus.OK,
      data: {
        problemDetail: problemDetail
      }
    }
  }

  async update(id: string, data: UpdateProblemDetailDto) {
    const updatedProblemDetail = await this.db.problemDetail.update({
      where: { id },
      data: data
    });

    return {
      status: HttpStatus.OK,
      data: {
        problemDetail: updatedProblemDetail
      }
    }
  }

  async delete(id: string) {
    await this.db.problemDetail.delete({
      where: { id }
    });

    return {
      status: HttpStatus.GONE,
    }
  }
}
