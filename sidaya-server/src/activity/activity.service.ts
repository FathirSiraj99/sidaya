import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly db: PrismaService,) { }

  async startActivity(areaId: string) {
    const area = await this.db.area.findFirst({
      where: { id: areaId }
    })

    const activityTemplate = await this.db.activityTemplate.findFirst({
      where: { id: area.activityTemplateId }
    })

    const newActivity = await this.db.activityDetail.findMany({
      where: { activityTemplateId: activityTemplate.id },
      orderBy: {
        turn: 'asc'
      },
      take: 3,
    })

    return {
      area, newActivity
    }
  }

  async nextActivity(areaId: string, activityDetailId: string) {
    // Ambil area berdasarkan areaId
    const area = await this.db.area.findFirst({
      where: { id: areaId }
    });

    if (!area) throw new NotFoundException("Area not found");

    // Update activityDetailId pada area
    const updatedArea = await this.db.area.update({
      where: { id: area.id },
      data: {
        activityDetailId
      }
    });

    // Ambil activityDetail berdasarkan activityDetailId yang baru diupdate
    const turn = await this.db.activityDetail.findFirst({
      where: { id: updatedArea.activityDetailId }
    });

    console.log(turn);

    // Ambil aktivitas yang memiliki turn lebih besar dari atau sama dengan turn dari activityDetail
    const newActivity = await this.db.activityDetail.findMany({
      where: {
        activityTemplateId: updatedArea.activityTemplateId,
        turn: {
          gte: turn.turn + 1
        }
      },
      select: {
        id: true,
        name: true
      },
      orderBy: {
        turn: 'asc'
      }
    });

    return newActivity;
  }







  async formula(formula: Prisma.JsonValue, id: string): Promise<string> {
    if (!formula || formula === null) return null;

    const formulaArray: any[] = formula as any[];

    const datas: string[] = await Promise.all(
      formulaArray.map(async (element) => {
        const { name, value, message } = element;

        switch (name) {
          case 'pakan':
            return this.feedFunction(value, message, id);
          case 'volume':
            return this.volumeFunction(value, message, id);
          case 'berat_ikan':
            return this.weightFunction(value, message, id);
          default:
            return null;
        }
      }),
    );

    if (datas.length !== 0) {
      const result = `<Typography variant='body1'>Komposisi :</Typography><ul>${datas
        .map((item) => `<li>${item}</li>`)
        .join('')}</ul>`;
      return result;
    }

    return null
  }

  async feedFunction(
    value: number,
    message: string,
    id: string,
  ): Promise<string> {
    const data = await this.db.area.findUnique({
      where: {
        id: id,
      },
      select: {
        feed: true,
      },
    });

    return `Jumlah ${message}: ${value * data.feed}`;
  }

  async volumeFunction(
    value: number,
    message: string,
    id: string,
  ): Promise<string> {
    const data = await this.db.area.findUnique({
      where: {
        id: id,
      },
      select: {
        volume: true,
      },
    });

    return `Jumlah ${message}: ${value * data.volume}`;
  }

  async weightFunction(
    value: number,
    message: string,
    id: string,
  ): Promise<string> {
    const data = await this.db.area.findUnique({
      where: {
        id: id,
      },
      select: {
        weight: true,
      },
    });

    return `Jumlah ${message}: ${value * data.weight}`;
  }
}
