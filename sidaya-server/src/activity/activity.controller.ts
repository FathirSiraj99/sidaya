import { Body, Controller, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Response } from 'express';

@ApiBearerAuth() // Menggunakan Bearer Authentication
@ApiTags('Activity') // Menambahkan tag untuk dokumentasi Swagger
@UseGuards(AuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private activity: ActivityService) { }

  @ApiOperation({ summary: 'Move to the next activity or problem' })
  @ApiQuery({ name: 'areaId', type: String, description: 'ID of the area' })
  @ApiQuery({ name: 'activityId', type: String, description: 'ID of the activity' })
  @ApiQuery({ name: 'problemId', type: String, description: 'ID of the problem' })
  @ApiResponse({ status: 200, description: 'Successfully moved to the next activity or problem.' })
  @Post('next')
  async nextActivity(
    @Query('areaId') areaId: string,
    @Query('activityId') activityId?: string,
    @Query('problemId') problemId?: string,
    @Res() res?: Response
  ) {
    if (problemId) {
      const activity = await this.activity.nextProblem(areaId, problemId);
      return res.status(activity.status).json(activity);
    } else if (activityId) {
      const activity = await this.activity.nextActivity(areaId, activityId);
      return res.status(activity.status).json(activity);
    }
  }

  @ApiOperation({ summary: 'Include a problem in the area' })
  @ApiQuery({ name: 'areaId', type: String, description: 'ID of the area' })
  @ApiQuery({ name: 'problemId', type: String, description: 'ID of the problem' })
  @ApiResponse({ status: 200, description: 'Problem successfully included in the area.' })
  @Post('problem')
  async includeProblem(
    @Query('areaId') areaId: string,
    @Query('problemId') problemId: string,
    @Res() res: Response
  ) {
    const activity = await this.activity.includeProblem(areaId, problemId);
    return res.status(activity.status).json(activity);
  }

  @ApiOperation({ summary: 'Find all activities by area ID' })
  @ApiQuery({ name: 'areaId', type: String, description: 'ID of the area' })
  @ApiResponse({ status: 200, description: 'Successfully found all activities for the area.' })
  @Post('find/:areaId')
  async findAllActivity(
    @Param('areaId') areaId: string,
    @Res() res: Response
  ) {
    const activity = await this.activity.findAll(areaId);
    return res.status(activity.status).json(activity);
  }
}
