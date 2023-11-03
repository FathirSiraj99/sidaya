import { Injectable } from '@nestjs/common';
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

  async findById(id: string) {
    return await this.db.area.findUnique({
      where: {
        id: id,
      },
      include: {
        activityTemplate: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createData(userId: number, dto: AreaDto) {
    const newArea = await this.db.area.create({
      data: {
        ...dto,
        userId
      }
    });

    return await this.activityService.startActivity(userId)
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
