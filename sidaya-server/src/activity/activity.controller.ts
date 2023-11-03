import {
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('activity')
export class ActivityController {
  constructor(private activity: ActivityService) { }

  @Post('/next/:activityDetailId')
  async nextActivity(@Req() req: any, @Param('activityDetailId') activityDetailId: string) {
    const userId = req.user.sub
    console.log(userId)
    return await this.activity.nextActivity(userId, activityDetailId)
  }

}
