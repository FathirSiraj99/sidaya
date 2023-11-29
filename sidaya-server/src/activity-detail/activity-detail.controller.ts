import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ActivityDetailService } from './activity-detail.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { ActivityDetailDto } from './activity-detail.dto';

@ApiTags('Activity Detail')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth() // Menandakan bahwa autentikasi token bearer diperlukan
@Controller('activity-detail')
export class ActivityDetailController {
    constructor(private service: ActivityDetailService) { }

    @Get('find-all/:activityTemplateId')
    @ApiOperation({ summary: 'Find all activity details by Activity Template ID' })
    @ApiParam({ name: 'activityTemplateId', description: 'Activity Template ID' })
    async findAllByTemplate(@Param('activityTemplateId') activityTemplateId: string) {
        return await this.service.findAllByTemplate(activityTemplateId)
    }

    @Get('find/:id')
    @ApiOperation({ summary: 'Get activity detail by ID' })
    @ApiParam({ name: 'id', description: 'Activity Detail ID' })
    async getById(@Param('id') id: string) {
        return await this.service.findById(id)
    }

    @Roles(Role.ADMIN)
    @Post('create')
    @ApiOperation({ summary: 'Create a new activity detail (Admin Only)' })
    @ApiBody({ description: 'Data for creating an activity detail', type: ActivityDetailDto })
    async create(@Body() data: any) {
        return await this.service.createData(data)
    }

    @Roles(Role.ADMIN)
    @Patch('update/:id')
    @ApiOperation({ summary: 'Update an activity detail by ID (Admin Only)' })
    @ApiParam({ name: 'id', description: 'Activity Detail ID' })
    @ApiBody({ description: 'Data for updating an activity detail', type: ActivityDetailDto })
    async update(@Param('id') id: string, @Body() data: any) {
        return await this.service.updateData(id, data)
    }

    @Roles(Role.ADMIN)
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete an activity detail by ID (Admin Only)' })
    @ApiParam({ name: 'id', description: 'Activity Detail ID' })
    async delete(@Param('id') id: string) {
        return await this.service.deleteData(id)
    }
}
