import { GoneException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAreaDto, UpdateAreaDto } from './area.dto';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class AreaService {
  constructor(
    private db: PrismaService,
    private activity: ActivityService
  ) { }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async addNthDayAreaEveryDay() {
    const allAreas = await this.db.area.findMany();

    for (const area of allAreas) {
      if (area.problemDetailId) {
        const problemDetail = await this.db.problemDetail.findUnique({
          where: {
            id: area.problemDetailId,
          },
        });

        if (problemDetail && area.nthDay < problemDetail.nthDay) {
          await this.db.area.update({
            where: {
              id: area.id,
            },
            data: {
              nthDay: { increment: 1 },
            },
          });
        }
      } else {
        const activityDetail = await this.db.activityDetail.findUnique({
          where: {
            id: area.activityDetailId,
          },
        });

        if (activityDetail && area.nthDay < activityDetail.nthDay) {
          await this.db.area.update({
            where: {
              id: area.id,
            },
            data: {
              nthDay: { increment: 1 },
            },
          });
        }
      }
    }
  }

  async findAll() {
    const area = await this.db.area.findMany({
      include: {
        activityTemplate: {
          select: { name: true }
        }
      }
    });

    return {
      status: HttpStatus.OK,
      data: {
        area: area
      },
    }
  }

  async findAllByUserId(userId: number) {
    const area = await this.db.area.findMany({
      where: { userId },
      include: {
        activityTemplate: {
          select: { name: true }
        }
      }
    });

    return {
      status: HttpStatus.OK,
      data: {
        area: area
      },
    }
  }

  async findById(areaId: string) {
    const area = await this.db.area.findFirst({
      where: { id: areaId },
    });

    const activities = await this.activity.findAll(areaId)

    return {
      status: HttpStatus.OK,
      data: {
        area: area,
        activities: activities
      },
    }
  }

  async create(userId: number, data: CreateAreaDto) {
    const newArea = await this.db.area.create({
      data: {
        ...data,
        userId
      }
    });

    return {
      status: HttpStatus.CREATED,
      data: {
        area: newArea
      },
    }
  }

  async addTemplateToArea(areaId: string, activityTemplateId: string) {
    const area = await this.db.area.update({
      where: { id: areaId },
      data: {
        activityTemplateId
      }
    })

    return {
      status: HttpStatus.OK,
      data: {
        area: area,
      }
    }
  }

  async updateData(id: string, data: UpdateAreaDto) {
    const updatedArea = await this.db.area.update({
      where: { id },
      data: data
    });

    return {
      status: HttpStatus.OK,
      data: {
        area: updatedArea
      },
    }
  }

  async deleteData(id: string) {
    const deletedArea = await this.db.area.delete({
      where: { id }
    });

    if (!deletedArea) throw new GoneException("Area not found or already deleted")

    return {
      status: HttpStatus.GONE,
    }
  }
}
