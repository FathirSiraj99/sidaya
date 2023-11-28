import { GoneException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

    if (activityDetail.length === 0) {
      return {
        response: HttpStatus.OK,
        data: []
      }
    }

    return {
      response: HttpStatus.OK,
      data: activityDetail
    }
  }

  async findById(id: string) {
    const activityDetail = await this.db.activityDetail.findUnique({
      where: { id },
      include: {
        activityTemplate: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!activityDetail) {
      throw new NotFoundException("Activity Detail Tidak Ada")
    }

    return {
      response: HttpStatus.OK,
      data: activityDetail
    }
  }

  async createData(data: any) {
    const timeWithSeconds = `${data.time}:00`;

    const createData = await this.db.activityDetail.create({
      data: {
        ...data,
        time: timeWithSeconds
      },
    });

    return {
      response: HttpStatus.CREATED,
      data: createData
    }
  }

  async updateData(id: string, data: any) {
    const activityDetail = await this.db.activityDetail.findUnique({
      where: { id }
    })

    if (!activityDetail) return new NotFoundException("Activity Detail Not Found")

    const updatedActivityDetail = await this.db.activityDetail.update({
      data: data,
      where: {
        id: id,
      },
    });

    return {
      response: HttpStatus.OK,
      data: updatedActivityDetail
    }
  }

  async deleteData(id: string) {
    const activityDetail = await this.db.activityDetail.findUnique({
      where: { id }
    })

    if (!activityDetail) return new NotFoundException("Activity Detail Not Found")

    const deletedActivityDetail = await this.db.activityDetail.delete({
      where: { id }
    });

    return {
      response: HttpStatus.OK,
      data: deletedActivityDetail
    }
  }
}
