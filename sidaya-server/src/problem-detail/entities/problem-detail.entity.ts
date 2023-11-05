import { Prisma, ProblemDetail } from "@prisma/client";

export class ProblemDetailEntity implements ProblemDetail{
    id: string;
    createdAt: Date;
    formula: Prisma.JsonValue;
    name: string;
    nthDay: number;
    problemId: string;
    time: string;
    turn: string;
    updatedAt: Date;
}
