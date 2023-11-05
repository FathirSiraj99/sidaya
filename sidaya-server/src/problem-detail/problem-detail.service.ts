import { Injectable } from '@nestjs/common';
import { CreateProblemDetailDto } from './dto/create-problem-detail.dto';
import { UpdateProblemDetailDto } from './dto/update-problem-detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProblemDetailService {
  constructor (private db: PrismaService){}

  async createData (data : CreateProblemDetailDto){
    return this.db.problemDetail.create({
      data : data
    })
  }

  findAll() {
    return `This action returns all problemDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problemDetail`;
  }

  update(id: number, updateProblemDetailDto: UpdateProblemDetailDto) {
    return `This action updates a #${id} problemDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} problemDetail`;
  }
}
