import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiBearerAuth() // Jika menggunakan Bearer Authentication
@ApiTags('Activity') // Menambahkan tag untuk dokumentasi Swagger
@UseGuards(AuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private activity: ActivityService) { }

  @ApiOperation({ summary: 'Move to the next activity' })
  @ApiResponse({ status: 200, description: 'Successfully moved to the next activity.' })
  @Post('next/:areaId/:activityId')
  async nextActivity(@Param('areaId') areaId: string, @Param('activityId') activityId: string) {
    return await this.activity.nextActivity(areaId, activityId)
  }

  @ApiOperation({ summary: 'Include a problem in the area' })
  @ApiResponse({ status: 200, description: 'Problem successfully included in the area.' })
  @Post('problem/:areaId/')
  async includeProblem(@Param('areaId') areaId: string, @Body() problemId: string) {
    return await this.activity.includeProblem(areaId, problemId)
  }
}
