import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService
    ) { }

    async register(dto: CreateAuthDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { username: dto.username }
        })

        if (existingUser) {
            throw new UnauthorizedException('username already in use')
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10)

        const user = await this.prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword
            }
        })

        const { password: newUserPassword, ...rest } = user

        return {
            Response: 201,
            message: "User successfully created",
            data: {
                user: rest
            }
        }

    }

    async login(dto: CreateAuthDto) {
        const user = await this.prisma.user.findUnique({
            where: { username: dto.username }
        })

        if (!user) {
            throw new UnauthorizedException('email not found')
        }

        const password = await bcrypt.compare(dto.password, user.password)

        if (!password) {
            throw new UnauthorizedException('password wrong')
        }

        const payload = { sub: user.id, username: user.username }

        return {
            access_token: await this.jwt.signAsync(payload)
        }
    }

}
