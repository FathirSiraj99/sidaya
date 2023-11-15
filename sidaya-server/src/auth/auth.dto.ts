import { ApiProperty } from "@nestjs/swagger"
import { Role } from "@prisma/client"

export class AuthRegisterDto {
    @ApiProperty({ uniqueItems: true, type: String })
    username: string

    @ApiProperty({ minimum: 8, type: String })
    password: string

    @ApiProperty({ enum: ['ADMIN', 'USER'], default: 'USER' })
    role: Role
}

export class AuthLoginDto {
    @ApiProperty({ uniqueItems: true, type: String })
    username: string

    @ApiProperty({ minimum: 8, type: String })
    password: string
}

