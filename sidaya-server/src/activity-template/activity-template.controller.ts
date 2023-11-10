import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ActivityTemplateService } from './activity-template.service';
import { Role } from "@prisma/client";
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('activity-template')
export class ActivityTemplateController {
    constructor(private service: ActivityTemplateService) {}

    /**
     * Get activity_template
     * @returns 
     */
    @Get()
    async getAll() {
        return await this.service.findAll()
    }

    /**
     * Get One activity_template By Id
     * @param id 
     * @returns 
     */
    @Get('/:id')
    async getById(@Param('id') id: string) {
        return await this.service.findById(id)
    }

    /**
     * Create activity_template
     * @param body 
     * @returns 
     */
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Post()
    async create(@Body() body: any) {
        return await this.service.createData(body)
    }

    /**
     * Update activity_template
     * @param id 
     * @param body 
     * @returns 
     */
    @Patch('/:id')
    async update(@Param('id') id: string, @Body() body: any) {
        return await this.service.updateData(id, body)
    }

    /**
     * Delete activity_template
     * @param id 
     * @returns 
     */
    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.service.deleteData(id)
    }
}
