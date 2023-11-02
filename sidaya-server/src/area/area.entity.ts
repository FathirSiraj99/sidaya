import { Area } from "@prisma/client";

export class AreaEntity implements Area {
    id: string;
    capacity: number;
    createdAt: Date;
    feed: number;
    isActive: number;
    name: string;
    updatedAt: Date;
    volume: number;
    waterLevel: number;
    weight: number;
    activityTemplateId: string;
    activityDetailId: string;
    status: number;
}