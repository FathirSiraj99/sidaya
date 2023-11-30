import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { ProblemDetailEntity } from "./problem-detail.entity.";
import { Prisma } from "@prisma/client";

export class CreateProblemDetailDto extends OmitType(ProblemDetailEntity, ['id']) {
    @ApiProperty()
    name: string;
    @ApiProperty()
    formula: Prisma.JsonValue;
    @ApiProperty()
    nthDay: number;
    @ApiProperty()
    time: string;
    @ApiProperty()
    turn: string;
    @ApiProperty()
    problemId: string;
}

export class UpdateProblemDetailDto extends PartialType(CreateProblemDetailDto) {
    @ApiProperty()
    name: string;
    @ApiProperty()
    formula: Prisma.JsonValue;
    @ApiProperty()
    nthDay: number;
    @ApiProperty()
    time: string;
    @ApiProperty()
    turn: string;
    @ApiProperty()
    problemId: string;
}