import { OmitType } from "@nestjs/mapped-types";
import { ProblemDetailEntity } from "../entities/problem-detail.entity";

export class CreateProblemDetailDto extends OmitType(ProblemDetailEntity,['createdAt','id','updatedAt']) {
    name : string;
    problemId: string;
    nthDay: number;
    time: string;
    turn: string;
}
