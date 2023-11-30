import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { $Enums } from "@prisma/client";

//ADMIN
export class CreateUserDto extends OmitType(UserEntity, ['id']) {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    roles: $Enums.Role;
}

export class UpdateUserDTo extends PartialType(CreateUserDto) {
    @ApiProperty()
    username?: string;
    @ApiProperty()
    password?: string;
    @ApiProperty()
    roles?: $Enums.Role;
}

//USER
export class ChangePasswordDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    oldPassword: string
    @ApiProperty()
    newPasssword: string
}

export class ChangeUsernameDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    username: string
}