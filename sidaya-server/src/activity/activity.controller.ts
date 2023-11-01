import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AreaService } from 'src/area/area.service';
import { ActivityDetailService } from 'src/activity-detail/activity-detail.service';
import { addDays, format } from 'date-fns';

@Controller('activity')
export class ActivityController {
  constructor(
    private activity: ActivityService,
    private area: AreaService,
    private activity_detail: ActivityDetailService,
  ) {}

  /**
   * Get All activity
   * @returns
   */
  @Get()
  async getAll() {
    return this.activity.findAll();
  }

  /**
   * Get All By Area with Filters
   * @param id
   * @returns
   */
  @Get('/:id')
  async getAllById(@Param('id') id: string) {
    return this.activity.findAllByArea(id);
  }

  /**
   * Creating Activity and Active Area By Id
   * @param id
   */
  @Get('/active/:id')
  async activeArea(@Param('id') id: string) {
    // get area
    const area = await this.area.findById(id);

    // check if area is exist
    if (!area) throw new NotFoundException('Area not Found');

    // check if area is active
    if (area.isActive !== 0)
      throw new BadRequestException('Area Already Active');

    // get all activity_detail by activityTemplateId
    const activityTemplate = await this.activity_detail.findAllByTemplate(
      area.activityTemplateId,
    );

    // check if activityTemplate is exist
    if (!activityTemplate)
      throw new NotFoundException('Activity Detail Not Found');

    // get current date
    const currentDate = new Date();

    // check if activityTemplate id exist
    if (activityTemplate) {
      // active area
      await this.area.updateData(id, { isActive: 1 });

      await Promise.all(
        activityTemplate.map(async (element) => {
          const newDate = addDays(currentDate, element.nthDay);
          const dueDate =
            format(newDate, 'yyyy-MM-dd') + `T${element.time}:00.000Z`;

          var data = {
            name: element.name,
            description: element.description,
            dueDate: dueDate,
            formula: element.formula,
            areaId: id,
          };

          await this.activity.createData(data);
        }),
      );
    }
  }

  /**
   * Get Detail of Activity
   * @param id
   * @returns
   */
  @Get('get-detail/:id')
  async getDetail(@Param('id') id: string) {
    const activity = await this.activity.findById(id);

    if (!activity.formula || activity.formula === null) {
      activity['formula'] = null;
    } else {
      const formula = await this.activity.formula(
        activity.formula,
        activity.areaId,
      );
      activity['formulaJson'] = activity.formula;
      activity['formula'] = formula;
    }

    return activity;
  }

  /**
   * Update activity_template
   * @param id
   * @param body
   * @returns
   */
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    return await this.activity.updateData(id, body);
  }

  @Get('/complete/:id')
  async complete(@Param('id') id: string) {
    const data = { isCompleted: 1 }
    return await this.activity.updateData(id, data)
  }
}
