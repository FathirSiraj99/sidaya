import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ActivityTemplateService } from './activity-template.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ActivityTemplateDto } from './activity-template.dto';

@ApiTags('activity-template')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('activity-template')
export class ActivityTemplateController {
    constructor(private service: ActivityTemplateService) { }

    @Get()
    @ApiOperation({ summary: 'Get all activity templates' })
    async getAll() {
        return await this.service.findAll()
    }

    @Get('find/:id')
    @ApiOperation({ summary: 'Get activity template by ID' })
    async getById(@Param('id') id: string) {
        return await this.service.findById(id)
    }

    @Roles(Role.ADMIN)
    @Post('create')
    @ApiOperation({ summary: 'Create a new activity template (Admin Only)' })
    @ApiBody({ description: 'Data for creating an activity template', type: ActivityTemplateDto })
    async create(@Body() data: ActivityTemplateDto) {
        return await this.service.createData(data)
    }

    @Roles(Role.ADMIN)
    @Patch('update/:id')
    @ApiOperation({ summary: 'Update an activity template by ID (Admin Only)' })
    @ApiBody({ description: 'Data for updating an activity template', type: ActivityTemplateDto })
    async update(@Param('id') id: string, @Body() data: ActivityTemplateDto) {
        return await this.service.updateData(id, data)
    }

    @Roles(Role.ADMIN)
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete an activity template by ID (Admin Only)' })
    async delete(@Param('id') id: string) {
        return await this.service.deleteData(id)
    }
}
