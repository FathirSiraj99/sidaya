import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { ProblemEntity } from "./problem.entity";

export class CreateProblemDto extends OmitType(ProblemEntity, ['id']) {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    activityTemplateId: string;
}

export class UpdateProblemDto extends PartialType(CreateProblemDto) {
    @ApiProperty()
    name?: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    activityTemplateId?: string;
}