import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { ActivityDetailService } from 'src/activity-detail/activity-detail.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityTemplateService {
  constructor(
    private db: PrismaService,
    private activityDetail: ActivityDetailService
  ) { }

  async findAll() {
    const activityTemplate = await this.db.activityTemplate.findMany();

    if (activityTemplate.length === 0) throw new GoneException('Activity Template Is Missing')

    return activityTemplate
  }

  async findById(id: string) {
    const activityTemplate = await this.db.activityTemplate.findUnique({
      where: { id }
    });

    const activityDetail = await this.activityDetail.findAllByTemplate(id)

    if (!activityTemplate) throw new NotFoundException("Activity Template Not Found")

    return { activityTemplate, activityDetail }
  }

  async createData(data: any) {
    return await this.db.activityTemplate.create({
      data: data,
    });
  }

  async updateData(id: string, data: any) {
    const activityTemplate = await this.db.activityTemplate.findUnique({
      where: { id }
    })

    if (!activityTemplate) throw new NotFoundException("Activity Template Not Found")

    const updatedActivityTemplate = await this.db.activityTemplate.update({
      where: { id },
      data: data,
    });

    return updatedActivityTemplate
  }

  async deleteData(id: string) {
    const activityTemplate = await this.db.activityTemplate.findUnique({
      where: { id }
    })

    if (!activityTemplate) throw new NotFoundException("Activity Template Not Found")

    return await this.db.activityTemplate.delete({
      where: { id }
    });
  }
}
