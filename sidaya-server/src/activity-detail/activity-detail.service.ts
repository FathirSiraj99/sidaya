import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityDetailDto } from './activity-detail.dto';

@Injectable()
export class ActivityDetailService {
  constructor(private db: PrismaService) { }

  /**
   * Get All activityDetail
   * @returns
   */
  async findAll() {
    return await this.db.activityDetail.findMany({
      include: {
        activityTemplate: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  /**
   * Get All by activityTemplateId = area.activityTemplateId
   * @param id 
   * @returns 
   */
  async findAllByTemplate(id: string) {
    return await this.db.activityDetail.findMany({
      where: {
        activityTemplateId: id
      }
    })
  }

  /**
   * Get One activityDetail By id
   * @param id
   * @returns
   */
  async findById(id: string) {
    return await this.db.activityDetail.findUnique({
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

  /**
   * Create activityDetail
   * @param data
   * @returns
   */
  async createData(data: ActivityDetailDto) {
    return await this.db.activityDetail.create({
      data: data,
    });
  }

  /**
   * Update activityDetail
   * @param id
   * @param data
   */
  async updateData(id: string, data: any) {
    return await this.db.activityDetail.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  /**
   * Delete activityDetail
   * @param id
   */
  async deleteData(id: string) {
    return await this.db.activityDetail.delete({
      where: {
        id: id,
      },
    });
  }
}
