import { Prisma, activity_detail } from "@prisma/client";

export class ActivityDetailEntity implements activity_detail {
    id: string;
    name: string;
    time: string;
    nthDay: number;
    formula: Prisma.JsonValue;
    description: string;
    activityTemplateId: string;
    createdAt: Date;
    updatedAt: Date;
}