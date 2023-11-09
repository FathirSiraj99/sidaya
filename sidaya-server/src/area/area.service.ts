import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivityService } from 'src/activity/activity.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AreaService {
  constructor(
    private db: PrismaService,
    private activityService: ActivityService
  ) { }

  async findAll() {
    return await this.db.area.findMany()
  }

  async findAllByUserId(userId: number) {
    return await this.db.area.findMany({
      where: { userId }
    });
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

    if (area.activityTemplateId === null) return { area, activity: "Selamat kamu telah selesai" }

    if (area.problemId !== null) {
      return await this.activityService.findAllProblemByAreaId(areaId)
    }

    if (area.activityDetailId === null) {
      return await this.activityService.startActivity(areaId)
    }

    return await this.activityService.findAllActivityByAreaId(areaId)
  }

  async createData(userId: number, data: any) {
    const newArea = await this.db.area.create({
      data: {
        ...data,
        userId
      }
    });

    return await this.activityService.startActivity(newArea.id)
  }

  /**
   * Update area
   * @param id
   * @param data
   */
  async updateData(id: string, data: any) {
    return await this.db.area.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  // /**
  //  * Delete area
  //  * @param id
  //  */
  // async deleteData(id: string) {
  //   await this.db.activity.deleteMany({
  //     where: {
  //       areaId: id
  //     }
  //   })

  //   return await this.db.area.delete({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
}
