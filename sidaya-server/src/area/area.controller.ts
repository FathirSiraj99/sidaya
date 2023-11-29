import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AreaService } from './area.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiBearerAuth() // Jika menggunakan Bearer Authentication
@ApiTags('Area') // Menambahkan tag untuk dokumentasi Swagger
@UseGuards(AuthGuard, RolesGuard)
@Controller('area')
export class AreaController {
  constructor(private Areaservice: AreaService) { }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all areas' })
  @Get('find-all')
  async getAll() {
    return await this.Areaservice.findAll();
  }

  @ApiOperation({ summary: 'Get all areas by user ID' })
  @Get('find-all/user')
  async getAllByUserId(@Req() req) {
    const userId = req.user.sub
    return await this.Areaservice.findAllByUserId(userId)
  }

  @ApiOperation({ summary: 'Get area by ID' })
  @ApiResponse({ status: 200, description: 'The area has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Area not found.' })
  @Get('find/:id')
  async getById(@Param('id') id: string) {
    return await this.Areaservice.findById(id);
  }

  @ApiOperation({ summary: 'Create a new area' })
  @ApiResponse({ status: 201, description: 'The area has been successfully created.' })
  @Post('create')
  async create(@Req() req, @Body() data: any) {
    const userId = req.user.sub
    const diameter = data.volume;
    const volume = 3.14159 * diameter * diameter;
    data.volume = volume;

    return await this.Areaservice.createData(userId, data);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update area by ID' })
  @ApiResponse({ status: 200, description: 'The area has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Area not found.' })
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.Areaservice.updateData(id, data);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete area by ID' })
  @ApiResponse({ status: 200, description: 'The area has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Area not found.' })
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.Areaservice.deleteData(id);
  }
}
