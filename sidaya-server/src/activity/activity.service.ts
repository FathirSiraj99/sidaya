import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly db: PrismaService,) { }

  async startActivity(userId: number) {
    const area = await this.db.area.findFirst({
      where: { userId }
    })

    const activityTemplate = await this.db.activityTemplate.findFirst({
      where: { id: area.activityTemplateId }
    })

    return await this.db.activityDetail.findMany({
      where: { activityTemplateId: activityTemplate.id },
      orderBy: {
        nthDay: 'asc'
      },
      take: 3,
    })
  }

  // async nextActivity(userId: number, activityDetailId: string) {
  //   const area = await this.db.area.findFirst({
  //     where: { userId }
  //   })

  //   if (!area) throw new NotFoundException("Area not found")

  //   const updatedArea = await this.db.area.update({
  //     where: { id: area.id },
  //     data: {
  //       activityDetailId
  //     }
  //   })

  //   const activityTemplateId = updatedArea.activityTemplateId;

  //   // // Menentukan nthDay terendah berdasarkan activityTemplateId
  //   // const minNthDay = await this.db.activityDetail.findFirst({
  //   //   where: { activityTemplateId },
  //   //   orderBy: {
  //   //     nthDay: 'asc'
  //   //   },
  //   //   select: {
  //   //     nthDay: true
  //   //   }
  //   // });

  //   // if (!minNthDay) {

  //   //   return [];
  //   // }

  //   const newActivity = await this.db.activityDetail.findMany({
  //     where: {
  //       activityTemplateId,
  //       NOT: {
  //         id: updatedArea.activityDetailId
  //       }
  //     },
  //     orderBy: {
  //       nthDay: 'asc'
  //     },
  //     take: 3
  //   });

  //   return newActivity;
  // }

  async nextActivity(userId: number, activityDetailId: string) {
    const area = await this.db.area.findFirst({
      where: { userId }
    });

    if (!area) throw new NotFoundException("Area not found");

    const updatedArea = await this.db.area.update({
      where: { id: area.id },
      data: {
        activityDetailId
      }
    });

    const activityTemplateId = updatedArea.activityTemplateId;
    const previousActivityDetailId = area.activityDetailId; // ID sebelumnya

    const excludedIds = [activityDetailId, previousActivityDetailId]; // Menyimpan ID yang akan dikecualikan

    console.log(excludedIds)

    const newActivity = await this.db.activityDetail.findMany({
      where: {
        activityTemplateId,
        id: {
          not: {
            in: excludedIds
          }
        }
      },
      select: {
        id: true,
        name: true
      },
      orderBy: {
        nthDay: 'asc'
      },
      take: 3
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
