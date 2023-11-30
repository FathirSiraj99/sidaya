import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Fish, Role } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { ActivityTemplateService } from './activity-template.service';
import { CreateActivityTemplateDto, UpdateActivityTemplateDto } from './activity-template.dto';

@ApiTags('Activity Template')
// @UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('activity-template')
export class ActivityTemplateController {
    constructor(private activityTemplateService: ActivityTemplateService) { }

    @Get('find')
    @ApiOperation({ summary: 'Get all activity templates' })
    @ApiQuery({ name: 'fish', description: 'Fish type', required: false, enum: ['FishType1', 'FishType2'] }) // Ganti enum dengan tipe ikan yang sesuai
    @ApiResponse({ status: 200, description: 'List of activity templates retrieved successfully.' })
    async getAll(@Query('fish') fish: Fish, @Res() res: Response) {
        if (fish) {
            const activityTemplate = await this.activityTemplateService.findAllByFish(fish)
            return res.status(activityTemplate.status).json(activityTemplate)
        }
        const activityTemplate = await this.activityTemplateService.findAll()
        return res.status(activityTemplate.status).json(activityTemplate)
    }

    @Get('find/:id')
    @ApiOperation({ summary: 'Get activity template by ID' })
    @ApiParam({ name: 'id', description: 'Activity template ID', type: String })
    @ApiResponse({ status: 200, description: 'Activity template found successfully.' })
    async getById(@Param('id') id: string, @Res() res: Response) {
        const activityTemplate = await this.activityTemplateService.findById(id)
        return res.status(activityTemplate.status).json(activityTemplate)
    }

    // @Roles(Role.ADMIN)
    @Post('create')
    @ApiOperation({ summary: 'Create a new activity template (Admin Only)' })
    @ApiBody({ description: 'Data for creating an activity template', type: CreateActivityTemplateDto })
    @ApiResponse({ status: 201, description: 'Activity template created successfully.' })
    async create(@Body() data: CreateActivityTemplateDto, @Res() res: Response) {
        const activityTemplate = await this.activityTemplateService.create(data)
        return res.status(activityTemplate.status).json(activityTemplate)
    }

    // @Roles(Role.ADMIN)
    @Patch('update/:id')
    @ApiOperation({ summary: 'Update an activity template by ID (Admin Only)' })
    @ApiParam({ name: 'id', description: 'Activity template ID', type: String })
    @ApiBody({ description: 'Data for updating an activity template', type: UpdateActivityTemplateDto })
    @ApiResponse({ status: 200, description: 'Activity template updated successfully.' })
    async update(@Param('id') id: string, @Body() data: UpdateActivityTemplateDto, @Res() res: Response) {
        const activityTemplate = await this.activityTemplateService.updateData(id, data)
        return res.status(activityTemplate.status).json(activityTemplate)
    }

    // @Roles(Role.ADMIN)
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete an activity template by ID (Admin Only)' })
    @ApiParam({ name: 'id', description: 'Activity template ID', type: String })
    @ApiResponse({ status: 200, description: 'Activity template deleted successfully.' })
    async delete(@Param('id') id: string, @Res() res: Response) {
        const activityTemplate = await this.activityTemplateService.deleteData(id)
        return res.status(activityTemplate.status).json(activityTemplate)
    }
}
