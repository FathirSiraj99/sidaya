import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly db: PrismaService,) { }

  private currentNthDay = 1;
  private activityDetailArray: any[] = [];

  async startActivity(activityTemplateId: string) {
    const activityDetails = await this.db.activityDetail.findMany({
      where: {
        activityTemplateId,
        nthDay: this.currentNthDay,
      },
    });

    this.activityDetailArray.push(...activityDetails);

    this.currentNthDay++;

    return this.activityDetailArray;
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
