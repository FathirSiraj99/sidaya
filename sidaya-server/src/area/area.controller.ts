import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, } from '@nestjs/common';
import { AreaService } from './area.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard, RolesGuard)
@Controller('area')
export class AreaController {
  constructor(private Areaservice: AreaService) { }

  @Roles(Role.ADMIN)
  @Get('find-all')
  async getAll() {
    return await this.Areaservice.findAll();
  }

  @Get('')
  async getAllByUserId(@Req() req) {
    const userId = req.user.sub
    return await this.Areaservice.findAllByUserId(userId)
  }

  @Get('find/:id')
  async getById(@Param('id') id: string) {
    return await this.Areaservice.findById(id);
  }

  @Post()
  async create(@Req() req, @Body() data: any) {
    const userId = req.user.sub
    const diameter = data.volume;
    const volume = 3.14159 * diameter * diameter;
    data.volume = volume;

    return await this.Areaservice.createData(userId, data);
  }

  @Roles(Role.ADMIN)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.Areaservice.updateData(id, data);
  }

  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.Areaservice.deleteData(id);
  }
}
