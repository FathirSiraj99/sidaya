import { OmitType } from "@nestjs/mapped-types";
import { AreaEntity } from "./area.entity";

export class AreaDto extends OmitType(AreaEntity, ['id', 'updatedAt']) {
    name: string;
    activityTemplateId: string;
    capacity: number;
    createdAt: Date;
    feed: number;
    isActive: number;
    volume: number;
    waterLevel: number;
    weight: number;
}