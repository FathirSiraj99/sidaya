import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AreaService {
  constructor(private db: PrismaService) {}

  /**
   * Get All area
   * @returns
   */
  async findAll() {
    return await this.db.area.findMany({
      include: {
        activityTemplate: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  /**
   * Get One area By id
   * @param id
   * @returns
   */
  async findById(id: string) {
    return await this.db.area.findUnique({
      where: {
        id: id,
      },
      include: {
        activityTemplate: {
          select: {
            name: true, // Hanya menyertakan field "name" dari activityTemplate
          },
        },
      },
    });
  }

  /**
   * Create area
   * @param data
   * @returns
   */
  async createData(data: any) {
    return await this.db.area.create({
      data: data,
    });
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
