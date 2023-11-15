import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard, RolesGuard)
@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Roles(Role.ADMIN)
    @Post('create')
    async create(data: any) {
        return await this.notificationService.create(data)
    }

    @Get('')
    async findAllByUser(@Req() req: any) {
        const userId = req.user.sub
        return await this.notificationService.findAllByUser(userId)
    }

    @Get('find/:id')
    async findOne(@Param('id') id: string) {
        return await this.notificationService.findOne(id)
    }

    @Roles(Role.ADMIN)
    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() data: any) {
        return await this.notificationService.update(id, data)
    }

    async delete(@Param('id') id: string) {
        return await this.notificationService.delete(id)
    }
}
