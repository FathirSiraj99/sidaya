import { ApiProperty } from "@nestjs/swagger";

export class ActivityTemplateDto {
    @ApiProperty({ uniqueItems: true, type: String })
    name: string
}