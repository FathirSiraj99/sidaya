import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { AreaService } from './area.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { CreateAreaDto, UpdateAreaDto } from './area.dto';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';

@ApiBearerAuth() // Menandakan bahwa autentikasi token bearer diperlukan
@ApiTags('Area') // Menambahkan tag untuk dokumentasi Swagger
// @UseGuards(AuthGuard, RolesGuard)
@Controller('area')
export class AreaController {
  constructor(
    private areaService: AreaService,
    private userService: UserService
  ) { }

  @ApiOperation({ summary: 'Get all areas by user ID' })
  @Get('find')
  async getAll(@Req() req, @Res() res: Response) {
    const userId = req.user.sub
    const user = await this.userService.findById(userId)

    if (user.data.user.roles === Role.ADMIN) {
      const area = await this.areaService.findAll()
      return res.status(area.status).json(area)
    }

    const area = await this.areaService.findAllByUserId(userId)
    return res.status(area.status).json(area)
  }

  @ApiOperation({ summary: 'Get area by ID' })
  @ApiParam({ name: 'id', description: 'Area ID' })
  @ApiResponse({ status: 200, description: 'The area has been successfully retrieved.' })
  @Get('find/:id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const area = await this.areaService.findById(id);
    return res.status(area.status).json(area)
  }

  @ApiOperation({ summary: 'Create a new area' })
  @ApiResponse({ status: 201, description: 'The area has been successfully created.' })
  @ApiBody({ type: CreateAreaDto })
  @Post('create')
  async create(@Req() req, @Body() data: CreateAreaDto, @Res() res: Response) {
    const userId = req.user.sub
    const diameter = data.volume;
    const volume = Math.PI * diameter * diameter;
    data.volume = volume;

    const area = await this.areaService.create(userId, data);
    return res.status(area.status).json(area)
  }

  @ApiOperation({ summary: 'Update area by ID' })
  @ApiParam({ name: 'id', description: 'Area ID' })
  @ApiResponse({ status: 200, description: 'The area has been successfully updated.' })
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() data: UpdateAreaDto, @Res() res: Response) {
    const area = await this.areaService.updateData(id, data);
    return res.status(area.status).json(area)
  }

  @ApiOperation({ summary: 'Delete area by ID' })
  @ApiParam({ name: 'id', description: 'Area ID' })
  @ApiResponse({ status: 200, description: 'The area has been successfully deleted.' })
  @Delete('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const area = await this.areaService.deleteData(id);
    return res.status(area.status).json(area)
  }
}
