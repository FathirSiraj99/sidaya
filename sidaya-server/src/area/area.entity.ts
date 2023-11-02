import { area } from "@prisma/client";

export class AreaEntity implements area {
    id: string;
    activityTemplateId: string;
    capacity: number;
    createdAt: Date;
    feed: number;
    isActive: number;
    name: string;
    updatedAt: Date;
    volume: number;
    waterLevel: number;
    weight: number;
}