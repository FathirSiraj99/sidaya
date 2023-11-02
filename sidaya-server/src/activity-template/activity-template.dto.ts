import { OmitType } from "@nestjs/mapped-types";
import { ActivityTemplateEntity } from "./activity-template.entity";

export class ActivityTemplateDto extends OmitType(ActivityTemplateEntity, ['id', 'updatedAt']) {
    name: string;
}