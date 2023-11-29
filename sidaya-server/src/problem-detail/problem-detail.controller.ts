import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProblemDetailService } from './problem-detail.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { ProblemDetailDto } from './problem-detail.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiTags('Problem Detail')
@ApiBearerAuth() // Menandakan bahwa autentikasi token bearer diperlukan
@Controller('problem-detail')
export class ProblemDetailController {
  constructor(private readonly problemDetailService: ProblemDetailService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new problem detail' })
  @ApiBody({
    description: 'Data for creating a problem detail',
    type: ProblemDetailDto
  })
  async create(@Body() data: ProblemDetailDto) {
    return this.problemDetailService.createData(data);
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Get all problem details' })
  async findAll() {
    return this.problemDetailService.findAll();
  }

  @Get('find-all/:problemId')
  @ApiOperation({ summary: 'Find all problem details by Problem ID' })
  @ApiParam({ name: 'problemId', description: 'Problem ID', type: String })
  async findAllByProblem(@Param('problemId') problemId: string) {
    return this.problemDetailService.findAllByProblem(problemId);
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Find a problem detail by ID' })
  @ApiParam({ name: 'id', description: 'Problem Detail ID', type: String })
  async findOne(@Param('id') id: string) {
    return this.problemDetailService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a problem detail by ID' })
  @ApiParam({ name: 'id', description: 'Problem Detail ID', type: String })
  @ApiBody({
    description: 'Data for updating a problem detail',
    type: ProblemDetailDto
  })
  async update(@Param('id') id: string, @Body() data: ProblemDetailDto) {
    return this.problemDetailService.update(id, data);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a problem detail by ID' })
  @ApiParam({ name: 'id', description: 'Problem Detail ID', type: String })
  async remove(@Param('id') id: string) {
    return this.problemDetailService.delete(id);
  }
}
