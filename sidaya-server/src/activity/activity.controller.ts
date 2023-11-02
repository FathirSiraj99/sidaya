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
  ) { }



}
