import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Res } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateProblemDto, UpdateProblemDto } from './problem.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Response } from 'express';

// @UseGuards(AuthGuard, RolesGuard)
@ApiTags('Problem')
@ApiBearerAuth() // Menandakan bahwa autentikasi token bearer diperlukan
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new problem' })
  @ApiBody({ type: CreateProblemDto }) // Deskripsi data body untuk membuat masalah baru
  @ApiResponse({ status: 201, description: 'Problem created successfully' }) // Respons jika berhasil
  async create(@Body() data: CreateProblemDto, @Res() res: Response) {
    const problem = await this.problemService.create(data)
    return res.status(problem.status).json(problem)
  }

  @Get('find')
  @ApiOperation({ summary: 'Get all problems or by activity template ID' })
  @ApiResponse({ status: 200, description: 'List of problems fetched successfully' }) // Respons jika berhasil
  async findAll(@Query('activityTemplateId') activityTemplateId?: string, @Res() res?: Response) {
    if (activityTemplateId) {
      const problem = await this.problemService.findAllByActivityTemplate(activityTemplateId)
      return res.status(problem.status).json(problem)
    }

    const problem = await this.problemService.findAll()
    return res.status(problem.status).json(problem)
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a problem by ID' })
  @ApiParam({ name: 'id', description: 'Problem ID', type: String })
  @ApiBody({ type: UpdateProblemDto }) // Deskripsi data body untuk pembaruan masalah
  @ApiResponse({ status: 200, description: 'Problem updated successfully' }) // Respons jika berhasil
  async update(@Param('id') id: string, @Body() data: UpdateProblemDto, @Res() res: Response) {
    const problem = await this.problemService.update(id, data)
    return res.status(problem.status).json(problem)
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a problem by ID' })
  @ApiParam({ name: 'id', description: 'Problem ID', type: String })
  @ApiResponse({ status: 204, description: 'Problem deleted successfully' }) // Respons jika berhasil
  async remove(@Param('id') id: string, @Res() res: Response) {
    const problem = await this.problemService.remove(id)
    return res.status(problem.status).json(problem)
  }
}
