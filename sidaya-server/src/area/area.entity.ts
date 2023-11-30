import { $Enums, Area } from "@prisma/client";

export class AreaEntity implements Area {
    id: string;
    activityDetailId: string;
    activityTemplateId: string;
    capacity: number;
    createdAt: Date;
    feed: number;
    isActive: number;
    name: string;
    nthDay: number;
    problemDetailId: string;
    problemId: string;
    status: number;
    updatedAt: Date;
    userId: number;
    volume: number;
    waterLevel: number;
    weight: number;
    fish: $Enums.Fish;
}