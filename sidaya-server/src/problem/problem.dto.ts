import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Problem } from "@prisma/client";

export class ProblemEntity implements Problem {
    id: string;
    name: string;
    description: string;
    activityTemplateId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ProblemDto extends PartialType(ProblemEntity) {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    activityTemplateId?: string;
}