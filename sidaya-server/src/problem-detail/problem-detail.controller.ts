import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemDetailService } from './problem-detail.service';
import { CreateProblemDetailDto } from './dto/create-problem-detail.dto';
import { UpdateProblemDetailDto } from './dto/update-problem-detail.dto';

@Controller('problem-detail')
export class ProblemDetailController {
  constructor(private readonly problemDetailService: ProblemDetailService) {}

  @Post()
  create(@Body() createProblemDetailDto: CreateProblemDetailDto) {
    return this.problemDetailService.create(createProblemDetailDto);
  }

  @Get()
  findAll() {
    return this.problemDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProblemDetailDto: UpdateProblemDetailDto) {
    return this.problemDetailService.update(+id, updateProblemDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemDetailService.remove(+id);
  }
}
