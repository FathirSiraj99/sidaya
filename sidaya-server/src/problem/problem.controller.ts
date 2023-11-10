import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) { }

  @Post()
  async create(@Body() data: any) {
    return this.problemService.createData(data);
  }

  @Get('find/:activityTemplateId')
  async findAllByActivityTemplate(@Param('activityTemplateId') activityTemplateId: string) {
    return this.problemService.findAllByActivityTemplate(activityTemplateId);
  }

  @Get()
  async findAll() {
    return this.problemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.problemService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.problemService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.problemService.remove(id);
  }
}
