import { OmitType } from "@nestjs/mapped-types";
import { ActivityDetailEntity } from "./activity-detail.entity";
import { Prisma } from "@prisma/client";

export class ActivityDetailDto extends OmitType(ActivityDetailEntity, ['id', 'createdAt', 'updatedAt']) {
    name: string;
    activityTemplateId: string;
    // description: string;
    // formula: Prisma.JsonValue;
    nthDay: number;
    time: string;
    turn: string;
}