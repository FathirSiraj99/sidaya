import { GoneException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

    return {
      response: HttpStatus.OK,
      data: activityTemplate
    }
  }

  async findById(id: string) {
    const activityTemplate = await this.db.activityTemplate.findUnique({
      where: { id }
    });

    const activityDetail = await this.activityDetail.findAllByTemplate(id)

    if (!activityTemplate) throw new NotFoundException("Activity Template Not Found")

    return {
      response: HttpStatus.OK,
      data: {
        activityTemplate: activityTemplate,
        activityDetail: activityDetail.data
      }
    }
  }

  async createData(data: any) {
    const createData = await this.db.activityTemplate.create({
      data: data,
    });

    return {
      response: HttpStatus.CREATED,
      data: createData
    }
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

    return {
      response: HttpStatus.OK,
      data: updatedActivityTemplate
    }
  }

  async deleteData(id: string) {
    const activityTemplate = await this.db.activityTemplate.findUnique({
      where: { id }
    })

    if (!activityTemplate) throw new NotFoundException("Activity Template Not Found")

    const deletedActivityTemplate = await this.db.activityTemplate.delete({
      where: { id }
    });

    return {
      response: HttpStatus.OK,
      data: deletedActivityTemplate
    }
  }
}
