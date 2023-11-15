import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private activity: ActivityService) { }

  @Post('next/:areaId/:activityId')
  async nextActivity(@Param('areaId') areaId: string, @Param('activityId') activityId: string) {
    return await this.activity.nextActivity(areaId, activityId)
  }

  @Post('problem/:areaId/')
  async includeProblem(@Param('areaId') areaId: string, @Body() problemId: string) {
    return await this.activity.includeProblem(areaId, problemId)
  }

}
