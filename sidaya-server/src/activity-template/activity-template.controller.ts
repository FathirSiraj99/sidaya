import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ActivityTemplateService } from './activity-template.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(AuthGuard, RolesGuard)
@Controller('activity-template')
export class ActivityTemplateController {
    constructor(private service: ActivityTemplateService) { }

    @Get()
    async getAll() {
        return await this.service.findAll()
    }

    @Get('find/:id')
    async getById(@Param('id') id: string) {
        return await this.service.findById(id)
    }

<<<<<<< HEAD
=======
    /**
     * Create activity_template
     * @param body 
     * @returns 
     */
    @UseGuards(RolesGuard)
>>>>>>> d332669224c2b470da936b28a8ab819ed0964ffe
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
