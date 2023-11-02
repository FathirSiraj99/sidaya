import { activity_template } from "@prisma/client";

export class ActivityTemplateEntity implements activity_template {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}