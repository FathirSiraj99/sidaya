import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ActivityDetailService } from './activity-detail.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('activity-detail')
export class ActivityDetailController {
    constructor(private service: ActivityDetailService) { }

    @Get('find/:id')
    async getById(@Param('id') id: string) {
        return await this.service.findById(id)
    }

    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() data: any) {
        return await this.service.createData(data)
    }

    @Roles(Role.ADMIN)
    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() data: any) {
        return await this.service.updateData(id, data)
    }

    @Roles(Role.ADMIN)
    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        return await this.service.deleteData(id)
    }
}
