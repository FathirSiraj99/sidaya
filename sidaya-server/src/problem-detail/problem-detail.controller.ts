import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProblemDetailService } from './problem-detail.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('problem-detail')
export class ProblemDetailController {
  constructor(private readonly problemDetailService: ProblemDetailService) { }

  @Post()
  async create(@Body() data: any) {
    return this.problemDetailService.createData(data);
  }

  @Get(':problemId')
  async findAll(@Param('problemId') problemId: string) {
    return this.problemDetailService.findAll();
  }

  @Get('find/:problemId')
  async findAllByProblem(@Param('problemId') problemId: string) {
    return this.problemDetailService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.problemDetailService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.problemDetailService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.problemDetailService.delete(id);
  }
}
