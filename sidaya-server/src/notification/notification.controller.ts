import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiBearerAuth() // Jika menggunakan Bearer Authentication
@ApiTags('Notification') // Menambahkan tag untuk dokumentasi Swagger
@UseGuards(AuthGuard, RolesGuard)
@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Create a new notification' })
    @ApiResponse({ status: 201, description: 'The notification has been successfully created.' })
    @Post('create')
    async create(@Body() data: any) {
        return await this.notificationService.create(data)
    }

    @ApiOperation({ summary: 'Get all notifications for a user' })
    @Get('')
    async findAllByUser(@Req() req: any) {
        const userId = req.user.sub
        return await this.notificationService.findAllByUser(userId)
    }

    @ApiOperation({ summary: 'Find a notification by ID' })
    @ApiResponse({ status: 200, description: 'The notification has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Notification not found.' })
    @Get('find/:id')
    async findOne(@Param('id') id: string) {
        return await this.notificationService.findOne(id)
    }

    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Update a notification by ID' })
    @ApiResponse({ status: 200, description: 'The notification has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Notification not found.' })
    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() data: any) {
        return await this.notificationService.update(id, data)
    }

    @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Delete a notification by ID' })
    @ApiResponse({ status: 200, description: 'The notification has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Notification not found.' })
    @Patch('delete/:id')
    async delete(@Param('id') id: string) {
        return await this.notificationService.delete(id)
    }
}
