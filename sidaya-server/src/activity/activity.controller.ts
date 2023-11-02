import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AreaService } from 'src/area/area.service';
import { ActivityDetailService } from 'src/activity-detail/activity-detail.service';
import { addDays, format } from 'date-fns';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityTemplateService } from 'src/activity-template/activity-template.service';

@Controller('activity')
export class ActivityController {
  constructor(
    private activity: ActivityService,
    private area: AreaService,
    private activity_detail: ActivityDetailService,
    private activity_template: ActivityTemplateService,
    private user: UserService,
  ) { }

  @UseGuards(AuthGuard)
  @Get('start')
  async startActivity(@Req() req) {
    const userId = req.user.sub
    console.log(userId)
    await this.user.validateUser(userId)
    const activityTemplate = await this.activity_template.findActivityTemplateByUserId(userId)
    return await this.activity.startActivity(activityTemplate)
  }


}
