import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly db: PrismaService,) { }

  async findAllActivityByAreaId(areaId: string) {
    const area = await this.db.area.findUnique({
      where: { id: areaId }
    })

    const turn = await this.db.activityDetail.findFirst({
      where: { id: area.activityDetailId }
    });

    const newActivity = await this.db.activityDetail.findMany({
      where: {
        activityTemplateId: area.activityTemplateId,
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

    if (newActivity.length === 0) {
      return { area, activity: "Selamat kamu telah selesai" }
    }

    return { area, activity: newActivity };
  }

  async findAllProblemByAreaId(areaId: string) {
    const area = await this.db.area.findUnique({
      where: { id: areaId }
    })

    const turn = await this.db.problemDetail.findFirst({
      where: { problemId: area.problemId }
    });

    const newProblem = await this.db.problemDetail.findMany({
      where: {
        problemId: area.problemId,
        turn: {
          gte: turn.turn
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

    if (newProblem.length === 0) {
      return { area, activity: "Selamat kamu telah selesai" }
    }

    return { area, problem: newProblem };
  }

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

    return { area, activity: newActivity }
  }

  async nextActivity(areaId: string, activityId: string) {
    const area = await this.db.area.findFirst({
      where: { id: areaId }
    });

    if (!area) throw new NotFoundException("Area not found");

    if (area.problemId !== null) {
      const updatedArea = await this.db.area.update({
        where: { id: area.id },
        data: {
          problemDetailId: activityId
        }
      });

      const turn = await this.db.problemDetail.findFirst({
        where: { id: updatedArea.problemDetailId }
      });

      const newProblem = await this.db.problemDetail.findMany({
        where: {
          problemId: updatedArea.problemId,
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

      if (newProblem.length === 0) {
        await this.db.area.update({
          where: { id: area.id },
          data: {
            problemId: null
          }
        })

        return { area, activity: "Selamat kamu telah selesai" }
      }

      return { area, problem: newProblem };
    }

    const updatedArea = await this.db.area.update({
      where: { id: area.id },
      data: {
        activityDetailId: activityId
      }
    });

    const turn = await this.db.activityDetail.findFirst({
      where: { id: updatedArea.activityDetailId }
    });

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

    if (newActivity.length === 0) {
      await this.db.area.update({
        where: { id: areaId },
        data: {
          activityTemplateId: null,
          activityDetailId: null
        }
      })
      return { area, activity: "Selamat kamu telah selesai" }
    }

    return { area, activity: newActivity };
  }

  async includeProblem(areaId: string, problemId: string) {
    const area = await this.db.area.findFirst({
      where: { id: areaId }
    });

    if (!area) throw new NotFoundException("Area not found");

    const updatedArea = await this.db.area.update({
      where: { id: areaId },
      data: {
        problemId: problemId
      }
    })

    const newProblem = await this.db.problemDetail.findMany({
      where: {
        problemId: updatedArea.problemId,
      },
      select: {
        id: true,
        name: true
      },
      orderBy: {
        turn: 'asc'
      },
      take: 3
    });

    return { area, problem: newProblem }
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
