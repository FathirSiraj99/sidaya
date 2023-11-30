import { GoneException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Fish } from '@prisma/client';
import { ActivityDetailService } from 'src/activity-detail/activity-detail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityTemplateDto, UpdateActivityTemplateDto } from './activity-template.dto';

@Injectable()
export class ActivityTemplateService {
  constructor(private db: PrismaService) { }

  async findAll() {
    const activityTemplate = await this.db.activityTemplate.findMany();

    return {
      status: HttpStatus.OK,
      data: {
        activityTemplate
      },
    }
  }

  async findAllByFish(fish: Fish) {
    const activityTemplate = await this.db.activityTemplate.findMany({
      where: { fish }
    })

    return {
      status: HttpStatus.OK,
      data: {
        activityTemplate
      },
    }
  }

  async findById(id: string) {
    const activityTemplate = await this.db.activityTemplate.findUnique({
      where: { id }
    });

    return {
      status: HttpStatus.OK,
      data: {
        activityTemplate
      },
    }
  }

  async create(data: CreateActivityTemplateDto) {
    const activityTemplate = await this.db.activityTemplate.create({
      data: data,
    });

    return {
      status: HttpStatus.CREATED,
      data: {
        activityTemplate
      },
    }
  }

  async updateData(id: string, data: UpdateActivityTemplateDto) {
    const updatedActivityTemplate = await this.db.activityTemplate.update({
      where: { id },
      data: data
    });

    return {
      status: HttpStatus.OK,
      data: {
        activityTemplate: updatedActivityTemplate
      },
    }
  }

  async deleteData(id: string) {
    const deletedActivityTemplate = await this.db.activityTemplate.delete({
      where: { id }
    });

    if (!deletedActivityTemplate) throw new GoneException("Activity template not found or already deleted")

    return {
      status: HttpStatus.GONE,
    }
  }
}
