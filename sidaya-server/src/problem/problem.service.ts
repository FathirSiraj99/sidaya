import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProblemDto, UpdateProblemDto } from './problem.dto';

@Injectable()
export class ProblemService {
  constructor(private db: PrismaService) { }

  async create(data: CreateProblemDto) {
    const newProblem = await this.db.problem.create({
      data: data
    })

    return {
      status: HttpStatus.CREATED,
      data: {
        problem: newProblem
      },
    }
  }

  async findAllByActivityTemplate(activityTemplateId: string) {
    const problem = await this.db.problem.findMany({
      where: { activityTemplateId }
    });

    return {
      status: HttpStatus.OK,
      data: {
        problem: problem
      }
    }
  }

  async findAll() {
    const problem = await this.db.problem.findMany();

    return {
      status: HttpStatus.OK,
      data: {
        problem: problem
      },
    }
  }

  async findOne(id: string) {
    const problem = await this.db.problem.findUnique({
      where: { id }
    });

    return {
      status: HttpStatus.OK,
      data: {
        problem
      }
    }
  }

  async update(id: string, data: UpdateProblemDto) {
    const updatedProblem = await this.db.problem.update({
      where: { id },
      data: data
    });

    return {
      status: HttpStatus.OK,
      data: {
        problem: updatedProblem
      }
    }
  }

  async remove(id: string) {
    // Hapus terlebih dahulu detail terkait problem jika perlu
    await this.db.problemDetail.deleteMany({
      where: { problemId: id }
    });

    // Hapus problem itu sendiri
    await this.db.problem.delete({
      where: { id }
    });

    return {
      status: HttpStatus.GONE,
    }
  }
}
