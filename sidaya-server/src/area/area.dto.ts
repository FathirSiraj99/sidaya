import { OmitType } from "@nestjs/mapped-types";
import { AreaEntity } from "./area.entity";

export class AreaDto extends OmitType(AreaEntity, ['id']) {
    activityTemplateId: string;
    capacity: number;
    feed: number;
    id: string;
    isActive: number;
    name: string;
    volume: number;
    waterLevel: number;
    weight: number;
}