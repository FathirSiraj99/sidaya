import { PartialType } from '@nestjs/mapped-types';
import { CreateProblemDetailDto } from './create-problem-detail.dto';

export class UpdateProblemDetailDto extends PartialType(CreateProblemDetailDto) {}
