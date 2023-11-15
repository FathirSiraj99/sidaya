import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Prisma, ProblemDetail } from "@prisma/client";

export class ProblemDetailEntity implements ProblemDetail {
    id: string;
    name: string;
    formula: Prisma.JsonValue;
    problemId: string;
    time: string;
    nthDay: number;
    turn: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ProblemDetailDto extends PartialType(ProblemDetailEntity) {
    @ApiProperty()
    name?: string;

    @ApiProperty()
    formula?: Prisma.JsonValue;

    @ApiProperty()
    nthDay?: number;

    @ApiProperty()
    problemId?: string;

    @ApiProperty()
    time?: string;

    @ApiProperty()
    turn?: string;
}