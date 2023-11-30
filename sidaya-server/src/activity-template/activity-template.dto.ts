import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { activityTemplateEntity } from "./activity-template.entity";
import { $Enums } from "@prisma/client";

export class CreateActivityTemplateDto extends OmitType(activityTemplateEntity, ['id']) {
    @ApiProperty({ uniqueItems: true, type: String })
    name: string
    @ApiProperty()
    fish: $Enums.Fish;
}

export class UpdateActivityTemplateDto extends PartialType(CreateActivityTemplateDto) {
    @ApiProperty()
    name?: string;
    @ApiProperty()
    fish?: $Enums.Fish;
}