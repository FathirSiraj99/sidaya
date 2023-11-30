import { Problem } from "@prisma/client";

export class ProblemEntity implements Problem {
    id: string;
    name: string;
    description: string;
    activityTemplateId: string;
    createdAt: Date;
    updatedAt: Date;
}