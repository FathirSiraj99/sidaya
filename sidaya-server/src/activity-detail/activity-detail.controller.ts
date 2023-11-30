import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ActivityDetailService } from './activity-detail.service';
import { Response } from 'express';
import { CreateActivityDetailDto, UpdateActivityDetailDto } from './activity-detail.dto';

@ApiTags('Activity Detail')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('activity-detail')
export class ActivityDetailController {
    constructor(private activityDetailService: ActivityDetailService) { }

    @Get('find')
    @ApiOperation({ summary: 'Find all activity details by Activity Template ID' })
    @ApiParam({ name: 'activityTemplateId', description: 'ID of the Activity Template' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved activity details.' })
    async findAllByTemplate(@Query('activityTemplateId') activityTemplateId: string, @Res() res: Response) {
        if (activityTemplateId) {
            const activityDetail = await this.activityDetailService.findAllByActivityTemplate(activityTemplateId)
            return res.status(activityDetail.status).json(activityDetail)
        }

        const activityDetail = await this.activityDetailService.findAll()
        return res.status(activityDetail.status).json(activityDetail)
    }

    @Get('find/:id')
    @ApiOperation({ summary: 'Get activity detail by ID' })
    @ApiParam({ name: 'id', description: 'Activity Detail ID' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved activity detail by ID.' })
    async getById(@Param('id') id: string, @Res() res: Response) {
        const activityDetail = await this.activityDetailService.findById(id)
        return res.status(activityDetail.status).json(activityDetail)
    }

    @Roles(Role.ADMIN)
    @Post('create')
    @ApiOperation({ summary: 'Create a new activity detail (Admin Only)' })
    @ApiBody({ description: 'Data for creating an activity detail', type: CreateActivityDetailDto })
    @ApiResponse({ status: 201, description: 'Activity detail created successfully.' })
    async create(@Body() data: CreateActivityDetailDto, @Res() res: Response) {
        const activityDetail = await this.activityDetailService.create(data)
        return res.status(activityDetail.status).json(activityDetail)
    }

    @Roles(Role.ADMIN)
    @Patch('update/:id')
    @ApiOperation({ summary: 'Update an activity detail by ID (Admin Only)' })
    @ApiParam({ name: 'id', description: 'Activity Detail ID' })
    @ApiBody({ description: 'Data for updating an activity detail', type: UpdateActivityDetailDto })
    @ApiResponse({ status: 200, description: 'Activity detail updated successfully.' })
    async update(@Param('id') id: string, @Body() data: UpdateActivityDetailDto, @Res() res: Response) {
        const activityDetail = await this.activityDetailService.updateData(id, data)
        return res.status(activityDetail.status).json(activityDetail)
    }

    @Roles(Role.ADMIN)
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete an activity detail by ID (Admin Only)' })
    @ApiParam({ name: 'id', description: 'Activity Detail ID' })
    @ApiResponse({ status: 200, description: 'Activity detail deleted successfully.' })
    async delete(@Param('id') id: string, @Res() res: Response) {
        const activityDetail = await this.activityDetailService.deleteData(id)
        return res.status(activityDetail.status).json(activityDetail)
    }
}
