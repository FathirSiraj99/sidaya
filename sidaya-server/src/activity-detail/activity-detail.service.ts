import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityDetailDto } from './activity-detail.dto';

@Injectable()
export class ActivityDetailService {
  constructor(private db: PrismaService) { }

  /**
   * Get All activity_detail
   * @returns
   */
  async findAll() {
    return await this.db.activity_detail.findMany({
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
    return await this.db.activity_detail.findMany({
      where: {
        activityTemplateId: id
      }
    })
  }

  /**
   * Get One activity_detail By id
   * @param id
   * @returns
   */
  async findById(id: string) {
    return await this.db.activity_detail.findUnique({
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
   * Create activity_detail
   * @param data
   * @returns
   */
  async createData(data: ActivityDetailDto) {
    return await this.db.activity_detail.create({
      data: data,
    });
  }

  /**
   * Update activity_detail
   * @param id
   * @param data
   */
  async updateData(id: string, data: any) {
    return await this.db.activity_detail.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  /**
   * Delete activity_detail
   * @param id
   */
  async deleteData(id: string) {
    return await this.db.activity_detail.delete({
      where: {
        id: id,
      },
    });
  }
}
