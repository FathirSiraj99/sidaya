import { Prisma, ProblemDetail } from "@prisma/client";

export class ProblemDetailEntity implements ProblemDetail {
    id: string;
    name: string;
    formula: Prisma.JsonValue;
    nthDay: number;
    time: string;
    turn: string;
    problemId: string;
    createdAt: Date;
    updatedAt: Date;
}