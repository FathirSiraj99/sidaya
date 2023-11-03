import { Area } from "@prisma/client";

export class AreaEntity implements Area {
    activityDetailId: string;
    activityTemplateId: string;
    capacity: number;
    createdAt: Date;
    feed: number;
    id: string;
    isActive: number;
    name: string;
    status: number;
    updatedAt: Date;
    userId: number;
    volume: number;
    waterLevel: number;
    weight: number;
}