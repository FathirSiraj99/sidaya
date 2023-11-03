import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivityService } from 'src/activity/activity.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AreaDto } from './area.dto';

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

    if (area.activityDetailId === null) {
      const activity = await this.db.activityDetail.findMany({
        where: {
          activityTemplateId: area.activityTemplateId,
        },
        select: {
          id: true,
          name: true
        },
        orderBy: {
          turn: 'asc'
        },
        take: 3
      });

      return { area, activity }
    }

    const activity = await this.db.activityDetail.findMany({
      where: {
        activityTemplateId: area.activityTemplateId,
        id: {
          not: {
            lte: area.activityDetailId + 1
          }
        }
      },
      select: {
        id: true,
        name: true
      },
      orderBy: {
        turn: 'asc'
      },
      take: 3
    });

    return { area, activity };
  }

  async createData(userId: number, dto: AreaDto) {
    const newArea = await this.db.area.create({
      data: {
        ...dto,
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
