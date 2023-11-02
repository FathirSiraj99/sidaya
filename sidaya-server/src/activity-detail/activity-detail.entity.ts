import { ActivityDetail, Prisma } from "@prisma/client";

export class ActivityDetailEntity implements ActivityDetail {
    id: string;
    name: string;
    time: string;
    nthDay: number;
    description: string;
    activityTemplateId: string;
    formula: Prisma.JsonValue;
    createdAt: Date;
    updatedAt: Date;
}