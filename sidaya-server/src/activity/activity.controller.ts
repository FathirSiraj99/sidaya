import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private activity: ActivityService) { }

  @Post('next/:areaId')
  async nextActivity(@Param('areaId') areaId: string, @Body() activityDetailId: string) {
    return await this.activity.nextActivity(areaId, activityDetailId)
  }

  @Post('problem/:areaId/')
  async includeProblem(@Param('areaId') areaId: string, @Body() problemId: string) {
    return await this.activity.includeProblem(areaId, problemId)
  }

}
