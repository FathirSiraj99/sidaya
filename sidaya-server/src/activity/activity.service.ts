import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private db: PrismaService) {}

  /**
   * Get All activity
   * @returns
   */
  async findAll() {
    return await this.db.activity.findMany({
      orderBy: {
        dueDate: 'asc',
      },
      include: {
        area: true,
      },
    });
  }

  /**
   * Get All By Area
   * @param id
   * @returns
   */
  async findAllByArea(id: string) {
    const data = await this.db.activity.findMany({
      where: {
        areaId: id,
        isCompleted: {
          in: [0, 2]
        }
      },
      orderBy: {
        dueDate: 'asc',
      },
      select: {
        id: true,
        name: true,
        dueDate: true,
        areaId: true,
        isCompleted: true,
      },
      take: 3
    });

    if (!data || data === null) return data;

    for (let i = 0; i < data.length; i++) {
      const date = data[i].dueDate.toISOString();

      const dateTime = date.replace('T', ' ').replace('Z', '');
      const dateObject = new Date(dateTime);

      // Format tanggal menjadi string dengan format yang lebih bagus
      const formattedDate = dateObject.toLocaleString('id-ID', {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric", // Menggunakan format angka jam (hour)
        minute: "numeric",
      });

      data[i]['date'] = formattedDate;
    }

    return data;
  }

  /**
   * Get One activity By id
   * @param id
   * @returns
   */
  async findById(id: string) {
    return await this.db.activity.findUnique({
      where: {
        id: id,
      },
      include: {
        area: {
          select: {
            name: true
          }
        }
      }
    });
  }

  /**
   * Create activity
   * @param data
   * @returns
   */
  async createData(data: any) {
    return await this.db.activity.create({
      data: data,
    });
  }

  /**
   * Update activity
   * @param id
   * @param data
   */
  async updateData(id: string, data: any) {
    return await this.db.activity.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  /**
   * Delete activity
   * @param id
   */
  async deleteData(id: string) {
    return await this.db.activity.delete({
      where: {
        id: id,
      },
    });
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
