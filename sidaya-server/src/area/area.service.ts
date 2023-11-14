import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { ActivityService } from 'src/activity/activity.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AreaService {
  constructor(
    private db: PrismaService,
    private activityService: ActivityService
  ) { }

  async findAll() {
    const area = await this.db.area.findMany();

    if (!area || area.length === 0) return new GoneException("Area Is Missing")

    return area
  }

  async findAllByUserId(userId: number) {
    const area = await this.db.area.findMany({
      where: { userId }
    });

    if (!area || area.length === 0) return new GoneException("Area Is Missing")

    return area
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

    if (area.activityTemplateId === null) return { area, activity: "Selamat kamu telah selesai" }

    if (area.problemId !== null) {
      return await this.activityService.findAllProblemByAreaId(areaId)
    }

    return await this.activityService.findAllActivityByAreaId(areaId)
  }

  async createData(userId: number, data: any) {
    const newArea = await this.db.area.create({
      data: {
        ...data,
        userId
      }
    });

    return await this.activityService.startActivity(newArea.id)
  }

  async updateData(id: string, data: any) {
    const area = await this.db.area.findUnique({
      where: { id }
    })

    if (!area) return new NotFoundException("Area Not Found")

    return await this.db.area.update({
      where: { id },
      data: data
    });
  }

  async deleteData(id: string) {
    const area = await this.db.area.findUnique({
      where: { id }
    })

    if (!area) return new NotFoundException("Area Not Found")

    return await this.db.area.delete({
      where: { id }
    });
  }
}
