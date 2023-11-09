import {
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ActivityDetailDto } from 'src/activity-detail/activity-detail.dto';

// @UseGuards(AuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private activity: ActivityService) { }

  @Post('/next/:areaId/:activityDetailId')
  async nextActivity(@Param('areaId') areaId: string, @Param('activityDetailId') activityDetailId: string) {
    return await this.activity.nextActivity(areaId, activityDetailId)
  }

  @Post('problem/:areaId/:problemId')
  async includeProblem(@Param('areaId') areaId: string, @Param('problemId') problemId: string) {
    console.log(problemId)
    return await this.activity.includeProblem(areaId, problemId)
  }

}
