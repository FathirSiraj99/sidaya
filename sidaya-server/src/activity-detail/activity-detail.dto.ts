import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { ActivityDetailEntity } from "./activity-detail.entity";
import { Prisma } from "@prisma/client";

export class CreateActivityDetailDto extends OmitType(ActivityDetailEntity, ['id']) {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    formula: Prisma.JsonValue;
    @ApiProperty()
    activityTemplateId: string;
    @ApiProperty()
    nthDay: number;
    @ApiProperty()
    time: string;
}

export class UpdateActivityDetailDto extends PartialType(CreateActivityDetailDto) {
    @ApiProperty()
    name?: string;
    @ApiProperty()
    formula?: Prisma.JsonValue;
    @ApiProperty()
    nthDay?: number;
    @ApiProperty()
    time?: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    activityTemplateId?: string;
}