import { ActivityDetail, Prisma } from "@prisma/client";

export class ActivityDetailEntity implements ActivityDetail {
    id: string;
    name: string;
    description: string;
    time: string;
    turn: number;
    nthDay: number;
    formula: Prisma.JsonValue;
    activityTemplateId: string;
    createdAt: Date;
    updatedAt: Date;
}