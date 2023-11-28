import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly db: PrismaService,) { }

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

    if (newActivity.length === 0) {
      return {
        response: HttpStatus.GONE,
        data: {
          area: area,
          activity: []
        }
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        area: area,
        activity: newActivity
      }
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
      return {
        response: HttpStatus.GONE,
        data: []
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        area: area,
        problem: newProblem
      }
    }
  }

  async startActivity(areaId: string) {
    const area = await this.db.area.findFirst({
      where: { id: areaId }
    })

    const newActivity = await this.db.activityDetail.findMany({
      where: { activityTemplateId: area.activityTemplateId },
      orderBy: {
        turn: 'asc'
      },
      take: 3,
    })

    const firstActivity = newActivity[0]

    const updatedArea = await this.db.area.update({
      where: { id: areaId },
      data: { activityDetailId: firstActivity.id }
    })

    return {
      response: HttpStatus.OK,
      data: {
        area: updatedArea,
        activity: newActivity
      }
    }
  }

  async nextActivity(areaId: string, activityId: string) {
    console.log(activityId)
    const area = await this.db.area.findFirst({
      where: { id: areaId }
    });

    if (area.problemId !== null) {
      return await this.nextProblem(areaId, activityId)
    }

    const activityDetail = await this.db.activityDetail.findUnique({
      where: { id: activityId }
    })

    if (area.nthDay < activityDetail.nthDay) {
      return await this.findAllActivityByAreaId(areaId)
    }

    const updatedArea = await this.db.area.update({
      where: { id: area.id },
      data: {
        activityDetailId: activityId
      }
    });

    const newActivity = await this.db.activityDetail.findMany({
      where: {
        activityTemplateId: updatedArea.activityTemplateId,
        turn: {
          gte: activityDetail.turn
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

    if (newActivity.length === 0) {
      const updatedArea = await this.db.area.update({
        where: { id: areaId },
        data: {
          activityTemplateId: null,
          activityDetailId: null
        }
      })
      return {
        response: HttpStatus.OK,
        data: {
          area: updatedArea,
          activity: []
        }
      }
    }

    return {
      response: HttpStatus.OK,
      area: updatedArea,
      activity: newActivity
    }
  }

  async nextProblem(areaId: string, activityId: string) {

    const area = await this.db.area.findUnique({
      where: { id: areaId }
    })

    const problemDetail = await this.db.problemDetail.findUnique({
      where: { id: activityId }
    })

    if (area.nthDay < problemDetail.nthDay) {
      return await this.findAllProblemByAreaId(areaId)
    }

    const updatedArea = await this.db.area.update({
      where: { id: areaId },
      data: {
        problemDetailId: activityId
      }
    });

    const newProblem = await this.db.problemDetail.findMany({
      where: {
        problemId: updatedArea.problemId,
        turn: {
          gte: problemDetail.turn
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

      const updatedArea = await this.db.area.update({
        where: { id: areaId },
        data: {
          nthDay: activityDetail.nthDay,
          problemId: null,
          problemDetailId: null
        }
      })

      return {
        response: HttpStatus.OK,
        data: {
          area: updatedArea,
          activity: []
        }
      }
    }

    return {
      response: HttpStatus.OK,
      data: {
        area: updatedArea,
        problem: newProblem
      }
    }
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
      response: HttpStatus.OK,
      data: {
        area: updatedArea,
        problem: newProblem
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
