import { $Enums, ActivityTemplate } from "@prisma/client";

export class activityTemplateEntity implements ActivityTemplate {
    id: string;
    name: string;
    fish: $Enums.Fish;
    createdAt: Date;
    updatedAt: Date;
}