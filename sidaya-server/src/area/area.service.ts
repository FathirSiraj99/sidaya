import { GoneException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ActivityService } from 'src/activity/activity.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AreaService {
  constructor(
    private db: PrismaService,
    private activityService: ActivityService
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
    const area = await this.db.area.findMany();

    if (!area) return { response: HttpStatus.NOT_FOUND }

    return {
      response: HttpStatus.OK,
      data: {
        area: area
      }
    }
  }

  async findAllByUserId(userId: number) {
    const area = await this.db.area.findMany({
      where: { userId }
    });

    if (!area) return { response: HttpStatus.NOT_FOUND }

    return {
      response: HttpStatus.OK,
      data: {
        area: area
      }
    }
  }

  async findById(areaId: string) {
    const area = await this.db.area.findFirst({
      where: { id: areaId },
      include: {
        activityTemplate: {
          select: { name: true }
        }
      }
    });

    if (!area) throw new NotFoundException("Area not found");

    return area.activityTemplateId === null
      ? {
        response: HttpStatus.OK,
        data: {
          area: area,
          activity: []
        }
      }
      : area.problemId !== null
        ? await this.activityService.findAllProblemByAreaId(areaId)
        : await this.activityService.findAllActivityByAreaId(areaId)
  }

  async createData(userId: number, data: any) {
    const newArea = await this.db.area.create({
      data: {
        ...data,
        userId
      }
    });

    const startActivity = await this.activityService.startActivity(newArea.id)

    return {
      response: HttpStatus.CREATED,
      data: {
        area: newArea,
        activity: startActivity.data.activity
      }
    }
  }

  async updateData(id: string, data: any) {
    const area = await this.db.area.findUnique({
      where: { id }
    })

    if (!area) return new NotFoundException("Area Not Found")

    const updatedArea = await this.db.area.update({
      where: { id },
      data: data
    });

    return {
      response: HttpStatus.OK,
      data: {
        area: updatedArea
      }
    }
  }

  async deleteData(id: string) {
    const area = await this.db.area.findUnique({
      where: { id }
    })

    if (!area) return new NotFoundException("Area Not Found")

    const deletedArea = await this.db.area.delete({
      where: { id }
    });

    return {
      response: HttpStatus.GONE,
    }
  }
}
