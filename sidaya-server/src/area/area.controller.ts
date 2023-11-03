import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaDto } from './area.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('area')
export class AreaController {
  constructor(private Areaservice: AreaService) { }


  @Get()
  async getAll() {
    return await this.Areaservice.findAll();
  }

  @Get('find')
  async getAllByUserId(@Req() req) {
    const userId = req.user.sub
    return await this.Areaservice.findAllByUserId(userId)
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.Areaservice.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req, @Body() dto: AreaDto) {
    const userId = req.user.sub
    const diameter = dto.volume;
    const volume = 3.14159 * diameter * diameter;
    dto.volume = volume;

    return await this.Areaservice.createData(userId, dto);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.Areaservice.updateData(id, body);
  }

  // /**
  //  * Delete activity_template
  //  * @param id
  //  * @returns
  //  */
  // @Delete('/:id')
  // async delete(@Param('id') id: string) {
  //   return await this.Areaservice.deleteData(id);
  // }
}
