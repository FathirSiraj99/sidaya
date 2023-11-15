import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ActivityDetail, Prisma } from "@prisma/client";

export class ActivityDetailEntity implements ActivityDetail {
    activityTemplateId: string;
    createdAt: Date;
    description: string;
    formula: Prisma.JsonValue;
    id: string;
    name: string;
    nthDay: number;
    time: string;
    turn: string;
    updatedAt: Date;
}

export class ActivityDetailDto extends PartialType(ActivityDetailEntity) {
    @ApiProperty({ required: true })
    name?: string;

    @ApiProperty({ nullable: true })
    description?: string;

    @ApiProperty({ nullable: true })
    formula?: Prisma.JsonValue;

    @ApiProperty({ required: true })
    time?: string;

    @ApiProperty({ required: true })
    turn?: string;

    @ApiProperty({ required: true })
    activityTemplateId?: string;
}