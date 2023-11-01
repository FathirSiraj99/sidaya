import { OmitType } from "@nestjs/mapped-types";
import { Auth } from "../entities/auth.entity";

export class CreateAuthDto {
    username : string
    password : string
}
