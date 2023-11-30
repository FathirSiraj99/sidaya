import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly db: PrismaService,) { }

  async findAll(areaId: string) {
    const area = await this.db.area.findUnique({
      where: { id: areaId }
    })

    if (area.problemId !== null) {
      return await this.findAllProblemByAreaId(areaId)
    }

    return await this.findAllActivityByAreaId(areaId)
  }

  async findAllActivityByAreaId(areaId: string) {
    const area = await this.db.area.findUnique({
      where: { id: areaId },
      include: { ActivityDetail: { select: { turn: true } } }
    })

    const newActivity = await this.db.activityDetail.findMany({
      where: {
        activityTemplateId: area.activityTemplateId,
        turn: {
          gte: area.ActivityDetail.turn
        }
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

    return {
      status: HttpStatus.OK,
      data: {
        area: area,
        activity: newActivity
      },
    }
  }

  async findAllProblemByAreaId(areaId: string) {
    const area = await this.db.area.findUnique({
      where: { id: areaId },
      include: { ProblemDetail: true }
    })

    const newProblem = await this.db.problemDetail.findMany({
      where: {
        problemId: area.problemId,
        turn: {
          gte: area.ProblemDetail.turn
        }
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

    if (newProblem.length === 0) {
      const activityDetail = await this.db.activityDetail.findUnique({
        where: { id: area.activityDetailId }
      })

      await this.db.area.update({
        where: { id: areaId },
        data: {
          nthDay: activityDetail.nthDay - 1,
          problemId: null,
          problemDetailId: null
        }
      })

      return await this.findAllActivityByAreaId(area.id)
    }

    return {
      status: HttpStatus.OK,
      data: {
        area: area,
        problem: newProblem,
      }
    }
  }

  async nextActivity(areaId: string, activityDetailId: string) {
    const area = await this.db.area.findFirst({
      where: { id: areaId }
    });

    const activityDetail = await this.db.activityDetail.findUnique({
      where: { id: activityDetailId }
    })

    if (area.nthDay < activityDetail.nthDay) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: "Aktivitas tidak dapat dilakukan pada hari ini."
      }
    }

    const updatedArea = await this.db.area.update({
      where: { id: area.id },
      data: {
        activityDetailId
      }
    });

    return await this.findAllActivityByAreaId(updatedArea.id)
  }

  async nextProblem(areaId: string, problemDetailId: string) {
    const area = await this.db.area.findUnique({
      where: { id: areaId }
    })

    const problemDetail = await this.db.problemDetail.findUnique({
      where: { id: problemDetailId }
    })

    if (area.nthDay < problemDetail.nthDay) {
      return {
        status: HttpStatus.BAD_REQUEST,
      }
    }

    const updatedArea = await this.db.area.update({
      where: { id: areaId },
      data: {
        problemDetailId
      }
    });

    return await this.findAllProblemByAreaId(updatedArea.id)
  }

  async includeProblem(areaId: string, problemId: string) {
    const area = await this.db.area.findFirst({
      where: { id: areaId }
    });

    if (!area) throw new NotFoundException("Area not found");

    const newProblem = await this.db.problemDetail.findMany({
      where: {
        problemId,
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

    const firstProblem = newProblem[0]

    const updatedArea = await this.db.area.update({
      where: { id: areaId },
      data: {
        nthDay: 1,
        problemId: problemId,
        problemDetailId: firstProblem.id
      }
    })

    return {
      status: HttpStatus.OK,
      data: {
        area: updatedArea,
        problem: newProblem,
      }
    }
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
