import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityTemplateService {
  constructor(private db: PrismaService) { }

  async findActivityTemplateByUserId(userId: number) {
    const user = await this.db.user.findUnique({
      where: { id: userId },
    })

    const activityTemplate = await this.db.activity_template.findFirst({
      where: { id: user.activity_templateId }
    })

    if (!activityTemplate) throw NotFoundException

    return activityTemplate.id

  }

  /**
   * Get All activity_template
   * @returns
   */
  async findAll() {
    return await this.db.activity_template.findMany();
  }

  /**
   * Get One activity_template By id
   * @param id
   * @returns
   */
  async findById(id: string) {
    return await this.db.activity_template.findUnique({
      where: {
        id: id,
      },
    });
  }

  /**
   * Create activity_template
   * @param data
   * @returns
   */
  async createData(data: any) {
    return await this.db.activity_template.create({
      data: data,
    });
  }

  /**
   * Update activity_template
   * @param id
   * @param data
   */
  async updateData(id: string, data: any) {
    return await this.db.activity_template.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  /**
   * Delete activity_template
   * @param id
   */
  async deleteData(id: string) {
    return await this.db.activity_template.delete({
      where: {
        id: id,
      },
    });
  }
}
