import { ActivityTemplate } from "@prisma/client";

export class ActivityTemplateEntity implements ActivityTemplate {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}