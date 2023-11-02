import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityTemplateService {
  constructor(private db: PrismaService) { }

  /**
   * Get All activityTemplate
   * @returns
   */
  async findAll() {
    return await this.db.activityTemplate.findMany();
  }

  /**
   * Get One activityTemplate By id
   * @param id
   * @returns
   */
  async findById(id: string) {
    return await this.db.activityTemplate.findUnique({
      where: {
        id: id,
      },
    });
  }

  /**
   * Create activityTemplate
   * @param data
   * @returns
   */
  async createData(data: any) {
    return await this.db.activityTemplate.create({
      data: data,
    });
  }

  /**
   * Update activityTemplate
   * @param id
   * @param data
   */
  async updateData(id: string, data: any) {
    return await this.db.activityTemplate.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  /**
   * Delete activityTemplate
   * @param id
   */
  async deleteData(id: string) {
    return await this.db.activityTemplate.delete({
      where: {
        id: id,
      },
    });
  }
}
