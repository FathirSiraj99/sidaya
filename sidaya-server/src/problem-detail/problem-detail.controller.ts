import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Res } from '@nestjs/common';
import { ProblemDetailService } from './problem-detail.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { CreateProblemDetailDto, UpdateProblemDetailDto } from './problem-detail.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

// @UseGuards(AuthGuard, RolesGuard)
// @Roles(Role.ADMIN)
@ApiTags('Problem Detail')
@ApiBearerAuth() // Menandakan bahwa autentikasi token bearer diperlukan
@Controller('problem-detail')
export class ProblemDetailController {
  constructor(private readonly problemDetailService: ProblemDetailService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new problem detail' })
  @ApiBody({
    description: 'Data for creating a problem detail',
    type: CreateProblemDetailDto
  })
  async create(@Body() data: CreateProblemDetailDto, @Res() res: Response) {
    const problemDetail = await this.problemDetailService.createData(data);
    return res.status(problemDetail.status).json(problemDetail)
  }

  @Get('find')
  @ApiOperation({ summary: 'Get all problem details' })
  async findAll(@Query('problemId') problemId?: string, @Res() res?: Response) {
    if (problemId) {
      const problemDetail = await this.problemDetailService.findAllByProblem(problemId)
      return res.status(problemDetail.status).json(problemDetail)
    }
    const problemDetail = await this.problemDetailService.findAll();
    return res.status(problemDetail.status).json(problemDetail)
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Find a problem detail by ID' })
  @ApiParam({ name: 'id', description: 'Problem Detail ID', type: String })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const problemDetail = await this.problemDetailService.findOne(id);
    return res.status(problemDetail.status).json(problemDetail)
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a problem detail by ID' })
  @ApiParam({ name: 'id', description: 'Problem Detail ID', type: String })
  @ApiBody({
    description: 'Data for updating a problem detail',
    type: UpdateProblemDetailDto
  })
  async update(@Param('id') id: string, @Body() data: UpdateProblemDetailDto, @Res() res: Response) {
    const problemDetail = await this.problemDetailService.update(id, data);
    return res.status(problemDetail.status).json(problemDetail)
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a problem detail by ID' })
  @ApiParam({ name: 'id', description: 'Problem Detail ID', type: String })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const problemDetail = await this.problemDetailService.delete(id);
    return res.status(problemDetail.status).json(problemDetail)
  }
}
