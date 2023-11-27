import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityDetailService {
  constructor(private db: PrismaService) { }

  async findAllByTemplate(id: string) {
    const activityDetail = await this.db.activityDetail.findMany({
      where: {
        activityTemplateId: id
      },
      orderBy: { turn: 'asc' },
    })

    if (activityDetail.length === 0) return "Activity Detail Tidak Ada"

    return activityDetail
  }

  async findById(id: string) {
    return await this.db.activityDetail.findUnique({
      where: { id },
      include: {
        activityTemplate: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createData(data: any) {
    const timeWithSeconds = `${data.time}:00`;

    return await this.db.activityDetail.create({
      data: {
        ...data,
        time: timeWithSeconds
      },
    });
  }

  async updateData(id: string, data: any) {
    const activityDetail = await this.db.activityDetail.findUnique({
      where: { id }
    })

    if (!activityDetail) return new NotFoundException("Activity Detail Not Found")

    return await this.db.activityDetail.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  async deleteData(id: string) {
    const activityDetail = await this.db.activityDetail.findUnique({
      where: { id }
    })

    if (!activityDetail) return new NotFoundException("Activity Detail Not Found")

    return await this.db.activityDetail.delete({
      where: { id }
    });
  }
}
