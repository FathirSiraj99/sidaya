import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ProblemDto } from './problem.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Problem')
@ApiBearerAuth() // Menandakan bahwa autentikasi token bearer diperlukan
@Roles(Role.ADMIN)
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new problem' })
  @ApiBody({ description: 'Data for creating a problem', type: ProblemDto })
  async create(@Body() data: ProblemDto) {
    return this.problemService.createData(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all problems' })
  async findAll() {
    return this.problemService.findAll();
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Find a problem by ID' })
  @ApiParam({ name: 'id', description: 'Problem ID', type: String })
  async findOne(@Param('id') id: string) {
    return this.problemService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a problem by ID' })
  @ApiParam({ name: 'id', description: 'Problem ID', type: String })
  @ApiBody({ description: 'Data for updating a problem', type: ProblemDto })
  async update(@Param('id') id: string, @Body() data: ProblemDto) {
    return this.problemService.update(id, data);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a problem by ID' })
  @ApiParam({ name: 'id', description: 'Problem ID', type: String })
  async remove(@Param('id') id: string) {
    return this.problemService.remove(id);
  }
}
