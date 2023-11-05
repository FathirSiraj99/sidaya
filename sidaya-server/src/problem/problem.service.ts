import { Injectable } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProblemService {
  constructor (private db : PrismaService){}

  async createData ( data:any) {
      return await this.db.problem.create({
        data: data
      })
  }

  findAll() {
    return `This action returns all problem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problem`;
  }

  update(id: number, updateProblemDto: UpdateProblemDto) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number) {
    return `This action removes a #${id} problem`;
  }
}
