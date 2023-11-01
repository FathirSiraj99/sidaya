import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
    constructor(private problem: ProblemsService) {}

    /**
     * Get problem
     * @returns 
     */
    @Get()
    async getAll() {
        return await this.problem.findAll()
    }

    /**
     * Get One problem By Id
     * @param id 
     * @returns 
     */
    @Get('/:id')
    async getById(@Param('id') id: string) {
        return await this.problem.findById(id)
    }

    /**
     * Create problem
     * @param body 
     * @returns 
     */
    @Post()
    async create(@Body() body: any) {
        return await this.problem.createData(body)
    }

    /**
     * Update problem
     * @param id 
     * @param body 
     * @returns 
     */
    @Patch('/:id')
    async update(@Param('id') id: string, @Body() body: any) {
        return await this.problem.updateData(id, body)
    }

    /**
     * Delete problem
     * @param id 
     * @returns 
     */
    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return await this.problem.deleteData(id)
    }

    /**
     * Get By activityTemplateId
     * @param id 
     * @returns 
     */
    @Get('/get/:id')
    async getByActivityTemplte(@Param('id') id: string) {
        return await this.problem.findByActivityTemplate(id)
    }
}
