import { OmitType, PartialType } from "@nestjs/swagger";
import { AreaEntity } from "./area.entity";
import { $Enums } from "@prisma/client";

export class CreateAreaDto extends OmitType(AreaEntity, ['id']) {
    name: string;
    feed: number;
    weight: number;
    volume: number;
    waterLevel: number;
    capacity: number;
    fish: $Enums.Fish;
}

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
    name?: string;
    feed?: number;
    weight?: number;
    volume?: number;
    waterLevel?: number;
    capacity?: number;
    activityDetailId?: string;
    problemDetailId?: string;
    isActive?: number;
    fish?: $Enums.Fish;
}