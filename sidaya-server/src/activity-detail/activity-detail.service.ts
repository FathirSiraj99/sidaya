import { GoneException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDetailDto, UpdateActivityDetailDto } from './activity-detail.dto';

@Injectable()
export class ActivityDetailService {
  constructor(private db: PrismaService) { }

  async findAllByActivityTemplate(activityTemplateId: string) {
    const activityDetail = await this.db.activityDetail.findMany({
      where: {
        activityTemplateId
      },
      orderBy: { turn: 'asc' },
    })

    return {
      status: HttpStatus.OK,
      data: {
        activityDetail
      },
    }
  }

  async findAll() {
    const activityDetail = await this.db.activityDetail.findMany({
      orderBy: {
        activityTemplate: {
          name: 'asc'
        }
      }
    })

    return {
      status: HttpStatus.OK,
      data: {
        activityDetail
      },
    }
  }

  async findById(id: string) {
    const activityDetail = await this.db.activityDetail.findUnique({
      where: { id }
    });

    return {
      status: HttpStatus.OK,
      data: {
        activityDetail
      },
    }
  }

  async create(data: CreateActivityDetailDto) {
    const timeWithSeconds = `${data.time}:00`;

    const existingActivityDetails = await this.findAllByActivityTemplate(data.activityTemplateId);

    if (existingActivityDetails && existingActivityDetails.data.activityDetail.length > 0) {
      const maxTurn = existingActivityDetails.data.activityDetail.reduce((max, current) => {
        return current.turn > max ? current.turn : max;
      }, 0);

      // Gunakan nilai maxTurn untuk membuat data baru
      const newActivityDetail = await this.db.activityDetail.create({
        data: {
          ...data,
          time: timeWithSeconds,
          turn: maxTurn + 1 // Gunakan nilai maxTurn + 1 sebagai nilai turn berikutnya
        },
      });

      return {
        status: HttpStatus.CREATED,
        data: {
          activityDetail: newActivityDetail
        }
      }
    }

    const activityDetail = await this.db.activityDetail.create({
      data: {
        ...data,
        time: timeWithSeconds,
        turn: 1
      },
    });

    return {
      status: HttpStatus.CREATED,
      data: {
        activityDetail
      },
    }
  }

  async updateData(id: string, data: UpdateActivityDetailDto) {
    const updatedActivityDetail = await this.db.activityDetail.update({
      where: { id },
      data
    });

    return {
      status: HttpStatus.OK,
      data: {
        activityDetail: updatedActivityDetail
      },
    }
  }

  async deleteData(id: string) {
    const activityDetailToDelete = await this.findById(id)
    const turnToDelete = activityDetailToDelete.data.activityDetail.turn

    await this.db.activityDetail.delete({
      where: { id }
    })

    const activityDetail = await this.db.activityDetail.findMany({
      where: {
        turn: {
          gt: turnToDelete
        }
      }
    })

    if (activityDetail) {
      await this.db.activityDetail.updateMany({
        where: {
          turn: {
            gt: turnToDelete
          }
        },
        data: {
          turn: {
            decrement: 1
          }
        }
      })

      return {
        status: HttpStatus.GONE,
      }
    }

    return {
      status: HttpStatus.GONE
    }
  }
}
